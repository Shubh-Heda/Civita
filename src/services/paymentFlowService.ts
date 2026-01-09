/**
 * Payment Flow Service
 * Handles the 5-stage payment flow:
 * 1. Free Joining (anyone can join)
 * 2. Soft Lock (minimum players reached - payment window opens)
 * 3. Dynamic Payment Window (30-90 mins based on match timing)
 * 4. Hard Lock (removes unpaid players)
 * 5. Final Team Confirmation (exact share amounts)
 */

import { localStorageService } from './localStorageService';

export type PaymentStage = 
  | 'free_joining' 
  | 'soft_lock' 
  | 'payment_window' 
  | 'hard_lock' 
  | 'confirmed';

export interface PaymentStatus {
  userId: string;
  matchId: string;
  stage: PaymentStage;
  amountDue: number;
  amountPaid: number;
  isPaid: boolean;
  paidAt?: Date;
  paymentDeadline?: Date;
}

export interface MatchPaymentState {
  matchId: string;
  currentStage: PaymentStage;
  minPlayers: number;
  maxPlayers: number;
  currentPlayerCount: number;
  totalCost: number;
  costPerPlayer: number;
  paymentWindowStart?: Date;
  paymentWindowEnd?: Date;
  playerPayments: PaymentStatus[];
}

class PaymentFlowService {
  /**
   * Stage 1: Free Joining
   * Anyone can join without payment
   */
  joinMatch(matchId: string, userId: string): PaymentStatus {
    const payment: PaymentStatus = {
      userId,
      matchId,
      stage: 'free_joining',
      amountDue: 0,
      amountPaid: 0,
      isPaid: false,
    };

    this.savePaymentStatus(payment);
    return payment;
  }

  /**
   * Stage 2: Soft Lock
   * Triggered when minimum players reached
   * Opens payment window but doesn't remove anyone yet
   */
  triggerSoftLock(matchId: string, matchState: MatchPaymentState): MatchPaymentState {
    if (matchState.currentPlayerCount < matchState.minPlayers) {
      throw new Error('Minimum players not reached');
    }

    // Calculate payment window based on match timing
    const paymentWindowDuration = this.calculatePaymentWindowDuration(matchState);
    const now = new Date();
    const paymentWindowEnd = new Date(now.getTime() + paymentWindowDuration * 60000);

    matchState.currentStage = 'soft_lock';
    matchState.paymentWindowStart = now;
    matchState.paymentWindowEnd = paymentWindowEnd;
    matchState.costPerPlayer = matchState.totalCost / matchState.currentPlayerCount;

    // Update all player payment statuses
    matchState.playerPayments = matchState.playerPayments.map(payment => ({
      ...payment,
      stage: 'soft_lock',
      amountDue: matchState.costPerPlayer,
      paymentDeadline: paymentWindowEnd,
    }));

    this.saveMatchPaymentState(matchState);
    return matchState;
  }

  /**
   * Stage 3: Dynamic Payment Window
   * Duration based on match timing:
   * - Match in < 2 hours: 30 min window
   * - Match in 2-6 hours: 60 min window
   * - Match in > 6 hours: 90 min window
   */
  calculatePaymentWindowDuration(matchState: MatchPaymentState): number {
    // Mock: In real app, would check match.startTime
    const hoursUntilMatch = 4; // Example: 4 hours until match

    if (hoursUntilMatch < 2) return 30;
    if (hoursUntilMatch <= 6) return 60;
    return 90;
  }

  /**
   * Process a payment during the payment window
   */
  processPayment(
    matchId: string, 
    userId: string, 
    amount: number,
    paymentMethod: 'upi' | 'card' | 'wallet' = 'upi'
  ): PaymentStatus {
    const matchState = this.getMatchPaymentState(matchId);
    
    if (!matchState) {
      throw new Error('Match not found');
    }

    if (matchState.currentStage !== 'soft_lock' && matchState.currentStage !== 'payment_window') {
      throw new Error('Payment window not active');
    }

    const payment = matchState.playerPayments.find(p => p.userId === userId);
    
    if (!payment) {
      throw new Error('Player not in match');
    }

    if (payment.isPaid) {
      throw new Error('Payment already completed');
    }

    // Mock payment processing
    const updatedPayment: PaymentStatus = {
      ...payment,
      amountPaid: amount,
      isPaid: amount >= payment.amountDue,
      paidAt: new Date(),
      stage: 'payment_window',
    };

    // Update match state
    matchState.playerPayments = matchState.playerPayments.map(p => 
      p.userId === userId ? updatedPayment : p
    );

    this.saveMatchPaymentState(matchState);
    this.savePaymentStatus(updatedPayment);

    // Create payment transaction record
    this.recordPaymentTransaction(matchId, userId, amount, paymentMethod);

    return updatedPayment;
  }

  /**
   * Stage 4: Hard Lock
   * Remove unpaid players when payment window expires
   * Recalculate costs for remaining players
   */
  triggerHardLock(matchId: string): MatchPaymentState {
    const matchState = this.getMatchPaymentState(matchId);
    
    if (!matchState) {
      throw new Error('Match not found');
    }

    const now = new Date();
    if (matchState.paymentWindowEnd && now < matchState.paymentWindowEnd) {
      throw new Error('Payment window still active');
    }

    // Remove unpaid players
    const paidPlayers = matchState.playerPayments.filter(p => p.isPaid);
    const removedPlayers = matchState.playerPayments.filter(p => !p.isPaid);

    // Update player count
    matchState.currentPlayerCount = paidPlayers.length;

    // Check if still meets minimum requirements
    if (matchState.currentPlayerCount < matchState.minPlayers) {
      // Not enough players - cancel match
      matchState.currentStage = 'free_joining'; // Reset to allow new joins
      matchState.playerPayments = [];
      this.saveMatchPaymentState(matchState);
      
      // Refund all paid players
      paidPlayers.forEach(p => {
        this.processRefund(matchId, p.userId, p.amountPaid);
      });

      throw new Error('Match cancelled - insufficient players after payment deadline');
    }

    // Recalculate cost per player
    matchState.costPerPlayer = matchState.totalCost / matchState.currentPlayerCount;

    // Update payment statuses
    matchState.playerPayments = paidPlayers.map(payment => ({
      ...payment,
      stage: 'hard_lock',
      amountDue: matchState.costPerPlayer,
    }));

    matchState.currentStage = 'hard_lock';
    this.saveMatchPaymentState(matchState);

    // Notify removed players
    removedPlayers.forEach(p => {
      this.notifyPlayerRemoval(matchId, p.userId);
    });

    return matchState;
  }

  /**
   * Stage 5: Final Team Confirmation
   * Calculate exact share amounts and confirm team
   */
  confirmFinalTeam(matchId: string): MatchPaymentState {
    const matchState = this.getMatchPaymentState(matchId);
    
    if (!matchState) {
      throw new Error('Match not found');
    }

    if (matchState.currentStage !== 'hard_lock') {
      throw new Error('Hard lock not triggered yet');
    }

    // Verify all players have paid
    const allPaid = matchState.playerPayments.every(p => p.isPaid);
    
    if (!allPaid) {
      throw new Error('Not all players have paid');
    }

    // Calculate any payment adjustments due to player count changes
    const adjustments = this.calculatePaymentAdjustments(matchState);

    // Process refunds/additional payments if needed
    adjustments.forEach(adj => {
      if (adj.refundAmount > 0) {
        this.processRefund(matchId, adj.userId, adj.refundAmount);
      } else if (adj.additionalPayment > 0) {
        // Request additional payment (rare case)
        this.requestAdditionalPayment(matchId, adj.userId, adj.additionalPayment);
      }
    });

    // Confirm final team
    matchState.currentStage = 'confirmed';
    matchState.playerPayments = matchState.playerPayments.map(payment => ({
      ...payment,
      stage: 'confirmed',
    }));

    this.saveMatchPaymentState(matchState);

    // Send confirmation notifications
    matchState.playerPayments.forEach(p => {
      this.notifyMatchConfirmation(matchId, p.userId, p.amountPaid);
    });

    return matchState;
  }

  /**
   * Calculate payment adjustments based on final player count
   */
  private calculatePaymentAdjustments(matchState: MatchPaymentState) {
    const finalCostPerPlayer = matchState.costPerPlayer;
    
    return matchState.playerPayments.map(payment => {
      const difference = payment.amountPaid - finalCostPerPlayer;
      
      return {
        userId: payment.userId,
        originalAmount: payment.amountPaid,
        finalAmount: finalCostPerPlayer,
        refundAmount: difference > 0 ? difference : 0,
        additionalPayment: difference < 0 ? Math.abs(difference) : 0,
      };
    });
  }

  /**
   * Process a refund
   */
  private processRefund(matchId: string, userId: string, amount: number) {
    const refund = {
      id: `refund_${Date.now()}_${userId}`,
      matchId,
      userId,
      amount,
      timestamp: new Date(),
      status: 'completed',
      reason: 'Match cancelled or cost adjustment',
    };

    const payments = localStorageService.getPayments();
    payments.push(refund);
    localStorageService.setPayments(payments);

    // Notify user
    this.notifyRefund(matchId, userId, amount);
  }

  /**
   * Request additional payment from player
   */
  private requestAdditionalPayment(matchId: string, userId: string, amount: number) {
    // In real app, would send payment request notification
    console.log(`Requesting additional payment from ${userId}: ₹${amount}`);
  }

  /**
   * Record payment transaction
   */
  private recordPaymentTransaction(
    matchId: string,
    userId: string,
    amount: number,
    method: string
  ) {
    const transaction = {
      id: `txn_${Date.now()}_${userId}`,
      matchId,
      userId,
      amount,
      method,
      timestamp: new Date(),
      status: 'completed',
    };

    const payments = localStorageService.getPayments();
    payments.push(transaction);
    localStorageService.setPayments(payments);
  }

  /**
   * Save payment status
   */
  private savePaymentStatus(payment: PaymentStatus) {
    const payments = localStorageService.getPayments();
    const index = payments.findIndex(
      p => p.userId === payment.userId && p.matchId === payment.matchId
    );

    if (index >= 0) {
      payments[index] = payment;
    } else {
      payments.push(payment);
    }

    localStorageService.setPayments(payments);
  }

  /**
   * Get match payment state
   */
  getMatchPaymentState(matchId: string): MatchPaymentState | null {
    const matches = localStorageService.getSportsMatches();
    const match = matches.find(m => m.id === matchId);
    
    if (!match || !match.paymentState) {
      return null;
    }

    return match.paymentState;
  }

  /**
   * Save match payment state
   */
  private saveMatchPaymentState(state: MatchPaymentState) {
    const matches = localStorageService.getSportsMatches();
    const index = matches.findIndex(m => m.id === state.matchId);

    if (index >= 0) {
      matches[index].paymentState = state;
      localStorageService.setSportsMatches(matches);
    }
  }

  /**
   * Notification methods (mock)
   */
  private notifyPlayerRemoval(matchId: string, userId: string) {
    console.log(`Notifying ${userId} of removal from match ${matchId}`);
  }

  private notifyMatchConfirmation(matchId: string, userId: string, amount: number) {
    console.log(`Notifying ${userId} of match confirmation. Amount paid: ₹${amount}`);
  }

  private notifyRefund(matchId: string, userId: string, amount: number) {
    console.log(`Notifying ${userId} of refund: ₹${amount}`);
  }

  /**
   * Check if payment window has expired
   */
  isPaymentWindowExpired(matchId: string): boolean {
    const matchState = this.getMatchPaymentState(matchId);
    
    if (!matchState || !matchState.paymentWindowEnd) {
      return false;
    }

    return new Date() > matchState.paymentWindowEnd;
  }

  /**
   * Get payment summary for a match
   */
  getPaymentSummary(matchId: string) {
    const matchState = this.getMatchPaymentState(matchId);
    
    if (!matchState) {
      return null;
    }

    const paidCount = matchState.playerPayments.filter(p => p.isPaid).length;
    const unpaidCount = matchState.playerPayments.length - paidCount;
    const totalCollected = matchState.playerPayments
      .filter(p => p.isPaid)
      .reduce((sum, p) => sum + p.amountPaid, 0);

    return {
      matchId,
      currentStage: matchState.currentStage,
      totalPlayers: matchState.playerPayments.length,
      paidPlayers: paidCount,
      unpaidPlayers: unpaidCount,
      totalCost: matchState.totalCost,
      costPerPlayer: matchState.costPerPlayer,
      totalCollected,
      paymentWindowEnd: matchState.paymentWindowEnd,
      isPaymentWindowActive: matchState.paymentWindowEnd && new Date() < matchState.paymentWindowEnd,
    };
  }

  /**
   * Schedule reminders for all players in a match
   * Called when soft lock is triggered
   */
  schedulePaymentReminders(matchId: string, matchState: MatchPaymentState): void {
    try {
      // Import here to avoid circular dependency
      const { deadlineReminderService } = require('./deadlineReminderService');
      
      if (!matchState.paymentWindowEnd) {
        console.warn('No payment window end date set for reminders');
        return;
      }

      // Schedule reminders for all players
      matchState.playerPayments.forEach(payment => {
        deadlineReminderService.createReminder(
          matchId,
          payment.userId,
          matchState.paymentWindowEnd!
        );
      });

      console.log(`[PaymentFlow] Reminders scheduled for ${matchState.playerPayments.length} players`);
    } catch (error) {
      console.error('Failed to schedule payment reminders:', error);
    }
  }

  /**
   * Cancel all reminders for a match
   * Called when match is cancelled or completed
   */
  cancelPaymentReminders(matchId: string, matchState: MatchPaymentState): void {
    try {
      const { deadlineReminderService } = require('./deadlineReminderService');
      
      matchState.playerPayments.forEach(payment => {
        deadlineReminderService.cancelReminders(matchId, payment.userId);
      });

      console.log(`[PaymentFlow] Reminders cancelled for match ${matchId}`);
    } catch (error) {
      console.error('Failed to cancel payment reminders:', error);
    }
  }
}

export const paymentFlowService = new PaymentFlowService();
