import { useState, useEffect, lazy, Suspense, useMemo, useCallback, useRef } from 'react';
import { Toaster, toast } from 'sonner';
import { ErrorBoundary } from './components/ErrorBoundary';

// Eagerly load critical components from pages subfolder
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/pages/LandingPage';
import { ExplorePage } from './components/pages/Explore';
import { CommunityPage } from './components/pages/Community';
import { AuthPage } from './components/AuthPage';
import { OnboardingForm } from './components/OnboardingForm';
import { ThemeProvider } from './components/ThemeProvider';
import { Footer } from './components/Footer';

// Lazy load all non-critical components for better performance
const ComprehensiveDashboard = lazy(() => import('./components/ComprehensiveDashboard').then(m => ({ default: m.ComprehensiveDashboard })));
const Dashboard = lazy(() => import('./components/Dashboard').then(m => ({ default: m.Dashboard })));
const EventsDashboard = lazy(() => import('./components/EventsDashboard').then(m => ({ default: m.EventsDashboard })));
const GamingHub = lazy(() => import('./components/GamingHub').then(m => ({ default: m.GamingHub })));
const ProfilePage = lazy(() => import('./components/ProfilePage').then(m => ({ default: m.ProfilePage })));
const EventsProfilePage = lazy(() => import('./components/EventsProfilePage').then(m => ({ default: m.EventsProfilePage })));
const CommunityFeed = lazy(() => import('./components/CommunityFeed').then(m => ({ default: m.CommunityFeed })));
const SportsCommunityFeed = lazy(() => import('./components/SportsCommunityFeed').then(m => ({ default: m.SportsCommunityFeed })));
const CulturalCommunityFeed = lazy(() => import('./components/CulturalCommunityFeed').then(m => ({ default: m.CulturalCommunityFeed })));
const GamingCommunityFeed = lazy(() => import('./components/GamingCommunityFeed').then(m => ({ default: m.GamingCommunityFeed })));
const EnhancedCommunityFeed = lazy(() => import('./components/EnhancedCommunityFeed').then(m => ({ default: m.EnhancedCommunityFeed })));
const MapView = lazy(() => import('./components/MapView').then(m => ({ default: m.MapView })));
const PostMatchReflection = lazy(() => import('./components/PostMatchReflection').then(m => ({ default: m.PostMatchReflection })));
const MatchFinder = lazy(() => import('./components/MatchFinder').then(m => ({ default: m.MatchFinder })));
const DiscoveryHub = lazy(() => import('./components/DiscoveryHub').then(m => ({ default: m.DiscoveryHub })));
const CreateMatchPlan = lazy(() => import('./components/CreateMatchPlan').then(m => ({ default: m.CreateMatchPlan })));
const CreateEventBooking = lazy(() => import('./components/CreateEventBooking').then(m => ({ default: m.CreateEventBooking })));
const TurfDetail = lazy(() => import('./components/TurfDetail').then(m => ({ default: m.TurfDetail })));
const WhatsAppChat = lazy(() => import('./components/WhatsAppChat').then(m => ({ default: m.WhatsAppChat })));
const GroupChatRoom = lazy(() => import('./components/chat/GroupChatRoom').then(m => ({ default: m.GroupChatRoom })));
const GroupChatComponent = lazy(() => import('./components/GroupChatComponent'));
const DirectMessageThread = lazy(() => import('./components/chat/DirectMessageThread').then(m => ({ default: m.DirectMessageThread })));
const HelpSupport = lazy(() => import('./components/HelpSupport').then(m => ({ default: m.HelpSupport })));
const RealTimeAvailability = lazy(() => import('./components/RealTimeAvailability').then(m => ({ default: m.RealTimeAvailability })));
const GamingProfilePage = lazy(() => import('./components/GamingProfilePage').then(m => ({ default: m.GamingProfilePage })));
const GroupChatGaming = lazy(() => import('./components/GroupChatGaming').then(m => ({ default: m.GroupChatGaming })));
const GamingMapView = lazy(() => import('./components/GamingMapView').then(m => ({ default: m.GamingMapView })));
const CommunityEvents = lazy(() => import('./components/CommunityEvents').then(m => ({ default: m.CommunityEvents })));
const MemoryTimeline = lazy(() => import('./components/MemoryTimeline').then(m => ({ default: m.MemoryTimeline })));
const PhotoAlbum = lazy(() => import('./components/PhotoAlbum').then(m => ({ default: m.PhotoAlbum })));
const HighlightReels = lazy(() => import('./components/HighlightReels').then(m => ({ default: m.HighlightReels })));
const ModernChat = lazy(() => import('./components/ModernChat').then(m => ({ default: m.ModernChat })));
<<<<<<< HEAD
const MatchHistory = lazy(() => import('./components/MatchHistory').then(m => ({ default: m.MatchHistory })));
||||||| 8e3dd98
=======
const MatchHistory = lazy(() => import('./components/MatchHistory').then(m => ({ default: m.MatchHistory })));

>>>>>>> landing-UI-redesign
import { apiService } from './services/apiService';
import { profileService, matchService, initializeDefaultData } from './services/backendService';
import { realGroupChatService } from './services/groupChatServiceReal';
import { modernChatService } from './services/modernChatService';
import { matchNotificationService } from './services/matchNotificationService';
import { AuthProvider, useAuth } from './lib/AuthProvider';
import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';

<<<<<<< HEAD
type Page = 'landing' | 'warm-onboarding' | 'auth' | 'dashboard' | 'events-dashboard' | 'gaming-hub' | 'gaming-profile' | 'gaming-community' | 'gaming-chat' | 'gaming-map' | 'gaming-events' | 'sports-events' | 'events-events' | 'sports-photos' | 'events-photos' | 'gaming-photos' | 'sports-highlights' | 'events-highlights' | 'gaming-highlights' | 'sports-memories' | 'events-memories' | 'gaming-memories' | 'profile' | 'events-profile' | 'community' | 'sports-community' | 'cultural-community' | 'reflection' | 'finder' | 'discovery' | 'create-match' | 'create-event-booking' | 'turf-detail' | 'chat' | 'sports-chat' | 'events-chat' | 'group-chat' | 'dm-chat' | 'modern-chat' | 'match-history' | 'help' | 'availability' | 'comprehensive-dashboard';
||||||| 8e3dd98
type Page = 'landing' | 'warm-onboarding' | 'auth' | 'dashboard' | 'events-dashboard' | 'gaming-hub' | 'gaming-profile' | 'gaming-community' | 'gaming-chat' | 'gaming-map' | 'gaming-events' | 'sports-events' | 'events-events' | 'sports-photos' | 'events-photos' | 'gaming-photos' | 'sports-highlights' | 'events-highlights' | 'gaming-highlights' | 'sports-memories' | 'events-memories' | 'gaming-memories' | 'profile' | 'events-profile' | 'community' | 'sports-community' | 'cultural-community' | 'reflection' | 'finder' | 'discovery' | 'create-match' | 'create-event-booking' | 'turf-detail' | 'chat' | 'sports-chat' | 'events-chat' | 'group-chat' | 'dm-chat' | 'modern-chat' | 'help' | 'availability' | 'comprehensive-dashboard';
=======
type Page = 'landing' | 'explore' | 'community' | 'warm-onboarding' | 'auth' | 'dashboard' | 'events-dashboard' | 'gaming-hub' | 'gaming-profile' | 'gaming-community' | 'gaming-chat' | 'gaming-map' | 'gaming-events' | 'sports-events' | 'events-events' | 'sports-photos' | 'events-photos' | 'gaming-photos' | 'sports-highlights' | 'events-highlights' | 'gaming-highlights' | 'sports-memories' | 'events-memories' | 'gaming-memories' | 'profile' | 'events-profile' | 'community-feed' | 'sports-community' | 'cultural-community' | 'reflection' | 'finder' | 'discovery' | 'create-match' | 'create-event-booking' | 'turf-detail' | 'chat' | 'sports-chat' | 'events-chat' | 'group-chat' | 'dm-chat' | 'modern-chat' | 'help' | 'availability' | 'comprehensive-dashboard';
>>>>>>> landing-UI-redesign

interface UserProfile {
  name: string;
  bio: string;
  interests: string[];
  location: string;
  joinDate: string;
}

interface Match {
  id: string;
  title: string;
  turfName: string;
  date: string;
  time: string;
  sport: string;
  status: 'upcoming' | 'completed';
  visibility: string;
  paymentOption: string;
  amount?: number;
  location?: string;
  lat?: number;
  lng?: number;
  minPlayers?: number;
  maxPlayers?: number;
  turfCost?: number;
}

// Wrapper component that uses useAuth - must be inside AuthProvider
function AppContainer() {
  const { user, loading } = useAuth();
  return <AppContent user={user} loading={loading} />;
}

interface AppContentProps {
  user: any;
  loading: boolean;
}

function AppContent({ user, loading }: AppContentProps) {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedTurfId, setSelectedTurfId] = useState<string | null>(null);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [selectedGroupChatId, setSelectedGroupChatId] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const [showLocationRequest, setShowLocationRequest] = useState(false);
  const [chatGroups, setChatGroups] = useState<{[key: string]: string}>({});
  const [currentCategory, setCurrentCategory] = useState<'sports' | 'events' | 'gaming'>('sports');
  const [selectedEventDetails, setSelectedEventDetails] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [pendingCategory, setPendingCategory] = useState<'sports' | 'events' | 'gaming' | null>(null);
  const inviteHandledRef = useRef(false);
  
  // Separate user profiles for each category
  const [sportsProfile, setSportsProfile] = useState<UserProfile>({
    name: 'Alex Thompson',
    bio: 'Football enthusiast who believes in playing hard and building friendships even harder. Here to make every match meaningful! ⚽✨',
    interests: ['Football', 'Cricket', 'Weekend Player'],
    location: 'Ahmedabad, Gujarat',
    joinDate: 'March 2024',
  });

  const [eventsProfile, setEventsProfile] = useState<UserProfile>({
    name: 'Alex Thompson',
    bio: 'Culture lover who enjoys exploring art, music, and diverse cultural experiences. Let\'s celebrate creativity together! 🎨🎵',
    interests: ['Music Festivals', 'Art Exhibitions', 'Cultural Dance'],
    location: 'Ahmedabad, Gujarat',
    joinDate: 'March 2024',
  });

  // Separate matches for each category
  const [sportsMatches, setSportsMatches] = useState<Match[]>([
    {
      id: '1',
      title: 'Saturday Football',
      turfName: 'Sky Sports Arena',
      date: '2025-11-15',
      time: '6:00 PM',
      sport: 'Football',
      status: 'upcoming',
      visibility: 'Public',
      paymentOption: 'Split Equally',
      amount: 1500,
    },
  ]);

  const [eventsMatches, setEventsMatches] = useState<Match[]>([]);

  // ✅ DEFINE navigateTo FIRST (with useCallback)
  const navigateTo = useCallback((page: Page, turfId?: string, matchId?: string, groupChatId?: string, conversationId?: string) => {
    console.log('🔄 Navigating from', currentPage, 'to', page);
    
    if (turfId) {
      setSelectedTurfId(turfId);
    }
    if (matchId) {
      setSelectedMatchId(matchId);
    }
    if (groupChatId) {
      setSelectedGroupChatId(groupChatId);
    }
    if (conversationId) {
      setSelectedConversationId(conversationId);
    }
    
    // Reset category when navigating to landing or main navbar pages
    if (page === 'landing' || page === 'explore' || page === 'community') {
      setPendingCategory(null);
      setCurrentPage(page);
      setNavigationHistory([page]);
      window.history.pushState({ page }, '', `#${page}`);
      console.log('✅ Navigated to navbar page:', page);
      return;
    }
    
    // Track category based on page navigation
    if (page === 'dashboard' || page === 'profile' || page === 'sports-community' || page === 'finder' || page === 'create-match' || page === 'turf-detail' || page === 'sports-events' || page === 'sports-photos' || page === 'sports-highlights' || page === 'sports-memories') {
      setCurrentCategory('sports');
    } else if (page === 'events-dashboard' || page === 'events-profile' || page === 'cultural-community' || page === 'events-events' || page === 'create-event-booking' || page === 'events-photos' || page === 'events-highlights' || page === 'events-memories') {
      setCurrentCategory('events');
    } else if (page === 'gaming-hub' || page === 'gaming-profile' || page === 'gaming-community' || page === 'gaming-chat' || page === 'gaming-map' || page === 'gaming-events' || page === 'gaming-photos' || page === 'gaming-highlights' || page === 'gaming-memories') {
      setCurrentCategory('gaming');
    }
    
    if (page === 'community-feed' && sportsMatches.filter(m => m.status === 'upcoming').length > 0) {
      toast.success('🎉 Your matches are waiting for you!', {
        description: `You have ${sportsMatches.filter(m => m.status === 'upcoming').length} upcoming match${sportsMatches.filter(m => m.status === 'upcoming').length > 1 ? 'es' : ''} ready to play!`,
        duration: 4000,
      });
    }
    
    setCurrentPage(page);
    setNavigationHistory(prev => [...prev, page]);
    window.history.pushState({ page }, '', `#${page}`);
    console.log('✅ Navigated to:', page);
  }, [currentPage, sportsMatches]);

  // ✅ DEFINE goBack SECOND (depends on navigateTo)
  const goBack = useCallback(() => {
    console.log('⏮️ Going back. History:', navigationHistory);
    
    if (navigationHistory.length > 1) {
      const newHistory = navigationHistory.slice(0, -1);
      const previousPage = newHistory[newHistory.length - 1];
      
      console.log('⏮️ Previous page:', previousPage);
      
      setNavigationHistory(newHistory);
      setCurrentPage(previousPage);
      
      window.history.back();
    } else {
      console.log('⏮️ At root, going to landing');
      navigateTo('landing');
    }
  }, [navigationHistory, navigateTo]);

  // Reset scroll position when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Memoize profile updates
  const updateProfiles = useCallback((userData: any) => {
    const updatedProfile: UserProfile = {
      name: userData.name,
      bio: `${userData.profession ? `${userData.profession} | ` : ''}${userData.age ? `Age ${userData.age}` : ''}${userData.phone ? ` | ${userData.phone}` : ''}`,
      interests: userData.profession ? [userData.profession] : [],
      location: 'Ahmedabad, Gujarat',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    };
    setSportsProfile(updatedProfile);
    setEventsProfile(updatedProfile);
  }, []);

  // Update profiles when user logs in with onboarded data
  useEffect(() => {
    if (user?.onboarding_completed) {
      updateProfiles(user);
    }
  }, [user?.onboarding_completed, user?.name, updateProfiles]);
  
  // Initialize backend on app mount
  useEffect(() => {
    const initBackend = async () => {
      try {
        // Clear legacy local mock-chat caches so UI relies on backend conversations.
        [
          'civta_group_chats',
          'civita_group_chats',
          'local_group_chats',
          'local_chat_members',
          'local_chat_messages',
          'local_chat_invites'
        ].forEach((key) => localStorage.removeItem(key));

        await apiService.initialize();
        
        if (user) {
          try {
            await initializeDefaultData(user.id);
            console.log('✅ Supabase backend initialized with default data');
            
            const { data: profileData } = await profileService.getUserProfile(user.id);
            if (profileData) {
              const formattedProfile = {
                name: profileData.name || profileData.username || 'User',
                bio: profileData.bio || '',
                interests: profileData.interests || profileData.sports_interests || [],
                location: profileData.location || '',
                joinDate: new Date(profileData.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              };
              setSportsProfile(formattedProfile);
              setEventsProfile(formattedProfile);
            }
            
<<<<<<< HEAD
            // Load matches from backend (user-specific)
            const sportsMatchesData = await matchService.getUserMatches(user.id, 'sports');
||||||| 8e3dd98
            // Load matches from backend
            const sportsMatchesData = await matchService.getMatches('sports');
=======
            const sportsMatchesData = await matchService.getMatches('sports');
>>>>>>> landing-UI-redesign
            if (sportsMatchesData.length > 0) {
              setSportsMatches(sportsMatchesData.map(m => ({
                id: m.id,
                title: m.title,
                turfName: m.turf_name,
                date: m.date,
                time: m.time,
                sport: m.sport,
                status: m.status,
                visibility: m.visibility,
                paymentOption: m.payment_option,
                amount: m.amount,
                location: m.location,
                lat: m.lat,
                lng: m.lng,
                minPlayers: m.min_players,
                maxPlayers: m.max_players,
                turfCost: m.turf_cost
              })));
            }
            
            const eventsMatchesData = await matchService.getMatches('events');
            if (eventsMatchesData.length > 0) {
              setEventsMatches(eventsMatchesData.map(m => ({
                id: m.id,
                title: m.title,
                turfName: m.turf_name,
                date: m.date,
                time: m.time,
                sport: m.sport,
                status: m.status,
                visibility: m.visibility,
                paymentOption: m.payment_option,
                amount: m.amount,
                location: m.location,
                lat: m.lat,
                lng: m.lng,
                minPlayers: m.min_players,
                maxPlayers: m.max_players,
                turfCost: m.turf_cost
              })));
            }
          } catch (dbError) {
            console.error('Supabase initialization error:', dbError);
            toast.error('Could not connect to backend. Using local data.');
          }
        }
        
<<<<<<< HEAD
        // Backend-first mode: do not auto-initialize mock seed data.
||||||| 8e3dd98
        // Initialize friendship mock data
        if (!localStorage.getItem('civita_friendships')) {
          friendshipService.initializeMockFriendships();
          console.log('✅ Friendship mock data initialized');
        }
        
        // Initialize gratitude mock data
        if (!localStorage.getItem('civita_gratitude')) {
          gratitudeService.initializeMockGratitude();
          console.log('✅ Gratitude mock data initialized');
        }
        
        // Initialize post-match mock data
        if (!localStorage.getItem('civita_post_match_memories')) {
          postMatchService.initializeMockData();
          console.log('✅ Post-match mock data initialized');
        }
        
        // Initialize achievement & gamification mock data
        if (!localStorage.getItem('civta_achievements')) {
          achievementService.initializeMockData('user_001');
          console.log('✅ Achievement mock data initialized');
        }
=======
        if (!localStorage.getItem('civita_friendships')) {
          friendshipService.initializeMockFriendships();
          console.log('✅ Friendship mock data initialized');
        }
        
        if (!localStorage.getItem('civita_gratitude')) {
          gratitudeService.initializeMockGratitude();
          console.log('✅ Gratitude mock data initialized');
        }
        
        if (!localStorage.getItem('civita_post_match_memories')) {
          postMatchService.initializeMockData();
          console.log('✅ Post-match mock data initialized');
        }
        
        if (!localStorage.getItem('civta_achievements')) {
          achievementService.initializeMockData('user_001');
          console.log('✅ Achievement mock data initialized');
        }
>>>>>>> landing-UI-redesign
        
        const storedLocation = localStorage.getItem('userLocation');
        if (storedLocation) {
          setUserLocation(JSON.parse(storedLocation));
          setLocationPermissionGranted(true);
        }
      } catch (error) {
        console.error('Failed to initialize backend:', error);
        toast.error('Failed to initialize app. Please refresh.');
      }
    };

    initBackend();
  }, [user]);
  
  const handleGetStarted = useCallback(() => {
    setCurrentPage('auth');
  }, []);

  const handleCategorySelectFromLanding = useCallback((category: 'sports' | 'events' | 'parties' | 'gaming') => {
    console.log('🎮 LANDING PAGE - Category selected:', category);
    
    if (category === 'gaming') {
      if (!user) {
        console.log('🎮 User not logged in - setting pending category to gaming');
        setPendingCategory('gaming');
        setCurrentPage('auth');
      } else {
        console.log('🎮 User logged in - going directly to gaming-hub');
        setCurrentCategory('gaming');
        setCurrentPage('gaming-hub');
        setPendingCategory(null);
      }
      return;
    }
    
    setPendingCategory(category);
    setCurrentCategory(category);
    
    if (!user) {
      setCurrentPage('auth');
    } else {
      if (locationPermissionGranted) {
        if (category === 'sports') {
          setCurrentPage('dashboard');
        } else if (category === 'events') {
          setCurrentPage('events-dashboard');
        }
        setPendingCategory(null);
      } else {
        setShowLocationRequest(true);
      }
    }
  }, [user, locationPermissionGranted]);

  const handleAuthSuccess = useCallback(() => {
    console.log('🎮 Auth successful! Pending category:', pendingCategory);
    
    if (pendingCategory === 'gaming') {
      console.log('🎮 Going to gaming hub after auth');
      setCurrentPage('gaming-hub');
      setPendingCategory(null);
      return;
    }
    
    setShowLocationRequest(true);
  }, [pendingCategory]);

  const handleLocationPermission = useCallback(() => {
    if (navigator.geolocation) {
      toast.loading('Getting your location...', { id: 'location-loading' });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          
          setLocationPermissionGranted(true);
          setShowLocationRequest(false);
          setUserLocation(locationData);
          
          localStorage.setItem('userLocation', JSON.stringify(locationData));
          localStorage.setItem('locationSource', 'gps');
          
          console.log('User location captured:', locationData);
          
          toast.dismiss('location-loading');
          
          toast.success('Location access granted! 📍', {
            description: 'We can now show you nearby experiences.',
          });
          
          if (pendingCategory === 'sports') {
            setCurrentCategory('sports');
            setCurrentPage('dashboard');
          } else if (pendingCategory === 'events') {
            setCurrentCategory('events');
            setCurrentPage('events-dashboard');
<<<<<<< HEAD
||||||| 8e3dd98
          } else if (pendingCategory === 'parties') {
            setCurrentCategory('parties');
            setCurrentPage('party-dashboard');
=======
          } else if (pendingCategory === 'parties') {
            setCurrentCategory('parties');
            setCurrentPage('events-dashboard');
>>>>>>> landing-UI-redesign
          }
          
          setPendingCategory(null);
        },
        (error) => {
          toast.dismiss('location-loading');
          
          const defaultLocation = {
            latitude: 23.0225,
            longitude: 72.5714,
          };
          
          setUserLocation(defaultLocation);
          localStorage.setItem('userLocation', JSON.stringify(defaultLocation));
          localStorage.setItem('locationSource', 'default');
          
          let errorMessage = 'Using Ahmedabad as your default location. You can still use all features!';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              console.log('Location permission denied - using default location (Ahmedabad)');
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location unavailable. Using Ahmedabad as default.';
              console.log('Location position unavailable - using default location');
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out. Using Ahmedabad as default.';
              console.log('Location request timeout - using default location');
              break;
            default:
              console.log('Location error - using default location:', error);
          }
          
          toast.success('Location set to Ahmedabad 📍', {
            description: errorMessage,
          });
          setShowLocationRequest(false);
          
          if (pendingCategory === 'sports') {
            setCurrentCategory('sports');
            setCurrentPage('dashboard');
          } else if (pendingCategory === 'events') {
            setCurrentCategory('events');
            setCurrentPage('events-dashboard');
<<<<<<< HEAD
||||||| 8e3dd98
          } else if (pendingCategory === 'parties') {
            setCurrentCategory('parties');
            setCurrentPage('party-dashboard');
=======
          } else if (pendingCategory === 'parties') {
            setCurrentCategory('parties');
            setCurrentPage('events-dashboard');
>>>>>>> landing-UI-redesign
          }
          
          setPendingCategory(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      const defaultLocation = {
        latitude: 23.0225,
        longitude: 72.5714,
      };
      
      setUserLocation(defaultLocation);
      localStorage.setItem('userLocation', JSON.stringify(defaultLocation));
      localStorage.setItem('locationSource', 'default');
      
      toast.success('Location set to Ahmedabad 📍', {
        description: 'Geolocation not supported. Using default location.',
      });
      setShowLocationRequest(false);
      
      if (pendingCategory === 'sports') {
        setCurrentCategory('sports');
        setCurrentPage('dashboard');
      } else if (pendingCategory === 'events') {
        setCurrentCategory('events');
        setCurrentPage('events-dashboard');
<<<<<<< HEAD
||||||| 8e3dd98
      } else if (pendingCategory === 'parties') {
        setCurrentCategory('parties');
        setCurrentPage('party-dashboard');
=======
      } else if (pendingCategory === 'parties') {
        setCurrentCategory('parties');
        setCurrentPage('events-dashboard');
>>>>>>> landing-UI-redesign
      }
      
      setPendingCategory(null);
    }
  }, [pendingCategory]);

  const handleSkipLocation = useCallback(() => {
    const defaultLocation = {
      latitude: 23.0225,
      longitude: 72.5714,
    };
    
    setUserLocation(defaultLocation);
    localStorage.setItem('userLocation', JSON.stringify(defaultLocation));
    localStorage.setItem('locationSource', 'skipped');
    
    console.log('Location skipped - using default location (Ahmedabad)');
    
    setShowLocationRequest(false);
    
    if (pendingCategory === 'sports') {
      setCurrentCategory('sports');
      setCurrentPage('dashboard');
    } else if (pendingCategory === 'events') {
      setCurrentCategory('events');
      setCurrentPage('events-dashboard');
    }
    
    setPendingCategory(null);
  }, [pendingCategory]);

  const handleSportsProfileUpdate = useCallback(async (updatedProfile: UserProfile) => {
    setSportsProfile(updatedProfile);
    
    if (user) {
      try {
        const { data: existingProfile } = await profileService.getUserProfile(user.id);
        if (existingProfile) {
          await profileService.updateUserProfile(user.id, {
            name: updatedProfile.name,
            bio: updatedProfile.bio,
            interests: updatedProfile.interests,
            location: updatedProfile.location
          });
          toast.success('Sports Profile Updated! ⚽', {
            description: 'Your changes have been saved!',
          });
        } else {
<<<<<<< HEAD
          // Create new profile if doesn't exist
          await profileService.updateUserProfile(user.id, {
||||||| 8e3dd98
          // Create new profile if doesn't exist
          await profileService.createProfile({
            id: user.id,
            user_id: user.id,
=======
          await profileService.createProfile({
            id: user.id,
            user_id: user.id,
>>>>>>> landing-UI-redesign
            name: updatedProfile.name,
            bio: updatedProfile.bio,
            interests: updatedProfile.interests,
            location: updatedProfile.location,
            category: 'sports'
          });
          toast.success('Sports Profile Created! ⚽');
        }
      } catch (error) {
        console.error('Error updating sports profile:', error);
        toast.info('Profile Saved Locally! 📱', {
          description: 'Will sync when online.',
        });
      }
    } else {
      toast.info('Profile Updated! 📱', {
        description: 'Sign in to sync across devices!',
      });
    }
  }, [user]);

  const handleEventsProfileUpdate = useCallback(async (updatedProfile: UserProfile) => {
    setEventsProfile(updatedProfile);
    
    if (user) {
      try {
        const { data: existingProfile } = await profileService.getUserProfile(user.id);
        if (existingProfile) {
          await profileService.updateUserProfile(user.id, {
            name: updatedProfile.name,
            bio: updatedProfile.bio,
            interests: updatedProfile.interests,
            location: updatedProfile.location
          });
          toast.success('Events Profile Updated! 🎉', {
            description: 'Your changes have been saved!',
          });
        } else {
          await profileService.updateUserProfile(user.id, {
            name: updatedProfile.name,
            bio: updatedProfile.bio,
            interests: updatedProfile.interests,
            location: updatedProfile.location,
            category: 'events'
          });
          toast.success('Events Profile Created! 🎉');
        }
      } catch (error) {
        console.error('Error updating events profile:', error);
        toast.info('Profile Saved Locally! 📱', {
          description: 'Will sync when online.',
        });
      }
    } else {
      toast.info('Profile Updated! 📱', {
        description: 'Sign in to sync across devices!',
      });
    }
  }, [user]);

  const handleMatchCreate = useCallback(async (match: Match) => {
    setSportsMatches(prev => [...prev, match]);
    
<<<<<<< HEAD
    // Check if this is a direct payment match
    const isDirectPayment = match.paymentOption === 'Pay Directly' || match.paymentOption === 'Direct Payment';
    
    // Only create chat group if NOT direct payment
    if (!isDirectPayment) {
      setChatGroups(prev => ({
        ...prev,
        [match.id]: match.title
      }));
    }
||||||| 8e3dd98
    // Create a chat group for this match
    setChatGroups(prev => ({
      ...prev,
      [match.id]: match.title
    }));
=======
    setChatGroups(prev => ({
      ...prev,
      [match.id]: match.title
    }));
>>>>>>> landing-UI-redesign
    
    if (user) {
      try {
        const { data: createdMatch, error: matchError } = await matchService.addMatch({
          user_id: user.id,
          title: match.title,
          turf_name: match.turfName,
          date: match.date,
          time: match.time,
          sport: match.sport,
          status: match.status,
          visibility: match.visibility,
          payment_option: match.paymentOption,
          location: match.location,
          lat: match.lat,
          lng: match.lng,
          min_players: match.minPlayers,
          max_players: match.maxPlayers,
          turf_cost: match.turfCost,
          category: 'sports'
        });

        if (matchError) {
          throw new Error(matchError);
        }

<<<<<<< HEAD
        const persistedMatchId = createdMatch?.id || match.id;

        await matchService.addMatchParticipant(persistedMatchId, user.id, 'organizer', 'joined');
        
        // Always create group chat for ALL matches for coordination and community
||||||| 8e3dd98
        const totalCost = match.amount ?? match.turfCost ?? 0;
        // ALWAYS create modern chat conversation for match
=======
>>>>>>> landing-UI-redesign
        try {
          const matchId = persistedMatchId;
          const conversation = await modernChatService.createGroupConversation(
            match.title,
            `Meet up for ${match.sport || 'sports'} at ${match.turfName || 'the venue'}`,
            user.id,
            user.name || user.email || 'Organizer',
            []
          );
          
<<<<<<< HEAD
          // Update discovery hub with conversation ID
          const matchWithChat = { 
            matchId: persistedMatchId,
            title: match.title,
            organizer: user.name || user.email || 'Organizer',
            sport: match.sport,
            turfName: match.turfName,
            location: match.location || 'Location TBA',
            date: match.date,
            time: match.time,
            minPlayers: match.minPlayers || 2,
            currentPlayers: 1,
            visibility: match.visibility as 'community' | 'nearby' | 'private',
            groupChatId: conversation.id 
          };
||||||| 8e3dd98
          // Update discovery hub with conversation ID
          const matchWithChat = { ...match, groupChatId: conversation.id };
=======
          const matchWithChat = { ...match, groupChatId: conversation.id };
>>>>>>> landing-UI-redesign
          matchNotificationService.saveMatchToDiscoverable(matchWithChat);
          
          navigateTo('modern-chat', undefined, undefined, undefined, conversation.id);
          console.log('✅ Modern chat conversation created for match:', conversation.id);
          
<<<<<<< HEAD
          // Send welcome message to conversation with appropriate payment info
          const paymentInfo = isDirectPayment 
            ? '\n\n💳 Payment: Direct payment confirmed!'
            : `\n\n💰 Payment: Split costs after minimum ${match.minPlayers} players join`;
          
||||||| 8e3dd98
          // Send welcome message to conversation
=======
>>>>>>> landing-UI-redesign
          await modernChatService.sendMessage(
            conversation.id,
            user.id,
            user.name || user.email || 'Organizer',
            `🎉 Match created! ${match.sport} at ${match.turfName} on ${match.date} at ${match.time}\n\nMinimum players: ${match.minPlayers}\nMaximum players: ${match.maxPlayers}${paymentInfo}\n\nJoin and let's play!`,
            'text'
          );
          
          toast.success('Match Created Successfully! 🎉', {
            description: 'Group chat created - opening now!',
          });
        } catch (chatError) {
          console.error('Note: Modern chat creation failed:', chatError);
<<<<<<< HEAD
          // Still provide good UX even if chat fails
          navigateTo('match-history');
          toast.info('Match Created! 🎉', {
            description: 'Group chat will be available soon!',
          });
||||||| 8e3dd98
          // Still navigate to modern chat even if creation fails
          navigateTo('modern-chat');
=======
          navigateTo('modern-chat');
>>>>>>> landing-UI-redesign
        }
        
        console.log('✅ Match saved to backend:', match.title);
      } catch (error) {
        console.error('❌ Error saving match to backend:', error);
<<<<<<< HEAD
        navigateTo('match-history');
        toast.error('Match save failed', {
          description: 'Backend rejected the match. Please check schema setup and try again.',
||||||| 8e3dd98
        // Still navigate to modern chat even if backend save fails
        navigateTo('modern-chat');
        toast.info('Match Created! 🎉', {
          description: 'Chat ready - opening now!',
=======
        navigateTo('modern-chat');
        toast.info('Match Created! 🎉', {
          description: 'Chat ready - opening now!',
>>>>>>> landing-UI-redesign
        });
      }
    } else {
      // User not logged in
      toast.info('Match Created! 🎉', {
        description: 'Sign in to save to backend and create group chat!',
      });
    }
  }, [user, navigateTo]);

  const handleMatchJoin = useCallback(async (match: Match) => {
    setSportsMatches(prev => [...prev, match]);
    
    setChatGroups(prev => ({
      ...prev,
      [match.id]: match.title
    }));
    
    if (user) {
      try {
        const existingMatch = await matchService.getMatches('sports');
        
        const matchExists = existingMatch.find(m => m.id === match.id);
        let persistedMatchId = match.id;
        
        if (!matchExists) {
<<<<<<< HEAD
          // Create the match if it doesn't exist
          const { data: createdMatch, error: createError } = await matchService.addMatch({
||||||| 8e3dd98
          // Create the match if it doesn't exist
          const { error: createError } = await matchService.addMatch({
=======
          const { error: createError } = await matchService.addMatch({
>>>>>>> landing-UI-redesign
            user_id: user.id,
            title: match.title,
            turf_name: match.turfName,
            date: match.date,
            time: match.time,
            sport: match.sport,
            status: match.status,
            visibility: match.visibility,
            payment_option: match.paymentOption,
            location: match.location,
            lat: match.lat,
            lng: match.lng,
            min_players: match.minPlayers,
            max_players: match.maxPlayers,
            turf_cost: match.turfCost,
            category: 'sports'
          });

          if (createError) {
            throw new Error(createError);
          }

          if (createdMatch?.id) {
            persistedMatchId = createdMatch.id;
          }
        }

<<<<<<< HEAD
        await matchService.addMatchParticipant(persistedMatchId, user.id, 'player', 'joined');

        // ALWAYS get or create group chat for match, regardless of cost
||||||| 8e3dd98
        const totalCost = match.amount ?? match.turfCost ?? 0;
        // ALWAYS get or create group chat for match, regardless of cost
=======
>>>>>>> landing-UI-redesign
        try {
          let groupChat = await realGroupChatService.getGroupChatByMatchId(persistedMatchId);
          if (!groupChat) {
            groupChat = await realGroupChatService.createGroupChat(
              persistedMatchId,
              match.title,
              match.sport || 'Match',
              user.id,
<<<<<<< HEAD
              user.name,
              user.email
||||||| 8e3dd98
              user.name || user.email || 'Organizer',
              user.email || 'organizer@example.com'
            );
          } else {
            // Add user as member
            await realGroupChatService.addMember(
              groupChat.id,
              user.id,
              'member',
              user.name || user.email || 'Player',
              user.email || 'player@example.com'
=======
              user.name || user.email || 'Organizer',
              user.email || 'organizer@example.com'
            );
          } else {
            await realGroupChatService.addMember(
              groupChat.id,
              user.id,
              'member',
              user.name || user.email || 'Player',
              user.email || 'player@example.com'
>>>>>>> landing-UI-redesign
            );
          }
          navigateTo('modern-chat');
          toast.info('Joined Locally! 📱', {
            description: 'Chat ready to use!',
          });
        } catch (chatError) {
<<<<<<< HEAD
          console.error('Chat error:', chatError);
||||||| 8e3dd98
          console.error('Note: Group chat access failed:', chatError);
          // Navigate to modern chat page anyway
          navigateTo('modern-chat');
=======
          console.error('Note: Group chat access failed:', chatError);
          navigateTo('modern-chat');
>>>>>>> landing-UI-redesign
        }

        toast.success('Match Joined! ⚽', {
          description: 'You\'ve joined the match!',
        });
      } catch (error) {
<<<<<<< HEAD
        console.error('Error joining match:', error);
        toast.error('Failed to join match', {
          description: 'Please try again',
||||||| 8e3dd98
        console.error('❌ Error joining match:', error);
        // Still try to navigate to modern chat
        navigateTo('modern-chat');
        toast.info('Joined Locally! 📱', {
          description: 'Chat ready to use!',
=======
        console.error('❌ Error joining match:', error);
        navigateTo('modern-chat');
        toast.info('Joined Locally! 📱', {
          description: 'Chat ready to use!',
>>>>>>> landing-UI-redesign
        });
      }
    } else {
      toast.success('Joined Match! ⚽', {
        description: 'Sign in to sync your booking!',
      });
    }
  }, [user, navigateTo]);

  const handleEventBook = useCallback(async (event: any) => {
    setEventsMatches(prev => [...prev, event]);
    
    if (event.createGroupChat) {
      setChatGroups(prev => ({
        ...prev,
        [event.id]: event.groupName || event.title
      }));
    }
    
    if (user) {
      try {
        const { error: eventError } = await matchService.addMatch({
          user_id: user.id,
          title: event.title,
          turf_name: event.venueName || event.location,
          date: event.date,
          time: event.time,
          sport: event.category || 'Event',
          status: 'upcoming',
          visibility: event.visibility || 'community',
          payment_option: event.paymentOption || 'Pay Directly',
          location: event.location,
          lat: event.lat,
          lng: event.lng,
          min_players: event.minAttendees || 1,
          max_players: event.maxAttendees || 100,
          turf_cost: event.amount || event.ticketPrice,
          category: 'events'
        });

        if (eventError) {
          throw new Error(eventError);
        }
        toast.success('Event Booked! 🎉', {
          description: 'Your booking has been confirmed!',
        });
      } catch (error) {
        console.error('❌ Error booking event:', error);
        toast.info('Event Booked Locally! 📱', {
          description: 'Will sync when online.',
        });
      }
    } else {
      toast.success('Event Booked! 🎉', {
        description: 'Sign in to sync your booking!',
      });
    }
  }, [user]);

  const handleBookEvent = useCallback((eventDetails: any) => {
    setSelectedEventDetails(eventDetails);
    setCurrentPage('create-event-booking');
<<<<<<< HEAD
  };

  const navigateTo = (page: Page, turfId?: string, matchId?: string, groupChatId?: string, conversationId?: string) => {
    if (turfId) {
      setSelectedTurfId(turfId);
    }
    if (matchId) {
      setSelectedMatchId(matchId);
    }
    if (groupChatId) {
      setSelectedGroupChatId(groupChatId);
    }
    if (conversationId) {
      setSelectedConversationId(conversationId);
    }
    
    // Reset category when navigating to landing
    if (page === 'landing') {
      // Clear any pending state when going back to landing
      setPendingCategory(null);
      setCurrentPage(page);
      return;
    }
    
    // Track category based on where we're navigating from/to
    // DON'T change category when going to comprehensive-dashboard, availability, help, chat - keep current category
    if (page === 'dashboard' || page === 'profile' || page === 'sports-community' || page === 'finder' || page === 'create-match' || page === 'turf-detail' || page === 'sports-events' || page === 'sports-photos' || page === 'sports-highlights' || page === 'sports-memories') {
      setCurrentCategory('sports');
    } else if (page === 'events-dashboard' || page === 'events-profile' || page === 'cultural-community' || page === 'events-events' || page === 'create-event-booking' || page === 'events-photos' || page === 'events-highlights' || page === 'events-memories') {
      setCurrentCategory('events');
    } else if (page === 'gaming-hub' || page === 'gaming-profile' || page === 'gaming-community' || page === 'gaming-chat' || page === 'gaming-map' || page === 'gaming-events' || page === 'gaming-photos' || page === 'gaming-highlights' || page === 'gaming-memories') {
      setCurrentCategory('gaming');
    }
    // For 'comprehensive-dashboard', 'availability', 'help', 'chat', 'group-chat', 'dm-chat', etc., keep the current category
    
    // Show notification when navigating to community if there are upcoming matches
    if (page === 'community' && sportsMatches.filter(m => m.status === 'upcoming').length > 0) {
      toast.success('🎉 Your matches are waiting for you!', {
        description: `You have ${sportsMatches.filter(m => m.status === 'upcoming').length} upcoming match${sportsMatches.filter(m => m.status === 'upcoming').length > 1 ? 'es' : ''} ready to play!`,
        duration: 4000,
      });
    }
    
    setCurrentPage(page);
  };

||||||| 8e3dd98
  };

  const navigateTo = (page: Page, turfId?: string, matchId?: string, groupChatId?: string, conversationId?: string) => {
    if (turfId) {
      setSelectedTurfId(turfId);
    }
    if (matchId) {
      setSelectedMatchId(matchId);
    }
    if (groupChatId) {
      setSelectedGroupChatId(groupChatId);
    }
    if (conversationId) {
      setSelectedConversationId(conversationId);
    }
    
    // Reset category when navigating to landing
    if (page === 'landing') {
      // Clear any pending state when going back to landing
      setPendingCategory(null);
      setCurrentPage(page);
      // Add to navigation history
      setNavigationHistory(prev => [...prev, page]);
      // Update browser history
      window.history.pushState({ page }, '', `#${page}`);
      return;
    }
    
    // Track category based on where we're navigating from/to
    // DON'T change category when going to comprehensive-dashboard, availability, help, chat - keep current category
    if (page === 'dashboard' || page === 'profile' || page === 'sports-community' || page === 'finder' || page === 'create-match' || page === 'turf-detail' || page === 'sports-events' || page === 'sports-photos' || page === 'sports-highlights' || page === 'sports-memories') {
      setCurrentCategory('sports');
    } else if (page === 'events-dashboard' || page === 'events-profile' || page === 'cultural-community' || page === 'events-events' || page === 'create-event-booking' || page === 'events-photos' || page === 'events-highlights' || page === 'events-memories') {
      setCurrentCategory('events');
    } else if (page === 'gaming-hub' || page === 'gaming-profile' || page === 'gaming-community' || page === 'gaming-chat' || page === 'gaming-map' || page === 'gaming-events' || page === 'gaming-photos' || page === 'gaming-highlights' || page === 'gaming-memories') {
      setCurrentCategory('gaming');
    }
    // For 'comprehensive-dashboard', 'availability', 'help', 'chat', 'group-chat', 'dm-chat', etc., keep the current category
    
    // Show notification when navigating to community if there are upcoming matches
    if (page === 'community' && sportsMatches.filter(m => m.status === 'upcoming').length > 0) {
      toast.success('🎉 Your matches are waiting for you!', {
        description: `You have ${sportsMatches.filter(m => m.status === 'upcoming').length} upcoming match${sportsMatches.filter(m => m.status === 'upcoming').length > 1 ? 'es' : ''} ready to play!`,
        duration: 4000,
      });
    }
    
    setCurrentPage(page);
    // Add to navigation history
    setNavigationHistory(prev => [...prev, page]);
    // Update browser history
    window.history.pushState({ page }, '', `#${page}`);
  };

  // Go back to previous page
  const goBack = () => {
    if (navigationHistory.length > 1) {
      // Remove current page from history
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const previousPage = newHistory[newHistory.length - 1];
      
      setNavigationHistory(newHistory);
      setCurrentPage(previousPage);
      
      // Update browser history
      window.history.back();
    } else {
      // If no history, go to landing
      navigateTo('landing');
    }
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
        // Update navigation history to match
        setNavigationHistory(prev => {
          const newHistory = [...prev];
          newHistory.pop();
          return newHistory;
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

=======
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
        setNavigationHistory(prev => {
          const newHistory = [...prev];
          newHistory.pop();
          return newHistory;
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

>>>>>>> landing-UI-redesign
  useEffect(() => {
    if (!user || inviteHandledRef.current) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const inviteToken = params.get('invite');
    if (!inviteToken) {
      return;
    }

    inviteHandledRef.current = true;

    const acceptInvite = async () => {
      const result = await realGroupChatService.acceptInvite(
        inviteToken,
        user.id,
        user.name || user.email || 'Member',
        user.email || 'member@example.com'
      );

      if (result.success && result.groupChatId) {
        setSelectedGroupChatId(result.groupChatId);
        navigateTo('modern-chat');
        toast.success('Invite accepted! 🎉');
      } else {
        toast.error(result.error || 'Invite invalid');
      }

      window.history.replaceState({}, document.title, window.location.pathname);
    };

    acceptInvite();
  }, [user, navigateTo]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-purple-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Civita...</p>
        </div>
      </div>
    );
  }

  // Show landing page by default
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen flex flex-col">
        <Toaster position="top-center" richColors />
        <Navigation currentPage="landing" onNavigate={navigateTo} onGetStarted={handleGetStarted} />
        <div className="flex-grow">
          <LandingPage onGetStarted={handleGetStarted} onCategorySelect={handleCategorySelectFromLanding} />
        </div>
        <Footer />
      </div>
    );
  }

  // Show explore page with persistent navbar
  if (currentPage === 'explore') {
    return (
      <div className="min-h-screen flex flex-col">
        <Toaster position="top-center" richColors />
        <Navigation currentPage="explore" onNavigate={navigateTo} onGetStarted={handleGetStarted} />
        <div className="flex-grow">
          <ExplorePage />
        </div>
        <Footer />
      </div>
    );
  }

  // Show community page with persistent navbar
  if (currentPage === 'community') {
    return (
      <div className="min-h-screen flex flex-col">
        <Toaster position="top-center" richColors />
        <Navigation currentPage="community" onNavigate={navigateTo} onGetStarted={handleGetStarted} />
        <div className="flex-grow">
          <CommunityPage />
        </div>
        <Footer />
      </div>
    );
  }

  // Show auth page if user clicked get started but not logged in
  if (!user && currentPage === 'auth') {
    return <AuthPage onAuthSuccess={handleAuthSuccess} onBack={() => navigateTo('landing')} />;
  }

  // Show onboarding form if user is logged in but hasn't completed onboarding
  if (user && !user.onboarding_completed && currentPage !== 'landing') {
    return (
      <OnboardingForm 
        onComplete={() => {
          if (pendingCategory === 'gaming') {
            navigateTo('gaming-hub');
          } else if (pendingCategory === 'events') {
            navigateTo('events-dashboard');
          } else if (pendingCategory === 'parties') {
            navigateTo('events-dashboard');
          } else {
            navigateTo('dashboard');
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" richColors />
      
      {/* Location Permission Modal */}
      {showLocationRequest && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[70]">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl border border-white/20"
          >
            {/* Animated Icon */}
            <motion.div 
              className="w-20 h-20 bg-gradient-to-br from-cyan-500 via-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </motion.div>
            
            <h2 className="mb-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Enable Location Access
            </h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Discover nearby matches, turfs, and events tailored to your location. Connect with local players and never miss out on games close to you! 🎯
            </p>
            
            {/* Benefits List */}
            <div className="bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-2xl p-5 mb-6 text-left border border-cyan-100">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-700">Find turfs & matches nearby</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-700">Connect with local players</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-700">Personalized recommendations</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleSkipLocation}
                className="flex-1 px-5 py-3.5 border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-700"
              >
                Skip for Now
              </button>
              <button
                onClick={handleLocationPermission}
                className="flex-1 px-5 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Allow Access
              </button>
            </div>
            
            <p className="text-xs text-slate-500 mt-4">
              We respect your privacy. Location data is only used to enhance your experience.
            </p>
          </motion.div>
        </div>
      )}
      
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-slate-600 font-medium">Loading...</p>
          </div>
        </div>
      }>
<<<<<<< HEAD
        {currentPage === 'dashboard' && <Dashboard onNavigate={navigateTo} userProfile={sportsProfile} matches={sportsMatches} />}
        {currentPage === 'events-dashboard' && <EventsDashboard onNavigate={navigateTo} userProfile={eventsProfile} onBookEvent={handleBookEvent} />}
        {currentPage === 'gaming-hub' && <GamingHub onNavigate={navigateTo} />}
        {currentPage === 'gaming-profile' && <GamingProfilePage onNavigate={navigateTo} />}
        {currentPage === 'gaming-community' && <GamingCommunityFeed onNavigate={navigateTo} />}
        {currentPage === 'gaming-chat' && <GroupChatGaming onNavigate={navigateTo} matchId={selectedMatchId} />}
        {currentPage === 'gaming-map' && <GamingMapView onNavigate={navigateTo} />}
        {currentPage === 'map-view' && <MapView onNavigate={navigateTo} />}
        {currentPage === 'sports-events' && <CommunityEvents category="sports" onNavigate={navigateTo} />}
        {currentPage === 'events-events' && <CommunityEvents category="events" onNavigate={navigateTo} />}
        {currentPage === 'sports-photos' && <PhotoAlbum category="sports" onNavigate={navigateTo} />}
        {currentPage === 'events-photos' && <PhotoAlbum category="events" onNavigate={navigateTo} />}
        {currentPage === 'gaming-photos' && <PhotoAlbum category="gaming" onNavigate={navigateTo} />}
        {currentPage === 'sports-highlights' && <HighlightReels category="sports" onNavigate={navigateTo} />}
        {currentPage === 'events-highlights' && <HighlightReels category="events" onNavigate={navigateTo} />}
        {currentPage === 'gaming-highlights' && <HighlightReels category="gaming" onNavigate={navigateTo} />}
        {currentPage === 'sports-memories' && <MemoryTimeline category="sports" onNavigate={navigateTo} />}
        {currentPage === 'events-memories' && <MemoryTimeline category="events" onNavigate={navigateTo} />}
        {currentPage === 'gaming-memories' && <MemoryTimeline category="gaming" onNavigate={navigateTo} />}
        {currentPage === 'profile' && <ProfilePage onNavigate={navigateTo} onProfileUpdate={handleSportsProfileUpdate} userProfile={sportsProfile} matches={sportsMatches} />}
        {currentPage === 'events-profile' && <EventsProfilePage onNavigate={navigateTo} onProfileUpdate={handleEventsProfileUpdate} userProfile={eventsProfile} matches={eventsMatches} />}
        {currentPage === 'community' && <CommunityFeed onNavigate={navigateTo} matches={sportsMatches} />}
        {currentPage === 'sports-community' && <SportsCommunityFeed onNavigate={navigateTo} />}
        {currentPage === 'cultural-community' && <CulturalCommunityFeed onNavigate={navigateTo} />}
        {currentPage === 'reflection' && <PostMatchReflection onNavigate={navigateTo} />}
        {currentPage === 'finder' && <MatchFinder onNavigate={navigateTo} onMatchJoin={handleMatchJoin} />}
        {currentPage === 'discovery' && <DiscoveryHub onNavigate={navigateTo} />}
        {currentPage === 'create-match' && <CreateMatchPlan onNavigate={navigateTo} onMatchCreate={handleMatchCreate} />}
        {currentPage === 'create-event-booking' && <CreateEventBooking onNavigate={navigateTo} onEventBook={handleEventBook} eventDetails={selectedEventDetails} />}
        {currentPage === 'turf-detail' && <TurfDetail onNavigate={navigateTo} turfId={selectedTurfId} />}
        {currentPage === 'chat' && <WhatsAppChat onNavigate={navigateTo} matchId={selectedMatchId} category="sports" />}
        {currentPage === 'sports-chat' && <WhatsAppChat onNavigate={navigateTo} matchId={selectedMatchId} category="sports" />}
        {currentPage === 'events-chat' && <WhatsAppChat onNavigate={navigateTo} matchId={selectedMatchId} category="events" />}
        {currentPage === 'group-chat' && selectedGroupChatId && (
||||||| 8e3dd98
        {currentPage === 'dashboard' && <Dashboard onNavigate={navigateTo} onBack={goBack} userProfile={sportsProfile} matches={sportsMatches} />}
        {currentPage === 'events-dashboard' && <EventsDashboard onNavigate={navigateTo} onBack={goBack} userProfile={eventsProfile} onBookEvent={handleBookEvent} />}
        {currentPage === 'gaming-hub' && <GamingHub onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'gaming-profile' && <GamingProfilePage onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'gaming-community' && <GamingCommunityFeed onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'gaming-chat' && <GroupChatGaming onNavigate={navigateTo} onBack={goBack} matchId={selectedMatchId} />}
        {currentPage === 'gaming-map' && <GamingMapView onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'map-view' && <MapView onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'sports-events' && <CommunityEvents category="sports" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'events-events' && <CommunityEvents category="events" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'sports-photos' && <PhotoAlbum category="sports" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'events-photos' && <PhotoAlbum category="events" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'gaming-photos' && <PhotoAlbum category="gaming" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'sports-highlights' && <HighlightReels category="sports" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'events-highlights' && <HighlightReels category="events" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'gaming-highlights' && <HighlightReels category="gaming" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'sports-memories' && <MemoryTimeline category="sports" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'events-memories' && <MemoryTimeline category="events" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'gaming-memories' && <MemoryTimeline category="gaming" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'profile' && <ProfilePage onNavigate={navigateTo} onBack={goBack} onProfileUpdate={handleSportsProfileUpdate} userProfile={sportsProfile} matches={sportsMatches} />}
        {currentPage === 'events-profile' && <EventsProfilePage onNavigate={navigateTo} onBack={goBack} onProfileUpdate={handleEventsProfileUpdate} userProfile={eventsProfile} matches={eventsMatches} />}
        {currentPage === 'community' && <CommunityFeed onNavigate={navigateTo} onBack={goBack} matches={sportsMatches} />}
        {currentPage === 'sports-community' && <SportsCommunityFeed onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'cultural-community' && <CulturalCommunityFeed onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'reflection' && <PostMatchReflection onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'finder' && <MatchFinder onNavigate={navigateTo} onBack={goBack} onMatchJoin={handleMatchJoin} />}
        {currentPage === 'discovery' && <DiscoveryHub onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'create-match' && <CreateMatchPlan onNavigate={navigateTo} onBack={goBack} onMatchCreate={handleMatchCreate} />}
        {currentPage === 'create-event-booking' && <CreateEventBooking onNavigate={navigateTo} onBack={goBack} onEventBook={handleEventBook} eventDetails={selectedEventDetails} />}
        {currentPage === 'turf-detail' && <TurfDetail onNavigate={navigateTo} onBack={goBack} turfId={selectedTurfId} />}
        {(currentPage === 'chat' || currentPage === 'sports-chat' || currentPage === 'events-chat' || currentPage === 'group-chat' || currentPage === 'dm-chat' || currentPage === 'modern-chat') && (
=======
        {currentPage === 'dashboard' && <Dashboard onNavigate={navigateTo} onBack={goBack} userProfile={sportsProfile} matches={sportsMatches} />}
        {currentPage === 'events-dashboard' && <EventsDashboard onNavigate={navigateTo} onBack={goBack} userProfile={eventsProfile} onBookEvent={handleBookEvent} />}
        {currentPage === 'gaming-hub' && <GamingHub onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'gaming-profile' && <GamingProfilePage onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'gaming-community' && <GamingCommunityFeed onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'gaming-chat' && <GroupChatGaming onNavigate={navigateTo} onBack={goBack} matchId={selectedMatchId} />}
        {currentPage === 'gaming-map' && <GamingMapView onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'map-view' && <MapView onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'sports-events' && <CommunityEvents category="sports" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'events-events' && <CommunityEvents category="events" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'sports-photos' && <PhotoAlbum category="sports" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'events-photos' && <PhotoAlbum category="events" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'gaming-photos' && <PhotoAlbum category="gaming" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'sports-highlights' && <HighlightReels category="sports" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'events-highlights' && <HighlightReels category="events" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'gaming-highlights' && <HighlightReels category="gaming" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'sports-memories' && <MemoryTimeline category="sports" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'events-memories' && <MemoryTimeline category="events" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'gaming-memories' && <MemoryTimeline category="gaming" onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'profile' && <ProfilePage onNavigate={navigateTo} onBack={goBack} onProfileUpdate={handleSportsProfileUpdate} userProfile={sportsProfile} matches={sportsMatches} />}
        {currentPage === 'events-profile' && <EventsProfilePage onNavigate={navigateTo} onBack={goBack} onProfileUpdate={handleEventsProfileUpdate} userProfile={eventsProfile} matches={eventsMatches} />}
        {currentPage === 'community-feed' && <CommunityFeed onNavigate={navigateTo} onBack={goBack} matches={sportsMatches} />}
        {currentPage === 'sports-community' && <SportsCommunityFeed onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'cultural-community' && <CulturalCommunityFeed onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'reflection' && <PostMatchReflection onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'finder' && <MatchFinder onNavigate={navigateTo} onBack={goBack} onMatchJoin={handleMatchJoin} />}
        {currentPage === 'discovery' && <DiscoveryHub onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'create-match' && <CreateMatchPlan onNavigate={navigateTo} onBack={goBack} onMatchCreate={handleMatchCreate} />}
        {currentPage === 'create-event-booking' && <CreateEventBooking onNavigate={navigateTo} onBack={goBack} onEventBook={handleEventBook} eventDetails={selectedEventDetails} />}
        {currentPage === 'turf-detail' && <TurfDetail onNavigate={navigateTo} onBack={goBack} turfId={selectedTurfId} />}
        {(currentPage === 'chat' || currentPage === 'sports-chat' || currentPage === 'events-chat' || currentPage === 'group-chat' || currentPage === 'dm-chat' || currentPage === 'modern-chat') && (
>>>>>>> landing-UI-redesign
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading chat...</div>}>
            <GroupChatComponent chatId={selectedGroupChatId} onClose={() => navigateTo('dashboard')} />
          </Suspense>
        )}
        {currentPage === 'dm-chat' && selectedConversationId && (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading messages...</div>}>
            <DirectMessageThread conversationId={selectedConversationId} onNavigate={navigateTo} />
          </Suspense>
        )}
        {currentPage === 'modern-chat' && (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading chat...</div>}>
            <ModernChat
              selectedConversationId={selectedConversationId ?? undefined}
              currentUser={user ? { id: user.id, name: user.name, email: user.email } : undefined}
              onClose={() => navigateTo('dashboard')}
            />
          </Suspense>
        )}
        {currentPage === 'match-history' && (
          <MatchHistory
            onNavigate={navigateTo}
            onBack={() => navigateTo('dashboard')}
            userId={user?.id}
          />
        )}
        {currentPage === 'help' && <HelpSupport onNavigate={navigateTo} category={currentCategory} />}
        {currentPage === 'availability' && <RealTimeAvailability onNavigate={navigateTo} category={currentCategory} />}
        {currentPage === 'comprehensive-dashboard' && (
          <ThemeProvider userId="user_001">
            <ComprehensiveDashboard 
              userId="user_001" 
              userName={sportsProfile.name} 
              onClose={() => {
                // Navigate back to the appropriate dashboard based on current category
                if (currentCategory === 'sports') {
                  navigateTo('dashboard');
                } else if (currentCategory === 'events') {
                  navigateTo('events-dashboard');
                } else if (currentCategory === 'parties') {
                  navigateTo('party-dashboard');
                }
              }} 
            />
          </ThemeProvider>
        )}
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContainer />
      </AuthProvider>
    </ErrorBoundary>
  );
}