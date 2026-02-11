export interface MatchPhoto {
  id: string;
  matchId: string;
  matchTitle: string;
  uploaderId: string;
  uploaderName: string;
  imageUrl: string;
  caption?: string;
  timestamp: Date;
  likes: number;
  likedBy: string[];
  taggedUsers: string[];
}

export interface PhotoAlbum {
  matchId: string;
  matchTitle: string;
  matchDate: Date;
  photos: MatchPhoto[];
  totalLikes: number;
}

class PhotoService {
  private photos: MatchPhoto[] = [];

  constructor() {
    this.generateMockPhotos();
  }

  private generateMockPhotos() {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
      'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
      'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800'
    ];

    const users = [
      { id: 'user1', name: 'Rahul Sharma' },
      { id: 'user2', name: 'Priya Singh' },
      { id: 'user3', name: 'Amit Patel' }
    ];

    const captions = [
      'What a game! 🔥',
      'Best team ever! ⚽',
      'Victory feels sweet! 🏆',
      'Another amazing match with amazing people ❤️',
      'This is what Civta is all about! 🎉',
      'Great vibes, great game!',
      'Couldn\'t ask for better teammates!'
    ];

    for (let i = 0; i < 15; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const photo: MatchPhoto = {
        id: `photo-${i + 1}`,
        matchId: `match-${Math.floor(i / 3) + 1}`,
        matchTitle: `Football Match #${Math.floor(i / 3) + 1}`,
        uploaderId: user.id,
        uploaderName: user.name,
        imageUrl: samplePhotos[Math.floor(Math.random() * samplePhotos.length)],
        caption: Math.random() > 0.3 ? captions[Math.floor(Math.random() * captions.length)] : undefined,
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        likes: Math.floor(Math.random() * 50) + 5,
        likedBy: [],
        taggedUsers: users.slice(0, Math.floor(Math.random() * 3) + 1).map(u => u.id)
      };

      this.photos.push(photo);
    }
  }

  uploadPhoto(photo: Omit<MatchPhoto, 'id' | 'timestamp' | 'likes' | 'likedBy'>): MatchPhoto {
    const newPhoto: MatchPhoto = {
      ...photo,
      id: `photo-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      likes: 0,
      likedBy: []
    };

    this.photos.unshift(newPhoto);
    return newPhoto;
  }

  getPhotosByMatch(matchId: string): MatchPhoto[] {
    return this.photos
      .filter(p => p.matchId === matchId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  getPhotosByUser(userId: string): MatchPhoto[] {
    return this.photos
      .filter(p => p.uploaderId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  getRecentPhotos(limit: number = 20): MatchPhoto[] {
    return this.photos
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  getPhotoAlbums(): PhotoAlbum[] {
    const albumMap = new Map<string, PhotoAlbum>();

    this.photos.forEach(photo => {
      if (!albumMap.has(photo.matchId)) {
        albumMap.set(photo.matchId, {
          matchId: photo.matchId,
          matchTitle: photo.matchTitle,
          matchDate: photo.timestamp,
          photos: [],
          totalLikes: 0
        });
      }

      const album = albumMap.get(photo.matchId)!;
      album.photos.push(photo);
      album.totalLikes += photo.likes;
    });

    return Array.from(albumMap.values())
      .sort((a, b) => b.matchDate.getTime() - a.matchDate.getTime());
  }

  likePhoto(photoId: string, userId: string): void {
    const photo = this.photos.find(p => p.id === photoId);
    if (!photo) return;

    if (!photo.likedBy.includes(userId)) {
      photo.likedBy.push(userId);
      photo.likes++;
    }
  }

  unlikePhoto(photoId: string, userId: string): void {
    const photo = this.photos.find(p => p.id === photoId);
    if (!photo) return;

    const index = photo.likedBy.indexOf(userId);
    if (index > -1) {
      photo.likedBy.splice(index, 1);
      photo.likes--;
    }
  }

  deletePhoto(photoId: string, userId: string): boolean {
    const index = this.photos.findIndex(p => p.id === photoId && p.uploaderId === userId);
    if (index > -1) {
      this.photos.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const photoService = new PhotoService();
