# 👨‍💻 Developer Reference - Match Discovery & Notification System

## Overview

This document provides code examples and API reference for developers integrating or extending the Match Discovery & Notification system.

---

## 🔧 API Reference

### 1. Match Notification Service

#### Import
```typescript
import { matchNotificationService } from '../services/matchNotificationService';
```

#### Create Match Notification Data
```typescript
const notificationData = {
  matchId: 'match-xyz123',
  title: 'Football Match - Sunday',
  organizer: 'John Doe',
  sport: 'Football',
  turfName: 'Pro Sports Arena',
  location: 'Downtown',
  date: '2024-01-15',
  time: '10:00 AM',
  minPlayers: 6,
  currentPlayers: 3,
  visibility: 'community' as const, // or 'nearby' or 'private'
};
```

#### Notify New Match Created
```typescript
// Broadcast notification to community
matchNotificationService.notifyNewMatchCreated(notificationData, userId);

// This will:
// 1. Log notification to console
// 2. Trigger community notifications
// 3. Show in discovery hub
// 4. Send to nearby users if visibility is 'nearby'
```

#### Save Match to Discoverable List
```typescript
// Save for other users to discover
matchNotificationService.saveMatchToDiscoverable(notificationData);

// Now the match appears in:
// - Discovery Hub
// - Search results
// - Filtered lists
```

#### Get All Discoverable Matches
```typescript
// Get all matches
const allMatches = matchNotificationService.getDiscoverableMatches();

// Get filtered matches
const filteredMatches = matchNotificationService.getDiscoverableMatches({
  sport: 'Football',
  location: 'Downtown',
  radius: 5, // km (simplified implementation)
  date: '2024-01-15'
});

// Returns array of Match objects with all details
```

#### Get Available Sports
```typescript
const sports = matchNotificationService.getAvailableSports();
// Returns: ['Football', 'Cricket', 'Basketball', 'Tennis', ...]
```

#### Get Available Locations
```typescript
const locations = matchNotificationService.getAvailableLocations();
// Returns: ['Downtown', 'Midtown', 'Uptown', ...]
```

#### Player Join Notification
```typescript
matchNotificationService.notifyPlayerJoined(
  matchId: string,
  matchTitle: string,
  playerName: string,
  currentPlayers: number,
  maxPlayers: number
);
```

#### Minimum Players Reached
```typescript
matchNotificationService.notifyMinimumPlayersReached(
  matchId: string,
  matchTitle: string,
  minPlayers: number
);
```

#### Payment Reminder
```typescript
matchNotificationService.notifyPaymentReminder(
  matchId: string,
  matchTitle: string,
  hoursUntilDeadline: number
);
```

---

## 🎯 Integration Examples

### Example 1: Creating a Match (from CreateMatchPlan)

```typescript
import { matchNotificationService } from '../services/matchNotificationService';
import { firebaseAuth } from '../services/firebaseService';

const handleCreateMatch = async (matchData: any) => {
  try {
    const user = firebaseAuth.currentUser;
    const organizerName = user?.displayName || 'Anonymous';

    // Create the notification data
    const notificationData = {
      matchId: `match-${Date.now()}`,
      title: matchData.title,
      organizer: organizerName,
      sport: matchData.sport,
      turfName: matchData.turfName,
      location: matchData.location,
      date: matchData.date,
      time: matchData.time,
      minPlayers: matchData.minPlayers,
      currentPlayers: 1, // Organizer is first player
      visibility: matchData.visibility,
    };

    // Save to discoverable list
    matchNotificationService.saveMatchToDiscoverable(notificationData);

    // Notify community
    matchNotificationService.notifyNewMatchCreated(
      notificationData,
      user?.uid || 'user'
    );

    toast.success('Match created and notified to community! 🎉');
  } catch (error) {
    console.error('Error creating match:', error);
    toast.error('Error creating match');
  }
};
```

### Example 2: Using Discovery Hub

```typescript
import { DiscoveryHub } from './DiscoveryHub';

// In your App.tsx or routing
{currentPage === 'discovery' && <DiscoveryHub />}

// Navigate to discovery
const navigate = (page: string) => {
  if (page === 'discovery') {
    setCurrentPage('discovery');
  }
};
```

### Example 3: Adding Discovery Button to Community Feed

```typescript
import { matchNotificationService } from '../services/matchNotificationService';

function SportsCommunityFeed({ onNavigate }) {
  const discoverMatches = () => {
    // Get current match counts
    const stats = {
      totalMatches: matchNotificationService.getDiscoverableMatches().length,
      sports: matchNotificationService.getAvailableSports(),
      locations: matchNotificationService.getAvailableLocations(),
    };

    console.log('Discovery Stats:', stats);
    
    // Navigate to discovery
    onNavigate('discovery');
  };

  return (
    <button onClick={discoverMatches}>
      Discover Matches ({stats.totalMatches})
    </button>
  );
}
```

### Example 4: Custom Filtering

```typescript
import { matchNotificationService } from '../services/matchNotificationService';

function FilterMatches() {
  const [sport, setSport] = useState('Football');
  const [location, setLocation] = useState('Downtown');

  // Get filtered matches whenever filters change
  useEffect(() => {
    const filtered = matchNotificationService.getDiscoverableMatches({
      sport: sport !== 'all' ? sport : undefined,
      location: location !== 'all' ? location : undefined,
    });

    console.log(`Found ${filtered.length} matches`);
    // Use filtered data to display
  }, [sport, location]);

  return (
    <div>
      <select value={sport} onChange={(e) => setSport(e.target.value)}>
        <option value="all">All Sports</option>
        {matchNotificationService.getAvailableSports().map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="all">All Locations</option>
        {matchNotificationService.getAvailableLocations().map(l => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>
    </div>
  );
}
```

### Example 5: Real-Time Match Updates

```typescript
import { matchNotificationService } from '../services/matchNotificationService';
import { useEffect, useState } from 'react';

function LiveMatchFeed() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Initial load
    setMatches(matchNotificationService.getDiscoverableMatches());

    // Refresh every 5 seconds
    const interval = setInterval(() => {
      const updatedMatches = matchNotificationService.getDiscoverableMatches();
      setMatches(updatedMatches);
      console.log(`Refreshed: ${updatedMatches.length} matches available`);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {matches.map(match => (
        <div key={match.matchId} className="match-card">
          {match.title} - {match.currentPlayers}/{match.minPlayers} players
        </div>
      ))}
    </div>
  );
}
```

---

## 🔌 Extension Points

### Adding to Notification System

```typescript
// In notificationService.ts, add new notification type:
type NotificationType = 
  | 'match_creation'  // NEW
  | 'match_update'
  | 'payment_reminder'
  | 'achievement'
  | 'friend_activity'
  | 'community_update'
  | 'promotion';

interface Notification {
  type: NotificationType;
  title: string;
  body: string;
  matchId?: string;
  actionUrl?: string;
  data?: Record<string, any>;
}
```

### Connecting to Database (Supabase)

```typescript
// Replace localStorage with Supabase in production
import { supabase } from '../lib/supabaseClient';

// Save match
async saveMatch(match: MatchNotification) {
  const { data, error } = await supabase
    .from('discoverable_matches')
    .insert([{
      match_id: match.matchId,
      title: match.title,
      organizer: match.organizer,
      // ... other fields
      created_at: new Date().toISOString()
    }]);

  if (error) console.error('Error saving match:', error);
  return data;
}

// Subscribe to new matches in real-time
supabase
  .from('discoverable_matches')
  .on('*', payload => {
    console.log('New match created:', payload.new);
    // Update UI in real-time
  })
  .subscribe();
```

---

## 📊 Data Structures

### Match Interface
```typescript
interface Match {
  matchId: string;           // Unique identifier
  title: string;             // Match name/title
  organizer: string;         // Creator's name
  sport: string;             // Sport type
  turfName: string;          // Venue/Turf name
  location: string;          // City/Area
  date: string;              // Match date (YYYY-MM-DD)
  time: string;              // Match time (HH:MM)
  minPlayers: number;        // Minimum players needed
  currentPlayers: number;    // How many have joined
  visibility: 'community' | 'nearby' | 'private';
  createdAt?: string;        // ISO timestamp
  updatedAt?: string;        // ISO timestamp
  joinedPlayers?: [string];  // User IDs of joined players
  available?: number;        // Available spots
}
```

### Notification Interface
```typescript
interface Notification {
  type: 'match_creation' | 'match_update' | 'payment_reminder' | ...;
  title: string;
  body: string;
  matchId?: string;
  actionUrl?: string;
  data?: {
    organizer?: string;
    sport?: string;
    location?: string;
    turfName?: string;
    date?: string;
    time?: string;
    visibility?: string;
  };
}
```

---

## 🧪 Testing Examples

### Unit Tests
```typescript
import { matchNotificationService } from '../services/matchNotificationService';

describe('Match Notification Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should save match to discoverable list', () => {
    const match = {
      matchId: 'test-1',
      title: 'Test Match',
      organizer: 'Test User',
      // ... other fields
    };

    matchNotificationService.saveMatchToDiscoverable(match);
    const matches = matchNotificationService.getDiscoverableMatches();

    expect(matches.length).toBe(1);
    expect(matches[0].title).toBe('Test Match');
  });

  test('should filter matches by sport', () => {
    // Add multiple matches
    // ...
    
    const filtered = matchNotificationService.getDiscoverableMatches({
      sport: 'Football'
    });

    expect(filtered.every(m => m.sport === 'Football')).toBe(true);
  });

  test('should get available sports', () => {
    const sports = matchNotificationService.getAvailableSports();
    expect(Array.isArray(sports)).toBe(true);
    expect(sports.length).toBeGreaterThan(0);
  });
});
```

---

## 🚀 Deployment Checklist

- [x] Match Notification Service implemented
- [x] DiscoveryHub component created
- [x] Integration with CreateMatchPlan
- [x] Real-time refresh implemented
- [x] Responsive design
- [x] All tests passing
- [x] Performance optimized
- [x] Ready for production

---

## 📝 Common Tasks

### Task 1: Show "New Match" Badge
```typescript
const newMatches = matchNotificationService
  .getDiscoverableMatches()
  .filter(m => isNew(m.createdAt)); // created in last hour

const badge = newMatches.length > 0 ? (
  <span className="badge">{newMatches.length} new</span>
) : null;
```

### Task 2: Send Notification Email
```typescript
const sendNotificationEmail = async (match: Match, userId: string) => {
  const user = await getUserById(userId);
  
  await emailService.send({
    to: user.email,
    subject: `New match available: ${match.title}`,
    template: 'match-notification',
    data: match
  });
};
```

### Task 3: Update Player Count on Join
```typescript
const joinMatch = async (matchId: string, userId: string) => {
  // Add user to match
  await updateMatch(matchId, {
    currentPlayers: currentPlayers + 1,
    joinedPlayers: [...joinedPlayers, userId]
  });

  // Notify organizer
  matchNotificationService.notifyPlayerJoined(
    matchId,
    matchTitle,
    userName,
    currentPlayers + 1,
    maxPlayers
  );
};
```

---

## 📚 Related Documentation

- [DISCOVERY_NOTIFICATION_GUIDE.md](./DISCOVERY_NOTIFICATION_GUIDE.md) - Complete feature guide
- [QUICK_START_DISCOVERY.md](./QUICK_START_DISCOVERY.md) - User quick start guide
- `src/services/matchNotificationService.ts` - Source code
- `src/components/DiscoveryHub.tsx` - Component source code

---

## 🆘 Debugging

### Enable Debug Logging
```typescript
// In matchNotificationService.ts
const DEBUG = true;

const log = (message: string, data?: any) => {
  if (DEBUG) console.log(`[Match Notification] ${message}`, data);
};
```

### Common Issues

**Issue**: Matches not appearing
**Solution**: Check if matches are being saved: `console.log(localStorage.getItem('avento_discoverable_matches'))`

**Issue**: Real-time updates not working
**Solution**: Verify interval is set: Check browser console for 5-second refresh logs

**Issue**: Filters not working
**Solution**: Verify match data structure matches the interface

---

**Last Updated**: 2024
**Status**: Production Ready ✅
