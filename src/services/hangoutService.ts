/**
 * Hangout Service
 * Suggests nearby places for post-match hangouts
 */

export interface HangoutPlace {
  id: string;
  name: string;
  type: 'cafe' | 'restaurant' | 'juice_bar' | 'ice_cream' | 'lounge';
  address: string;
  distance: string; // e.g., "0.5 km"
  rating: number;
  priceRange: '$' | '$$' | '$$$';
  openNow: boolean;
  specialties: string[];
  estimatedTime: string;
  imageUrl: string;
}

export interface HangoutPoll {
  id: string;
  matchId: string;
  createdBy: string;
  question: string;
  options: {
    placeId: string;
    placeName: string;
    votes: string[]; // userIds who voted
  }[];
  expiresAt: Date;
  status: 'active' | 'decided' | 'expired';
}

class HangoutService {
  /**
   * Get nearby hangout suggestions based on turf location
   */
  getNearbyHangouts(turfId: string, limit: number = 5): HangoutPlace[] {
    // Mock data - in real app would use Google Places API or similar
    const allPlaces: HangoutPlace[] = [
      {
        id: 'place_1',
        name: 'Cafe Mojo',
        type: 'cafe',
        address: 'Powai, Mumbai',
        distance: '0.3 km',
        rating: 4.5,
        priceRange: '$$',
        openNow: true,
        specialties: ['Coffee', 'Sandwiches', 'Shakes'],
        estimatedTime: '15 mins',
        imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400'
      },
      {
        id: 'place_2',
        name: 'Fresh Squeeze Juice Bar',
        type: 'juice_bar',
        address: 'Near Hiranandani, Powai',
        distance: '0.5 km',
        rating: 4.7,
        priceRange: '$',
        openNow: true,
        specialties: ['Fresh Juices', 'Smoothies', 'Healthy Snacks'],
        estimatedTime: '10 mins',
        imageUrl: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400'
      },
      {
        id: 'place_3',
        name: 'The Biryani House',
        type: 'restaurant',
        address: 'Powai Plaza',
        distance: '0.8 km',
        rating: 4.6,
        priceRange: '$$',
        openNow: true,
        specialties: ['Biryani', 'Kebabs', 'Indian Cuisine'],
        estimatedTime: '20 mins',
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400'
      },
      {
        id: 'place_4',
        name: 'Frozen Delights',
        type: 'ice_cream',
        address: 'Central Avenue, Powai',
        distance: '0.4 km',
        rating: 4.4,
        priceRange: '$',
        openNow: true,
        specialties: ['Ice Cream', 'Waffles', 'Sundaes'],
        estimatedTime: '12 mins',
        imageUrl: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400'
      },
      {
        id: 'place_5',
        name: 'Sports Lounge & Grill',
        type: 'lounge',
        address: 'Renaissance Hotel, Powai',
        distance: '1.2 km',
        rating: 4.8,
        priceRange: '$$$',
        openNow: true,
        specialties: ['Grilled Food', 'Mocktails', 'Sports Viewing'],
        estimatedTime: '25 mins',
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'
      },
      {
        id: 'place_6',
        name: 'Chai Point',
        type: 'cafe',
        address: 'Galleria Mall, Hiranandani',
        distance: '0.6 km',
        rating: 4.3,
        priceRange: '$',
        openNow: true,
        specialties: ['Chai', 'Snacks', 'Quick Bites'],
        estimatedTime: '15 mins',
        imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400'
      }
    ];

    return allPlaces.slice(0, limit);
  }

  /**
   * Create a hangout poll for a match
   */
  createHangoutPoll(
    matchId: string,
    createdBy: string,
    places: HangoutPlace[]
  ): HangoutPoll {
    const poll: HangoutPoll = {
      id: `poll_${Date.now()}`,
      matchId,
      createdBy,
      question: 'Where should we hang out after the match?',
      options: places.slice(0, 3).map(place => ({
        placeId: place.id,
        placeName: place.name,
        votes: []
      })),
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
      status: 'active'
    };

    this.savePoll(poll);
    return poll;
  }

  /**
   * Vote on a hangout poll
   */
  voteOnPoll(pollId: string, userId: string, optionIndex: number): HangoutPoll {
    const poll = this.getPoll(pollId);
    if (!poll) throw new Error('Poll not found');

    // Remove previous vote if exists
    poll.options.forEach(option => {
      option.votes = option.votes.filter(id => id !== userId);
    });

    // Add new vote
    if (poll.options[optionIndex]) {
      poll.options[optionIndex].votes.push(userId);
    }

    this.savePoll(poll);
    return poll;
  }

  /**
   * Get poll results
   */
  getPollResults(pollId: string): { winner: string; votes: number } | null {
    const poll = this.getPoll(pollId);
    if (!poll) return null;

    let maxVotes = 0;
    let winner = '';

    poll.options.forEach(option => {
      if (option.votes.length > maxVotes) {
        maxVotes = option.votes.length;
        winner = option.placeName;
      }
    });

    return maxVotes > 0 ? { winner, votes: maxVotes } : null;
  }

  /**
   * Get carpool suggestions
   */
  getCarpoolSuggestions(matchId: string, placeId: string): {
    groups: Array<{
      driver: string;
      passengers: string[];
      seatsAvailable: number;
    }>;
  } {
    // Mock carpool data
    return {
      groups: [
        {
          driver: 'Rahul Verma',
          passengers: ['Priya Sharma', 'Amit Patel'],
          seatsAvailable: 1
        },
        {
          driver: 'Neha Singh',
          passengers: [],
          seatsAvailable: 3
        }
      ]
    };
  }

  /**
   * Get poll by ID
   */
  private getPoll(pollId: string): HangoutPoll | null {
    const stored = localStorage.getItem(`hangout_poll_${pollId}`);
    if (!stored) return null;

    const poll = JSON.parse(stored);
    return {
      ...poll,
      expiresAt: new Date(poll.expiresAt)
    };
  }

  /**
   * Save poll
   */
  private savePoll(poll: HangoutPoll): void {
    localStorage.setItem(`hangout_poll_${poll.id}`, JSON.stringify(poll));
  }
}

export const hangoutService = new HangoutService();
