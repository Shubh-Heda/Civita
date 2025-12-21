import { motion } from 'motion/react';
import { walletService } from '../services/walletService';
import { Wallet, TrendingUp, TrendingDown, Gift, RefreshCw, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from './ui/button';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

interface WalletDashboardProps {
  userId: string;
}

export function WalletDashboard({ userId }: WalletDashboardProps) {
  const wallet = walletService.getWallet(userId);
  const [showAddCredit, setShowAddCredit] = useState(false);

  if (!wallet) {
    return <div className="text-center text-slate-400">Wallet not found</div>;
  }

  const monthlySpending = walletService.getMonthlySpending(userId);

  const handleAddCredit = (amount: number) => {
    walletService.addCredit(userId, amount, `Added ₹${amount} to wallet`);
    setShowAddCredit(false);
  };

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-3xl p-6 border border-green-500/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-slate-400 text-sm mb-1">Available Balance</p>
            <motion.h2
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="text-white"
            >
              ₹{wallet.balance.toLocaleString()}
            </motion.h2>
          </div>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
          >
            <Wallet className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-lg text-green-400">₹{wallet.cashbackEarned}</div>
            <div className="text-xs text-slate-400">Cashback</div>
          </div>
          <div className="text-center">
            <div className="text-lg text-purple-400">₹{wallet.referralBonuses}</div>
            <div className="text-xs text-slate-400">Referrals</div>
          </div>
          <div className="text-center">
            <div className="text-lg text-blue-400">₹{wallet.totalCredits}</div>
            <div className="text-xs text-slate-400">Total Added</div>
          </div>
        </div>

        <Button
          onClick={() => setShowAddCredit(!showAddCredit)}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Money
        </Button>

        {showAddCredit && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 grid grid-cols-4 gap-2"
          >
            {[100, 200, 500, 1000].map((amount) => (
              <Button
                key={amount}
                onClick={() => handleAddCredit(amount)}
                variant="outline"
                className="bg-slate-800 hover:bg-slate-700 text-white border-green-500/30"
              >
                ₹{amount}
              </Button>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Monthly Spending Chart */}
      {monthlySpending.length > 0 && (
        <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Monthly Spending
          </h3>
          <div className="space-y-3">
            {monthlySpending.map((item, index) => {
              const maxAmount = Math.max(...monthlySpending.map(m => m.amount));
              const percentage = (item.amount / maxAmount) * 100;
              
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">{item.month}</span>
                    <span className="text-white">₹{item.amount}</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50">
        <h3 className="text-white mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {wallet.transactions.slice(0, 10).map((txn, index) => {
            const isCredit = txn.type === 'credit' || txn.type === 'cashback' || txn.type === 'referral_bonus' || txn.type === 'refund';
            
            return (
              <motion.div
                key={txn.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/40 hover:bg-slate-900/60 transition-colors"
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-full ${isCredit ? 'bg-green-500/20' : 'bg-red-500/20'} flex items-center justify-center flex-shrink-0`}>
                  {txn.type === 'credit' && <Plus className="w-5 h-5 text-green-400" />}
                  {txn.type === 'debit' && <ArrowUpRight className="w-5 h-5 text-red-400" />}
                  {txn.type === 'cashback' && <Gift className="w-5 h-5 text-purple-400" />}
                  {txn.type === 'refund' && <RefreshCw className="w-5 h-5 text-blue-400" />}
                  {txn.type === 'referral_bonus' && <Gift className="w-5 h-5 text-yellow-400" />}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{txn.description}</p>
                  <p className="text-slate-500 text-xs">
                    {formatDistanceToNow(txn.timestamp, { addSuffix: true })}
                  </p>
                </div>

                {/* Amount */}
                <div className={`text-right flex-shrink-0 ${isCredit ? 'text-green-400' : 'text-red-400'}`}>
                  <div className="text-sm">
                    {isCredit ? '+' : '-'}₹{txn.amount}
                  </div>
                  {txn.status === 'pending' && (
                    <div className="text-xs text-yellow-500">Pending</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
