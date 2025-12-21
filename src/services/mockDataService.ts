/**
 * Mock Data Service
 * Generates realistic mock data for testing and demonstration
 */

import { matchService } from './matchService';
import { trustScoreService } from './trustScoreService';
import { friendshipStreakService } from './friendshipStreakService';
import { localStorageService } from './localStorageService';

class MockDataService {
  private mockUsers = [
    { id: 'user_001', name: 'Arjun Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun' },
    { id: 'user_002', name: 'Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
    { id: 'user_003', name: 'Rahul Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
    { id: 'user_004', name: 'Sneha Desai', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha' },
    { id: 'user_005', name: 'Vikram Singh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram' },
    { id: 'user_006', name: 'Ananya Reddy', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya' },
    { id: 'user_007', name: 'Karan Mehta', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karan' },
    { id: 'user_008', name: 'Ishita Gupta', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ishita' },
    { id: 'user_009', name: 'Rohan Verma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan' },
    { id: 'user_010', name: 'Diya Joshi', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diya' },
  ];

  private mockTurfs = [
    {
      id: 'turf_001',
      name: 'Elite Sports Arena',
      location: 'Andheri West, Mumbai',
      latitude: 19.1334,
      longitude: 72.8266,
      rating: 4.5,
    },
    {
      id: 'turf_002',
      name: 'Champions Turf',
      location: 'Bandra East, Mumbai',
      latitude: 19.0596,
      longitude: 72.8656,
      rating: 4.7,
    },
    {
      id: 'turf_003',
      name: 'Victory Ground',
      location: 'Powai, Mumbai',
      latitude: 19.1176,
      longitude: 72.9060,
      rating: 4.3,
    },
    {
      id: 'turf_004',
      name: 'Sports Hub 360',
      location: 'Goregaon West, Mumbai',
      latitude: 19.1626,
      longitude: 72.8492,
      rating: 4.6,
    },
    {
      id: 'turf_005',
      name: 'Play Zone Turf',
      location: 'Malad West, Mumbai',
      latitude: 19.1864,
      longitude: 72.8481,
      rating: 4.4,
    },
  ];

  private sports = ['Football', 'Cricket', 'Basketball', 'Badminton', 'Tennis', 'Volleyball'];

  /**
   * Initialize system with mock data
   */
  initializeMockData(): void {
    console.log('🚀 Initializing mock data...');

    // Generate trust scores for mock users
    this.generateMockTrustScores();

    // Generate friendship streaks
    this.generateMockFriendshipStreaks();

    // Generate matches
    this.generateMockMatches();

    // Generate events
    this.generateMockEvents();

    // Generate parties
    this.generateMockParties();

    console.log('✅ Mock data initialized successfully!');
  }

  /**
   * Generate mock trust scores
   */
  private generateMockTrustScores(): void {
    this.mockUsers.forEach((user, index) => {
      // Vary trust scores for realism
      const baseScore = 60 + (index * 4);
      
      for (let i = 0; i < 5 + index; i++) {
        trustScoreService.recordAction({
          type: 'match_completed',
          userId: user.id,
          timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          impact: Math.floor(Math.random() * 10),
        });
      }

      // Add some positive reviews
      for (let i = 0; i < 2 + Math.floor(index / 2); i++) {
        trustScoreService.recordAction({
          type: 'positive_review',
          userId: user.id,
          timestamp: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000),
          impact: 8,
        });
      }
    });
  }

  /**
   * Generate mock friendship streaks
   */
  private generateMockFriendshipStreaks(): void {
    // Create some friendship pairs
    const pairs = [
      ['user_001', 'user_002'],
      ['user_001', 'user_003'],
      ['user_002', 'user_004'],
      ['user_003', 'user_005'],
      ['user_004', 'user_006'],
    ];

    pairs.forEach(([user1, user2]) => {
      const matchCount = 3 + Math.floor(Math.random() * 8);
      
      for (let i = 0; i < matchCount; i++) {
        const matchDate = new Date(Date.now() - (matchCount - i) * 7 * 24 * 60 * 60 * 1000);
        friendshipStreakService.recordMatchTogether(user1, user2, matchDate);
      }
    });
  }

  /**
   * Generate mock matches
   */
  private generateMockMatches(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    const matchTemplates = [
      {
        title: 'Friday Night Football',
        sport: 'Football',
        date: tomorrow,
        startTime: '19:00',
        endTime: '20:30',
        duration: 90,
        visibility: 'community' as const,
        minPlayers: 10,
        maxPlayers: 14,
        costPerHour: 1200,
        totalCost: 1800,
        skillLevel: 'mixed' as const,
        description: 'Friendly football match. All skill levels welcome!',
        rules: ['Respect all players', 'No aggressive play', 'Have fun!'],
      },
      {
        title: 'Weekend Cricket Match',
        sport: 'Cricket',
        date: dayAfter,
        startTime: '16:00',
        endTime: '18:00',
        duration: 120,
        visibility: 'community' as const,
        minPlayers: 12,
        maxPlayers: 16,
        costPerHour: 1000,
        totalCost: 2000,
        skillLevel: 'intermediate' as const,
        description: 'Competitive cricket match for intermediate players',
        rules: ['Proper cricket gear required', 'Follow ICC rules', 'Team spirit!'],
      },
      {
        title: 'Basketball Evening',
        sport: 'Basketball',
        date: tomorrow,
        startTime: '18:00',
        endTime: '19:00',
        duration: 60,
        visibility: 'nearby' as const,
        minPlayers: 6,
        maxPlayers: 10,
        costPerHour: 800,
        totalCost: 800,
        skillLevel: 'beginner' as const,
        description: 'Casual basketball game for beginners',
      },
      {
        title: 'Badminton Doubles',
        sport: 'Badminton',
        date: tomorrow,
        startTime: '20:00',
        endTime: '21:00',
        duration: 60,
        visibility: 'community' as const,
        minPlayers: 4,
        maxPlayers: 8,
        costPerHour: 600,
        totalCost: 600,
        skillLevel: 'advanced' as const,
        description: 'Competitive badminton doubles',
      },
    ];

    matchTemplates.forEach((template, index) => {
      const organizerIndex = index % this.mockUsers.length;
      const organizer = this.mockUsers[organizerIndex];
      const turf = this.mockTurfs[index % this.mockTurfs.length];

      const match = matchService.createMatch(
        {
          ...template,
          turf,
          organizer: {
            id: organizer.id,
            name: organizer.name,
            trustScore: 75,
          },
        },
        organizer.id
      );

      // Add some players to matches
      const playerCount = Math.floor(Math.random() * 3) + 2;
      for (let i = 1; i <= playerCount; i++) {
        const playerIndex = (organizerIndex + i) % this.mockUsers.length;
        const player = this.mockUsers[playerIndex];
        
        if (player.id !== organizer.id) {
          try {
            matchService.joinMatch(match.id, player.id, player.name);
          } catch (error) {
            // Player already joined or match full
          }
        }
      }
    });
  }

  /**
   * Generate mock events
   */
  private generateMockEvents(): void {
    const events = [
      {
        id: 'event_001',
        title: 'Diwali Festival Celebration',
        category: 'Cultural',
        date: new Date('2024-11-18'),
        time: '18:00',
        location: 'Juhu Beach, Mumbai',
        description: 'Join us for a spectacular Diwali celebration with music, dance, and fireworks!',
        attendees: 150,
        maxAttendees: 200,
        price: 0,
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c39c',
      },
      {
        id: 'event_002',
        title: 'Classical Music Concert',
        category: 'Music',
        date: new Date('2024-11-25'),
        time: '19:30',
        location: 'NCPA, Nariman Point',
        description: 'An evening of classical Indian music featuring renowned artists',
        attendees: 80,
        maxAttendees: 120,
        price: 500,
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629',
      },
      {
        id: 'event_003',
        title: 'Art Exhibition: Modern India',
        category: 'Art',
        date: new Date('2024-11-22'),
        time: '11:00',
        location: 'Jehangir Art Gallery, Kala Ghoda',
        description: 'Contemporary art exhibition showcasing modern Indian artists',
        attendees: 45,
        maxAttendees: 100,
        price: 200,
        image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5',
      },
    ];

    localStorageService.setEvents(events);
  }

  /**
   * Generate mock parties
   */
  private generateMockParties(): void {
    const parties = [
      {
        id: 'party_001',
        title: 'Rooftop Saturday Night',
        type: 'Social',
        date: new Date('2024-11-23'),
        time: '20:00',
        location: 'Andheri West, Mumbai',
        description: 'Chill rooftop party with music, drinks, and great vibes!',
        attendees: 25,
        maxAttendees: 40,
        entryFee: 300,
        ageRestriction: '21+',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
      },
      {
        id: 'party_002',
        title: 'Birthday Bash - Arjun turns 25!',
        type: 'Birthday',
        date: new Date('2024-11-20'),
        time: '19:00',
        location: 'Bandra West, Mumbai',
        description: 'Join us to celebrate Arjun\'s 25th birthday!',
        attendees: 18,
        maxAttendees: 30,
        entryFee: 0,
        visibility: 'private',
        image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d',
      },
      {
        id: 'party_003',
        title: 'House Warming Party',
        type: 'Celebration',
        date: new Date('2024-11-24'),
        time: '18:00',
        location: 'Powai, Mumbai',
        description: 'Celebrating our new home! Food, drinks, and fun guaranteed!',
        attendees: 22,
        maxAttendees: 35,
        entryFee: 0,
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3',
      },
    ];

    localStorageService.setParties(parties);
  }

  /**
   * Get random mock user
   */
  getRandomUser() {
    return this.mockUsers[Math.floor(Math.random() * this.mockUsers.length)];
  }

  /**
   * Get random mock turf
   */
  getRandomTurf() {
    return this.mockTurfs[Math.floor(Math.random() * this.mockTurfs.length)];
  }

  /**
   * Get all mock users
   */
  getAllMockUsers() {
    return this.mockUsers;
  }

  /**
   * Get user by ID
   */
  getUserById(userId: string) {
    return this.mockUsers.find(user => user.id === userId);
  }

  /**
   * Get all mock turfs
   */
  getAllMockTurfs() {
    return [...this.mockTurfs];
  }

  /**
   * Clear all data
   */
  clearAllData(): void {
    localStorageService.clearAll();
    console.log('✅ All data cleared');
  }

  /**
   * Reset and reinitialize data
   */
  resetData(): void {
    this.clearAllData();
    this.initializeMockData();
    console.log('✅ Data reset complete');
  }
}

export const mockDataService = new MockDataService();