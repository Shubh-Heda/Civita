import { useAuth } from '../lib/AuthProvider';
import { useNavigate } from 'react-router-dom'; // or use your navigation method
import { memo } from 'react';

interface HeaderProps {
  onAuthClick?: () => void;
}

export const Header = memo(function Header({ onAuthClick }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
          Civita
        </div>

        {/* Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            How It Works
          </a>
          <a href="#community" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Community
          </a>
        </nav>

        {/* Auth Button */}
        {!user ? (
          <button
            onClick={onAuthClick}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Sign In
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"></div>
          </div>
        )}
      </div>
    </header>
  );
});