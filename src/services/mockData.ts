// Mock data for services that need it
export const mockUsers = [
  {
    id: 'user1',
    name: 'Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    trustScore: 92,
    currentStreak: 12,
    matchesPlayed: 45,
    badges: ['High trust zone', 'Consistent player']
  },
  {
    id: 'user2',
    name: 'Priya Singh',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    trustScore: 88,
    currentStreak: 8,
    matchesPlayed: 32,
    badges: ['Newbie-friendly', 'Team player']
  },
  {
    id: 'user3',
    name: 'Amit Patel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    trustScore: 85,
    currentStreak: 15,
    matchesPlayed: 58,
    badges: ['High trust zone', 'Veteran']
  },
  {
    id: 'user4',
    name: 'Sneha Desai',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    trustScore: 90,
    currentStreak: 5,
    matchesPlayed: 28,
    badges: ['Friendly', 'Reliable']
  },
  {
    id: 'user5',
    name: 'Karan Mehta',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    trustScore: 87,
    currentStreak: 20,
    matchesPlayed: 67,
    badges: ['High trust zone', 'Consistent player']
  },
  {
    id: 'user6',
    name: 'Vikram Reddy',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100',
    trustScore: 83,
    currentStreak: 3,
    matchesPlayed: 19,
    badges: ['Newbie-friendly']
  },
  {
    id: 'user7',
    name: 'Neha Gupta',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    trustScore: 91,
    currentStreak: 10,
    matchesPlayed: 41,
    badges: ['High trust zone', 'Social']
  },
  {
    id: 'user8',
    name: 'Arjun Kumar',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
    trustScore: 78,
    currentStreak: 2,
    matchesPlayed: 12,
    badges: ['Learning']
  },
  {
    id: 'user9',
    name: 'Divya Menon',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    trustScore: 94,
    currentStreak: 25,
    matchesPlayed: 89,
    badges: ['High trust zone', 'Legend', 'Consistent player']
  },
  {
    id: 'user10',
    name: 'Rohan Joshi',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100',
    trustScore: 86,
    currentStreak: 7,
    matchesPlayed: 34,
    badges: ['Reliable', 'Team player']
  }
];

export const mockMatches = [
  {
    id: 'match1',
    title: 'Saturday Morning Football',
    sport: 'Football',
    dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    location: 'Bandra Sports Complex',
    organizerId: 'user1'
  },
  {
    id: 'match2',
    title: 'Sunday Cricket Match',
    sport: 'Cricket',
    dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    location: 'Andheri Cricket Ground',
    organizerId: 'user2'
  },
  {
    id: 'match3',
    title: 'Evening Badminton',
    sport: 'Badminton',
    dateTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    location: 'Powai Sports Arena',
    organizerId: 'user3'
  },
  {
    id: 'match4',
    title: 'Weekend Basketball',
    sport: 'Basketball',
    dateTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    location: 'Malad Indoor Stadium',
    organizerId: 'user4'
  },
  {
    id: 'match5',
    title: 'Friday Night Football',
    sport: 'Football',
    dateTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    location: 'Juhu Turf',
    organizerId: 'user5'
  }
];

export const mockTurfs = [
  {
    id: 'turf1',
    name: 'Bandra Sports Complex',
    location: 'Bandra West, Mumbai',
    sports: ['Football', 'Cricket'],
    rating: 4.5
  },
  {
    id: 'turf2',
    name: 'Andheri Cricket Ground',
    location: 'Andheri East, Mumbai',
    sports: ['Cricket'],
    rating: 4.3
  },
  {
    id: 'turf3',
    name: 'Powai Sports Arena',
    location: 'Powai, Mumbai',
    sports: ['Badminton', 'Tennis', 'Football'],
    rating: 4.7
  },
  {
    id: 'turf4',
    name: 'Malad Indoor Stadium',
    location: 'Malad West, Mumbai',
    sports: ['Basketball', 'Volleyball'],
    rating: 4.4
  },
  {
    id: 'turf5',
    name: 'Juhu Turf',
    location: 'Juhu, Mumbai',
    sports: ['Football', 'Cricket'],
    rating: 4.6
  }
];
