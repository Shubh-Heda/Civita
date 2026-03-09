import { motion } from 'framer-motion';
import { Bell, User, Trophy } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onGetStarted: () => void;
}

export function Navigation({ currentPage, onNavigate, onGetStarted }: NavigationProps) {
  const normalizedCurrentPage = currentPage.toLowerCase();

  const navigationItems = [
    { label: 'Home', value: 'landing' },
    { label: 'Explore', value: 'explore' },
    { label: 'Community', value: 'community' },
  ];

  const isTabActive = (tabValue: string): boolean => {
    return normalizedCurrentPage === tabValue;
  };

  const handleNavigate = (page: string) => {
    console.log('Navigation clicked:', page, 'Current page:', currentPage);
    onNavigate(page);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavigate('landing')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">CIVITA</span>
          </motion.div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <motion.button
                key={item.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigate(item.value)}
                className={`font-semibold text-sm transition-colors duration-300 pb-1 border-b-2 ${
                  isTabActive(item.value)
                    ? 'text-cyan-500 border-cyan-500'
                    : 'text-gray-700 border-transparent hover:text-cyan-500'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Right Section - Icons & Button */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-700 hover:text-cyan-500 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* Sign In */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigate('signin')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-cyan-500 transition-colors font-semibold"
              aria-label="Sign In"
            >
              <User className="w-4 h-4" />
              Sign In
            </motion.button>

            {/* Get Started Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
              aria-label="Get Started"
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
}