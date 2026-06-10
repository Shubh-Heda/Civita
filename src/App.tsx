import { useState, useEffect, lazy, Suspense, useMemo, useCallback, useRef } from 'react';
import { Toaster, toast } from 'sonner';
import { ErrorBoundary } from './components/ErrorBoundary';

// Eagerly load critical components from pages subfolder
import { Navigation } from './components/Navigation';
import { LandingPage } from './pages/LandingPage';
import { ExplorePage } from './pages/ExplorePage';
import { CommunityPage } from './pages/CommunityPage';
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
const MatchHistory = lazy(() => import('./components/MatchHistory').then(m => ({ default: m.MatchHistory })));

import { apiService } from './services/apiService';
import { friendshipService } from './services/friendshipService';
import { gratitudeService } from './services/gratitudeService';
import { postMatchService } from './services/postMatchService';
import { achievementService } from './services/achievementService';
import { profileService, matchService, initializeDefaultData } from './services/backendService';
import { realGroupChatService } from './services/groupChatServiceReal';
import { matchNotificationService } from './services/matchNotificationService';
import { AuthProvider, useAuth } from './lib/AuthProvider';
import { supabaseEnabled } from './lib/supabaseClient';
import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';

type Page = 'landing' | 'explore' | 'community' | 'warm-onboarding' | 'auth' | 'dashboard' | 'events-dashboard' | 'gaming-hub' | 'gaming-profile' | 'gaming-community' | 'gaming-chat' | 'gaming-map' | 'gaming-events' | 'sports-events' | 'events-events' | 'sports-photos' | 'events-photos' | 'gaming-photos' | 'sports-highlights' | 'events-highlights' | 'gaming-highlights' | 'sports-memories' | 'events-memories' | 'gaming-memories' | 'profile' | 'events-profile' | 'community-feed' | 'sports-community' | 'cultural-community' | 'reflection' | 'finder' | 'discovery' | 'create-match' | 'create-event-booking' | 'turf-detail' | 'chat' | 'sports-chat' | 'events-chat' | 'group-chat' | 'dm-chat' | 'modern-chat' | 'match-history' | 'help' | 'availability' | 'comprehensive-dashboard' | 'map-view';

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

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [navigationHistory, setNavigationHistory] = useState<Page[]>(['landing']);
  const [selectedTurfId, setSelectedTurfId] = useState<string | null>(null);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [selectedGroupChatId, setSelectedGroupChatId] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
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
      navigateTo('dashboard');
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
            
            const sportsMatchesData = await matchService.getMatches('sports');
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

  const requestNativeLocation = useCallback(() => {
    if (navigator.geolocation) {
      toast.loading('Getting your location...', { id: 'location-loading' });
      
      // This triggers the native top-left browser popup
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          
          setLocationPermissionGranted(true);
          setUserLocation(locationData);
          localStorage.setItem('userLocation', JSON.stringify(locationData));
          localStorage.setItem('locationSource', 'gps');
          
          toast.dismiss('location-loading');
          toast.success('Location access granted! 📍', {
            description: 'We can now show you nearby experiences.',
          });
        },
        (error) => {
          toast.dismiss('location-loading');
          
          const defaultLocation = { latitude: 23.0225, longitude: 72.5714 };
          setUserLocation(defaultLocation);
          localStorage.setItem('userLocation', JSON.stringify(defaultLocation));
          localStorage.setItem('locationSource', 'default');
          
          toast.success('Location set to Ahmedabad 📍', {
            description: 'Using Ahmedabad as default location. You can still use all features!',
          });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      const defaultLocation = { latitude: 23.0225, longitude: 72.5714 };
      setUserLocation(defaultLocation);
      localStorage.setItem('userLocation', JSON.stringify(defaultLocation));
      localStorage.setItem('locationSource', 'default');
      toast.success('Location set to Ahmedabad 📍', {
        description: 'Geolocation not supported. Using default location.',
      });
    }
  }, []);

  const handleCategorySelectFromLanding = useCallback((category: 'sports' | 'events' | 'parties' | 'gaming') => {
    console.log('🎮 LANDING PAGE - Category selected:', category);
    
    if (category === 'gaming') {
      if (!user) {
        setPendingCategory('gaming');
        setCurrentPage('auth');
      } else {
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
      // DIRECT ROUTING: Skip custom location page, go straight to dashboard
      if (category === 'sports') {
        setCurrentPage('dashboard');
      } else if (category === 'events' || category === 'parties') {
        setCurrentPage('events-dashboard');
      }
      // Trigger native popup
      requestNativeLocation();
      setPendingCategory(null);
    }
  }, [user, requestNativeLocation]);

  const handleAuthSuccess = useCallback(() => {
    console.log('🎮 Auth successful! Pending category:', pendingCategory);
    
    if (pendingCategory === 'gaming') {
      setCurrentPage('gaming-hub');
      setPendingCategory(null);
      return;
    }
    
    // DIRECT ROUTING: Skip custom location page, go straight to dashboard
    if (pendingCategory === 'events' || pendingCategory === 'parties') {
      setCurrentPage('events-dashboard');
    } else {
      setCurrentPage('dashboard');
    }
    
    // Trigger native popup
    requestNativeLocation();
    setPendingCategory(null);
  }, [pendingCategory, requestNativeLocation]);

  const handleSportsProfileUpdate = useCallback(async (updatedProfile: UserProfile) => {
    setSportsProfile(updatedProfile);
    
    if (user) {
      try {
        const { data: existingProfile } = await profileService.getUserProfile(user.id);
        if (existingProfile) {
          await profileService.updateProfile(existingProfile.id, {
            name: updatedProfile.name,
            bio: updatedProfile.bio,
            interests: updatedProfile.interests,
            location: updatedProfile.location
          });
          toast.success('Sports Profile Updated! ⚽', {
            description: 'Your changes have been saved!',
          });
        } else {
          await profileService.createProfile({
            id: user.id,
            user_id: user.id,
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
          await profileService.updateProfile(existingProfile.id, {
            name: updatedProfile.name,
            bio: updatedProfile.bio,
            interests: updatedProfile.interests,
            location: updatedProfile.location
          });
          toast.success('Events Profile Updated! 🎉', {
            description: 'Your changes have been saved!',
          });
        } else {
          await profileService.createProfile({
            id: user.id,
            user_id: user.id,
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
    
    setChatGroups(prev => ({
      ...prev,
      [match.id]: match.title
    }));
    
    if (user) {
      try {
        if (!supabaseEnabled) {
          throw new Error('Supabase unavailable in local dev. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
        }

        const { data: createdMatch, error: matchError } = await matchService.addMatch({
          user_id: user.id,
          organizer_id: user.id,
          organizer_id_uuid: user.id,
          title: match.title,
          turf_name: match.turfName,
          date: match.date,
          time: match.time,
          sport: match.sport,
          status: match.status,
          visibility: match.visibility,
          payment_option: match.paymentOption,
          amount: match.amount,
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

        const persistedMatchId = createdMatch?.id || match.id;

        const { error: participantError } = await matchService.addMatchParticipant(
          persistedMatchId,
          user.id,
          'organizer',
          'joined'
        );

        if (participantError) {
          throw new Error(`Failed to add organizer to match: ${participantError}`);
        }

        try {
          const conversation = await realGroupChatService.createGroupChat(
  persistedMatchId,
  match.title,
  `Meet up for ${match.sport || 'sports'} at ${match.turfName || 'the venue'}`,
  user.id,
  user.name || user.email || 'Organizer',
  user.email || ''
);

const matchWithChat = { ...match, id: persistedMatchId, groupChatId: conversation.id };
matchNotificationService.saveMatchToDiscoverable(matchWithChat);

navigateTo('modern-chat', undefined, persistedMatchId, undefined, conversation.id);

await realGroupChatService.sendMessage(
  conversation.id,
  user.id,
  user.name || user.email || 'Organizer',
  `🎉 Match created! ${match.sport} at ${match.turfName} on ${match.date} at ${match.time}\n\nMin players: ${match.minPlayers} | Max: ${match.maxPlayers}\n\nJoin and let's play!`,
  'text'
);     } catch (chatError) {
          console.error('❌ Modern chat creation failed:', chatError);
          navigateTo('match-history');
          toast.error('Match saved, but chat setup failed', {
            description: chatError instanceof Error ? chatError.message : 'Please run the chat DB setup SQL scripts in Supabase.',
          });
        }
        
        console.log('✅ Match saved to backend:', match.title);
        toast.success('Match Created Successfully! 🎉', {
          description: 'Chat conversation created - opening now!',
        });
      } catch (error) {
        console.error('❌ Error saving match to backend:', error);
        navigateTo('match-history');
        toast.error('Match save failed', {
          description: error instanceof Error ? error.message : 'Backend rejected match save.',
        });
      }
    } else {
      toast.info('Match Created! 🎉', {
        description: 'Sign in to create group chat!',
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
        
        if (!matchExists) {
          const { error: createError } = await matchService.addMatch({
            user_id: user.id,
            title: match.title,
            turf_name: match.turfName,
            date: match.date,
            time: match.time,
            sport: match.sport,
            status: match.status,
            visibility: match.visibility,
            payment_option: match.paymentOption,
            amount: match.amount,
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
        }

        try {
          let groupChat = await realGroupChatService.getGroupChatByMatchId(match.id);
          if (!groupChat) {
            groupChat = await realGroupChatService.createGroupChat(
              match.id,
              match.title,
              `Meet up for ${match.sport || 'sports'} at ${match.turfName || 'the venue'}`,
              user.id,
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
            );
          }

          setSelectedGroupChatId(groupChat.id);
          navigateTo('modern-chat');
          console.log('✅ Group chat for match ready:', groupChat.id);
        } catch (chatError) {
          console.error('Note: Group chat access failed:', chatError);
          navigateTo('modern-chat');
        }
        
        toast.success('Joined Match! ⚽', {
          description: 'Chat opened - let\'s play!',
        });
      } catch (error) {
        console.error('❌ Error joining match:', error);
        navigateTo('modern-chat');
        toast.info('Joined Locally! 📱', {
          description: 'Chat ready to use!',
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
          amount: event.amount || event.ticketPrice,
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
        <Navigation currentPage="landing" onNavigate={navigateTo} />
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
        <Navigation currentPage="explore" onNavigate={navigateTo} />
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
        <Navigation currentPage="community" onNavigate={navigateTo} />
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
      
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-slate-600 font-medium">Loading...</p>
          </div>
        </div>
      }>
        {currentPage === 'dashboard' && <Dashboard onNavigate={navigateTo} onBack={goBack} userProfile={sportsProfile} matches={sportsMatches} />}
        {currentPage === 'events-dashboard' && <EventsDashboard onNavigate={navigateTo} onBack={goBack} userProfile={eventsProfile} onBookEvent={handleBookEvent} />}
        {currentPage === 'gaming-hub' && <GamingHub onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'gaming-profile' && <GamingProfilePage onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'gaming-community' && <GamingCommunityFeed onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'gaming-chat' && <GroupChatGaming onNavigate={navigateTo} onBack={goBack} matchId={selectedMatchId} />}
        {currentPage === 'gaming-map' && <GamingMapView onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'map-view' && <MapView onNavigate={navigateTo} onBack={goBack} />}
        {currentPage === 'sports-events' && <CommunityEvents category="sports" onNavigate={navigateTo} />}
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
        {currentPage === 'match-history' && <MatchHistory onNavigate={navigateTo} onBack={goBack} userId={user?.id} />}
        {currentPage === 'create-event-booking' && <CreateEventBooking onNavigate={navigateTo} onBack={goBack} onEventBook={handleEventBook} eventDetails={selectedEventDetails} />}
        {currentPage === 'turf-detail' && <TurfDetail onNavigate={navigateTo} onBack={goBack} turfId={selectedTurfId} />}
        {(currentPage === 'chat' || currentPage === 'sports-chat' || currentPage === 'events-chat' || currentPage === 'group-chat' || currentPage === 'dm-chat' || currentPage === 'modern-chat') && (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading chat...</div>}>
            <ModernChat 
  selectedConversationId={selectedConversationId || selectedGroupChatId || undefined} 
  onClose={goBack}
  currentUser={user ? { id: user.id, name: user.name, email: user.email } : undefined}
/>
          </Suspense>
        )}
        {currentPage === 'help' && <HelpSupport onNavigate={navigateTo} onBack={goBack} category={currentCategory} />}
        {currentPage === 'availability' && <RealTimeAvailability onNavigate={navigateTo} onBack={goBack} category={currentCategory} />}
        {currentPage === 'comprehensive-dashboard' && (
          <ThemeProvider userId="user_001">
            <ComprehensiveDashboard 
              userId="user_001" 
              userName={sportsProfile.name} 
              onClose={goBack} 
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
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}
