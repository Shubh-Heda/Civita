export interface Photo {
  id: string;
  matchId: string;
  userId: string;
  url: string;
  caption: string;
  uploadedAt: string;
  likes: number;
  comments: Array<{
    userId: string;
    userName: string;
    text: string;
    timestamp: string;
  }>;
  tags: string[];
}

export interface Album {
  id: string;
  matchId: string;
  title: string;
  description: string;
  photos: Photo[];
  createdAt: string;
  coverPhoto: string;
  totalPhotos: number;
  views: number;
}

export interface HighlightReel {
  id: string;
  matchId: string;
  title: string;
  description: string;
  videoDuration: number;
  thumbnail: string;
  views: number;
  likes: number;
  createdAt: string;
  category: 'sports' | 'events' | 'parties' | 'gaming';
  highlights: Array<{
    timestamp: number;
    description: string;
    emotion: 'celebration' | 'action' | 'moment' | 'funny';
  }>;
}

export interface MemoryEntry {
  id: string;
  userId: string;
  matchId: string;
  date: string;
  title: string;
  description: string;
  photos: Photo[];
  category: 'sports' | 'events' | 'parties' | 'gaming';
  mood: string;
  participants: string[];
  location: string;
}

class PhotosService {
  private photos: Photo[] = [
    {
      id: 'photo_1',
      matchId: 'match_001',
      userId: 'user_001',
      url: '🏆',
      caption: 'Victory moment! Celebrating the win with the team',
      uploadedAt: '2025-01-10',
      likes: 24,
      comments: [
        { userId: 'user_002', userName: 'Alex', text: 'Amazing shot! 🎉', timestamp: '2 hours ago' },
        { userId: 'user_003', userName: 'Jordan', text: 'Best match ever!', timestamp: '1 hour ago' }
      ],
      tags: ['victory', 'team', 'celebration', 'sports']
    },
    {
      id: 'photo_2',
      matchId: 'match_001',
      userId: 'user_001',
      url: '⚽',
      caption: 'Pre-match huddle - Team energy was incredible',
      uploadedAt: '2025-01-10',
      likes: 18,
      comments: [
        { userId: 'user_004', userName: 'Sam', text: 'Epic team spirit!', timestamp: '3 hours ago' }
      ],
      tags: ['team', 'huddle', 'motivation', 'sports']
    },
    {
      id: 'photo_3',
      matchId: 'match_002',
      userId: 'user_002',
      url: '🎮',
      caption: 'Gaming championship - First place trophy!',
      uploadedAt: '2025-01-12',
      likes: 45,
      comments: [
        { userId: 'user_001', userName: 'Chris', text: 'Congrats! Well played 🏆', timestamp: '1 hour ago' }
      ],
      tags: ['gaming', 'championship', 'trophy', 'esports']
    }
  ];

  private albums: Album[] = [
    {
      id: 'album_1',
      matchId: 'match_001',
      title: 'Sunday Football League - Victory Album',
      description: 'Highlights from our amazing win against City FC. Great team performance!',
      photos: [],
      createdAt: '2025-01-10',
      coverPhoto: '🏆',
      totalPhotos: 24,
      views: 156
    },
    {
      id: 'album_2',
      matchId: 'match_002',
      title: 'Gaming Championship Finals',
      description: 'Final tournament photos - An unforgettable esports experience!',
      photos: [],
      createdAt: '2025-01-12',
      coverPhoto: '🎮',
      totalPhotos: 38,
      views: 342
    },
    {
      id: 'album_3',
      matchId: 'match_003',
      title: 'Badminton Tournament Moments',
      description: 'Action shots and celebrations from the regional badminton championship',
      photos: [],
      createdAt: '2025-01-15',
      coverPhoto: '🏸',
      totalPhotos: 31,
      views: 89
    }
  ];

  private highlightReels: HighlightReel[] = [
    {
      id: 'reel_1',
      matchId: 'match_001',
      title: 'Football League - Best Moments',
      description: 'Epic goals, amazing saves, and team celebrations from our championship match',
      videoDuration: 120,
      thumbnail: '🏆',
      views: 450,
      likes: 89,
      createdAt: '2025-01-10',
      category: 'sports',
      highlights: [
        { timestamp: 5, description: 'Opening kick off', emotion: 'action' },
        { timestamp: 30, description: 'First goal!', emotion: 'celebration' },
        { timestamp: 60, description: 'Incredible save', emotion: 'action' },
        { timestamp: 90, description: 'Final goal', emotion: 'celebration' },
        { timestamp: 115, description: 'Victory lap', emotion: 'celebration' }
      ]
    },
    {
      id: 'reel_2',
      matchId: 'match_002',
      title: 'Gaming Championship - Pro Plays',
      description: 'Watch the most intense gaming moments and winning strategies from our esports tournament',
      videoDuration: 180,
      thumbnail: '🎮',
      views: 890,
      likes: 234,
      createdAt: '2025-01-12',
      category: 'gaming',
      highlights: [
        { timestamp: 10, description: 'Clutch play', emotion: 'action' },
        { timestamp: 45, description: 'Round win', emotion: 'celebration' },
        { timestamp: 90, description: 'Team coordination', emotion: 'action' },
        { timestamp: 150, description: 'Championship point', emotion: 'celebration' },
        { timestamp: 175, description: 'Trophy lift', emotion: 'celebration' }
      ]
    }
  ];

  private memories: MemoryEntry[] = [
    {
      id: 'memory_1',
      userId: 'user_001',
      matchId: 'match_001',
      date: '2025-01-10',
      title: 'First Victory with the Team',
      description: 'Will never forget this amazing moment! The energy on the field was incredible, and we dominated the game from start to finish.',
      photos: [],
      category: 'sports',
      mood: '🥳 Excited',
      participants: ['Alex', 'Jordan', 'Sam', 'Chris'],
      location: 'Central Sports Complex, Mumbai'
    },
    {
      id: 'memory_2',
      userId: 'user_002',
      matchId: 'match_002',
      date: '2025-01-12',
      title: 'Championship Dream Come True',
      description: 'After months of training and preparation, we finally did it! Won the gaming championship. This is a day I will cherish forever.',
      photos: [],
      category: 'gaming',
      mood: '😭 Emotional',
      participants: ['Team Alpha', 'Team Beta'],
      location: 'Gaming Arena, Bangalore'
    },
    {
      id: 'memory_3',
      userId: 'user_003',
      matchId: 'match_004',
      date: '2024-12-25',
      title: 'Holiday Sports Fest Fun',
      description: 'Had the best time at the holiday sports festival with friends. Made new connections and memories that will last forever!',
      photos: [],
      category: 'events',
      mood: '😊 Happy',
      participants: ['Friends', 'New acquaintances'],
      location: 'City Park, Delhi'
    }
  ];

  // Photos
  getPhotosByMatch(matchId: string): Photo[] {
    return this.photos.filter(p => p.matchId === matchId);
  }

  getPhotoById(photoId: string): Photo | null {
    return this.photos.find(p => p.id === photoId) || null;
  }

  uploadPhoto(photo: Omit<Photo, 'id'>): Photo {
    const newPhoto: Photo = {
      ...photo,
      id: `photo_${Date.now()}`
    };
    this.photos.push(newPhoto);
    return newPhoto;
  }

  likePhoto(photoId: string): void {
    const photo = this.getPhotoById(photoId);
    if (photo) {
      photo.likes++;
    }
  }

  addComment(photoId: string, comment: Photo['comments'][0]): void {
    const photo = this.getPhotoById(photoId);
    if (photo) {
      photo.comments.push(comment);
    }
  }

  // Albums
  getAlbumsByMatch(matchId: string): Album[] {
    return this.albums.filter(a => a.matchId === matchId);
  }

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(albumId: string): Album | null {
    return this.albums.find(a => a.id === albumId) || null;
  }

  createAlbum(album: Omit<Album, 'id'>): Album {
    const newAlbum: Album = {
      ...album,
      id: `album_${Date.now()}`
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  // Highlight Reels
  getReelsByCategory(category: 'sports' | 'events' | 'parties' | 'gaming'): HighlightReel[] {
    return this.highlightReels.filter(r => r.category === category);
  }

  getReelsByMatch(matchId: string): HighlightReel[] {
    return this.highlightReels.filter(r => r.matchId === matchId);
  }

  getReelById(reelId: string): HighlightReel | null {
    return this.highlightReels.find(r => r.id === reelId) || null;
  }

  getTrendingReels(): HighlightReel[] {
    return this.highlightReels.sort((a, b) => b.views - a.views).slice(0, 6);
  }

  createReel(reel: Omit<HighlightReel, 'id'>): HighlightReel {
    const newReel: HighlightReel = {
      ...reel,
      id: `reel_${Date.now()}`
    };
    this.highlightReels.push(newReel);
    return newReel;
  }

  likeReel(reelId: string): void {
    const reel = this.getReelById(reelId);
    if (reel) {
      reel.likes++;
    }
  }

  viewReel(reelId: string): void {
    const reel = this.getReelById(reelId);
    if (reel) {
      reel.views++;
    }
  }

  // Memory Timeline
  getMemoriesByUser(userId: string): MemoryEntry[] {
    return this.memories.filter(m => m.userId === userId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getMemoriesByCategory(category: 'sports' | 'events' | 'parties' | 'gaming'): MemoryEntry[] {
    return this.memories.filter(m => m.category === category).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getMemoryById(memoryId: string): MemoryEntry | null {
    return this.memories.find(m => m.id === memoryId) || null;
  }

  createMemory(memory: Omit<MemoryEntry, 'id'>): MemoryEntry {
    const newMemory: MemoryEntry = {
      ...memory,
      id: `memory_${Date.now()}`
    };
    this.memories.push(newMemory);
    return newMemory;
  }

  getRecentMemories(limit: number = 5): MemoryEntry[] {
    return this.memories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
  }

  getPhotoStats() {
    return {
      totalPhotos: this.photos.length,
      totalAlbums: this.albums.length,
      totalReels: this.highlightReels.length,
      totalMemories: this.memories.length,
      totalViews: this.highlightReels.reduce((sum, r) => sum + r.views, 0),
      totalLikes: this.photos.reduce((sum, p) => sum + p.likes, 0) + this.highlightReels.reduce((sum, r) => sum + r.likes, 0)
    };
  }
}

export const photosService = new PhotosService();
