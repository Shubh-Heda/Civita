/**
 * Match Payment Service
 * Handles payment processing for sports matches with cashback rewards
 */

import { supabase, supabaseEnabled } from '../lib/supabaseClient';

export interface PaymentProcessingRequest {
  userId: string;
  matchId: string;
  matchTitle: string;
  turfName: string;
  matchDate: string;
  matchTime: string;
  amount: number;
  paymentMethod: 'card' | 'upi' | 'wallet';
  category: string;
}

export interface PaymentProcessingResult {
  success: boolean;
  transactionId?: string;
  cashback?: number;
  message?: string;
  error?: string;
}

class MatchPaymentService {
  /**
   * Process match booking payment with optional cashback
   */
  async processMatchBooking(
    request: PaymentProcessingRequest
  ): Promise<PaymentProcessingResult> {
    try {
      console.log('💳 Processing match payment:', request);

      // Simulate payment processing
      const transactionId = `TXN_${Date.now()}`;
      
      // Calculate cashback (5% of amount)
      const cashback = Math.floor(request.amount * 0.05);

      // If Supabase is enabled, store the payment record
      if (supabaseEnabled && supabase) {
        try {
          const { error } = await supabase
            .from('match_payments')
            .insert({
              user_id: request.userId,
              match_id: request.matchId,
              amount: request.amount,
              payment_method: request.paymentMethod,
              transaction_id: transactionId,
              cashback: cashback,
              status: 'completed',
              category: request.category,
            });

          if (error) {
            console.error('❌ Error storing payment:', error);
            // Continue anyway - payment was successful
          } else {
            console.log('✅ Payment stored in database');
          }
        } catch (dbError) {
          console.error('❌ Database error:', dbError);
          // Continue anyway - payment was successful
        }
      }

      // Store payment locally
      const payments = JSON.parse(localStorage.getItem('match_payments') || '[]');
      payments.push({
        userId: request.userId,
        matchId: request.matchId,
        amount: request.amount,
        paymentMethod: request.paymentMethod,
        transactionId: transactionId,
        cashback: cashback,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('match_payments', JSON.stringify(payments));

      return {
        success: true,
        transactionId: transactionId,
        cashback: cashback,
        message: `Payment of ₹${request.amount} processed successfully`,
      };
    } catch (error) {
      console.error('❌ Payment processing failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment processing failed',
      };
    }
  }

  /**
   * Get payment history for a user
   */
  async getPaymentHistory(userId: string): Promise<any[]> {
    try {
      if (supabaseEnabled && supabase) {
        const { data, error } = await supabase
          .from('match_payments')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
      }

      // Fallback to localStorage
      const payments = JSON.parse(localStorage.getItem('match_payments') || '[]');
      return payments.filter((p: any) => p.userId === userId);
    } catch (error) {
      console.error('Error fetching payment history:', error);
      return [];
    }
  }

  /**
   * Get total cashback earned by user
   */
  async getTotalCashback(userId: string): Promise<number> {
    try {
      const payments = await this.getPaymentHistory(userId);
      return payments.reduce((sum: number, payment: any) => sum + (payment.cashback || 0), 0);
    } catch (error) {
      console.error('Error calculating cashback:', error);
      return 0;
    }
  }

  /**
   * Refund a payment
   */
  async refundPayment(transactionId: string): Promise<PaymentProcessingResult> {
    try {
      if (supabaseEnabled && supabase) {
        const { error } = await supabase
          .from('match_payments')
          .update({ status: 'refunded' })
          .eq('transaction_id', transactionId);

        if (error) throw error;
      }

      return {
        success: true,
        message: `Refund processed for transaction ${transactionId}`,
      };
    } catch (error) {
      console.error('Error processing refund:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Refund processing failed',
      };
    }
  }
}

export const matchPaymentService = new MatchPaymentService();
