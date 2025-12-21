import { useState } from 'react';
import { MapPin, TrendingUp, Filter, Zap, Map } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { GlassCard } from './GlassCard';
import { MapView } from './MapView';

interface ActivityHeatmapProps {
  category?: 'sports' | 'cultural' | 'parties' | 'all';
}

interface HotSpot {
  id: string;
  name: string;
  category: string;
  activeNow: number;
  lat: number;
  lng: number;
  intensity: 'high' | 'medium' | 'low';
}

export function ActivityHeatmap({ category = 'all' }: ActivityHeatmapProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'sports' | 'cultural' | 'parties'>('all');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [showFullMap, setShowFullMap] = useState(false);

  const hotSpots: HotSpot[] = [
    {
      id: '1',
      name: 'Sky Sports Arena',
      category: 'sports',
      activeNow: 45,
      lat: 23.0225,
      lng: 72.5714,
      intensity: 'high',
    },
    {
      id: '2',
      name: 'Culture Hub',
      category: 'cultural',
      activeNow: 32,
      lat: 23.0335,
      lng: 72.5850,
      intensity: 'high',
    },
    {
      id: '3',
      name: 'Skybar Lounge',
      category: 'parties',
      activeNow: 68,
      lat: 23.0195,
      lng: 72.5680,
      intensity: 'high',
    },
    {
      id: '4',
      name: 'Green Fields',
      category: 'sports',
      activeNow: 18,
      lat: 23.0405,
      lng: 72.5920,
      intensity: 'medium',
    },
    {
      id: '5',
      name: 'Art Gallery Downtown',
      category: 'cultural',
      activeNow: 24,
      lat: 23.0280,
      lng: 72.5765,
      intensity: 'medium',
    },
    {
      id: '6',
      name: 'Beachside Club',
      category: 'parties',
      activeNow: 41,
      lat: 23.0150,
      lng: 72.5620,
      intensity: 'high',
    },
    {
      id: '7',
      name: 'Indoor Sports Complex',
      category: 'sports',
      activeNow: 12,
      lat: 23.0460,
      lng: 72.5995,
      intensity: 'low',
    },
  ];

  const filteredSpots = selectedFilter === 'all' 
    ? hotSpots 
    : hotSpots.filter(spot => spot.category === selectedFilter);

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'high':
        return 'from-red-500 to-orange-500';
      case 'medium':
        return 'from-yellow-500 to-orange-500';
      case 'low':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'sports':
        return 'bg-cyan-100 text-cyan-700';
      case 'cultural':
        return 'bg-purple-100 text-purple-700';
      case 'parties':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'sports':
        return '⚽';
      case 'cultural':
        return '🎨';
      case 'parties':
        return '🎉';
      default:
        return '📍';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-orange-600" />
          <h2>Activity Heatmap</h2>
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            {filteredSpots.reduce((acc, spot) => acc + spot.activeNow, 0)} people active
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('map')}
          >
            Map
          </Button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {['all', 'sports', 'cultural', 'parties'].map(filter => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter(filter as any)}
            className="capitalize whitespace-nowrap"
          >
            <Filter className="w-3 h-3 mr-1" />
            {filter}
          </Button>
        ))}
      </div>

      {viewMode === 'map' ? (
        /* Map View */
        <GlassCard variant="highlighted">
          <div className="relative h-96 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 opacity-20" 
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, #ddd 0px, #ddd 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #ddd 0px, #ddd 1px, transparent 1px, transparent 20px)',
              }}
            />
            
            {/* Map Markers */}
            {filteredSpots.map((spot, index) => {
              const top = 20 + (index * 15) % 60;
              const left = 15 + (index * 25) % 70;
              
              return (
                <div
                  key={spot.id}
                  className="absolute cursor-pointer group"
                  style={{ top: `${top}%`, left: `${left}%` }}
                >
                  {/* Pulsing Ring */}
                  <div className={`absolute -inset-4 bg-gradient-to-r ${getIntensityColor(spot.intensity)} rounded-full opacity-20 animate-ping`} />
                  
                  {/* Marker */}
                  <div className={`relative w-10 h-10 bg-gradient-to-r ${getIntensityColor(spot.intensity)} rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform`}>
                    <span className="text-lg">{getCategoryIcon(spot.category)}</span>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-white rounded-lg shadow-xl p-3 whitespace-nowrap">
                      <h4 className="mb-1">{spot.name}</h4>
                      <p className="text-sm text-slate-600">{spot.activeNow} people active</p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Map Attribution */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-slate-600">
              <MapPin className="w-3 h-3 inline mr-1" />
              Ahmedabad, Gujarat
            </div>
          </div>
        </GlassCard>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredSpots
            .sort((a, b) => b.activeNow - a.activeNow)
            .map((spot, index) => (
              <GlassCard key={spot.id}>
                <div className="p-4 flex items-center gap-4">
                  <div className="relative">
                    <div className={`w-14 h-14 bg-gradient-to-r ${getIntensityColor(spot.intensity)} rounded-xl flex items-center justify-center text-2xl`}>
                      {getCategoryIcon(spot.category)}
                    </div>
                    {spot.intensity === 'high' && (
                      <div className="absolute -top-1 -right-1">
                        <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500 animate-pulse" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3>{spot.name}</h3>
                      <Badge className={getCategoryColor(spot.category)}>
                        {spot.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {spot.activeNow} active now
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`capitalize ${
                          spot.intensity === 'high' ? 'border-red-500 text-red-700' :
                          spot.intensity === 'medium' ? 'border-yellow-500 text-yellow-700' :
                          'border-green-500 text-green-700'
                        }`}
                      >
                        {spot.intensity} activity
                      </Badge>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-2xl bg-gradient-to-r ${getIntensityColor(spot.intensity)} bg-clip-text text-transparent`}>
                      #{index + 1}
                    </div>
                    <p className="text-xs text-slate-600">Rank</p>
                  </div>
                </div>
              </GlassCard>
            ))}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4">
        <GlassCard>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Activity Intensity:</p>
              <Button
                size="sm"
                onClick={() => setShowFullMap(true)}
                className="gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              >
                <Map className="w-4 h-4" />
                View Full Map
              </Button>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500" />
                <span className="text-sm">High (40+ people)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500" />
                <span className="text-sm">Medium (15-40 people)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
                <span className="text-sm">Low (&lt;15 people)</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Full Map Modal */}
      {showFullMap && (
        <MapView 
          onClose={() => setShowFullMap(false)} 
          category={selectedFilter}
        />
      )}
    </div>
  );
}