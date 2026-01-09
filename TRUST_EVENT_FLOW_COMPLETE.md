# Trust & Reputation + Event Flow - Complete Implementation 🎯

## What Was Built

### 1. **Advanced Trust System** ✅

#### Migrations
- **014_advanced_trust.sql**: Decay tracking, dimension weights, daily gain caps, reciprocal feedback detection, cooldowns, appeals workflow

#### Service: [src/services/advancedTrustService.ts](src/services/advancedTrustService.ts)

**Transparency & Event Logs:**
- `getTrustScoreWithDimensions()` - Show per-dimension scores (reliability/behavior/community) with weights
- `getEventLog()` - Full audit trail of score changes with context
- `getScoreDiffs()` - Aggregated changes by dimension over timeframe (week/month/all)

**Anti-Gaming Protection:**
- `checkDailyGainCap()` - Max 15 points/day (configurable)
- `detectReciprocalBoosting()` - Flag mutual feedback patterns (threshold: 5 feedbacks)
- `checkFeedbackCooldown()` - Max 3 feedbacks/day per user
- `recordFeedbackWithChecks()` - Integrated validation before accepting feedback

**Decay & Inactivity:**
- `applyDecay()` - Automatic score decay (0.5% per month of inactivity)
- Configurable decay percentage per user

**Reputation Gates:**
- `canPerformAction()` - Gate specific actions (create_event, host_match, organize_activity, premium_room) by:
  - Minimum trust score
  - Minimum level
  - Minimum matches attended
- Gating rules configurable per action type

**Dynamic Escrow:**
- `calculateEscrowDeposit()` - Deposit % based on trust score (5-20%)
  - High trust (85+): 5%
  - Good trust (75-85): 10%
  - Fair trust (60-75): 15%
  - Low trust (<60): 20%

**Appeals System:**
- `fileAppeal()` - Users can dispute low scores with evidence
- `getPendingAppeals()` - Admin queue to review
- `reviewAppeal()` - Accept or deny with notes

---

### 2. **Event Flow Service** ✅

#### Migrations
- **015_event_flow.sql**: Availability tracking, event roles/tasks, waitlist with auto-fill, post-event feedback forms, highlight reels, escrow

#### Service: [src/services/eventFlowService.ts](src/services/eventFlowService.ts)

**Availability & Time Selection:**
- `submitAvailability()` - Users provide available time slots with preference scores (1-5)
- `getAvailabilityGraph()` - Heatmap showing most popular times
- `suggestOptimalTimeSlots()` - AI-suggested slots based on collective availability

**Roles & Task Management:**
- `assignRole()` - Set user role (organizer/host/scorer/participant)
- `createTask()` - Create task with type (setup/scoring/cleanup/media/logistics)
- `getRoleWithTasks()` - Full role view with checklist and % completion
- `updateTaskStatus()` - Track task progress through workflow

**Waitlist & Auto-Fill:**
- `addToWaitlist()` - Queue users with trust score snapshot
- `autoFillWaitlist()` - Auto-promote highest-trust user from waitlist
- `getWaitlistPosition()` - Users know their position

**Post-Event Feedback:**
- `submitFeedbackForm()` - Structured form with 4 dimensions:
  - Skill rating (1-5)
  - Teamwork rating (1-5)
  - Sportsmanship rating (1-5)
  - Communication rating (1-5)
- Auto-identifies improvement areas
- Calculates performance score (avg of 4 ratings)
- Feeds back to trust score calculation

**Highlight Reels:**
- `createHighlightReel()` - Curate memories/media from event
- `publishHighlightReel()` - Make public with featured users (MVPs)
- `getHighlightReels()` - Show all published reels
- `trackReelView()` - Analytics on engagement

**Escrow Management:**
- `holdEscrow()` - Deposit held until event completion
- `releaseEscrow()` - Refund after successful event
- `forfeitEscrow()` - Penalty for no-show/cancellation

---

### 3. **UI Components**

#### [src/components/TrustTransparencyPanel.tsx](src/components/TrustTransparencyPanel.tsx)

**Features:**
- **Dimension Breakdown**: Visual display of reliability/behavior/community scores with % weights
- **Weighted Calculation**: Show how each dimension contributes to overall score
- **Daily Gain Cap**: Visual indicator of feedback points left today
- **Score Changes**: Week/month toggle showing net gains/losses by dimension
- **Event Log**: Chronological timeline of all score events with context
- **Live Updates**: Real-time load of all data

**UI Elements:**
- Gradient cards for each dimension with progress bars
- Color-coded activity log (green = gain, red = loss)
- Timeframe selector (week/month)
- Score delta visualization

#### [src/components/EventFlowPanel.tsx](src/components/EventFlowPanel.tsx)

**Tabbed Interface:**
1. **Availability Tab**
   - Shows suggested time slots with confidence % (based on participant votes)
   - Checkbox selection with visual progress
   - Submit button to record availability

2. **Roles Tab**
   - Shows assigned role
   - Task checklist with status (pending/in_progress/completed/blocked)
   - Overall completion % with progress bar
   - Color-coded task icons (✓ = green, ⚠️ = red, ⏱️ = blue, ⚡ = yellow)

3. **Feedback Tab**
   - 4 rating sliders (1-5 stars)
   - Text areas for "What Went Well" and "Areas to Improve"
   - Shows average ratings from other users (if feedback exists)
   - Submit feedback button

4. **Highlights Tab**
   - Gallery of published highlight reels
   - Shows media count, featured players, view count
   - Links to MVPs

---

## Database Schema

### Trust Tables
- `trust_score_decay` - Track decay over time per user
- `trust_score_weights` - Per-dimension weights (reliability/behavior/community)
- `trust_daily_gains` - Daily gain tracking & cap enforcement
- `feedback_pairs` - Mutual feedback detection (reciprocal boosting flag)
- `feedback_cooldowns` - Per-day feedback cooldown tracking
- `trust_appeals` - Score dispute resolution workflow

### Event Tables
- `event_availability` - Time slot availability + preference scores
- `event_roles` - Role assignment (organizer/host/scorer/participant)
- `event_tasks` - Checklist items with status tracking
- `event_waitlist` - Queue with trust score snapshots & auto-fill
- `event_feedback_forms` - Structured post-event feedback (4 dimensions)
- `event_highlight_reels` - Curated media with MVP tagging
- `reputation_gates` - Gating rules per action type
- `event_escrow` - Deposit holding & release

---

## How to Use

### 1. Apply Migrations
```powershell
supabase db push
```

### 2. Trust Transparency
```tsx
import { TrustTransparencyPanel } from './components/TrustTransparencyPanel';

<TrustTransparencyPanel userId={userId} />
```

**Use Cases:**
- Users click their profile → see detailed score breakdown
- Appeal workflow: filed via `fileAppeal()` → reviewed by admins
- Inactivity penalties automatically applied
- Feedback limits prevent gaming

### 3. Event Flow
```tsx
import { EventFlowPanel } from './components/EventFlowPanel';

<EventFlowPanel eventId={eventId} userId={userId} />
```

**Workflow:**
1. **Before Event**: Submit availability → see suggested slots
2. **Day Of**: Check role & task checklist
3. **After Event**: Submit structured feedback → feeds to trust scores
4. **Highlights**: Organizer curates reel, publishes with MVPs

### 4. Reputation Gates
```typescript
// Check if user can host event
const { allowed, reason } = await advancedTrustService.canPerformAction(
  userId,
  'host_match'
);

if (!allowed) {
  toast.error(reason); // "Minimum trust score 75 required"
}
```

### 5. Anti-Gaming
```typescript
// Record feedback with checks
const result = await advancedTrustService.recordFeedbackWithChecks({
  to_user_id: 'recipient',
  from_user_id: currentUser,
  rating: 5,
  comment: 'Great player!'
});

// Returns:
// { success: true, message: "Feedback recorded (12 feedback points left today)" }
// OR
// { success: false, message: "Daily feedback limit reached" }
```

---

## API Methods

### Advanced Trust
```typescript
// Transparency
getTrustScoreWithDimensions(userId)
getEventLog(userId, limit)
getScoreDiffs(userId, timeframe)

// Anti-Gaming
checkDailyGainCap(userId)
detectReciprocalBoosting(userA, userB)
checkFeedbackCooldown(userId)
recordFeedbackWithChecks(feedback)

// Decay
applyDecay(userId)

// Gates & Escrow
canPerformAction(userId, actionType)
calculateEscrowDeposit(userId, eventCost)

// Appeals
fileAppeal(userId, reason, description, evidence)
getPendingAppeals(limit)
reviewAppeal(appealId, decision, notes)
```

### Event Flow
```typescript
// Availability
submitAvailability(eventId, userId, slots)
getAvailabilityGraph(eventId)
suggestOptimalTimeSlots(eventId, top)

// Roles & Tasks
assignRole(eventId, userId, role)
createTask(task)
getRoleWithTasks(eventId, userId)
updateTaskStatus(taskId, status)

// Waitlist
addToWaitlist(eventId, userId)
autoFillWaitlist(eventId)
getWaitlistPosition(eventId, userId)

// Feedback
submitFeedbackForm(feedback)
getUserEventFeedback(eventId, userId)

// Highlights
createHighlightReel(reel)
publishHighlightReel(reelId)
getHighlightReels(eventId)
trackReelView(reelId)

// Escrow
holdEscrow(eventId, userId, amount)
releaseEscrow(eventId, userId)
forfeitEscrow(eventId, userId, reason)
```

---

## Anti-Gaming Safeguards

| Mechanism | Details |
|-----------|---------|
| **Daily Gain Cap** | Max 15 pts/day per user |
| **Reciprocal Detection** | Flag after 5 mutual feedbacks |
| **Feedback Cooldown** | Max 3 feedbacks/day |
| **Score Decay** | 0.5% per month inactive |
| **Appeals Workflow** | Users can dispute unfair scores |
| **Action Gates** | Trust score required for sensitive actions |
| **Dynamic Escrow** | Higher risk = higher deposit % |

---

## Trust Calculation Example

```
Reliability Score: 85 (weight 40%) = 34 points
Behavior Score: 78 (weight 35%) = 27.3 points
Community Score: 82 (weight 25%) = 20.5 points
─────────────────────────────────────
Overall Score = 81.8 ≈ 82
```

Weights are user-configurable and can be adjusted by admins.

---

## Event Feedback Impact

```
Feedback Ratings Average: (5 + 4 + 5 + 4) / 4 = 4.5
→ Performance Score: 4.5
→ Trust Score Change: +3 behavior points
→ Added to event_feedback_forms table
→ Used in highlight reels (if high performer)
```

---

## Next Steps (Optional)

1. **Auto-decay scheduler**: Cron job to apply decay daily
2. **Appeal notifications**: Email moderators on appeal filed
3. **Suggestion ML**: Smarter availability graph using ML
4. **Ban system**: Reputation gates that prevent participation
5. **Leaderboard**: Show top performers by event type
6. **Badges**: Visual rewards for maintaining scores

---

**Status**: All features implemented and ready for integration! 🚀
