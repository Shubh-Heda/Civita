// Minimal compatibility shim for legacy Firebase-based advanced trust service.
// Provides a conservative, read-only mock implementation so UI components continue to work.
console.warn('[shim] advancedTrustServiceFirebase: using Supabase-compatible shim');

const advancedTrustService = {
  async getTrustScoreWithDimensions(userId: string) {
    // Return plausible default structure expected by TrustTransparencyPanel
    return {
      dimensions: [
        { name: 'reliability', weight: 0.5, score: 75 },
        { name: 'behavior', weight: 0.3, score: 68 },
        { name: 'community', weight: 0.2, score: 82 },
      ],
      weighted_calculation: {
        reliability: 75 * 0.5,
        behavior: 68 * 0.3,
        community: 82 * 0.2,
        total: Math.round(75 * 0.5 + 68 * 0.3 + 82 * 0.2),
      },
    };
  },

  async getEventLog(userId: string, limit = 30) {
    // Return empty or small mock log
    const now = Date.now();
    return Array.from({ length: Math.min(5, limit) }).map((_, i) => ({
      id: `evt-${i}`,
      userId,
      type: 'activity',
      description: `Mock event ${i + 1}`,
      created_at: new Date(now - i * 3600 * 1000).toISOString(),
    }));
  },

  async getScoreDiffs(userId: string, timeframe: 'week' | 'month' = 'month') {
    return {
      reliability: { total: 2, count: 3 },
      behavior: { total: -1, count: 2 },
      community: { total: 4, count: 5 },
    };
  },

  async checkDailyGainCap(userId: string) {
    return { canEarn: true, remainingToday: 15 };
  },
};

export { advancedTrustService };
export default advancedTrustService;
