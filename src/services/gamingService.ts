// Gaming Hub Service - Complete gaming sessions management
export interface GamingClub {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  image: string;
  consoles: string[]; // PS5, Xbox Series X, PC, VR
  hourlyRate: number;
  facilities: string[]; // Food, Drinks, Streaming Setup, Private Rooms
  gamesLibrary: string[];
  openTime: string;
  closeTime: string;
  totalSeats: number;
  privateRooms: number;
  streamingSetups: number;
}

export interface GamingSession {
  id: string;
  clubId: string;
  clubName: string;
  hostId: string;
  hostName: string;
  date: string;
  time: string;
  duration: number; // in hours
  gameSpecific: boolean;
  gameName?: string; // FIFA, COD, Valorant, etc.
  platform: string; // PS5, Xbox, PC, VR
  sessionType: 'casual' | 'competitive' | 'tournament';
  skillLevel: 'beginner' | 'intermediate' | 'pro' | 'any';
  minPlayers: number;
  maxPlayers: number;
  currentPlayers: number;
  visibility: 'public' | 'friends-only' | 'private';
  paymentMode: '5-stage' | 'instant'; // New: user choice
  pricePerPerson: number;
  seatType: 'individual' | 'private-room';
  streamingAvailable: boolean;
  hasFood: boolean;
  players: GamingPlayer[];
  status: 'open' | 'soft-lock' | 'payment-window' | 'hard-lock' | 'confirmed' | 'completed';
  paymentWindowEnd?: string;
  stage?: number; // 1-5 for payment flow
}

export interface GamingPlayer {
  id: string;
  name: string;
  avatar: string;
  trustScore: number;
  skillLevel: string;
  gamesPlayed: number;
  favoriteGames: string[];
  hasPaid: boolean;
  joinedAt: string;
}

export interface GamingTournament {
  id: string;
  name: string;
  game: string;
  clubId: string;
  startDate: string;
  registrationFee: number;
  prizePool: number;
  maxTeams: number;
  currentTeams: number;
  format: 'single-elimination' | 'double-elimination' | 'round-robin';
  teamSize: number;
  status: 'registration' | 'ongoing' | 'completed';
}

class GamingService {
  private gamingClubs: GamingClub[] = [
    {
      id: 'gc1',
      name: 'GameZone Elite',
      location: 'Koramangala, Bangalore',
      distance: '2.3 km',
      rating: 4.8,
      reviews: 342,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
      consoles: ['PS5', 'Xbox Series X', 'Gaming PC', 'VR'],
      hourlyRate: 150,
      facilities: ['Food & Drinks', 'Streaming Setup', 'Private Rooms', 'AC', 'WiFi'],
      gamesLibrary: ['FIFA 24', 'COD: MW3', 'Valorant', 'GTA V', 'Fortnite', 'Apex Legends', 'Tekken 8', 'Street Fighter 6'],
      openTime: '10:00 AM',
      closeTime: '2:00 AM',
      totalSeats: 40,
      privateRooms: 5,
      streamingSetups: 3
    },
    {
      id: 'gc2',
      name: 'PlayHub Gaming Lounge',
      location: 'Indiranagar, Bangalore',
      distance: '3.7 km',
      rating: 4.6,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800',
      consoles: ['PS5', 'Gaming PC', 'VR'],
      hourlyRate: 120,
      facilities: ['Food & Drinks', 'Private Rooms', 'AC', 'Parking'],
      gamesLibrary: ['FIFA 24', 'COD: MW3', 'Valorant', 'CS:GO', 'Dota 2', 'League of Legends', 'Overwatch 2'],
      openTime: '11:00 AM',
      closeTime: '12:00 AM',
      totalSeats: 30,
      privateRooms: 3,
      streamingSetups: 1
    },
    {
      id: 'gc3',
      name: 'Arena X Gaming',
      location: 'Whitefield, Bangalore',
      distance: '5.2 km',
      rating: 4.9,
      reviews: 478,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
      consoles: ['PS5', 'Xbox Series X', 'Gaming PC', 'VR', 'Nintendo Switch'],
      hourlyRate: 180,
      facilities: ['Food & Drinks', 'Streaming Setup', 'Private Rooms', 'Tournament Hall', 'AC', 'WiFi', 'Parking'],
      gamesLibrary: ['FIFA 24', 'COD: MW3', 'Valorant', 'GTA V', 'Fortnite', 'Apex Legends', 'Rocket League', 'Minecraft', 'Among Us'],
      openTime: '9:00 AM',
      closeTime: '3:00 AM',
      totalSeats: 60,
      privateRooms: 8,
      streamingSetups: 5
    },
    {
      id: 'gc4',
      name: 'Cyber Café Pro',
      location: 'HSR Layout, Bangalore',
      distance: '4.1 km',
      rating: 4.5,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
      consoles: ['Gaming PC', 'PS5'],
      hourlyRate: 100,
      facilities: ['Food & Drinks', 'AC', 'WiFi'],
      gamesLibrary: ['Valorant', 'CS:GO', 'Dota 2', 'League of Legends', 'PUBG', 'Free Fire'],
      openTime: '10:00 AM',
      closeTime: '11:00 PM',
      totalSeats: 25,
      privateRooms: 2,
      streamingSetups: 0
    }
  ];

  private gamingSessions: GamingSession[] = [];
  private tournaments: GamingTournament[] = [];

  // Get all gaming clubs
  getGamingClubs(): GamingClub[] {
    return [...this.gamingClubs];
  }

  // Get gaming club by ID
  getGamingClubById(id: string): GamingClub | undefined {
    return this.gamingClubs.find(club => club.id === id);
  }

  // Create gaming session
  createGamingSession(session: Omit<GamingSession, 'id' | 'currentPlayers' | 'players' | 'status'>): GamingSession {
    const newSession: GamingSession = {
      ...session,
      id: `gs_${Date.now()}`,
      currentPlayers: 1,
      players: [],
      status: 'open',
      stage: 1
    };
    this.gamingSessions.push(newSession);
    return newSession;
  }

  // Get all gaming sessions
  getGamingSessions(): GamingSession[] {
    return [...this.gamingSessions];
  }

  // Join gaming session
  joinGamingSession(sessionId: string, player: GamingPlayer): boolean {
    const session = this.gamingSessions.find(s => s.id === sessionId);
    if (!session || session.currentPlayers >= session.maxPlayers) {
      return false;
    }
    
    session.players.push(player);
    session.currentPlayers++;
    
    // Check for soft lock (5-stage mode only)
    if (session.paymentMode === '5-stage' && session.currentPlayers >= session.minPlayers && session.status === 'open') {
      session.status = 'soft-lock';
      session.stage = 2;
    }
    
    return true;
  }

  // Process payment
  processPayment(sessionId: string, playerId: string): boolean {
    const session = this.gamingSessions.find(s => s.id === sessionId);
    if (!session) return false;

    const player = session.players.find(p => p.id === playerId);
    if (!player) return false;

    player.hasPaid = true;
    return true;
  }

  // Get tournaments
  getTournaments(): GamingTournament[] {
    return [...this.tournaments];
  }

  // Create tournament
  createTournament(tournament: Omit<GamingTournament, 'id' | 'currentTeams' | 'status'>): GamingTournament {
    const newTournament: GamingTournament = {
      ...tournament,
      id: `gt_${Date.now()}`,
      currentTeams: 0,
      status: 'registration'
    };
    this.tournaments.push(newTournament);
    return newTournament;
  }

  // Mock tournaments for demo
  initMockTournaments() {
    this.tournaments = [
      {
        id: 'gt1',
        name: 'FIFA 24 Championship',
        game: 'FIFA 24',
        clubId: 'gc3',
        startDate: '2025-12-15',
        registrationFee: 500,
        prizePool: 25000,
        maxTeams: 16,
        currentTeams: 12,
        format: 'single-elimination',
        teamSize: 1,
        status: 'registration'
      },
      {
        id: 'gt2',
        name: 'Valorant Squad Battle',
        game: 'Valorant',
        clubId: 'gc1',
        startDate: '2025-12-20',
        registrationFee: 2000,
        prizePool: 100000,
        maxTeams: 8,
        currentTeams: 5,
        format: 'double-elimination',
        teamSize: 5,
        status: 'registration'
      }
    ];
  }
}

export const gamingService = new GamingService();
