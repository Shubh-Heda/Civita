export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit' | 'refund' | 'cashback' | 'referral_bonus';
  amount: number;
  description: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  relatedMatchId?: string;
  relatedMatchTitle?: string;
}

export interface Wallet {
  userId: string;
  balance: number;
  totalCredits: number;
  totalDebits: number;
  cashbackEarned: number;
  referralBonuses: number;
  transactions: WalletTransaction[];
}

class WalletService {
  private wallets: Map<string, Wallet> = new Map();

  constructor() {
    this.initializeMockWallets();
  }

  private initializeMockWallets() {
    const userIds = ['user1', 'user2', 'user3', 'user4', 'user5'];
    
    userIds.forEach(userId => {
      const transactions = this.generateMockTransactions(userId);
      const totalCredits = transactions.filter(t => t.type === 'credit' || t.type === 'cashback' || t.type === 'referral_bonus' || t.type === 'refund').reduce((sum, t) => sum + t.amount, 0);
      const totalDebits = transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0);
      const cashbackEarned = transactions.filter(t => t.type === 'cashback').reduce((sum, t) => sum + t.amount, 0);
      const referralBonuses = transactions.filter(t => t.type === 'referral_bonus').reduce((sum, t) => sum + t.amount, 0);

      this.wallets.set(userId, {
        userId,
        balance: totalCredits - totalDebits,
        totalCredits,
        totalDebits,
        cashbackEarned,
        referralBonuses,
        transactions: transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      });
    });
  }

  private generateMockTransactions(userId: string): WalletTransaction[] {
    const transactions: WalletTransaction[] = [];
    const now = Date.now();

    // Initial credit
    transactions.push({
      id: `txn-${transactions.length}`,
      type: 'credit',
      amount: 500,
      description: 'Welcome bonus',
      timestamp: new Date(now - 30 * 24 * 60 * 60 * 1000),
      status: 'completed'
    });

    // Random transactions over the last month
    for (let i = 0; i < 15; i++) {
      const daysAgo = Math.random() * 30;
      const isDebit = Math.random() > 0.4;

      if (isDebit) {
        transactions.push({
          id: `txn-${transactions.length}`,
          type: 'debit',
          amount: Math.floor(Math.random() * 300) + 100,
          description: `Match payment`,
          timestamp: new Date(now - daysAgo * 24 * 60 * 60 * 1000),
          status: 'completed',
          relatedMatchId: `match-${i}`,
          relatedMatchTitle: `Football Match #${i + 1}`
        });

        // 30% chance of cashback
        if (Math.random() > 0.7) {
          transactions.push({
            id: `txn-${transactions.length}`,
            type: 'cashback',
            amount: Math.floor(Math.random() * 30) + 10,
            description: 'Cashback on match payment',
            timestamp: new Date(now - (daysAgo - 0.1) * 24 * 60 * 60 * 1000),
            status: 'completed'
          });
        }
      } else {
        // Credit transactions
        const creditTypes = ['credit', 'refund', 'referral_bonus'] as const;
        const type = creditTypes[Math.floor(Math.random() * creditTypes.length)];
        
        let description = '';
        let amount = 0;

        switch (type) {
          case 'credit':
            amount = [100, 200, 500, 1000][Math.floor(Math.random() * 4)];
            description = `Added ₹${amount} to wallet`;
            break;
          case 'refund':
            amount = Math.floor(Math.random() * 200) + 50;
            description = 'Match cancellation refund';
            break;
          case 'referral_bonus':
            amount = 100;
            description = 'Referral bonus';
            break;
        }

        transactions.push({
          id: `txn-${transactions.length}`,
          type,
          amount,
          description,
          timestamp: new Date(now - daysAgo * 24 * 60 * 60 * 1000),
          status: 'completed'
        });
      }
    }

    return transactions;
  }

  getWallet(userId: string): Wallet | null {
    return this.wallets.get(userId) || null;
  }

  getBalance(userId: string): number {
    return this.wallets.get(userId)?.balance || 0;
  }

  addCredit(userId: string, amount: number, description: string): WalletTransaction {
    const wallet = this.wallets.get(userId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    const transaction: WalletTransaction = {
      id: `txn-${Date.now()}-${Math.random()}`,
      type: 'credit',
      amount,
      description,
      timestamp: new Date(),
      status: 'completed'
    };

    wallet.transactions.unshift(transaction);
    wallet.balance += amount;
    wallet.totalCredits += amount;

    return transaction;
  }

  deductAmount(userId: string, amount: number, description: string, matchId?: string, matchTitle?: string): WalletTransaction {
    const wallet = this.wallets.get(userId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    if (wallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    const transaction: WalletTransaction = {
      id: `txn-${Date.now()}-${Math.random()}`,
      type: 'debit',
      amount,
      description,
      timestamp: new Date(),
      status: 'completed',
      relatedMatchId: matchId,
      relatedMatchTitle: matchTitle
    };

    wallet.transactions.unshift(transaction);
    wallet.balance -= amount;
    wallet.totalDebits += amount;

    // Simulate 10% cashback
    if (Math.random() > 0.5) {
      const cashback = Math.floor(amount * 0.1);
      this.addCashback(userId, cashback, `Cashback on ${description}`);
    }

    return transaction;
  }

  addCashback(userId: string, amount: number, description: string): WalletTransaction {
    const wallet = this.wallets.get(userId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    const transaction: WalletTransaction = {
      id: `txn-${Date.now()}-${Math.random()}`,
      type: 'cashback',
      amount,
      description,
      timestamp: new Date(),
      status: 'completed'
    };

    wallet.transactions.unshift(transaction);
    wallet.balance += amount;
    wallet.cashbackEarned += amount;
    wallet.totalCredits += amount;

    return transaction;
  }

  addReferralBonus(userId: string): WalletTransaction {
    const wallet = this.wallets.get(userId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    const bonusAmount = 100;
    const transaction: WalletTransaction = {
      id: `txn-${Date.now()}-${Math.random()}`,
      type: 'referral_bonus',
      amount: bonusAmount,
      description: 'Referral bonus - Friend joined Avento!',
      timestamp: new Date(),
      status: 'completed'
    };

    wallet.transactions.unshift(transaction);
    wallet.balance += bonusAmount;
    wallet.referralBonuses += bonusAmount;
    wallet.totalCredits += bonusAmount;

    return transaction;
  }

  getTransactionHistory(userId: string, limit?: number): WalletTransaction[] {
    const wallet = this.wallets.get(userId);
    if (!wallet) return [];

    return limit ? wallet.transactions.slice(0, limit) : wallet.transactions;
  }

  getTransactionsByType(userId: string, type: WalletTransaction['type']): WalletTransaction[] {
    const wallet = this.wallets.get(userId);
    if (!wallet) return [];

    return wallet.transactions.filter(t => t.type === type);
  }

  getMonthlySpending(userId: string): { month: string; amount: number }[] {
    const wallet = this.wallets.get(userId);
    if (!wallet) return [];

    const monthlyData: Map<string, number> = new Map();

    wallet.transactions
      .filter(t => t.type === 'debit')
      .forEach(transaction => {
        const monthKey = transaction.timestamp.toLocaleString('default', { month: 'short', year: 'numeric' });
        const current = monthlyData.get(monthKey) || 0;
        monthlyData.set(monthKey, current + transaction.amount);
      });

    return Array.from(monthlyData.entries())
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 6);
  }
}

export const walletService = new WalletService();
