# Avento Backend Services

Complete local backend system with mock data and full business logic implementation.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    API Service Layer                     │
│              (apiService.ts - Main Interface)            │
└────────────────────┬───────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
┌───────▼──────┐ ┌──▼──────┐ ┌──▼──────────┐
│  Match       │ │ Payment │ │ Trust Score │
│  Service     │ │ Flow    │ │ Service     │
└──────────────┘ └─────────┘ └─────────────┘
        │            │            │
        │            │            │
┌───────▼────────────▼────────────▼──────────┐
│    Friendship      │   Mock Data           │
│    Streak Service  │   Service             │
└────────────────────┴───────────────────────┘
                     │
        ┌────────────▼────────────┐
        │  Local Storage Service   │
        │  (Browser localStorage)  │
        └─────────────────────────┘
```

## 📦 Services

### 1. **apiService.ts** - Main API Interface
Central hub for all API operations with simulated network delays.

**Key Methods:**
- `initialize()` - Initialize backend system
- `login()`, `signup()`, `logout()` - Authentication
- `getMatches()`, `createMatch()`, `joinMatch()` - Match operations
- `processPayment()`, `getPaymentSummary()` - Payment operations
- `getTrustScore()`, `recordTrustAction()` - Trust score operations
- `getUserStreaks()`, `getStreakSummary()` - Friendship streak operations

**Usage:**
```typescript
import { apiService } from './services/apiService';

// Initialize on app start
await apiService.initialize();

// Get matches
const matches = await apiService.getMatches();

// Create match
const match = await apiService.createMatch(matchData, userId);

// Process payment
const result = await apiService.processPayment(matchId, userId, amount);
```

### 2. **matchService.ts** - Match Management
Handles complete match lifecycle from creation to completion.

**Features:**
- Match creation with visibility options (community, nearby, private)
- Player joining/leaving
- Match status transitions
- Badge generation (High Trust Zone, Newbie-Friendly, etc.)
- Payment state integration

**Match Statuses:**
1. `open` - Accepting players
2. `soft_locked` - Min players reached, payment window open
3. `payment_pending` - Waiting for payments
4. `confirmed` - All paid, match confirmed
5. `in_progress` - Match happening now
6. `completed` - Match finished
7. `cancelled` - Match cancelled

### 3. **paymentFlowService.ts** - 5-Stage Payment System

**The 5 Stages:**

#### Stage 1: Free Joining 🟢
- Anyone can join without payment
- No commitment required
- Build excitement and community

#### Stage 2: Soft Lock 🟡
- Triggered when minimum players reached
- Opens payment window
- No one removed yet
- Creates urgency

#### Stage 3: Dynamic Payment Window ⏰
- **< 2 hours until match**: 30 min window
- **2-6 hours until match**: 60 min window
- **> 6 hours until match**: 90 min window
- Cost divided equally among current players

#### Stage 4: Hard Lock 🔴
- Payment window expires
- Unpaid players removed
- Cost recalculated for paid players
- Match cancelled if below minimum

#### Stage 5: Final Confirmation ✅
- All players confirmed and paid
- Exact share amounts calculated
- Any adjustments processed
- Match locked and ready

**Usage:**
```typescript
// Join match (Stage 1)
paymentFlowService.joinMatch(matchId, userId);

// Trigger soft lock (Stage 2)
paymentFlowService.triggerSoftLock(matchId, matchState);

// Process payment (Stage 3)
paymentFlowService.processPayment(matchId, userId, amount);

// Trigger hard lock (Stage 4)
paymentFlowService.triggerHardLock(matchId);

// Confirm final team (Stage 5)
paymentFlowService.confirmFinalTeam(matchId);
```

### 4. **trustScoreService.ts** - Reputation System

**Trust Score Components:**
- **Overall Score** (0-100): Weighted average of all aspects
- **Reliability** (40%): Match completion, punctuality
- **Respect** (30%): Reviews, player interactions
- **Positivity** (30%): Helping others, community spirit

**Trust Badges:**
- 🌱 Newbie-Friendly (< 70)
- 📈 Building Trust (50-70)
- ✓ Trusted Member (70-80)
- ⭐ High Trust Zone (80-90)
- 👑 Legendary Trust (90+)

**Actions & Impact:**
- Match Completed: +5
- Positive Review: +8
- Helped Player: +10
- Late Arrival: -3
- Match Cancelled: -10
- No Show: -20

**Usage:**
```typescript
// Get trust score
const score = trustScoreService.getTrustScore(userId);

// Record action
trustScoreService.recordAction({
  type: 'match_completed',
  userId,
  matchId,
  timestamp: new Date(),
  impact: 5
});

// Get badge
const badge = trustScoreService.getTrustBadge(score.overall);
```

### 5. **friendshipStreakService.ts** - Friendship Tracking

**Features:**
- Track consecutive matches played together
- Milestone celebrations
- Streak expiry (30 days)
- Longest streak records

**Milestones:**
- 🤝 3 matches: Regular Squad
- ⚡ 5 matches: Dynamic Duo
- 🔥 10 matches: On Fire!
- 💪 15 matches: Unstoppable
- 🏆 25 matches: Champions
- 👑 50 matches: Legendary Bond

**Usage:**
```typescript
// Record match together
friendshipStreakService.recordMatchTogether(user1Id, user2Id);

// Get streak status
const status = friendshipStreakService.getStreakStatus(user1Id, user2Id);

// Get user's streaks
const streaks = friendshipStreakService.getUserStreaks(userId);

// Get streak summary
const summary = friendshipStreakService.getStreakSummary(userId);
```

### 6. **mockDataService.ts** - Test Data Generator

Generates realistic mock data for development and testing:
- 10 mock users with varied trust scores
- 5 mock turfs across Mumbai
- Multiple matches (Football, Cricket, Basketball, Badminton)
- Cultural events
- Parties and celebrations
- Friendship streaks
- Trust score history

**Usage:**
```typescript
// Initialize mock data
mockDataService.initializeMockData();

// Reset all data
mockDataService.resetData();

// Clear all data
mockDataService.clearAllData();

// Get mock data
const users = mockDataService.getAllMockUsers();
const turfs = mockDataService.getAllMockTurfs();
```

### 7. **localStorageService.ts** - Data Persistence

Manages all data storage using browser localStorage.

**Storage Keys:**
- `avento_user_profile` - Current user profile
- `avento_sports_matches` - All matches
- `avento_events` - Cultural events
- `avento_parties` - Parties
- `avento_trust_scores` - User trust scores
- `avento_friendship_streaks` - Friendship data
- `avento_payments` - Payment transactions
- `avento_chat_messages` - Chat history
- `avento_notifications` - User notifications

## 🚀 Quick Start

```typescript
import { apiService } from './services/apiService';

// 1. Initialize backend on app start
async function initApp() {
  await apiService.initialize();
  console.log('Backend ready!');
}

// 2. Login user
const { user } = await apiService.login(email, password);

// 3. Get matches
const matches = await apiService.getMatches();

// 4. Create a match
const match = await apiService.createMatch({
  title: 'Friday Football',
  sport: 'Football',
  date: new Date(),
  startTime: '19:00',
  endTime: '20:30',
  minPlayers: 10,
  maxPlayers: 14,
  visibility: 'community'
}, userId);

// 5. Join match
await apiService.joinMatch(match.id, userId, userName);

// 6. Process payment
await apiService.processPayment(match.id, userId, 150);

// 7. Get trust score
const trustScore = await apiService.getTrustScore(userId);

// 8. Get friendship streaks
const streaks = await apiService.getUserStreaks(userId);
```

## 🎯 Payment Flow Example

```typescript
// Complete payment flow example
async function handleMatchPaymentFlow(matchId: string) {
  // Stage 1: Users join freely
  await apiService.joinMatch(matchId, user1, 'User 1');
  await apiService.joinMatch(matchId, user2, 'User 2');
  
  // Stage 2: Minimum reached - soft lock triggers automatically
  // Payment window opens
  
  // Stage 3: Users pay during window
  await apiService.processPayment(matchId, user1, 150, 'upi');
  await apiService.processPayment(matchId, user2, 150, 'card');
  
  // Stage 4: Payment window expires - hard lock removes unpaid users
  await apiService.triggerHardLock(matchId);
  
  // Stage 5: Final confirmation
  await apiService.confirmFinalTeam(matchId);
  
  console.log('Match confirmed and ready!');
}
```

## 📊 Data Flow

```
User Action → API Service → Business Logic Service → Local Storage
                    ↓
            Update UI State
```

## 🔧 Development Tips

1. **Always initialize** the backend on app start:
   ```typescript
   useEffect(() => {
     apiService.initialize();
   }, []);
   ```

2. **Use async/await** for all API calls:
   ```typescript
   const matches = await apiService.getMatches();
   ```

3. **Handle errors** gracefully:
   ```typescript
   try {
     await apiService.joinMatch(matchId, userId, userName);
   } catch (error) {
     toast.error(error.message);
   }
   ```

4. **Reset data** during development:
   ```typescript
   // Clear and reinitialize
   await apiService.resetAllData();
   ```

## 🎨 Features Implemented

✅ Complete match lifecycle management
✅ 5-stage payment flow with dynamic windows
✅ Trust score system with badges
✅ Friendship streak tracking with milestones
✅ Mock data generation
✅ Local data persistence
✅ Simulated network delays
✅ Event and party management
✅ Chat messaging
✅ Notification system

## 🔮 Future Enhancements

- Real-time updates using WebSockets
- Push notifications
- File uploads (photos, documents)
- Advanced search with filters
- Analytics and insights
- Export data functionality
- Backup and restore

## 📝 Notes

- All data stored in browser localStorage
- Data persists across sessions
- No real backend required
- Perfect for development and demos
- Ready for backend integration when needed

---

**Built with ❤️ for Avento - Where Every Moment Becomes a Memory**
