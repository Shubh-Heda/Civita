import { useState } from 'react';
import { ArrowLeft, MapPin, Users, Calendar, Clock, Search, ChevronRight, Send, Plus, X, Heart, CreditCard, DollarSign, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';
import { generateUpcomingDates, getMinBookingDate } from '../utils/dateUtils';
import { realGroupChatService } from '../services/groupChatServiceReal';
import { supabaseAuth } from '../services/supabaseAuthService';
import { communityService } from '../services/communityService';
import { pricingService } from '../services/pricingService';
import { deadlineReminderService } from '../services/deadlineReminderService';
import { matchNotificationService } from '../services/matchNotificationService';
import { supabase, supabaseEnabled } from '../lib/supabaseClient';

interface CreateMatchPlanProps {
  onNavigate: (page: 'dashboard' | 'profile' | 'community' | 'reflection' | 'finder' | 'create-match' | 'turf-detail' | 'chat' | 'availability' | 'group-chat', turfId?: string, matchId?: string, groupChatId?: string) => void;
  onMatchCreate: (match: {
    id: string;
    title: string;
    turfName: string;
    date: string;
    time: string;
    sport: string;
    status: 'upcoming' | 'completed' ;
    visibility: string;
    paymentOption: string;
    amount?: number;
    location?: string;
    lat?: number;
    lng?: number;
    minPlayers?: number;
    maxPlayers?: number;
    turfCost?: number;
  }) => void;
}

const turfs = [
  { id: '1', name: 'Sky Sports Arena', location: 'Satellite, Ahmedabad', sport: 'Football', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop', price: '₹1500/hr', rating: 4.8, lat: 23.0225, lng: 72.5714 },
  { id: '2', name: 'Victory Cricket Ground', location: 'Maninagar, Ahmedabad', sport: 'Cricket', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop', price: '₹2000/hr', rating: 4.7, lat: 23.0330, lng: 72.5797 },
  { id: '3', name: 'Hoops Basketball Court', location: 'Vastrapur, Ahmedabad', sport: 'Basketball', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop', price: '₹800/hr', rating: 4.6, lat: 23.0195, lng: 72.5386 },
  { id: '4', name: 'Elite Football Academy', location: 'SG Highway, Ahmedabad', sport: 'Football', image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400&h=300&fit=crop', price: '₹1800/hr', rating: 4.9, lat: 23.0145, lng: 72.5619 },
  { id: '5', name: 'Champions Cricket Turf', location: 'Naroda, Ahmedabad', sport: 'Cricket', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=300&fit=crop', price: '₹1700/hr', rating: 4.5, lat: 23.1815, lng: 72.6267 },
  { id: '6', name: 'Urban Basketball Arena', location: 'Bodakdev, Ahmedabad', sport: 'Basketball', image: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a26?w=400&h=300&fit=crop', price: '₹1000/hr', rating: 4.7, lat: 23.0288, lng: 72.4953 },
];

const timeSlots = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
];

const STEPS = ['Pick a Turf', 'Date & Time', 'Match Details', 'Invite & Launch'];

// ── Shared style tokens ──────────────────────────────────────
const S = {
  page: {
    minHeight: '100vh',
    background: '#f5f0e8',
    backgroundImage: `radial-gradient(circle at 20% 10%, rgba(180,140,100,0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 90%, rgba(100,150,120,0.07) 0%, transparent 50%)`,
    fontFamily: "'Georgia', serif",
    padding: '0 0 4rem',
  } as React.CSSProperties,

  topBar: {
    background: '#f5f0e8',
    borderBottom: '1px solid #e2d9cc',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    position: 'sticky' as const,
    top: 0,
    zIndex: 10,
  } as React.CSSProperties,

  card: {
    background: '#fdfaf5',
    border: '1px solid #e2d9cc',
    borderRadius: '16px',
    padding: '1.75rem',
  } as React.CSSProperties,

  cardAccent: (color: string) => ({
    background: '#fdfaf5',
    border: `1px solid ${color}40`,
    borderLeft: `3px solid ${color}`,
    borderRadius: '16px',
    padding: '1.5rem',
  } as React.CSSProperties),

  label: {
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: '#8b7355',
    fontFamily: "'Georgia', serif",
    marginBottom: '0.5rem',
    display: 'block',
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#2d2416',
    fontFamily: "'Georgia', serif",
    marginBottom: '0.25rem',
  } as React.CSSProperties,

  sectionSub: {
    fontSize: '0.875rem',
    color: '#7a6a52',
    marginBottom: '1.25rem',
  } as React.CSSProperties,

  input: {
    background: '#fff',
    border: '1px solid #d4c9b8',
    borderRadius: '10px',
    padding: '0.7rem 1rem',
    fontSize: '0.95rem',
    color: '#2d2416',
    width: '100%',
    fontFamily: "'Georgia', serif",
    outline: 'none',
  } as React.CSSProperties,

  primaryBtn: {
    background: 'linear-gradient(135deg, #5c7a4e, #3d5c30)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '0.8rem 1.5rem',
    fontWeight: 700,
    fontSize: '0.95rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: "'Georgia', serif",
    transition: 'opacity 0.2s',
    boxShadow: '0 4px 16px rgba(60,90,40,0.2)',
  } as React.CSSProperties,

  outlineBtn: {
    background: 'transparent',
    color: '#5c7a4e',
    border: '1.5px solid #a8c090',
    borderRadius: '10px',
    padding: '0.8rem 1.5rem',
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
    fontFamily: "'Georgia', serif",
  } as React.CSSProperties,
};

export function CreateMatchPlan({ onNavigate, onMatchCreate }: CreateMatchPlanProps) {
  const dates = generateUpcomingDates(7);
  const minDate = getMinBookingDate();

  const [step, setStep] = useState(1);
  const [selectedTurf, setSelectedTurf] = useState<typeof turfs[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('10');
  const [matchTitle, setMatchTitle] = useState('');
  const [matchDescription, setMatchDescription] = useState('');
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [created, setCreated] = useState(false);
  const [visibility, setVisibility] = useState<'community' | 'nearby' | 'private'>('community');
  const [minPlayers, setMinPlayers] = useState('6');
  const [paymentMethod, setPaymentMethod] = useState<'5-step' | 'direct'>('5-step');

  const vibes = ['Friendly', 'Competitive', 'Beginner Friendly', 'High Energy', 'Chill', 'Social', 'Learning', 'Inclusive'];

  const getTurfCost = () => {
    if (!selectedTurf) return 0;
    return parseInt(selectedTurf.price.replace('₹', '').replace('/hr', ''));
  };

  const toggleVibe = (vibe: string) =>
    setSelectedVibes(prev => prev.includes(vibe) ? prev.filter(v => v !== vibe) : [...prev, vibe]);

  const addEmail = () => {
    if (emailInput && !inviteEmails.includes(emailInput)) {
      setInviteEmails([...inviteEmails, emailInput]);
      setEmailInput('');
    }
  };

  const removeEmail = (email: string) =>
    setInviteEmails(inviteEmails.filter(e => e !== email));

  const handleCreate = async () => {
    setCreated(true);
    const matchId = 'match-' + Math.random().toString(36).substr(2, 9);
    const matchDateTime = new Date(`${selectedDate} ${selectedTime}`);
    const deadlineInfo = pricingService.calculatePaymentDeadline(matchDateTime);
    const user = await supabaseAuth.getCurrentUser();
    const organizerName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Anonymous';

    const match = {
      id: matchId,
      title: matchTitle,
      turfName: selectedTurf?.name || '',
      date: selectedDate,
      time: selectedTime,
      sport: selectedTurf?.sport || '',
      status: 'upcoming' as 'upcoming' | 'completed',
      visibility,
      paymentOption: paymentMethod === 'direct' ? 'Pay Directly' : 'split',
      amount: getTurfCost(),
      location: selectedTurf?.location || '',
      lat: selectedTurf?.lat || 23.0225,
      lng: selectedTurf?.lng || 72.5714,
      minPlayers: parseInt(minPlayers),
      maxPlayers: parseInt(maxPlayers),
      turfCost: getTurfCost(),
      paymentDeadline: deadlineInfo.deadline.toISOString(),
    };

    const notificationData = {
      matchId: match.id,
      title: match.title,
      organizer: organizerName,
      sport: match.sport,
      turfName: match.turfName,
      location: match.location,
      date: match.date,
      time: match.time,
      minPlayers: match.minPlayers,
      currentPlayers: 1,
      visibility: visibility as 'community' | 'nearby' | 'private',
    };

    await matchNotificationService.saveMatchToDiscoverable({
  title: match.title,
  sport: match.sport,
  turf_name: match.turfName,
  location: match.location,
  latitude: match.lat ?? 23.0225,
  longitude: match.lng ?? 72.5714,
  date: match.date,
  time: match.time,
  min_players: match.minPlayers ?? 6,
  max_players: match.maxPlayers ?? 10,
  visibility: visibility,
  organizer_id: user?.id || '',
  organizer_name: organizerName,
});

await matchNotificationService.notifyNewMatchCreated(notificationData);

    try {
      await onMatchCreate(match);
      toast.success('Match Created! 🎉', { description: 'Opening group chat and notifying community...' });
    } catch (err) {
      console.error('Error in onMatchCreate:', err);
      toast.info('Match Plan Created! 🎉', { description: 'Group chat will be created when available.' });
    }
  };

  const filteredTurfs = turfs.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Success screen ──────────────────────────────────────────
  if (created) {
    return (
      <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 420, padding: '2rem' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #5c7a4e, #3d5c30)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 8px 32px rgba(60,90,40,0.3)',
            animation: 'bounce 1s infinite',
          }}>
            <svg width="36" height="36" fill="none" stroke="#fff" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: '1.8rem', color: '#2d2416', marginBottom: '0.5rem' }}>
            Match Plan Created!
          </h2>
          <p style={{ color: '#7a6a52', marginBottom: '1.5rem' }}>Your community is being notified</p>
          <div style={{ ...S.card, textAlign: 'left' }}>
            {['Group chat created', 'Players can join for free', 'Payment opens after min players join'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0', borderBottom: '1px solid #f0ebe0', color: '#4a6640', fontSize: '0.9rem' }}>
                <span style={{ color: '#5c7a4e', fontWeight: 700 }}>✓</span> {item}
              </div>
            ))}
          </div>
          <p style={{ color: '#8b7355', fontSize: '0.85rem', marginTop: '1rem' }}>Opening group chat…</p>
        </div>
      </div>
    );
  }

  // ── Main layout ─────────────────────────────────────────────
  return (
    <div style={S.page}>

      {/* Top bar */}
      <div style={S.topBar}>
        <button onClick={() => onNavigate('dashboard')} style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#5c7a4e', fontWeight: 600, fontSize: '0.9rem',
          fontFamily: "'Georgia', serif",
        }}>
          <ArrowLeft size={16} /> Back
        </button>
        <div style={{ height: 20, width: 1, background: '#d4c9b8' }} />
        <span style={{ fontSize: '0.85rem', color: '#8b7355', fontFamily: "'Georgia', serif" }}>
          Create Match Plan
        </span>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '2rem 1.5rem 0' }}>

        {/* Page title */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#2d2416', margin: 0, lineHeight: 1.2 }}>
            Plan a Match
          </h1>
          <p style={{ color: '#7a6a52', marginTop: '0.4rem', fontSize: '0.95rem' }}>
            Gather your crew and get on the field.
          </p>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '2.5rem', background: '#ede7da', borderRadius: '12px', padding: '4px', overflow: 'hidden' }}>
          {STEPS.map((label, i) => {
            const s = i + 1;
            const active = step === s;
            const done = step > s;
            return (
              <div key={s} style={{
                flex: 1, textAlign: 'center', padding: '0.6rem 0.4rem',
                borderRadius: '9px',
                background: active ? '#fdfaf5' : 'transparent',
                boxShadow: active ? '0 1px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s',
              }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: active ? '#5c7a4e' : done ? '#8b7355' : '#b0a090', fontFamily: "'Georgia', serif" }}>
                  {done ? '✓ ' : `${s}. `}{label}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── STEP 1: Pick Turf ── */}
        {step === 1 && (
          <div>
            <div style={S.card}>
              <p style={S.sectionTitle}>Choose Your Turf</p>
              <p style={S.sectionSub}>Where would you like to play?</p>

              {/* Search */}
              <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#8b7355' }} />
                <input
                  style={{ ...S.input, paddingLeft: '2.4rem' }}
                  placeholder="Search sport, turf, or location…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Turf grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {filteredTurfs.map(turf => (
                  <button key={turf.id} onClick={() => setSelectedTurf(turf)} style={{
                    background: selectedTurf?.id === turf.id ? '#f0ebe0' : '#fff',
                    border: selectedTurf?.id === turf.id ? '2px solid #5c7a4e' : '1.5px solid #e2d9cc',
                    borderRadius: '12px',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                  }}>
                    <ImageWithFallback src={turf.image} alt={turf.name} className="w-full" style={{ height: 120, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '0.85rem' }}>
                      <div style={{ fontWeight: 700, color: '#2d2416', fontSize: '0.95rem', marginBottom: '0.25rem', fontFamily: "'Georgia', serif" }}>{turf.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#8b7355', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                        <MapPin size={12} />{turf.location}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ background: '#e8f0e0', color: '#4a6640', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '100px' }}>{turf.sport}</span>
                        <span style={{ color: '#5c7a4e', fontWeight: 700, fontSize: '0.9rem' }}>{turf.price}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ ...S.primaryBtn, opacity: selectedTurf ? 1 : 0.4 }} onClick={() => setStep(2)} disabled={!selectedTurf}>
                Continue <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Date & Time ── */}
        {step === 2 && selectedTurf && (
          <div>
            <div style={S.card}>
              <p style={S.sectionTitle}>Pick a Date & Time</p>
              <p style={S.sectionSub}>When would you like to play at {selectedTurf.name}?</p>

              <span style={S.label}>Date</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.6rem', marginBottom: '1rem' }}>
                {dates.map(date => (
                  <button key={date.date} onClick={() => setSelectedDate(date.date)} style={{
                    padding: '0.75rem 0.5rem',
                    borderRadius: '10px',
                    border: selectedDate === date.date ? '2px solid #5c7a4e' : '1.5px solid #e2d9cc',
                    background: selectedDate === date.date ? '#edf4e8' : '#fff',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    color: selectedDate === date.date ? '#3d5c30' : '#5a4e3a',
                    fontWeight: selectedDate === date.date ? 700 : 400,
                    textAlign: 'center',
                    fontFamily: "'Georgia', serif",
                  }}>
                    {date.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1, height: 1, background: '#e2d9cc' }} />
                <span style={{ fontSize: '0.75rem', color: '#8b7355' }}>or pick custom date</span>
                <div style={{ flex: 1, height: 1, background: '#e2d9cc' }} />
              </div>
              <input type="date" value={selectedDate} min={minDate} onChange={e => setSelectedDate(e.target.value)} style={{ ...S.input, marginBottom: '1.5rem' }} />

              <span style={S.label}>Time Slot</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '0.5rem' }}>
                {timeSlots.map(time => (
                  <button key={time} onClick={() => setSelectedTime(time)} style={{
                    padding: '0.6rem',
                    borderRadius: '8px',
                    border: selectedTime === time ? '2px solid #5c7a4e' : '1.5px solid #e2d9cc',
                    background: selectedTime === time ? '#edf4e8' : '#fff',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    color: selectedTime === time ? '#3d5c30' : '#5a4e3a',
                    fontWeight: selectedTime === time ? 700 : 400,
                    fontFamily: "'Georgia', serif",
                  }}>{time}</button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button style={S.outlineBtn} onClick={() => setStep(1)}>Back</button>
              <button style={{ ...S.primaryBtn, opacity: selectedDate && selectedTime ? 1 : 0.4 }} onClick={() => setStep(3)} disabled={!selectedDate || !selectedTime}>
                Continue <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Match Details ── */}
        {step === 3 && selectedTurf && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Title & description */}
            <div style={S.card}>
              <p style={S.sectionTitle}>Match Details</p>
              <p style={S.sectionSub}>Give your match a name and set the vibe</p>

              <span style={S.label}>Match Title *</span>
              <input style={{ ...S.input, marginBottom: '1rem' }} placeholder="e.g. Friday Football Fun, Weekend Warriors…" value={matchTitle} onChange={e => setMatchTitle(e.target.value)} />

              <span style={S.label}>Description (optional)</span>
              <textarea style={{ ...S.input, minHeight: 90, resize: 'vertical' }} placeholder="Skill level, what to expect, anything else…" value={matchDescription} onChange={e => setMatchDescription(e.target.value)} />
            </div>

            {/* Players */}
            <div style={S.card}>
              <p style={S.sectionTitle}>Player Count</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[{ label: 'Minimum Players', val: minPlayers, set: setMinPlayers, hint: 'Triggers payment lock' }, { label: 'Maximum Players', val: maxPlayers, set: setMaxPlayers, hint: 'Max capacity' }].map(({ label, val, set, hint }) => (
                  <div key={label}>
                    <span style={S.label}>{label}</span>
                    <input type="number" style={S.input} value={val} min={2} max={22} onChange={e => set(e.target.value)} />
                    <p style={{ fontSize: '0.75rem', color: '#8b7355', marginTop: '0.3rem' }}>{hint}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vibes */}
            <div style={S.card}>
              <p style={S.sectionTitle}>Set the Vibe</p>
              <p style={S.sectionSub}>Help players know what to expect</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {vibes.map(vibe => (
                  <button key={vibe} onClick={() => toggleVibe(vibe)} style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '100px',
                    border: selectedVibes.includes(vibe) ? '1.5px solid #5c7a4e' : '1.5px solid #d4c9b8',
                    background: selectedVibes.includes(vibe) ? '#edf4e8' : '#fff',
                    color: selectedVibes.includes(vibe) ? '#3d5c30' : '#7a6a52',
                    fontWeight: selectedVibes.includes(vibe) ? 700 : 400,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    fontFamily: "'Georgia', serif",
                    transition: 'all 0.15s',
                  }}>{vibe}</button>
                ))}
              </div>
            </div>

            {/* Cost breakdown */}
            <div style={S.cardAccent('#5c7a4e')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <DollarSign size={16} style={{ color: '#5c7a4e' }} />
                <p style={{ ...S.sectionTitle, margin: 0 }}>Transparent Pricing</p>
              </div>
              <div style={{ background: '#f0f5ec', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#3d5c30' }}>
                Cost per person = ₹{getTurfCost()} ÷ [players joining]
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                {[
                  { label: `${minPlayers} players`, cost: Math.round(getTurfCost() / parseInt(minPlayers)) },
                  { label: `${Math.round((parseInt(minPlayers) + parseInt(maxPlayers)) / 2)} players`, cost: Math.round(getTurfCost() / Math.round((parseInt(minPlayers) + parseInt(maxPlayers)) / 2)) },
                  { label: `${maxPlayers} players 🎉`, cost: Math.round(getTurfCost() / parseInt(maxPlayers)), best: true },
                ].map(({ label, cost, best }) => (
                  <div key={label} style={{
                    background: best ? '#edf4e8' : '#fff',
                    border: best ? '1px solid #a8c090' : '1px solid #e2d9cc',
                    borderRadius: '10px', padding: '0.75rem', textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '0.68rem', color: '#8b7355', marginBottom: '0.3rem' }}>{label}</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#3d5c30', fontFamily: 'monospace' }}>₹{cost}</div>
                    {best && <div style={{ fontSize: '0.65rem', color: '#5c7a4e', marginTop: '0.2rem' }}>Best value</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* How payment works */}
            <div style={S.cardAccent('#8b7355')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Clock size={15} style={{ color: '#8b7355' }} />
                <p style={{ ...S.sectionTitle, margin: 0 }}>How Payment Works</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { n: 1, title: 'Free Joining', desc: 'Players join the group chat at no cost' },
                  { n: 2, title: 'Soft Lock', desc: 'When minimum players join, group closes & payment opens' },
                  { n: 3, title: 'Payment Window', desc: 'Players have 30–90 mins to pay their share' },
                  { n: 4, title: 'Hard Lock', desc: 'Unpaid players removed, final team confirmed' },
                ].map(({ n, title, desc }) => (
                  <div key={n} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#5c7a4e', color: '#fff', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{n}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: '#2d2416', fontSize: '0.875rem', fontFamily: "'Georgia', serif" }}>{title}</div>
                      <div style={{ color: '#7a6a52', fontSize: '0.8rem' }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button style={S.outlineBtn} onClick={() => setStep(2)}>Back</button>
              <button style={{ ...S.primaryBtn, opacity: matchTitle ? 1 : 0.4 }} onClick={() => setStep(4)} disabled={!matchTitle}>
                Continue <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Invite & Launch ── */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Deadline reminders */}
            <div style={S.cardAccent('#8b9dc0')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Clock size={15} style={{ color: '#6b7fa0' }} />
                <p style={{ ...S.sectionTitle, margin: 0 }}>Deadline & Reminders</p>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#5a6a85', marginBottom: '0.75rem' }}>
                Payment deadline is 5 minutes before match time. Auto-reminders go out at:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['📅 7 days before', '📅 3 days before', '🔔 1 day before', '⏰ Hourly on match day'].map(r => (
                  <span key={r} style={{ background: '#eef1f8', border: '1px solid #c8d0e0', borderRadius: '100px', padding: '0.3rem 0.8rem', fontSize: '0.78rem', color: '#5a6a85' }}>{r}</span>
                ))}
              </div>
            </div>

            {/* Payment method */}
            <div style={S.card}>
              <p style={S.sectionTitle}>Payment Method</p>
              <p style={S.sectionSub}>How should players handle the turf cost?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { id: '5-step', icon: <Clock size={18} style={{ color: '#5c7a4e' }} />, title: '5-Step Payment Process', badge: 'Recommended', desc: 'Free to join → soft lock → payment window → confirm', color: '#5c7a4e' },
                  { id: 'direct', icon: <CreditCard size={18} style={{ color: '#8b7355' }} />, title: 'Direct Payment Booking', badge: null, desc: 'Pay upfront to confirm instantly, others split later', color: '#8b7355' },
                ].map(({ id, icon, title, badge, desc, color }) => (
                  <button key={id} onClick={() => setPaymentMethod(id as any)} style={{
                    background: paymentMethod === id ? '#f5f8f0' : '#fff',
                    border: paymentMethod === id ? `2px solid ${color}` : '1.5px solid #e2d9cc',
                    borderRadius: '12px',
                    padding: '1rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}>
                    <div style={{ width: 38, height: 38, borderRadius: '10px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#2d2416', fontSize: '0.9rem', fontFamily: "'Georgia', serif", display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {title}
                        {badge && <span style={{ background: color, color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '100px' }}>{badge}</span>}
                      </div>
                      <div style={{ color: '#7a6a52', fontSize: '0.8rem', marginTop: '0.2rem' }}>{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility */}
            <div style={S.card}>
              <p style={S.sectionTitle}>Match Visibility</p>
              <p style={S.sectionSub}>Who can discover and join your match?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { id: 'community', emoji: '🌍', title: 'Community Wide', desc: 'All members can discover and request to join', color: '#5c7a4e' },
                  { id: 'nearby', emoji: '📍', title: 'Nearby Only (5km)', desc: `Only members near ${selectedTurf?.location} can see this`, color: '#8b7355' },
                  { id: 'private', emoji: '🔒', title: 'Private (Invite Only)', desc: 'Only invited players can join', color: '#6b5a8a' },
                ].map(({ id, emoji, title, desc, color }) => (
                  <button key={id} onClick={() => setVisibility(id as any)} style={{
                    background: visibility === id ? '#fafaf5' : '#fff',
                    border: visibility === id ? `2px solid ${color}` : '1.5px solid #e2d9cc',
                    borderRadius: '12px',
                    padding: '0.9rem 1rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}>
                    <span style={{ fontSize: '1.4rem' }}>{emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: '#2d2416', fontSize: '0.9rem', fontFamily: "'Georgia', serif" }}>{title}</div>
                      <div style={{ color: '#7a6a52', fontSize: '0.8rem' }}>{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Email invites */}
            <div style={S.card}>
              <p style={S.sectionTitle}>Invite by Email <span style={{ fontWeight: 400, color: '#8b7355', fontSize: '0.85rem' }}>(optional)</span></p>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input type="email" style={{ ...S.input }} placeholder="Enter email…" value={emailInput} onChange={e => setEmailInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && addEmail()} />
                <button onClick={addEmail} style={{ ...S.primaryBtn, flexShrink: 0 }}><Plus size={16} /></button>
              </div>
              {inviteEmails.map(email => (
                <div key={email} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: '#f5f0e8', borderRadius: '8px', marginBottom: '0.4rem', fontSize: '0.875rem', color: '#5a4e3a' }}>
                  {email}
                  <button onClick={() => removeEmail(email)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8b7355' }}><X size={14} /></button>
                </div>
              ))}
            </div>

            {/* Match summary */}
            <div style={{ ...S.cardAccent('#5c7a4e'), background: '#f5f8f0' }}>
              <p style={{ ...S.sectionTitle, marginBottom: '0.75rem' }}>Match Summary</p>
              {[
                ['Turf', selectedTurf?.name],
                ['Date', dates.find(d => d.date === selectedDate)?.label || selectedDate],
                ['Time', selectedTime],
                ['Players', `${minPlayers}–${maxPlayers}`],
                ['Total cost', `₹${getTurfCost()}`],
                ['Visibility', visibility],
                ['Payment', paymentMethod === '5-step' ? '5-Step Process' : 'Direct Booking'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #e2d9cc', fontSize: '0.875rem' }}>
                  <span style={{ color: '#8b7355' }}>{k}</span>
                  <span style={{ color: '#2d2416', fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button style={S.outlineBtn} onClick={() => setStep(3)}>Back</button>
              <button
                style={{ ...S.primaryBtn, opacity: visibility === 'private' && inviteEmails.length === 0 ? 0.4 : 1, background: 'linear-gradient(135deg, #5c7a4e, #3d5c30)' }}
                onClick={handleCreate}
                disabled={visibility === 'private' && inviteEmails.length === 0}
              >
                <Send size={15} /> Create Match Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateMatchPlan;