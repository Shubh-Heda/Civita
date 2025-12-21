export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  category: 'sports' | 'events' | 'parties' | 'gaming';
  date: string;
  time: string;
  location: string;
  image: string;
  participants: number;
  maxParticipants: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  prize?: string;
  registrationFee: number;
  tags: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
  organizer: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  rating?: number;
  reviews?: number;
}

class CommunityEventsService {
  private events: CommunityEvent[] = [
    // Sports Events
    {
      id: 'sport_1',
      title: 'Sunday Football League 2025',
      description: 'Join our weekly football tournament with exciting prizes and amazing crowd energy!',
      category: 'sports',
      date: '2025-01-05',
      time: '10:00 AM',
      location: 'Central Sports Complex, Mumbai',
      image: '⚽',
      participants: 24,
      maxParticipants: 32,
      level: 'intermediate',
      prize: '₹50,000 Prize Pool',
      registrationFee: 500,
      tags: ['football', 'tournament', 'league', 'outdoor'],
      status: 'upcoming',
      organizer: {
        name: 'Sports Hub India',
        avatar: '👨‍💼',
        verified: true,
      },
      rating: 4.8,
      reviews: 234,
    },
    {
      id: 'sport_2',
      title: 'Badminton Championship 2025',
      description: 'Premier badminton event for singles and doubles. Network with top players!',
      category: 'sports',
      date: '2025-01-12',
      time: '06:00 PM',
      location: 'Indoor Sports Arena, Bangalore',
      image: '🏸',
      participants: 18,
      maxParticipants: 48,
      level: 'all',
      prize: '₹30,000 Prize Pool',
      registrationFee: 300,
      tags: ['badminton', 'tournament', 'championship'],
      status: 'upcoming',
      organizer: {
        name: 'Badminton Elite',
        avatar: '👩‍💼',
        verified: true,
      },
      rating: 4.6,
      reviews: 156,
    },
    {
      id: 'sport_3',
      title: 'Marathon 2025 - Health & Fitness',
      description: '5K, 10K, and Half Marathon runs. Celebrate wellness together!',
      category: 'sports',
      date: '2025-01-15',
      time: '06:30 AM',
      location: 'City Park, Delhi',
      image: '🏃',
      participants: 156,
      maxParticipants: 500,
      level: 'all',
      prize: 'Medals & Certificates',
      registrationFee: 200,
      tags: ['marathon', 'running', 'fitness', 'health'],
      status: 'upcoming',
      organizer: {
        name: 'Fit India Movement',
        avatar: '🏥',
        verified: true,
      },
      rating: 4.9,
      reviews: 512,
    },

    // Events (Cultural)
    {
      id: 'event_1',
      title: 'Annual Music Festival 2025',
      description: 'Three days of live music with top Indian and international artists. Experience culture!',
      category: 'events',
      date: '2025-01-20',
      time: '05:00 PM',
      location: 'Amphitheater, Pune',
      image: '🎵',
      participants: 2000,
      maxParticipants: 5000,
      level: 'all',
      prize: 'Meet & Greet opportunities',
      registrationFee: 1500,
      tags: ['music', 'festival', 'cultural', 'live-performance'],
      status: 'upcoming',
      organizer: {
        name: 'Cultural Events India',
        avatar: '🎭',
        verified: true,
      },
      rating: 4.7,
      reviews: 1024,
    },
    {
      id: 'event_2',
      title: 'Art & Craft Exhibition 2025',
      description: 'Showcase your talents! Exhibition for artists, craftsmen, and creators worldwide.',
      category: 'events',
      date: '2025-01-25',
      time: '10:00 AM',
      location: 'Convention Center, Hyderabad',
      image: '🎨',
      participants: 450,
      maxParticipants: 1000,
      level: 'all',
      prize: '₹5,00,000 in awards',
      registrationFee: 800,
      tags: ['art', 'craft', 'exhibition', 'creativity'],
      status: 'upcoming',
      organizer: {
        name: 'India Arts Council',
        avatar: '🎪',
        verified: true,
      },
      rating: 4.5,
      reviews: 342,
    },
    {
      id: 'event_3',
      title: 'Tech Talk Series - Innovation 2025',
      description: 'Learn from industry leaders about emerging technologies and innovation.',
      category: 'events',
      date: '2025-01-22',
      time: '07:00 PM',
      location: 'Tech Hub, Bangalore',
      image: '💻',
      participants: 800,
      maxParticipants: 2000,
      level: 'all',
      prize: 'Networking opportunities',
      registrationFee: 0,
      tags: ['technology', 'innovation', 'seminar', 'learning'],
      status: 'upcoming',
      organizer: {
        name: 'Tech Innovation Forum',
        avatar: '🚀',
        verified: true,
      },
      rating: 4.8,
      reviews: 678,
    },

    // Parties
    {
      id: 'party_1',
      title: 'New Year Mega Party 2025',
      description: 'Join the biggest New Year celebration! DJ, dance floor, food, and incredible vibes!',
      category: 'parties',
      date: '2025-01-10',
      time: '10:00 PM',
      location: 'The Grand Venue, Mumbai',
      image: '🎉',
      participants: 450,
      maxParticipants: 1000,
      level: 'all',
      prize: 'Surprise giveaways',
      registrationFee: 1200,
      tags: ['party', 'celebration', 'new-year', 'nightlife'],
      status: 'upcoming',
      organizer: {
        name: 'Party Masters Events',
        avatar: '🎊',
        verified: true,
      },
      rating: 4.9,
      reviews: 2000,
    },
    {
      id: 'party_2',
      title: 'College Night Bash',
      description: 'Special party for college students! Affordable, fun, and unforgettable memories.',
      category: 'parties',
      date: '2025-01-18',
      time: '11:00 PM',
      location: 'Club Euphoria, Delhi',
      image: '🎪',
      participants: 300,
      maxParticipants: 600,
      level: 'all',
      prize: 'Free drinks for early birds',
      registrationFee: 500,
      tags: ['college', 'party', 'youth', 'fun'],
      status: 'upcoming',
      organizer: {
        name: 'Youth Events Co',
        avatar: '🎯',
        verified: true,
      },
      rating: 4.6,
      reviews: 1200,
    },
    {
      id: 'party_3',
      title: 'Wedding Season Grand Wedding',
      description: 'Celebrate love with us! Join our curated wedding experience events.',
      category: 'parties',
      date: '2025-02-15',
      time: '07:00 PM',
      location: 'Palace Hotel, Jaipur',
      image: '💍',
      participants: 280,
      maxParticipants: 500,
      level: 'all',
      registrationFee: 2500,
      tags: ['wedding', 'celebration', 'premium', 'exclusive'],
      status: 'upcoming',
      organizer: {
        name: 'Elite Celebrations',
        avatar: '✨',
        verified: true,
      },
      rating: 4.9,
      reviews: 890,
    },

    // Gaming
    {
      id: 'gaming_1',
      title: 'Valorant Pro Tournament 2025',
      description: 'Esports tournament with ₹25L prize pool! Compete with top teams across India.',
      category: 'gaming',
      date: '2025-01-28',
      time: '02:00 PM',
      location: 'Gaming Arena, Bangalore',
      image: '🎮',
      participants: 32,
      maxParticipants: 64,
      level: 'advanced',
      prize: '₹25,00,000 Prize Pool',
      registrationFee: 10000,
      tags: ['valorant', 'esports', 'tournament', 'competitive'],
      status: 'upcoming',
      organizer: {
        name: 'Esports India League',
        avatar: '👾',
        verified: true,
      },
      rating: 4.9,
      reviews: 5600,
    },
    {
      id: 'gaming_2',
      title: 'FIFA 24 Community Tournament',
      description: 'Join our FIFA 24 online tournament! For casual and competitive players alike.',
      category: 'gaming',
      date: '2025-01-30',
      time: '06:00 PM',
      location: 'Online',
      image: '⚽',
      participants: 256,
      maxParticipants: 512,
      level: 'all',
      prize: '₹10,00,000 Prize Pool',
      registrationFee: 500,
      tags: ['fifa', 'football', 'online', 'community'],
      status: 'upcoming',
      organizer: {
        name: 'Gaming Community India',
        avatar: '🎯',
        verified: true,
      },
      rating: 4.7,
      reviews: 3400,
    },
    {
      id: 'gaming_3',
      title: 'Gaming Expo 2025 - Grand Launch',
      description: 'Experience the latest games, meet developers, enjoy tournaments, and meet gaming legends!',
      category: 'gaming',
      date: '2025-02-08',
      time: '10:00 AM',
      location: 'Convention Center, Hyderabad',
      image: '🏆',
      participants: 1200,
      maxParticipants: 5000,
      level: 'all',
      prize: '₹50,00,000 total prizes',
      registrationFee: 2000,
      tags: ['gaming', 'expo', 'community', 'competition'],
      status: 'upcoming',
      organizer: {
        name: 'Global Gaming Federation',
        avatar: '🌍',
        verified: true,
      },
      rating: 4.8,
      reviews: 4500,
    },
  ];

  getEventsByCategory(category: 'sports' | 'events' | 'parties' | 'gaming'): CommunityEvent[] {
    return this.events.filter(e => e.category === category);
  }

  getAllEvents(): CommunityEvent[] {
    return this.events;
  }

  getEventById(id: string): CommunityEvent | null {
    return this.events.find(e => e.id === id) || null;
  }

  getUpcomingEvents(category?: 'sports' | 'events' | 'parties' | 'gaming'): CommunityEvent[] {
    let filtered = this.events.filter(e => e.status === 'upcoming');
    if (category) {
      filtered = filtered.filter(e => e.category === category);
    }
    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  getFeaturedEvents(): CommunityEvent[] {
    return this.events
      .filter(e => e.status === 'upcoming' && e.rating && e.rating >= 4.6)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4);
  }

  registerEvent(eventId: string, userId: string): { success: boolean; message: string } {
    const event = this.getEventById(eventId);
    if (!event) {
      return { success: false, message: 'Event not found' };
    }
    if (event.participants >= event.maxParticipants) {
      return { success: false, message: 'Event is full' };
    }
    event.participants += 1;
    return { success: true, message: 'Successfully registered for event!' };
  }

  searchEvents(query: string): CommunityEvent[] {
    const q = query.toLowerCase();
    return this.events.filter(
      e =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  getEventStats(category: 'sports' | 'events' | 'parties' | 'gaming') {
    const categoryEvents = this.getEventsByCategory(category);
    return {
      total: categoryEvents.length,
      upcoming: categoryEvents.filter(e => e.status === 'upcoming').length,
      ongoing: categoryEvents.filter(e => e.status === 'ongoing').length,
      totalParticipants: categoryEvents.reduce((sum, e) => sum + e.participants, 0),
      averageRating:
        categoryEvents.reduce((sum, e) => sum + (e.rating || 0), 0) / categoryEvents.length,
    };
  }
}

export const communityEventsService = new CommunityEventsService();
