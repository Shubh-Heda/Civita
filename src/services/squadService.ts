export interface Squad {
  id: string;
  name: string;
  description: string;
  creatorId: string;
  members: string[];
  createdAt: Date;
  sport: string;
  avatar?: string;
  stats: {
    matchesPlayed: number;
    wins: number;
    totalGoals?: number;
  };
  achievements: string[];
}

export interface SquadMatch {
  squadId: string;
  matchId: string;
  result?: 'win' | 'loss' | 'draw';
  score?: string;
}

class SquadService {
  private squads: Squad[] = [];
  private squadMatches: SquadMatch[] = [];

  constructor() {
    this.generateMockSquads();
  }

  private generateMockSquads() {
    this.squads = [
      {
        id: 'squad-1',
        name: 'Weekend Warriors',
        description: 'Saturday morning football enthusiasts',
        creatorId: 'user1',
        members: ['user1', 'user2', 'user3', 'user4'],
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        sport: 'Football',
        avatar: '⚽',
        stats: {
          matchesPlayed: 24,
          wins: 16,
          totalGoals: 87
        },
        achievements: ['10 Wins', 'Perfect Attendance', '50 Goals']
      },
      {
        id: 'squad-2',
        name: 'The A-Team',
        description: 'Competitive cricket squad',
        creatorId: 'user2',
        members: ['user2', 'user5', 'user6'],
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        sport: 'Cricket',
        avatar: '🏏',
        stats: {
          matchesPlayed: 12,
          wins: 8
        },
        achievements: ['Winning Streak']
      },
      {
        id: 'squad-3',
        name: 'Thunder Strikers',
        description: 'Mixed skill level, all welcome!',
        creatorId: 'user3',
        members: ['user3', 'user4', 'user5', 'user6', 'user7'],
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        sport: 'Football',
        avatar: '⚡',
        stats: {
          matchesPlayed: 8,
          wins: 4,
          totalGoals: 28
        },
        achievements: []
      }
    ];
  }

  getAllSquads(): Squad[] {
    return this.squads;
  }

  getUserSquads(userId: string): Squad[] {
    return this.squads.filter(squad => 
      squad.members.includes(userId) || squad.creatorId === userId
    );
  }

  getSquadById(squadId: string): Squad | null {
    return this.squads.find(s => s.id === squadId) || null;
  }

  createSquad(squad: Omit<Squad, 'id' | 'createdAt' | 'stats' | 'achievements'>): Squad {
    const newSquad: Squad = {
      ...squad,
      id: `squad-${Date.now()}-${Math.random()}`,
      createdAt: new Date(),
      stats: {
        matchesPlayed: 0,
        wins: 0,
        totalGoals: 0
      },
      achievements: []
    };

    this.squads.push(newSquad);
    return newSquad;
  }

  addMember(squadId: string, userId: string): boolean {
    const squad = this.squads.find(s => s.id === squadId);
    if (!squad) return false;

    if (!squad.members.includes(userId)) {
      squad.members.push(userId);
      return true;
    }
    return false;
  }

  removeMember(squadId: string, userId: string): boolean {
    const squad = this.squads.find(s => s.id === squadId);
    if (!squad) return false;

    const index = squad.members.indexOf(userId);
    if (index > -1) {
      squad.members.splice(index, 1);
      return true;
    }
    return false;
  }

  updateSquad(squadId: string, updates: Partial<Omit<Squad, 'id' | 'createdAt' | 'creatorId'>>): Squad | null {
    const squad = this.squads.find(s => s.id === squadId);
    if (!squad) return null;

    Object.assign(squad, updates);
    return squad;
  }

  deleteSquad(squadId: string, userId: string): boolean {
    const index = this.squads.findIndex(s => s.id === squadId && s.creatorId === userId);
    if (index > -1) {
      this.squads.splice(index, 1);
      return true;
    }
    return false;
  }

  recordMatch(squadId: string, matchId: string, result?: 'win' | 'loss' | 'draw', score?: string): void {
    const squad = this.squads.find(s => s.id === squadId);
    if (!squad) return;

    this.squadMatches.push({
      squadId,
      matchId,
      result,
      score
    });

    squad.stats.matchesPlayed++;
    if (result === 'win') {
      squad.stats.wins++;
    }
  }

  getSquadMatches(squadId: string): SquadMatch[] {
    return this.squadMatches.filter(sm => sm.squadId === squadId);
  }
}

export const squadService = new SquadService();
