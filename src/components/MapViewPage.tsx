import { useState } from 'react';
import { MapPin, Navigation, Filter, Search, X, Star, TrendingUp, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

interface Location {
  id: string;
  type: 'turf' | 'match' | 'event' | 'party';
  name: string;
  address: string;
  distance: string;
  rating?: number;
  lat: number;
  lng: number;
  availability?: string;
  price?: string;
  players?: string;
  badge?: string;
}

interface MapViewPageProps {
  onNavigate: (page: string, id?: string) => void;
  category?: 'sports' | 'events' | 'parties';
  userLocation?: { latitude: number; longitude: number } | null;
}

export function MapViewPage({ onNavigate, category = 'sports', userLocation }: MapViewPageProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'turf' | 'match' | 'event' | 'party'>('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock locations - in real app, these would come from backend based on user location
  const locations: Location[] = [
    {
      id: '1',
      type: 'turf',
      name: 'Sky Sports Arena',
      address: 'Bandra West, Mumbai',
      distance: '1.2 km',
      rating: 4.8,
      lat: 19.0596,
      lng: 72.8295,
      availability: 'Available Now',
      price: '₹2000/hr',
      badge: 'Coaching Available',
    },
    {
      id: '2',
      type: 'match',
      name: 'Saturday Football',
      address: 'Sky Sports Arena, Bandra',
      distance: '1.2 km',
      lat: 19.0596,
      lng: 72.8295,
      players: '8/10 players',
      badge: 'Filling Fast',
    },
    {
      id: '3',
      type: 'turf',
      name: 'Champions Ground',
      address: 'Andheri East, Mumbai',
      distance: '3.5 km',
      rating: 4.6,
      lat: 19.1136,
      lng: 72.8697,
      availability: 'Fully Booked',
      price: '₹1500/hr',
    },
    {
      id: '4',
      type: 'match',
      name: 'Sunday Cricket',
      address: 'Champions Ground, Andheri',
      distance: '3.5 km',
      lat: 19.1136,
      lng: 72.8697,
      players: '5/11 players',
      badge: 'Newbie Friendly',
    },
    {
      id: '5',
      type: 'turf',
      name: 'Elite Sports Club',
      address: 'Worli, Mumbai',
      distance: '5.8 km',
      rating: 4.9,
      lat: 19.0176,
      lng: 72.8181,
      availability: 'Available',
      price: '₹2500/hr',
      badge: 'Premium',
    },
  ];

  const filteredLocations = locations.filter(loc => {
    const matchesFilter = selectedFilter === 'all' || loc.type === selectedFilter;
    const matchesSearch = searchQuery === '' || 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = 
      (category === 'sports' && (loc.type === 'turf' || loc.type === 'match')) ||
      (category === 'events' && loc.type === 'event') ||
      (category === 'parties' && loc.type === 'party');
    
    return matchesFilter && matchesSearch && matchesCategory;
  });

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleViewDetails = () => {
    if (selectedLocation) {
      if (selectedLocation.type === 'turf') {
        onNavigate('turf-detail', selectedLocation.id);
      } else if (selectedLocation.type === 'match') {
        onNavigate('chat', selectedLocation.id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900">Explore Map</h1>
                <p className="text-xs text-slate-600">Discover nearby experiences</p>
              </div>
            </div>

            <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
              Close
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
                className={selectedFilter === 'all' ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white' : ''}
              >
                All
              </Button>
              <Button
                variant={selectedFilter === 'turf' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('turf')}
                className={selectedFilter === 'turf' ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white' : ''}
              >
                Turfs
              </Button>
              <Button
                variant={selectedFilter === 'match' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('match')}
                className={selectedFilter === 'match' ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white' : ''}
              >
                Matches
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Map and List View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Placeholder */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-[600px] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-cyan-100 to-blue-100">
              {/* Map Grid Background */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}></div>

              {/* Location Pins */}
              {filteredLocations.map((location, index) => (
                <motion.button
                  key={location.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleLocationClick(location)}
                  className={`absolute w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 ${
                    selectedLocation?.id === location.id
                      ? 'ring-4 ring-white scale-125'
                      : ''
                  } ${
                    location.type === 'turf'
                      ? 'bg-emerald-500'
                      : location.type === 'match'
                      ? 'bg-cyan-500'
                      : location.type === 'event'
                      ? 'bg-orange-500'
                      : 'bg-pink-500'
                  }`}
                  style={{
                    top: `${(index + 1) * 15 + Math.random() * 20}%`,
                    left: `${(index + 1) * 15 + Math.random() * 20}%`,
                  }}
                >
                  <MapPin className="w-5 h-5 text-white" />
                </motion.button>
              ))}

              {/* User Location Pin */}
              {userLocation && (
                <div
                  className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
                </div>
              )}
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button size="sm" className="bg-white shadow-lg hover:bg-slate-50">
                <Navigation className="w-4 h-4" />
              </Button>
            </div>

            {/* Map Legend */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <p className="text-xs text-slate-600 mb-2">Legend</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs text-slate-700">Turfs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span className="text-xs text-slate-700">Matches</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-xs text-slate-700">You</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location List */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-900">{filteredLocations.length} Locations Nearby</h3>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {filteredLocations.map((location) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => handleLocationClick(location)}
                className={`bg-white rounded-xl p-4 border-2 transition-all cursor-pointer hover:shadow-md ${
                  selectedLocation?.id === location.id
                    ? 'border-cyan-500 shadow-lg'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      location.type === 'turf'
                        ? 'bg-emerald-100 text-emerald-600'
                        : location.type === 'match'
                        ? 'bg-cyan-100 text-cyan-600'
                        : location.type === 'event'
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-pink-100 text-pink-600'
                    }`}
                  >
                    <MapPin className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-slate-900 truncate">{location.name}</h4>
                      {location.badge && (
                        <Badge className="bg-cyan-100 text-cyan-700 text-xs border-0">
                          {location.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{location.address}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Navigation className="w-3 h-3" />
                        {location.distance}
                      </span>
                      {location.rating && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {location.rating}
                        </span>
                      )}
                      {location.players && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {location.players}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    {location.availability && (
                      <span className={`${
                        location.availability === 'Available Now'
                          ? 'text-emerald-600'
                          : location.availability === 'Available'
                          ? 'text-cyan-600'
                          : 'text-slate-500'
                      }`}>
                        {location.availability}
                      </span>
                    )}
                    {location.price && (
                      <span className="text-slate-900 ml-2">{location.price}</span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    onClick={handleViewDetails}
                    className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white"
                  >
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}

            {filteredLocations.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No locations found</p>
                <p className="text-sm text-slate-500">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
