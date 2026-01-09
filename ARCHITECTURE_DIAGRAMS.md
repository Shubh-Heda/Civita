# 🎯 System Architecture & Data Flow Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    TRANSPARENT PRICING SYSTEM                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐         ┌──────────────────┐
│   UI LAYER      │         │  SERVICE LAYER   │
├─────────────────┤         ├──────────────────┤
│                 │         │                  │
│ CreateMatchPlan ├────────►│ pricingService   │
│      ↓          │         │ (calculate)      │
│                 │         │                  │
│ MatchJoinSummary├────────►│ deadlineReminder │
│      ↓          │         │ Service          │
│                 │         │ (schedule)       │
│ Payment         ├────────►│ notificationSvc  │
│ CommitmentModal │         │ (notify)         │
│      ↓          │         │                  │
│ PricingDeadline ├────────►│ paymentFlow      │
│    Display      │         │ Service          │
│                 │         │ (process)        │
└─────────────────┘         └──────────────────┘
                                    ↓
                            ┌──────────────────┐
                            │   DATA LAYER     │
                            ├──────────────────┤
                            │                  │
                            │ localStorage     │
                            │ matchService     │
                            │ database         │
                            │                  │
                            └──────────────────┘
```

---

## User Flow Diagram

```
MATCH CREATION FLOW
═══════════════════════════════════════════════════════════════════

START: User clicks "Create Match"
  │
  ├─► STEP 1: Select Turf
  │
  ├─► STEP 2: Pick Date & Time
  │     │
  │     └─► pricingService.calculatePaymentDeadline()
  │          └─► Returns: deadline, reminder schedule
  │
  ├─► STEP 3: Match Details & Vibes
  │     │
  │     └─► 🎨 SHOW TRANSPARENT PRICING
  │          ├─ Cost Formula
  │          ├─ Cost Examples (min/current/max)
  │          └─ Color-coded deadline urgency
  │
  ├─► STEP 4: Invite Players & Visibility
  │     │
  │     └─► Select payment method (5-step)
  │
  └─► CONFIRM & CREATE
       │
       ├─► deadlineReminderService.createReminder()
       │    └─► Schedules: 7d, 3d, 1d, hourly reminders
       │
       └─► ✅ SUCCESS: Match created + Reminders scheduled


MATCH JOINING FLOW
═══════════════════════════════════════════════════════════════════

START: User clicks "Join Match"
  │
  ├─► 🎨 SHOW MatchJoinSummary
  │    ├─ Quick match info (sport, venue, date, players)
  │    ├─ PricingDeadlineDisplay (full breakdown)
  │    ├─ Why this works (4 benefits)
  │    └─ Commitment checklist
  │
  ├─► User clicks "Review & Confirm Join"
  │    │
  │    └─► 🎨 SHOW PaymentCommitmentModal
  │         ├─ Match details
  │         ├─ Transparent cost formula
  │         ├─ Cost scenarios (min/current/max)
  │         ├─ Payment deadline countdown
  │         ├─ 4-stage payment flow diagram
  │         └─ 🔴 MANDATORY CHECKBOXES (5 items)
  │             ├─ Understand cost range
  │             ├─ Understand cost varies
  │             ├─ Will receive reminders
  │             ├─ Payment is mandatory
  │             └─ Non-payment = removal
  │
  ├─► User must check ALL checkboxes
  │    └─► Only then "Confirm & Join" enabled
  │
  └─► User clicks "Confirm & Join"
       │
       ├─► deadlineReminderService.createReminder()
       │    └─► Schedule reminders for this player
       │
       ├─► notificationService.addNotification()
       │    └─► Log confirmation event
       │
       └─► ✅ SUCCESS: User joined + Reminders scheduled
```

---

## Reminder Scheduling Timeline

```
DEADLINE REMINDER FLOW
═══════════════════════════════════════════════════════════════════

MATCH CREATION (Day 0)
  │
  │ Deadline scheduled: Day X at 6:55 PM (5 min before match)
  │
  ├─ DAY 1
  │   └─ ✓ Confirmed (reminder scheduled, not sent yet)
  │
  ├─ ... (no reminders) ...
  │
  ├─ DAY X-7 (7 days before deadline)
  │   │
  │   ├─ 📧 EMAIL: "Payment due in 7 days"
  │   ├─ 📱 PUSH: Notification sent
  │   └─ 🔔 IN-APP: Notification appears
  │
  ├─ ... (no reminders) ...
  │
  ├─ DAY X-3 (3 days before deadline)
  │   │
  │   ├─ 📧 EMAIL: "Payment due in 3 days"
  │   ├─ 📱 PUSH: Notification sent
  │   └─ 🔔 IN-APP: Notification appears
  │
  ├─ ... (no reminders) ...
  │
  ├─ DAY X-1 (1 day before deadline)
  │   │
  │   ├─ 📧 EMAIL: "Payment due in 24 hours"
  │   ├─ 📱 PUSH: Notification sent
  │   ├─ 🔔 IN-APP: Notification + Banner
  │   └─ ⚠️ Color changes to ORANGE
  │
  ├─ LAST 24 HOURS (Hourly reminders)
  │   │
  │   ├─ HOUR 23: 📱 PUSH + 🔔 IN-APP
  │   │   └─ "23h left to pay"
  │   │
  │   ├─ HOUR 22: 📱 PUSH + 🔔 IN-APP
  │   │   └─ "22h left to pay"
  │   │
  │   ├─ ... (every hour) ...
  │   │
  │   └─ HOUR 1: 📱 PUSH + 🔔 IN-APP
  │       └─ "1h left to pay" (⚠️ Color = RED)
  │
  └─ DEADLINE REACHED (Day X, 6:55 PM)
      │
      ├─ ⛔ FINAL ALERT: Critical notification
      ├─ 💳 Auto-process payment
      ├─ ❌ Remove unpaid players
      └─ ✅ Confirm final team
```

---

## Data Structure

```
MATCH OBJECT (Enhanced)
═══════════════════════════════════════════════════════════════════

{
  id: "match-123",
  title: "Friday Football Fun",
  sport: "Football",
  
  // Venue
  turfName: "Sky Arena",
  location: "Satellite, Ahmedabad",
  
  // Timing
  date: "2026-01-15",
  time: "19:00",
  
  // Players
  minPlayers: 6,
  maxPlayers: 15,
  players: [
    { userId, name, status: 'paid' | 'joined' | 'confirmed' },
    ...
  ],
  
  // Payment & Deadline (NEW)
  amount: 1500,  // Turf cost per hour
  paymentDeadline: Date,  // ✨ NEW FIELD
  paymentOption: "5-step",
  
  // Reminders (NEW)
  createdAt: Date,  // ✨ NEW FIELD
  remindersScheduled: {
    sevenDays: true,
    threeDays: true,
    oneDay: true,
    hourly: true
  },
  
  // Status
  status: 'open' | 'soft_locked' | 'payment_pending' | 'confirmed',
  
  // Chat
  chatId: "chat-123"
}


PAYMENT STATUS OBJECT
═══════════════════════════════════════════════════════════════════

{
  userId: "user-456",
  matchId: "match-123",
  stage: 'free_joining' | 'soft_lock' | 'payment_window' | 'hard_lock' | 'confirmed',
  amountDue: 250,  // Cost per person
  amountPaid: 0,
  isPaid: false,
  paymentDeadline: Date,
  paidAt: null,
  paymentMethod: 'upi' | 'card' | 'wallet'
}


REMINDER OBJECT
═══════════════════════════════════════════════════════════════════

{
  id: "reminder-789",
  matchId: "match-123",
  userId: "user-456",
  deadline: Date,
  createdAt: Date,
  remindersScheduled: {
    sevenDays: true,
    threeDays: true,
    oneDay: true,
    hourly: true
  },
  remindersTriggered: {
    sevenDays: false,
    threeDays: false,
    oneDay: false,
    hourlyTimestamps: []
  }
}


NOTIFICATION OBJECT
═══════════════════════════════════════════════════════════════════

{
  id: "notif-999",
  userId: "user-456",
  type: 'payment_reminder' | 'match_update' | 'achievement' | ...,
  title: "⏰ Payment Reminder - 7 Days Left!",
  body: "Your match payment is due in 7 days...",
  matchId: "match-123",
  actionUrl: "/match/match-123",
  timestamp: Date,
  read: false,
  reminderType: 'sevenDays' | 'threeDays' | 'oneDay' | 'hourly' | 'deadline',
  data: { ... }
}
```

---

## Service Dependencies

```
pricingService (Independent)
  ├─ No dependencies
  ├─ Pure calculations
  └─ Returns formatted data

deadlineReminderService (Independent)
  ├─ Depends on: notificationService
  ├─ Self-managing intervals
  └─ Persistent state

notificationService (Independent)
  ├─ No external dependencies
  ├─ localStorage for persistence
  └─ Multi-channel support

paymentFlowService (Coordinator)
  ├─ Depends on: deadlineReminderService
  ├─ Coordinates reminder scheduling
  └─ Handles payment lifecycle

matchService (Data Layer)
  ├─ Depends on: paymentFlowService
  ├─ Stores match state
  └─ References deadlines
```

---

## Color Coding System

```
DEADLINE URGENCY COLORS
═══════════════════════════════════════════════════════════════════

🟢 GREEN (7+ days away)
  ├─ Background: from-green-50 to-emerald-50
  ├─ Border: border-green-300
  ├─ Text: text-green-900
  └─ Meaning: Relaxed, informational, plenty of time

🟡 YELLOW (3-7 days away)
  ├─ Background: from-yellow-50 to-amber-50
  ├─ Border: border-yellow-300
  ├─ Text: text-yellow-900
  └─ Meaning: Caution, getting closer

🟠 ORANGE (1-3 days away)
  ├─ Background: from-orange-50 to-red-50
  ├─ Border: border-orange-300
  ├─ Text: text-orange-900
  └─ Meaning: Warning, action needed soon

🔴 RED (<1 day away)
  ├─ Background: from-red-50 to-pink-50
  ├─ Border: border-red-300
  ├─ Text: text-red-900
  └─ Meaning: CRITICAL, payment required immediately
```

---

## Component Hierarchy

```
APP
├─ CreateMatchPlan
│   ├─ PricingDeadlineDisplay (shows pricing breakdown)
│   └─ (Creates deadline reminder)
│
├─ MatchDetailPage
│   └─ MatchJoinSummary
│       ├─ Quick Info Card
│       ├─ PricingDeadlineDisplay (full mode)
│       ├─ Why This Works Section
│       ├─ Commitment Checklist
│       └─ PaymentCommitmentModal (when confirming)
│
├─ MatchListPage
│   └─ MatchCard[]
│       └─ PricingDeadlineDisplay (compact mode)
│
└─ NotificationCenter
    └─ Notification[]
        └─ (Shows payment reminders)
```

---

## Integration Points

```
INTEGRATION POINTS IN YOUR APP
═══════════════════════════════════════════════════════════════════

1. MATCH CREATION
   Location: CreateMatchPlan.tsx (handleCreate)
   ✓ Calculate deadline
   ✓ Schedule reminders
   ✓ Show pricing display

2. MATCH JOINING
   Location: Match detail/join page
   ✓ Show MatchJoinSummary
   ✓ Require PaymentCommitmentModal
   ✓ Schedule reminders

3. SOFT LOCK TRIGGER
   Location: Payment flow logic
   ✓ Call schedulePaymentReminders()
   ✓ Send "payment window open" notification

4. MATCH CANCELLATION
   Location: Match delete logic
   ✓ Call cancelPaymentReminders()
   ✓ Clean up scheduled intervals

5. PRICING DISPLAY
   Location: Any match card/detail
   ✓ Use PricingDeadlineDisplay component
   ✓ Pass current player count
   ✓ Display as compact or full

6. NOTIFICATIONS
   Location: Notification center
   ✓ Show payment reminders
   ✓ Track read/unread
   ✓ Link to match detail
```

---

## State Management Flow

```
CREATING MATCH
═════════════════════════════════════════════════════════════════

React Component State:
  ├─ step: 1 → 2 → 3 → 4 → 5
  ├─ selectedTurf, selectedDate, selectedTime
  ├─ matchTitle, minPlayers, maxPlayers
  └─ visibility, paymentMethod

Services (Stateful):
  ├─ deadlineReminderService
  │  ├─ Creates: reminderMap[id] = reminder
  │  └─ Manages: activeIntervals[id] = [timeout, interval, ...]
  │
  ├─ pricingService (Stateless)
  │  └─ Returns: calculated pricing
  │
  └─ notificationService
     └─ Stores: notifications[userId] = [notif, ...]

Storage:
  ├─ localStorage
  │  ├─ notifications_${userId}
  │  └─ match_deadline_${matchId}
  │
  └─ Database
     ├─ matches table (paymentDeadline, createdAt)
     └─ reminder_log table (audit trail)


JOINING MATCH
═════════════════════════════════════════════════════════════════

React Component State:
  ├─ showCommitmentModal: false → true → false
  ├─ agreedToTerms: false → [checked items] → true
  └─ isJoining: false → true → false

Services (Stateful):
  ├─ deadlineReminderService
  │  ├─ Creates: new reminder for this user
  │  └─ Manages: schedules all intervals
  │
  └─ notificationService
     └─ Stores: added notification event

Storage:
  └─ localStorage
     └─ notifications_${userId}
```

---

## Error Handling & Edge Cases

```
POTENTIAL ISSUES & SOLUTIONS
═════════════════════════════════════════════════════════════════

1. USER CLOSES BROWSER
   Problem: Intervals lost
   Solution: Re-schedule on app load (check localStorage)

2. SYSTEM TIME CHANGES
   Problem: Countdown wrong
   Solution: Recalculate from deadline timestamp

3. INTERNET DISCONNECTED
   Problem: Notifications can't send
   Solution: Queue in localStorage, retry on reconnect

4. USER REMOVES APP FROM HOME SCREEN
   Problem: Notifications stop
   Solution: Fallback to in-app banner + localStorage

5. MULTIPLE TABS OPEN
   Problem: Duplicate reminders
   Solution: Use localStorage check before scheduling

6. USER MANUALLY CHANGES DEVICE TIME
   Problem: Deadline skipped
   Solution: Server-side validation

7. PAYMENT DEADLINE IN PAST
   Problem: Can't join match
   Solution: Check deadline > now() before allowing join

8. ZERO PLAYERS SCENARIO
   Problem: Division by zero in cost calc
   Solution: Default to 1 player for display, validation

All handled in the services! ✅
```

---

## Performance Considerations

```
OPTIMIZATION STRATEGIES
═════════════════════════════════════════════════════════════════

Reminders:
  ✓ Use setTimeout/setInterval (native, no dependencies)
  ✓ Clear intervals on unmount
  ✓ Debounce reminder checks
  ✓ Cancel future intervals if match deleted

Notifications:
  ✓ Lazy load notifications on demand
  ✓ Limit stored notifications (last 100)
  ✓ Clean up old notifications (>30 days)
  ✓ Use localStorage efficiently

Rendering:
  ✓ PricingDeadlineDisplay memoized
  ✓ Only recalculate when props change
  ✓ Compact mode for lists, full for detail

Calculations:
  ✓ All math is O(1) or O(n) where n is players
  ✓ No expensive loops
  ✓ Cached tiered pricing results

Storage:
  ✓ LocalStorage ~5MB limit (plenty for our use)
  ✓ Remove old reminders after completion
  ✓ Compress notification data if needed
```

---

**Diagrams generated for clarity and understanding.** ✅
