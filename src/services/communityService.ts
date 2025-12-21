export interface CommunityPost {
  id: string;
  area: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  content: string;
  category: 'announcement' | 'discussion' | 'event' | 'question' | 'achievement';
  timestamp: Date;
  likes: number;
  comments: CommunityComment[];
  isPinned: boolean;
}

export interface CommunityComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: Date;
  likes: number;
}

export interface CommunityEvent {
  id: string;
  area: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  organizerId: string;
  organizerName: string;
  attendees: string[];
  maxAttendees?: number;
  category: 'tournament' | 'meetup' | 'workshop' | 'social';
}

export interface LocalArea {
  id: string;
  name: string;
  city: string;
  memberCount: number;
  activeMatches: number;
  description: string;
}

const MUMBAI_AREAS: LocalArea[] = [
  {
    id: 'bandra',
    name: 'Bandra',
    city: 'Mumbai',
    memberCount: 342,
    activeMatches: 12,
    description: 'West Mumbai\'s sports hub with vibrant community'
  },
  {
    id: 'andheri',
    name: 'Andheri',
    city: 'Mumbai',
    memberCount: 428,
    activeMatches: 18,
    description: 'Active sports community in the heart of suburbs'
  },
  {
    id: 'powai',
    name: 'Powai',
    city: 'Mumbai',
    memberCount: 267,
    activeMatches: 9,
    description: 'Lake-side community with weekend warriors'
  },
  {
    id: 'juhu',
    name: 'Juhu',
    city: 'Mumbai',
    memberCount: 189,
    activeMatches: 7,
    description: 'Beach-side sports and cultural events'
  },
  {
    id: 'malad',
    name: 'Malad',
    city: 'Mumbai',
    memberCount: 312,
    activeMatches: 14,
    description: 'Growing community with diverse sports'
  }
];

class CommunityService {
  private areas: LocalArea[] = MUMBAI_AREAS;
  private posts: CommunityPost[] = [];
  private events: CommunityEvent[] = [];

  constructor() {
    this.generateMockData();
  }

  private generateMockData() {
    const now = Date.now();

    // Generate community posts
    this.posts = [
      {
        id: 'post-1',
        area: 'bandra',
        authorId: 'user1',
        authorName: 'Rahul Sharma',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        title: 'Weekly Football Tournament Starting Next Month! 🏆',
        content: 'Hey Bandra community! We\'re organizing a 5-a-side tournament every Saturday. All skill levels welcome. Trust score 80+ preferred. Let\'s make this epic!',
        category: 'announcement',
        timestamp: new Date(now - 2 * 60 * 60 * 1000),
        likes: 24,
        comments: [
          {
            id: 'comment-1',
            postId: 'post-1',
            authorId: 'user2',
            authorName: 'Priya Singh',
            authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            content: 'Count me in! This sounds amazing 🎉',
            timestamp: new Date(now - 1 * 60 * 60 * 1000),
            likes: 5
          },
          {
            id: 'comment-2',
            postId: 'post-1',
            authorId: 'user3',
            authorName: 'Amit Patel',
            authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
            content: 'Finally! Been waiting for something like this. When\'s registration?',
            timestamp: new Date(now - 45 * 60 * 1000),
            likes: 3
          }
        ],
        isPinned: true
      },
      {
        id: 'post-2',
        area: 'andheri',
        authorId: 'user4',
        authorName: 'Sneha Desai',
        authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        title: 'Best turfs in Andheri for evening matches?',
        content: 'Looking for recommendations for good turfs with decent facilities. Preferably with changing rooms and parking. Where do you all usually play?',
        category: 'question',
        timestamp: new Date(now - 5 * 60 * 60 * 1000),
        likes: 12,
        comments: [
          {
            id: 'comment-3',
            postId: 'post-2',
            authorId: 'user5',
            authorName: 'Karan Mehta',
            authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
            content: 'Andheri Sports Complex is great! Good facilities and well maintained.',
            timestamp: new Date(now - 4 * 60 * 60 * 1000),
            likes: 7
          }
        ],
        isPinned: false
      },
      {
        id: 'post-3',
        area: 'powai',
        authorId: 'user6',
        authorName: 'Vikram Reddy',
        authorAvatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100',
        title: 'Hit my 50-game milestone! 🎉',
        content: 'Just completed my 50th match on Avento! Thank you to this amazing community for all the memories. From a nervous newbie to a confident player - what a journey!',
        category: 'achievement',
        timestamp: new Date(now - 24 * 60 * 60 * 1000),
        likes: 48,
        comments: [
          {
            id: 'comment-4',
            postId: 'post-3',
            authorId: 'user1',
            authorName: 'Rahul Sharma',
            authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            content: 'Congratulations! Here\'s to the next 50! 🚀',
            timestamp: new Date(now - 23 * 60 * 60 * 1000),
            likes: 4
          }
        ],
        isPinned: false
      },
      {
        id: 'post-4',
        area: 'juhu',
        authorId: 'user7',
        authorName: 'Neha Gupta',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        title: 'Beach Volleyball this Sunday?',
        content: 'Weather is looking perfect for beach volleyball this Sunday morning at Juhu Beach. Looking for 8-10 people. Newbie-friendly! Who\'s in? 🏐',
        category: 'event',
        timestamp: new Date(now - 8 * 60 * 60 * 1000),
        likes: 18,
        comments: [],
        isPinned: false
      },
      {
        id: 'post-5',
        area: 'malad',
        authorId: 'user8',
        authorName: 'Arjun Kumar',
        authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
        title: 'Tips for building trust score?',
        content: 'I\'ve been playing for 2 months now and my trust score is stuck at 78. Any tips from veteran players on how to improve it faster?',
        category: 'discussion',
        timestamp: new Date(now - 12 * 60 * 60 * 1000),
        likes: 9,
        comments: [
          {
            id: 'comment-5',
            postId: 'post-5',
            authorId: 'user2',
            authorName: 'Priya Singh',
            authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            content: 'Be consistently on time, communicate well with your team, and always show up. That\'s the secret!',
            timestamp: new Date(now - 11 * 60 * 60 * 1000),
            likes: 12
          }
        ],
        isPinned: false
      }
    ];

    // Generate community events
    this.events = [
      {
        id: 'event-1',
        area: 'bandra',
        title: 'Weekend Football League',
        description: '5-a-side tournament every Saturday. Registration open!',
        date: new Date(now + 7 * 24 * 60 * 60 * 1000),
        location: 'Bandra Sports Complex',
        organizerId: 'user1',
        organizerName: 'Rahul Sharma',
        attendees: ['user1', 'user2', 'user3', 'user4', 'user5'],
        maxAttendees: 40,
        category: 'tournament'
      },
      {
        id: 'event-2',
        area: 'andheri',
        title: 'Community Meetup & Cricket',
        description: 'Let\'s meet, play, and strengthen our community bonds!',
        date: new Date(now + 3 * 24 * 60 * 60 * 1000),
        location: 'Andheri Sports Arena',
        organizerId: 'user4',
        organizerName: 'Sneha Desai',
        attendees: ['user4', 'user5', 'user6'],
        maxAttendees: 20,
        category: 'meetup'
      },
      {
        id: 'event-3',
        area: 'powai',
        title: 'Fitness Workshop: Injury Prevention',
        description: 'Learn from certified trainers about staying fit and avoiding injuries.',
        date: new Date(now + 10 * 24 * 60 * 60 * 1000),
        location: 'Powai Lake Garden',
        organizerId: 'user6',
        organizerName: 'Vikram Reddy',
        attendees: ['user6', 'user7'],
        maxAttendees: 15,
        category: 'workshop'
      }
    ];
  }

  // Area methods
  getAllAreas(): LocalArea[] {
    return this.areas;
  }

  getAreaById(areaId: string): LocalArea | null {
    return this.areas.find(a => a.id === areaId) || null;
  }

  // Post methods
  getPostsByArea(areaId: string): CommunityPost[] {
    return this.posts
      .filter(p => p.area === areaId)
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.timestamp.getTime() - a.timestamp.getTime();
      });
  }

  getAllPosts(): CommunityPost[] {
    return this.posts.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  }

  getPostById(postId: string): CommunityPost | null {
    return this.posts.find(p => p.id === postId) || null;
  }

  createPost(post: Omit<CommunityPost, 'id' | 'timestamp' | 'likes' | 'comments' | 'isPinned'>): CommunityPost {
    const newPost: CommunityPost = {
      ...post,
      id: `post-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      likes: 0,
      comments: [],
      isPinned: false
    };

    this.posts.unshift(newPost);
    return newPost;
  }

  likePost(postId: string): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.likes++;
    }
  }

  addComment(postId: string, comment: Omit<CommunityComment, 'id' | 'postId' | 'timestamp' | 'likes'>): CommunityComment {
    const post = this.posts.find(p => p.id === postId);
    if (!post) throw new Error('Post not found');

    const newComment: CommunityComment = {
      ...comment,
      id: `comment-${Date.now()}-${Math.random()}`,
      postId,
      timestamp: new Date(),
      likes: 0
    };

    post.comments.push(newComment);
    return newComment;
  }

  // Event methods
  getEventsByArea(areaId: string): CommunityEvent[] {
    return this.events
      .filter(e => e.area === areaId)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  getAllEvents(): CommunityEvent[] {
    return this.events.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  getUpcomingEvents(limit?: number): CommunityEvent[] {
    const upcoming = this.events
      .filter(e => e.date.getTime() > Date.now())
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    
    return limit ? upcoming.slice(0, limit) : upcoming;
  }

  joinEvent(eventId: string, userId: string): void {
    const event = this.events.find(e => e.id === eventId);
    if (!event) throw new Error('Event not found');
    if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
      throw new Error('Event is full');
    }
    if (!event.attendees.includes(userId)) {
      event.attendees.push(userId);
    }
  }

  leaveEvent(eventId: string, userId: string): void {
    const event = this.events.find(e => e.id === eventId);
    if (!event) throw new Error('Event not found');
    event.attendees = event.attendees.filter(id => id !== userId);
  }
}

export const communityService = new CommunityService();
