import { useState, useEffect, useRef } from 'react';
import { Bell, X, Check, Users, Calendar, CreditCard, Heart, Award, MessageCircle, MapPin, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface Notification {
  id: string;
  type: 'match_invite' | 'friend_request' | 'payment_reminder' | 'achievement' | 'match_update' | 'chat_message' | 'gratitude' | 'coaching';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionLabel?: string;
  actionUrl?: string;
  metadata?: any;
}

interface NotificationInboxProps {
  onNavigate?: (page: string, id?: string) => void;
  category?: 'sports' | 'events' | 'parties';
}

export function NotificationInbox({ onNavigate, category = 'sports' }: NotificationInboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock notifications - in real app, this would come from notificationService
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'match_invite',
        title: 'New Match Invite',
        message: 'Rahul invited you to Saturday Football at Sky Sports Arena',
        timestamp: new Date(Date.now() - 5 * 60000), // 5 mins ago
        read: false,
        actionLabel: 'View Match',
        actionUrl: 'chat',
      },
      {
        id: '2',
        type: 'payment_reminder',
        title: 'Payment Due Soon',
        message: 'Pay ₹150 for Saturday Football - Payment window closes in 30 mins',
        timestamp: new Date(Date.now() - 15 * 60000), // 15 mins ago
        read: false,
        actionLabel: 'Pay Now',
      },
      {
        id: '3',
        type: 'achievement',
        title: '🏆 Achievement Unlocked!',
        message: 'You earned "Early Bird" - Joined 5 matches on time',
        timestamp: new Date(Date.now() - 60 * 60000), // 1 hour ago
        read: false,
        actionLabel: 'View Achievements',
      },
      {
        id: '4',
        type: 'friend_request',
        title: 'New Friend Request',
        message: 'Priya Desai wants to connect with you',
        timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
        read: true,
        actionLabel: 'View Profile',
      },
      {
        id: '5',
        type: 'match_update',
        title: 'Match is Filling Up!',
        message: 'Saturday Football now has 8/10 players. Join before it fills up!',
        timestamp: new Date(Date.now() - 3 * 60 * 60000), // 3 hours ago
        read: true,
        actionLabel: 'Join Match',
      },
      {
        id: '6',
        type: 'gratitude',
        title: '💝 Someone appreciated you!',
        message: 'Amit sent you gratitude: "Great teamwork today!"',
        timestamp: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
        read: true,
        actionLabel: 'View',
      },
    ];

    setNotifications(mockNotifications);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'match_invite': return Users;
      case 'friend_request': return Heart;
      case 'payment_reminder': return CreditCard;
      case 'achievement': return Award;
      case 'match_update': return Calendar;
      case 'chat_message': return MessageCircle;
      case 'gratitude': return Sparkles;
      case 'coaching': return MapPin;
      default: return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'match_invite': return 'bg-cyan-100 text-cyan-600';
      case 'friend_request': return 'bg-pink-100 text-pink-600';
      case 'payment_reminder': return 'bg-orange-100 text-orange-600';
      case 'achievement': return 'bg-purple-100 text-purple-600';
      case 'match_update': return 'bg-emerald-100 text-emerald-600';
      case 'chat_message': return 'bg-blue-100 text-blue-600';
      case 'gratitude': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5 text-slate-700" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center"
          >
            <span className="text-xs text-white">{unreadCount > 9 ? '9+' : unreadCount}</span>
          </motion.div>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
              <div>
                <h3 className="text-slate-900">Notifications</h3>
                {unreadCount > 0 && (
                  <p className="text-xs text-slate-500">{unreadCount} unread</p>
                )}
              </div>
              
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Mark all read
                </Button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-[32rem] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-600 mb-1">No notifications yet</p>
                  <p className="text-xs text-slate-500">We'll notify you when something happens</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {notifications.map((notification) => {
                    const Icon = getIcon(notification.type);
                    return (
                      <motion.div
                        key={notification.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`p-4 hover:bg-slate-50 transition-colors group ${
                          !notification.read ? 'bg-cyan-50/30' : ''
                        }`}
                      >
                        <div className="flex gap-3">
                          {/* Icon */}
                          <div className={`w-10 h-10 rounded-full ${getIconColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-5 h-5" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-sm text-slate-900">{notification.title}</h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 mt-1"></div>
                              )}
                            </div>
                            
                            <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-slate-500">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                              
                              <div className="flex items-center gap-2">
                                {notification.actionLabel && (
                                  <button
                                    onClick={() => {
                                      markAsRead(notification.id);
                                      setIsOpen(false);
                                      // Handle navigation
                                    }}
                                    className="text-xs text-cyan-600 hover:text-cyan-700 hover:underline"
                                  >
                                    {notification.actionLabel}
                                  </button>
                                )}
                                
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-200 rounded"
                                >
                                  <X className="w-3 h-3 text-slate-500" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
                <button className="w-full text-center text-xs text-cyan-600 hover:text-cyan-700 hover:underline">
                  View All Notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
