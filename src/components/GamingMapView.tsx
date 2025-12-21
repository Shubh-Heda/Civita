import { useState } from 'react';
import { ArrowLeft, MapPin, Search, Filter, Users, Gamepad2, Trophy, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface GamingMapViewProps {
  onNavigate: (page: string) => void;
}

export function GamingMapView({ onNavigate }: GamingMapViewProps) {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const gamingCafes = [
    {
      id: '1',
      name: 'Gaming Arena Ahmedabad',
      location: 'SG Highway',
      lat: 23.0330,
      lng: 72.5174,
      distance: '2.3 km',
      rating: 4.8,
      reviews: 342,
      games: ['FIFA 24', 'Valorant', 'COD MW3'],
      members: 1250,
      isOpen: true,
      facilities: ['WiFi', 'Food & Drinks', 'Tournament', 'Pro Setup'],
    },
    {
      id: '2',
      name: 'Pro Gaming Hub',
      location: 'Sardar Patel Stadium',
      lat: 23.0878,
      lng: 72.5703,
      distance: '4.1 km',
      rating: 4.6,
      reviews: 287,
      games: ['Valorant', 'CS:GO', 'Dota 2'],
      members: 890,
      isOpen: true,
      facilities: ['WiFi', 'Coaching', 'Tournaments', 'Streaming'],
    },
    {
      id: '3',
      name: 'Gaming Zone Elite',
      location: 'Law Garden',
      lat: 23.0295,
      lng: 72.5556,
      distance: '1.8 km',
      rating: 4.9,
      reviews: 512,
      games: ['FIFA 24', 'Valorant', 'Apex Legends'],
      members: 2100,
      isOpen: true,
      facilities: ['WiFi', 'Food & Drinks', 'Streaming Setup', 'Tournament'],
    },
    {
      id: '4',
      name: 'E-Sports Academy',
      location: 'CEPT University',
      lat: 23.0295,
      lng: 72.5556,
      distance: '3.2 km',
      rating: 4.7,
      reviews: 198,
      games: ['Valorant', 'COD MW3', 'Fortnite'],
      members: 620,
      isOpen: false,
      facilities: ['Coaching', 'Professional Setup', 'Tournaments'],
    },
  ];

  const filteredCafes = gamingCafes.filter(cafe =>
    cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cafe.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('gaming-hub')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h1 className="text-slate-900 font-semibold">Gaming Cafes & Clubs</h1>
              <p className="text-sm text-slate-600">Find gaming hubs near you</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-120px)]">
          {/* Search & List */}
          <div className="col-span-4 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cafes..."
                  className="pl-10 bg-slate-50 border-slate-200"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredCafes.map((cafe) => (
                <button
                  key={cafe.id}
                  onClick={() => setSelectedLocation(cafe)}
                  className={`w-full p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors text-left ${
                    selectedLocation?.id === cafe.id ? 'bg-purple-50 border-l-4 border-l-purple-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">{cafe.name}</h3>
                    <Badge className={cafe.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                      {cafe.isOpen ? 'Open' : 'Closed'}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 flex items-center gap-1 mb-2">
                    <MapPin className="w-4 h-4" /> {cafe.location} • {cafe.distance}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      ⭐ {cafe.rating} ({cafe.reviews})
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {cafe.members}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="col-span-8 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col">
            {selectedLocation ? (
              <>
                {/* Header */}
                <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <h2 className="text-2xl font-bold mb-2">{selectedLocation.name}</h2>
                  <p className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5" /> {selectedLocation.location}
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">⭐</span>
                      <div>
                        <p className="font-bold">{selectedLocation.rating}</p>
                        <p className="text-sm opacity-90">{selectedLocation.reviews} reviews</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <div>
                        <p className="font-bold">{selectedLocation.members}</p>
                        <p className="text-sm opacity-90">Members</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Games Available */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5 text-purple-600" />
                      Popular Games
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocation.games.map((game: string) => (
                        <Badge key={game} className="bg-purple-100 text-purple-700">
                          {game}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      Facilities
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedLocation.facilities.map((facility: string) => (
                        <div key={facility} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <p className="text-sm font-semibold text-slate-900">{facility}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Status
                    </h3>
                    <div className={`p-4 rounded-lg border ${
                      selectedLocation.isOpen 
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <p className={`font-semibold ${
                        selectedLocation.isOpen 
                          ? 'text-green-700'
                          : 'text-red-700'
                      }`}>
                        {selectedLocation.isOpen ? '✅ Open Now' : '🚫 Currently Closed'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-slate-200 flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Visit Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Get Directions
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-600">
                <p>Select a gaming cafe to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
