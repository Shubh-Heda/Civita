/**
 * Pricing Service
 * Handles transparent upfront pricing with real-time cost calculation
 * Shows formula: Cost per person = Turf Cost / Number of Players
 */

export interface PricingBreakdown {
  turfCostPerHour: number;
  currentPlayerCount: number;
  minPlayersRequired: number;
  maxPlayersAllowed: number;
  costPerPlayer: {
    current: number; // Based on current players
    atMin: number; // Based on minimum players
    atMax: number; // Based on maximum players
  };
  totalCost: {
    current: number;
    atMin: number;
    atMax: number;
  };
  paymentOptions: PaymentOption[];
}

export interface PaymentOption {
  id: string;
  name: string;
  description: string;
  timing: 'upfront' | 'at_deadline' | 'split';
  organizesPays: number; // 0 = players split, 100 = organizer pays all
  icon: string;
  pros: string[];
  cons: string[];
}

class PricingService {
  /**
   * Calculate pricing breakdown for a match
   */
  calculatePricing(
    turfCostPerHour: number,
    currentPlayerCount: number,
    minPlayersRequired: number,
    maxPlayersAllowed: number,
    durationHours: number = 1
  ): PricingBreakdown {
    const totalTurfCost = turfCostPerHour * durationHours;

    return {
      turfCostPerHour,
      currentPlayerCount,
      minPlayersRequired,
      maxPlayersAllowed,
      costPerPlayer: {
        current: this.roundToNearestRupee(totalTurfCost / Math.max(currentPlayerCount, 1)),
        atMin: this.roundToNearestRupee(totalTurfCost / minPlayersRequired),
        atMax: this.roundToNearestRupee(totalTurfCost / maxPlayersAllowed),
      },
      totalCost: {
        current: totalTurfCost,
        atMin: totalTurfCost,
        atMax: totalTurfCost,
      },
      paymentOptions: this.getPaymentOptions(),
    };
  }

  /**
   * Get available payment options
   */
  private getPaymentOptions(): PaymentOption[] {
    return [
      {
        id: 'direct_split',
        name: '💳 Pay Directly (Split Equally)',
        description: 'Pay when you confirm your spot',
        timing: 'upfront',
        organizesPays: 0,
        icon: '💳',
        pros: [
          'Clear cost upfront',
          'Everyone pays fairly',
          'No surprises at deadline',
        ],
        cons: [
          'Must pay immediately to confirm',
          'Exact cost varies with final headcount',
        ],
      },
      {
        id: 'deadline_split',
        name: '⏱️ Pay at Deadline (Split Equally)',
        description: 'Payment triggered when deadline arrives',
        timing: 'at_deadline',
        organizesPays: 0,
        icon: '⏱️',
        pros: [
          'Flexible joining until deadline',
          'Equal split among all players',
          'Fair to everyone',
        ],
        cons: [
          'Automatic charge at deadline',
          'Cost per person varies until deadline',
          'Risk of losing spot if not paid',
        ],
      },
      {
        id: 'organizer_covers',
        name: '🎯 Organizer Covers All',
        description: 'Organizer pays the full cost',
        timing: 'upfront',
        organizesPays: 100,
        icon: '🎯',
        pros: [
          'Simplest for players',
          'No payment required from players',
          'Easy group participation',
        ],
        cons: [
          'Organizer bears all cost',
          'No cost-sharing benefit',
        ],
      },
      {
        id: 'tiered_pricing',
        name: '📊 Tiered Pricing',
        description: 'Cost per person decreases as more join',
        timing: 'at_deadline',
        organizesPays: 0,
        icon: '📊',
        pros: [
          'Incentivizes group participation',
          'Cheaper when more people join',
          'Fair dynamic pricing',
        ],
        cons: [
          'Final cost per person unknown until deadline',
          'Requires clear communication upfront',
        ],
      },
    ];
  }

  /**
   * Generate pricing formula message
   */
  generatePricingFormula(
    turfCostPerHour: number,
    minPlayers: number,
    maxPlayers: number,
    currentPlayers: number
  ): {
    formula: string;
    examples: string[];
    disclaimer: string;
  } {
    const costPerPlayerMin = this.roundToNearestRupee(turfCostPerHour / minPlayers);
    const costPerPlayerMax = this.roundToNearestRupee(turfCostPerHour / maxPlayers);
    const costPerPlayerCurrent = this.roundToNearestRupee(turfCostPerHour / currentPlayers);

    return {
      formula: `💰 **Cost per person** = Total Turf Cost ÷ Number of Players\n\n**Cost per person** = ₹${turfCostPerHour} ÷ [Player Count]`,
      examples: [
        `📌 With ${minPlayers} players: ₹${costPerPlayerMin} per person`,
        `📌 With ${currentPlayers} players: ₹${costPerPlayerCurrent} per person`,
        `📌 With ${maxPlayers} players: ₹${costPerPlayerMax} per person (cheapest!)`,
      ],
      disclaimer: `ℹ️ **Cost will be finalized when the deadline is reached.** The exact amount per person depends on how many players ultimately join. The more players, the cheaper for everyone!`,
    };
  }

  /**
   * Generate tiered pricing breakdown
   */
  generateTieredPricing(
    turfCostPerHour: number,
    minPlayers: number,
    maxPlayers: number
  ): {
    tier: string;
    playerCount: string;
    costPerPlayer: number;
    totalCost: number;
    savings: string;
  }[] {
    const tiers = [];
    const step = Math.ceil((maxPlayers - minPlayers) / 3);

    for (let i = minPlayers; i <= maxPlayers; i += step) {
      const costPerPlayer = this.roundToNearestRupee(turfCostPerHour / i);
      const minCostPerPlayer = this.roundToNearestRupee(turfCostPerHour / minPlayers);
      const savings = ((minCostPerPlayer - costPerPlayer) / minCostPerPlayer * 100).toFixed(0);

      tiers.push({
        tier: this.getTierLabel(i, minPlayers, maxPlayers),
        playerCount: `${i} players`,
        costPerPlayer,
        totalCost: turfCostPerHour,
        savings: parseInt(savings) > 0 ? `${savings}% cheaper` : 'Base price',
      });
    }

    // Ensure max players tier is included
    if ((maxPlayers - minPlayers) % step !== 0) {
      const costPerPlayer = this.roundToNearestRupee(turfCostPerHour / maxPlayers);
      const minCostPerPlayer = this.roundToNearestRupee(turfCostPerHour / minPlayers);
      const savings = ((minCostPerPlayer - costPerPlayer) / minCostPerPlayer * 100).toFixed(0);

      tiers.push({
        tier: this.getTierLabel(maxPlayers, minPlayers, maxPlayers),
        playerCount: `${maxPlayers} players`,
        costPerPlayer,
        totalCost: turfCostPerHour,
        savings: `${savings}% cheaper! 🎉`,
      });
    }

    return tiers;
  }

  /**
   * Get tier label
   */
  private getTierLabel(playerCount: number, minPlayers: number, maxPlayers: number): string {
    if (playerCount === minPlayers) return '🟢 Minimum';
    if (playerCount === maxPlayers) return '🌟 Maximum (Best Value)';
    const percentage = ((playerCount - minPlayers) / (maxPlayers - minPlayers)) * 100;
    if (percentage <= 33) return '🟡 Low';
    if (percentage <= 66) return '🟠 Medium';
    return '🔴 High';
  }

  /**
   * Calculate deadline based on match creation time
   * Returns deadline based on match timing
   */
  calculatePaymentDeadline(
    matchDateTime: Date,
    matchDurationMinutes: number = 60
  ): {
    deadline: Date;
    hoursUntilMatch: number;
    paymentWindowDuration: number; // in minutes
    reminderSchedule: {
      sevenDays: Date;
      threeDays: Date;
      oneDay: Date;
      hourly: boolean;
    };
  } {
    const now = new Date();
    const hoursUntilMatch = (matchDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    // Determine payment window duration based on how far away the match is
    let paymentWindowDuration = 90; // Default: 90 minutes for matches 6+ hours away
    if (hoursUntilMatch < 2) paymentWindowDuration = 30;
    else if (hoursUntilMatch < 6) paymentWindowDuration = 60;

    // Payment deadline = 5 minutes before match OR after payment window, whichever is earlier
    const fiveMinutesBeforeMatch = new Date(matchDateTime.getTime() - 5 * 60 * 1000);
    const deadline = new Date(Math.min(
      fiveMinutesBeforeMatch.getTime(),
      now.getTime() + paymentWindowDuration * 60 * 1000
    ));

    return {
      deadline,
      hoursUntilMatch,
      paymentWindowDuration,
      reminderSchedule: {
        sevenDays: new Date(deadline.getTime() - 7 * 24 * 60 * 60 * 1000),
        threeDays: new Date(deadline.getTime() - 3 * 24 * 60 * 60 * 1000),
        oneDay: new Date(deadline.getTime() - 24 * 60 * 60 * 1000),
        hourly: hoursUntilMatch <= 24,
      },
    };
  }

  /**
   * Format cost for display
   */
  formatCurrency(amount: number): string {
    return `₹${amount.toLocaleString('en-IN')}`;
  }

  /**
   * Round to nearest rupee
   */
  private roundToNearestRupee(amount: number): number {
    return Math.round(amount);
  }

  /**
   * Validate pricing inputs
   */
  validatePricing(
    turfCostPerHour: number,
    minPlayers: number,
    maxPlayers: number,
    currentPlayers: number
  ): {
    valid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (turfCostPerHour <= 0) errors.push('Turf cost must be greater than 0');
    if (minPlayers < 1) errors.push('Minimum players must be at least 1');
    if (maxPlayers < minPlayers) errors.push('Maximum players must be at least equal to minimum players');
    if (currentPlayers > maxPlayers) warnings.push('Current players exceed maximum allowed');
    if (currentPlayers < minPlayers && currentPlayers > 0) warnings.push('Not enough players yet to trigger payment');

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }
}

export const pricingService = new PricingService();
