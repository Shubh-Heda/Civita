-- ================================================================
-- CIVITA — MASTER SCHEMA (Fresh Consolidated Reconstruction)
-- WARNING: This drops your existing tables to resolve the type cache conflict.
-- ================================================================

-- 0. Drop existing tables to clear structural cache mismatches
drop table if exists public.website_feedback cascade;
drop table if exists public.saved_searches cascade;
drop table if exists public.user_locations cascade;
drop table if exists public.payments cascade;
drop table if exists public.notifications cascade;
drop table if exists public.coaching_bookings cascade;
drop table if exists public.coaching_slots cascade;
drop table if exists public.coaching_plans cascade;
drop table if exists public.coaches cascade;
drop table if exists public.user_achievements cascade;
drop table if exists public.achievements cascade;
drop table if exists public.messages cascade;
drop table if exists public.conversation_members cascade;
drop table if exists public.conversations cascade;
drop table if exists public.chat_invitations cascade;
drop table if exists public.chat_pinned_messages cascade;
drop table if exists public.message_reactions cascade;
drop table if exists public.chat_messages cascade;
drop table if exists public.chat_room_members cascade;
drop table if exists public.chat_rooms cascade;
drop table if exists public.hashtags cascade;
drop table if exists public.user_follows cascade;
drop table if exists public.post_shares cascade;
drop table if exists public.post_bookmarks cascade;
drop table if exists public.post_likes cascade;
drop table if exists public.post_comments cascade;
drop table if exists public.post_media cascade;
drop table if exists public.community_posts cascade;
drop table if exists public.gaming_tournaments cascade;
drop table if exists public.gaming_session_participants cascade;
drop table if exists public.gaming_sessions cascade;
drop table if exists public.gaming_clubs cascade;
drop table if exists public.event_attendees cascade;
drop table if exists public.events cascade;
drop table if exists public.match_participants cascade;
drop table if exists public.matches cascade;
drop table if exists public.trust_score_history cascade;
drop table if exists public.trust_scores cascade;
drop table if exists public.profiles cascade;

-- Extensions
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- ================================================================
-- 1. PROFILES
-- ================================================================
create table public.profiles (
  id                 text primary key,           -- matches auth.users.id (text in your DB)
  name               text,
  email              text,
  avatar             text,
  bio                text,
  location           text,
  phone              text,
  age                integer,
  profession         text,
  onboarding_completed boolean default false,
  onboarding_completed_at timestamptz,
  date_of_birth      date,
  sports_interests   text[],
  languages          text[],
  matches_played     integer default 0,
  events_attended    integer default 0,
  parties_hosted     integer default 0,
  achievements_count integer default 0,
  last_seen          timestamp,
  is_active          boolean default true,
  created_at         timestamp default now(),
  updated_at         timestamp default now(),
  user_id            uuid                        -- supabase auth uuid reference (kept for compat)
);

alter table public.profiles enable row level security;
drop policy if exists "Profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can insert own profile" on public.profiles for insert with check ((auth.uid())::text = id);
create policy "Users can update own profile" on public.profiles for update using ((auth.uid())::text = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, avatar, user_id)
  values (
    new.id::text,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', ''),
    new.id
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ================================================================
-- 2. TRUST SCORES
-- ================================================================
create table public.trust_scores (
  user_id     text primary key references public.profiles(id) on delete cascade,
  score       integer default 50 check (score >= 0 and score <= 100),
  level       text default 'new' check (level in ('new','bronze','silver','gold','platinum')),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create table public.trust_score_history (
  id            uuid primary key default gen_random_uuid(),
  user_id       text references public.profiles(id) on delete cascade,
  delta         integer not null,
  action        text not null,
  reason        text,
  reference_id  uuid,
  created_at    timestamptz default now()
);

alter table public.trust_scores enable row level security;
alter table public.trust_score_history enable row level security;
drop policy if exists "Trust scores publicly visible" on public.trust_scores;
drop policy if exists "Users view own trust history" on public.trust_score_history;
drop policy if exists "System insert trust history" on public.trust_score_history;
create policy "Trust scores publicly visible" on public.trust_scores for select using (true);
create policy "Users view own trust history" on public.trust_score_history for select using ((auth.uid())::text = user_id);
create policy "System insert trust history" on public.trust_score_history for insert with check ((auth.uid())::text = user_id);

-- Auto-create trust score when profile is created
create or replace function public.initialize_trust_score()
returns trigger as $$
begin
  insert into public.trust_scores (user_id) values (new.id) on conflict do nothing;
  return new;
end;
$$ language plpgsql;
drop trigger if exists trg_init_trust_score on public.profiles;
create trigger trg_init_trust_score after insert on public.profiles
  for each row execute function public.initialize_trust_score();

-- Auto-update trust score when history inserted
create or replace function public.handle_trust_score_update()
returns trigger as $$
begin
  insert into public.trust_scores (user_id, score)
  values (new.user_id, 50 + new.delta)
  on conflict (user_id) do update
  set score = greatest(0, least(100, public.trust_scores.score + new.delta)),
      updated_at = now();
  return new;
end;
$$ language plpgsql;
drop trigger if exists trg_trust_score_update on public.trust_score_history;
create trigger trg_trust_score_update after insert on public.trust_score_history
  for each row execute function public.handle_trust_score_update();

-- ================================================================
-- 3. MATCHES
-- ================================================================
create table public.matches (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  description       text,
  category          text,
  sport             text not null,
  date              timestamptz not null,
  duration_hours    integer default 1,
  location          text not null,
  latitude          double precision,
  longitude         double precision,
  organizer_id      text references public.profiles(id) on delete cascade,
  organizer_id_uuid uuid,
  participants      text[] default '{}',
  max_participants  integer,
  min_players       integer default 2,
  max_players       integer,
  current_players   integer default 0,
  status            text default 'open' check (status in ('open','full','ongoing','completed','cancelled','upcoming','active')),
  skill_level       text,
  entry_fee         numeric default 0,
  vibe              text,
  turf_name         text,
  turf_cost         numeric default 0,
  amount            numeric default 0,
  visibility        text default 'public' check (visibility in ('public','private','friends')),
  payment_option    text,
  time              text,
  user_id           uuid,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

alter table public.matches enable row level security;
drop policy if exists "Matches viewable by everyone" on public.matches;
drop policy if exists "Auth users create matches" on public.matches;
drop policy if exists "Organizers update matches" on public.matches;
drop policy if exists "Organizers delete matches" on public.matches;
create policy "Matches viewable by everyone" on public.matches for select using (true);
create policy "Auth users create matches" on public.matches for insert with check (auth.uid() is not null);
create policy "Organizers update matches" on public.matches for update using ((auth.uid())::text = organizer_id);
create policy "Organizers delete matches" on public.matches for delete using ((auth.uid())::text = organizer_id);

-- ================================================================
-- 4. MATCH PARTICIPANTS
-- ================================================================
create table public.match_participants (
  id         uuid primary key default gen_random_uuid(),
  match_id   uuid references public.matches(id) on delete cascade,
  user_id    text references public.profiles(id) on delete cascade,
  status     text default 'confirmed' check (status in ('confirmed','pending','declined','waitlist')),
  team       text,
  joined_at  timestamptz default now(),
  unique(match_id, user_id)
);

alter table public.match_participants enable row level security;
drop policy if exists "Match participants viewable by all" on public.match_participants;
drop policy if exists "Auth users join matches" on public.match_participants;
drop policy if exists "Players leave matches" on public.match_participants;
create policy "Match participants viewable by all" on public.match_participants for select using (true);
create policy "Auth users join matches" on public.match_participants for insert with check ((auth.uid())::text = user_id);
create policy "Players leave matches" on public.match_participants for delete using ((auth.uid())::text = user_id);

-- Auto-update current_players count
create or replace function public.update_match_player_count()
returns trigger as $$
begin
  update public.matches set current_players = (
    select count(*) from public.match_participants
    where match_id = coalesce(new.match_id, old.match_id) and status = 'confirmed'
  ) where id = coalesce(new.match_id, old.match_id);
  return coalesce(new, old);
end;
$$ language plpgsql;
drop trigger if exists trg_match_player_count on public.match_participants;
create trigger trg_match_player_count
  after insert or update or delete on public.match_participants
  for each row execute function public.update_match_player_count();

-- ================================================================
-- 5. EVENTS
-- ================================================================
create table public.events (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  description       text,
  category          text not null,
  date              timestamptz not null,
  location          text not null,
  latitude          double precision,
  longitude         double precision,
  organizer_id      text references public.profiles(id) on delete cascade,
  organizer_id_uuid uuid,
  participants      text[] default '{}',
  max_participants  integer,
  status            text default 'upcoming' check (status in ('upcoming','ongoing','completed','cancelled')),
  ticket_price      numeric default 0,
  cover_image       text,
  tags              text[] default '{}',
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

alter table public.events enable row level security;
drop policy if exists "Events viewable by everyone" on public.events;
drop policy if exists "Auth users create events" on public.events;
drop policy if exists "Organizers update events" on public.events;
drop policy if exists "Organizers delete events" on public.events;
create policy "Events viewable by everyone" on public.events for select using (true);
create policy "Auth users create events" on public.events for insert with check (auth.uid() is not null);
create policy "Organizers update events" on public.events for update using ((auth.uid())::text = organizer_id);
create policy "Organizers delete events" on public.events for delete using ((auth.uid())::text = organizer_id);

-- ================================================================
-- 6. EVENT ATTENDEES
-- ================================================================
create table public.event_attendees (
  id        uuid primary key default gen_random_uuid(),
  event_id  uuid references public.events(id) on delete cascade,
  user_id   text references public.profiles(id) on delete cascade,
  status    text default 'going' check (status in ('going','interested','cancelled')),
  rsvped_at timestamptz default now(),
  unique(event_id, user_id)
);

alter table public.event_attendees enable row level security;
drop policy if exists "Event attendees viewable by all" on public.event_attendees;
drop policy if exists "Auth users rsvp events" on public.event_attendees;
drop policy if exists "Users update rsvp" on public.event_attendees;
drop policy if exists "Users cancel rsvp" on public.event_attendees;
create policy "Event attendees viewable by all" on public.event_attendees for select using (true);
create policy "Auth users rsvp events" on public.event_attendees for insert with check ((auth.uid())::text = user_id);
create policy "Users update rsvp" on public.event_attendees for update using ((auth.uid())::text = user_id);
create policy "Users cancel rsvp" on public.event_attendees for delete using ((auth.uid())::text = user_id);

-- ================================================================
-- 7. GAMING CLUBS + SESSIONS
-- ================================================================
create table public.gaming_clubs (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  description   text,
  game          text,
  platform      text,
  created_by    text references public.profiles(id) on delete cascade,
  member_count  integer default 0,
  is_public     boolean default true,
  rating        numeric default 0,
  total_reviews integer default 0,
  avatar_url    text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create table public.gaming_sessions (
  id              uuid primary key default gen_random_uuid(),
  title           text,
  description     text,
  game            text not null,
  platform        text not null,
  club_id         uuid references public.gaming_clubs(id) on delete set null,
  host_id         text references public.profiles(id) on delete cascade,
  lobby_type      text default 'casual' check (lobby_type in ('casual','ranked','tournament')),
  min_rank        text,
  max_players     integer not null,
  current_players integer default 0,
  has_voice_chat  boolean default false,
  status          text default 'open' check (status in ('open','full','in_game','completed','cancelled')),
  scheduled_at    timestamptz,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create table public.gaming_session_participants (
  id          uuid primary key default gen_random_uuid(),
  session_id  uuid references public.gaming_sessions(id) on delete cascade,
  user_id     text references public.profiles(id) on delete cascade,
  is_active   boolean default true,
  joined_at   timestamptz default now(),
  unique(session_id, user_id)
);

create table public.gaming_tournaments (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  game          text not null,
  platform      text,
  club_id       uuid references public.gaming_clubs(id) on delete set null,
  organizer_id  text references public.profiles(id) on delete cascade,
  max_teams     integer,
  current_teams integer default 0,
  prize_pool    numeric default 0,
  entry_fee     numeric default 0,
  status        text default 'upcoming' check (status in ('upcoming','active','completed','cancelled')),
  starts_at     timestamptz,
  created_at    timestamptz default now()
);

alter table public.gaming_clubs enable row level security;
alter table public.gaming_sessions enable row level security;
alter table public.gaming_session_participants enable row level security;
alter table public.gaming_tournaments enable row level security;

drop policy if exists "Gaming clubs viewable by all" on public.gaming_clubs;
drop policy if exists "Gaming sessions viewable by all" on public.gaming_sessions;
drop policy if exists "Auth users create gaming sessions" on public.gaming_sessions;
drop policy if exists "Hosts update gaming sessions" on public.gaming_sessions;
drop policy if exists "Session participants viewable by all" on public.gaming_session_participants;
drop policy if exists "Auth users join gaming sessions" on public.gaming_session_participants;
drop policy if exists "Players leave gaming sessions" on public.gaming_session_participants;
drop policy if exists "Gaming tournaments viewable by all" on public.gaming_tournaments;

create policy "Gaming clubs viewable by all" on public.gaming_clubs for select using (true);
create policy "Gaming sessions viewable by all" on public.gaming_sessions for select using (true);
create policy "Auth users create gaming sessions" on public.gaming_sessions for insert with check ((auth.uid())::text = host_id);
create policy "Hosts update gaming sessions" on public.gaming_sessions for update using ((auth.uid())::text = host_id);
create policy "Session participants viewable by all" on public.gaming_session_participants for select using (true);
create policy "Auth users join gaming sessions" on public.gaming_session_participants for insert with check ((auth.uid())::text = user_id);
create policy "Players leave gaming sessions" on public.gaming_session_participants for delete using ((auth.uid())::text = user_id);
create policy "Gaming tournaments viewable by all" on public.gaming_tournaments for select using (true);

-- Auto-update session player count
create or replace function public.update_gaming_session_player_count()
returns trigger as $$
begin
  update public.gaming_sessions set current_players = (
    select count(*) from public.gaming_session_participants
    where session_id = coalesce(new.session_id, old.session_id) and is_active = true
  ) where id = coalesce(new.session_id, old.session_id);
  return coalesce(new, old);
end;
$$ language plpgsql;
drop trigger if exists trg_gaming_session_count on public.gaming_session_participants;
create trigger trg_gaming_session_count
  after insert or update or delete on public.gaming_session_participants
  for each row execute function public.update_gaming_session_player_count();

-- ================================================================
-- 8. COMMUNITY POSTS
-- ================================================================
create table public.community_posts (
  id            uuid primary key default gen_random_uuid(),
  author_id     text references public.profiles(id) on delete cascade,
  content       text not null,
  category      text,
  visibility    text default 'public' check (visibility in ('public','private','followers')),
  like_count    integer default 0,
  comment_count integer default 0,
  share_count   integer default 0,
  view_count    integer default 0,
  deleted_at    timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create table public.post_media (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid references public.community_posts(id) on delete cascade,
  media_url  text not null,
  media_type text check (media_type in ('image','video')),
  created_at timestamptz default now()
);

create table public.post_comments (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid references public.community_posts(id) on delete cascade,
  author_id  text references public.profiles(id) on delete cascade,
  content    text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.post_likes (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid references public.community_posts(id) on delete cascade,
  user_id    text references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

create table public.post_bookmarks (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid references public.community_posts(id) on delete cascade,
  user_id    text references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

create table public.post_shares (
  id         uuid primary key default gen_random_uuid(),
  post_id    uuid references public.community_posts(id) on delete cascade,
  user_id    text references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

create table public.user_follows (
  id           uuid primary key default gen_random_uuid(),
  follower_id  text references public.profiles(id) on delete cascade,
  following_id text references public.profiles(id) on delete cascade,
  created_at   timestamptz default now(),
  unique(follower_id, following_id),
  check (follower_id != following_id)
);

create table public.hashtags (
  tag          text primary key,
  usage_count  integer default 1,
  last_used_at timestamptz default now()
);

alter table public.community_posts enable row level security;
alter table public.post_media enable row level security;
alter table public.post_comments enable row level security;
alter table public.post_likes enable row level security;
alter table public.post_bookmarks enable row level security;
alter table public.post_shares enable row level security;
alter table public.user_follows enable row level security;

drop policy if exists "Posts viewable by everyone" on public.community_posts;
drop policy if exists "Auth users create posts" on public.community_posts;
drop policy if exists "Authors update posts" on public.community_posts;
drop policy if exists "Authors delete posts" on public.community_posts;

create policy "Posts viewable by everyone" on public.community_posts for select using (deleted_at is null);
create policy "Auth users create posts" on public.community_posts for insert with check ((auth.uid())::text = author_id);
create policy "Authors update posts" on public.community_posts for update using ((auth.uid())::text = author_id);
create policy "Authors delete posts" on public.community_posts for delete using ((auth.uid())::text = author_id);
create policy "Post media viewable by all" on public.post_media for select using (true);
create policy "Comments viewable by all" on public.post_comments for select using (true);
create policy "Auth users comment" on public.post_comments for insert with check ((auth.uid())::text = author_id);
create policy "Authors update comments" on public.post_comments for update using ((auth.uid())::text = author_id);
create policy "Authors delete comments" on public.post_comments for delete using ((auth.uid())::text = author_id);
create policy "Likes viewable by all" on public.post_likes for select using (true);
create policy "Auth users like" on public.post_likes for insert with check ((auth.uid())::text = user_id);
create policy "Users unlike" on public.post_likes for delete using ((auth.uid())::text = user_id);
create policy "Follows viewable by all" on public.user_follows for select using (true);
create policy "Auth users follow" on public.user_follows for insert with check ((auth.uid())::text = follower_id);
create policy "Users unfollow" on public.user_follows for delete using ((auth.uid())::text = follower_id);

-- ================================================================
-- 9. CHAT
-- ================================================================
create table public.chat_rooms (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  description     text,
  room_type       text check (room_type in ('match','event','gaming','party','custom','dm')) not null,
  related_id      uuid,
  created_by      text references public.profiles(id) on delete set null,
  is_private      boolean default false,
  category        text,
  avatar_url      text,
  last_message_at timestamptz default now(),
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create table public.chat_room_members (
  id           uuid primary key default gen_random_uuid(),
  room_id      uuid references public.chat_rooms(id) on delete cascade,
  user_id      text references public.profiles(id) on delete cascade,
  role         text default 'member' check (role in ('admin','moderator','member')),
  joined_at    timestamptz default now(),
  last_read_at timestamptz default now(),
  is_muted     boolean default false,
  unique(room_id, user_id)
);

create table public.chat_messages (
  id            uuid primary key default gen_random_uuid(),
  room_id       uuid references public.chat_rooms(id) on delete cascade,
  sender_id     text references public.profiles(id) on delete set null,
  content       text not null,
  message_type  text default 'text' check (message_type in ('text','image','video','audio','file','system')),
  media_url     text,
  reply_to      uuid references public.chat_messages(id) on delete set null,
  is_edited     boolean default false,
  is_deleted    boolean default false,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create table public.message_reactions (
  id         uuid primary key default gen_random_uuid(),
  message_id uuid references public.chat_messages(id) on delete cascade,
  user_id    text references public.profiles(id) on delete cascade,
  emoji      text not null,
  created_at timestamptz default now(),
  unique(message_id, user_id, emoji)
);

create table public.chat_pinned_messages (
  id         uuid primary key default gen_random_uuid(),
  room_id    uuid references public.chat_rooms(id) on delete cascade,
  message_id uuid references public.chat_messages(id) on delete cascade,
  pinned_by  text references public.profiles(id) on delete cascade,
  pinned_at  timestamptz default now(),
  unique(room_id, message_id)
);

create table public.chat_invitations (
  id           uuid primary key default gen_random_uuid(),
  room_id      uuid references public.chat_rooms(id) on delete cascade,
  inviter_id   text references public.profiles(id) on delete cascade,
  invitee_id   text references public.profiles(id) on delete cascade,
  status       text default 'pending' check (status in ('pending','accepted','declined')),
  created_at   timestamptz default now(),
  responded_at timestamptz,
  unique(room_id, invitee_id)
);

create table public.conversations (
  id           uuid primary key default gen_random_uuid(),
  type         text default 'direct' check (type in ('direct','group')),
  name         text,
  is_archived  boolean default false,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

create table public.conversation_members (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade,
  user_id         text references public.profiles(id) on delete cascade,
  role            text default 'member' check (role in ('admin','moderator','member')),
  joined_at       timestamptz default now(),
  unique(conversation_id, user_id)
);

create table public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade,
  sender_id       text references public.profiles(id) on delete cascade,
  content         text not null,
  message_type    text default 'text' check (message_type in ('text','image','file','system')),
  is_deleted      boolean default false,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- RLS for chat
alter table public.chat_rooms enable row level security;
alter table public.chat_room_members enable row level security;
alter table public.chat_messages enable row level security;
alter table public.message_reactions enable row level security;
alter table public.chat_pinned_messages enable row level security;
alter table public.chat_invitations enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.messages enable row level security;

drop policy if exists "Users can view rooms they are members of" on public.chat_rooms;
drop policy if exists "Users can create rooms" on public.chat_rooms;
drop policy if exists "Admins update rooms" on public.chat_rooms;

create policy "Users can view rooms they are members of" on public.chat_rooms
  for select using (id in (select rm.room_id from public.chat_room_members rm WHERE rm.user_id = (auth.uid())::text));

create policy "Users can create rooms" on public.chat_rooms
  for insert with check ((auth.uid())::text = created_by);

create policy "Admins update rooms" on public.chat_rooms
  for update using (id in (select rm.room_id from public.chat_room_members rm WHERE rm.user_id = (auth.uid())::text and rm.role in ('admin','moderator')));

drop policy if exists "Users can view members of their rooms" on public.chat_room_members;
drop policy if exists "Users join rooms" on public.chat_room_members;

create policy "Users can view members of their rooms" on public.chat_room_members
  for select using (room_id in (select rm.room_id from public.chat_room_members rm WHERE rm.user_id = (auth.uid())::text));

create policy "Users join rooms" on public.chat_room_members
  for insert with check ((auth.uid())::text = user_id);

drop policy if exists "Users can view messages in their rooms" on public.chat_messages;
drop policy if exists "Users can send messages to their rooms" on public.chat_messages;
drop policy if exists "Users update own messages" on public.chat_messages;

create policy "Users can view messages in their rooms" on public.chat_messages
  for select using (room_id in (select rm.room_id from public.chat_room_members rm WHERE rm.user_id = (auth.uid())::text));

create policy "Users can send messages to their rooms" on public.chat_messages
  for insert with check ((auth.uid())::text = sender_id and room_id in (select rm.room_id from public.chat_room_members rm WHERE rm.user_id = (auth.uid())::text));

create policy "Users update own messages" on public.chat_messages
  for update using ((auth.uid())::text = sender_id);

-- Open policies for conversations (DMs)
drop policy if exists "conversations_select_policy" on public.conversations;
drop policy if exists "conversations_insert_policy" on public.conversations;
drop policy if exists "conversations_update_policy" on public.conversations;
drop policy if exists "conversation_members_select_policy" on public.conversation_members;
drop policy if exists "conversation_members_insert_policy" on public.conversation_members;
drop policy if exists "messages_select_policy" on public.messages;
drop policy if exists "messages_insert_policy" on public.messages;
drop policy if exists "messages_update_policy" on public.messages;

create policy "conversations_select_policy" on public.conversations for select using (true);
create policy "conversations_insert_policy" on public.conversations for insert with check (true);
create policy "conversations_update_policy" on public.conversations for update using (true) with check (true);
create policy "conversation_members_select_policy" on public.conversation_members for select using (true);
create policy "conversation_members_insert_policy" on public.conversation_members for insert with check (true);
create policy "messages_select_policy" on public.messages for select using (true);
create policy "messages_insert_policy" on public.messages for insert with check (true);
create policy "messages_update_policy" on public.messages for update using (true) with check (true);

-- Update room last_message_at on new message
create or replace function public.update_room_last_message()
returns trigger as $$
begin
  update public.chat_rooms set last_message_at = new.created_at, updated_at = new.created_at
  where id = new.room_id;
  return new;
end;
$$ language plpgsql;
drop trigger if exists trg_room_last_message on public.chat_messages;
create trigger trg_room_last_message after insert on public.chat_messages
  for each row execute function public.update_room_last_message();

-- ================================================================
-- 10. ACHIEVEMENTS
-- ================================================================
create table public.achievements (
  code text primary key,
  name text not null,
  description text,
  icon text,
  category text,
  points integer default 0
);

create table public.user_achievements (
  id               uuid primary key default gen_random_uuid(),
  user_id          text references public.profiles(id) on delete cascade,
  achievement_code text references public.achievements(code) on delete cascade,
  earned_at        timestamptz default now(),
  unique(user_id, achievement_code)
);

alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;
drop policy if exists "Achievements publicly visible" on public.achievements;
drop policy if exists "User achievements publicly visible" on public.user_achievements;
create policy "Achievements publicly visible" on public.achievements for select using (true);
create policy "User achievements publicly visible" on public.user_achievements for select using (true);

insert into public.achievements (code, name, description, icon, category, points) values
  ('first_match', 'First Match', 'Attended your first match', '🎯', 'sports', 10),
  ('on_time_10', 'Punctual Pro', 'On time for 10 matches', '⏰', 'reliability', 25),
  ('streak_7', 'Weekly Warrior', '7-day activity streak', '🔥', 'reliability', 20),
  ('streak_30', 'Monthly Champion', '30-day activity streak', '🏆', 'reliability', 100),
  ('organizer_5', 'Match Maker', 'Organized 5 matches', '📋', 'community', 40),
  ('social_20', 'Social Butterfly', 'Made 20 connections', '🦋', 'social', 50),
  ('verified_player', 'Verified Player', 'Completed verification', '✅', 'reliability', 15),
  ('first_event', 'Event Goer', 'Attended your first event', '🎉', 'events', 10),
  ('first_game', 'Game On', 'Joined your first gaming session', '🎮', 'gaming', 10)
on conflict (code) do nothing;

-- ================================================================
-- 11. COACHING
-- ================================================================
create table public.coaches (
  id            uuid primary key default gen_random_uuid(),
  user_id       text references public.profiles(id) on delete cascade,
  name          text not null,
  bio           text,
  specialties   text[],
  hourly_rate   numeric,
  is_active     boolean default true,
  rating        numeric default 0,
  total_reviews integer default 0,
  image_url     text,
  experience    text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create table public.coaching_plans (
  id               uuid primary key default gen_random_uuid(),
  coach_id         uuid references public.coaches(id) on delete cascade,
  name             text not null,
  description      text,
  price            numeric not null,
  duration_months  integer default 1,
  sessions_count   integer not null,
  features         text[],
  is_recommended   boolean default false,
  is_active        boolean default true,
  created_at       timestamptz default now()
);

create table public.coaching_slots (
  id               uuid primary key default gen_random_uuid(),
  coach_id         uuid references public.coaches(id) on delete cascade,
  sport            text,
  day_of_week      integer check (day_of_week >= 0 and day_of_week <= 6),
  start_time       time not null,
  end_time         time not null,
  duration_minutes integer not null,
  max_spots        integer default 1,
  spots_left       integer default 1,
  is_available     boolean default true,
  is_recurring     boolean default true,
  created_at       timestamptz default now()
);

create table public.coaching_bookings (
  id               uuid primary key default gen_random_uuid(),
  user_id          text references public.profiles(id) on delete cascade,
  coach_id         uuid references public.coaches(id) on delete cascade,
  plan_id          uuid references public.coaching_plans(id) on delete set null,
  slot_id          uuid references public.coaching_slots(id) on delete cascade,
  booking_date     date not null,
  start_time       time not null,
  end_time         time not null,
  amount           numeric,
  status           text default 'confirmed' check (status in ('pending','confirmed','cancelled','completed')),
  payment_status   text default 'pending' check (payment_status in ('pending','paid','refunded')),
  created_at       timestamptz default now()
);

alter table public.coaches enable row level security;
alter table public.coaching_plans enable row level security;
alter table public.coaching_slots enable row level security;
alter table public.coaching_bookings enable row level security;

drop policy if exists "Coaches viewable by all" on public.coaches;
drop policy if exists "Coaches insert own profile" on public.coaches;
drop policy if exists "Coaches update own profile" on public.coaches;
drop policy if exists "Coaching plans viewable by all" on public.coaching_plans;
drop policy if exists "Coaching slots viewable by all" on public.coaching_slots;
drop policy if exists "Users view own bookings" on public.coaching_bookings;
drop policy if exists "Users create bookings" on public.coaching_bookings;

create policy "Coaches viewable by all" on public.coaches for select using (true);
create policy "Coaches insert own profile" on public.coaches for insert with check ((auth.uid())::text = user_id);
create policy "Coaches update own profile" on public.coaches for update using ((auth.uid())::text = user_id);
create policy "Coaching plans viewable by all" on public.coaching_plans for select using (true);
create policy "Coaching slots viewable by all" on public.coaching_slots for select using (true);
create policy "Users view own bookings" on public.coaching_bookings for select using ((auth.uid())::text = user_id);
create policy "Users create bookings" on public.coaching_bookings for insert with check ((auth.uid())::text = user_id);

-- ================================================================
-- 12. NOTIFICATIONS
-- ================================================================
create table public.notifications (
  id           uuid primary key default gen_random_uuid(),
  user_id      text references public.profiles(id) on delete cascade,
  type         text not null,
  title        text not null,
  body         text,
  reference_id uuid,
  is_read      boolean default false,
  created_at   timestamptz default now()
);

alter table public.notifications enable row level security;
drop policy if exists "Users view own notifications" on public.notifications;
drop policy if exists "System create notifications" on public.notifications;
drop policy if exists "Users mark read" on public.notifications;
create policy "Users view own notifications" on public.notifications for select using ((auth.uid())::text = user_id);
create policy "System create notifications" on public.notifications for insert with check (true);
create policy "Users mark read" on public.notifications for update using ((auth.uid())::text = user_id);

-- ================================================================
-- 13. PAYMENTS
-- ================================================================
create table public.payments (
  id              uuid primary key default gen_random_uuid(),
  user_id         text references public.profiles(id) on delete cascade,
  reference_id    uuid not null,
  reference_type  text check (reference_type in ('match','event','coaching','gaming')) not null,
  amount          numeric not null,
  currency        text default 'INR',
  status          text default 'pending' check (status in ('pending','paid','refunded','failed')),
  payment_stage   integer default 1,
  gateway_ref     text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

alter table public.payments enable row level security;
drop policy if exists "Users view own payments" on public.payments;
drop policy if exists "Users create payments" on public.payments;
create policy "Users view own payments" on public.payments for select using ((auth.uid())::text = user_id);
create policy "Users create payments" on public.payments for insert with check ((auth.uid())::text = user_id);

-- ================================================================
-- 14. DISCOVERY
-- ================================================================
create table public.user_locations (
  user_id    text primary key references public.profiles(id) on delete cascade,
  lat        double precision not null,
  lng        double precision not null,
  updated_at timestamptz default now()
);

create table public.saved_searches (
  id            uuid primary key default gen_random_uuid(),
  user_id       text references public.profiles(id) on delete cascade,
  name          text not null,
  search_params jsonb not null,
  is_active     boolean default true,
  created_at    timestamptz default now(),
  last_used_at  timestamptz
);

create table public.website_feedback (
  id            uuid primary key default gen_random_uuid(),
  rating        integer not null check (rating between 1 and 5),
  feedback_text text not null,
  feature       text,
  source        text default 'landing',
  created_at    timestamptz default now()
);

alter table public.user_locations enable row level security;
alter table public.saved_searches enable row level security;
alter table public.website_feedback enable row level security;
drop policy if exists "Users manage own location" on public.user_locations;
drop policy if exists "Users manage saved searches" on public.saved_searches;
drop policy if exists "Anyone can submit feedback" on public.website_feedback;
create policy "Users manage own location" on public.user_locations for all using ((auth.uid())::text = user_id);
create policy "Users manage saved searches" on public.saved_searches for all using ((auth.uid())::text = user_id);
create policy "Anyone can submit feedback" on public.website_feedback for insert with check (true);

-- ================================================================
-- 15. INDEXES
-- ================================================================
create index if not exists idx_matches_location on public.matches(location);
create index if not exists idx_matches_status on public.matches(status);
create index if not exists idx_matches_date on public.matches(date);
create index if not exists idx_events_location on public.events(location);
create index if not exists idx_events_status on public.events(status);
create index if not exists idx_events_date on public.events(date);
create index if not exists idx_gaming_sessions_status on public.gaming_sessions(status);
create index if not exists idx_community_posts_author on public.community_posts(author_id);
create index if not exists idx_community_posts_created on public.community_posts(created_at desc);
create index if not exists idx_chat_messages_room on public.chat_messages(room_id, created_at);
create index if not exists idx_notifications_user on public.notifications(user_id, is_read);
create index if not exists idx_trust_history_user on public.trust_score_history(user_id);
create index if not exists idx_user_locations on public.user_locations(lat, lng);

-- ================================================================
-- 16. REALTIME
-- ================================================================
do $$ begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'chat_messages') then
    alter publication supabase_realtime add table public.chat_messages; end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'chat_rooms') then
    alter publication supabase_realtime add table public.chat_rooms; end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'chat_room_members') then
    alter publication supabase_realtime add table public.chat_room_members; end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'messages') then
    alter publication supabase_realtime add table public.messages; end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'notifications') then
    alter publication supabase_realtime add table public.notifications; end if;
end $$;

do $$ begin raise notice '✅ Civita master schema complete!'; end $$;
