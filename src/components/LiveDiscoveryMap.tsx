import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { discoveryService, PresencePoint, SavedSearch, GeoAlertSubscription } from '../services/discoveryService';
import { Loader2, MapPin, BellRing, Clock3, Save, Target, Layers } from 'lucide-react';
import { toast } from 'sonner';

const LeafletMap = MapContainer as unknown as React.ComponentType<any>;
const LeafletTileLayer = TileLayer as unknown as React.ComponentType<any>;
const LeafletCircleMarker = CircleMarker as unknown as React.ComponentType<any>;
const LeafletTooltip = Tooltip as unknown as React.ComponentType<any>;

const defaultCenter = { lat: 23.0225, lng: 72.5714 };

const sportOptions = ['all', 'tennis', 'football', 'basketball', 'cricket', 'running', 'badminton'];
const timeWindowOptions = [
  { id: 'now', label: 'Now (next 2h)', start: new Date().toISOString(), end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() },
  { id: 'today', label: 'Today', start: new Date().toISOString(), end: new Date(new Date().setHours(23, 59, 59, 999)).toISOString() },
  { id: 'weekend', label: 'Weekend', start: new Date().toISOString(), end: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() },
];

interface LiveDiscoveryMapProps {
  userId: string;
}

export function LiveDiscoveryMap({ userId }: LiveDiscoveryMapProps) {
  const [center, setCenter] = useState(defaultCenter);
  const [presence, setPresence] = useState<PresencePoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [sport, setSport] = useState<string>('all');
  const [radiusKm, setRadiusKm] = useState(5);
  const [timeWindowId, setTimeWindowId] = useState('now');
  const [useClusters, setUseClusters] = useState(true);
  const [saved, setSaved] = useState<SavedSearch[]>([]);
  const [geoAlerts, setGeoAlerts] = useState<GeoAlertSubscription[]>([]);
  const [searchName, setSearchName] = useState('My nearby tennis');

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setCenter(defaultCenter)
    );
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const window = timeWindowOptions.find((t) => t.id === timeWindowId);
        const points = await discoveryService.getPresenceWithFilters({
          sport: sport === 'all' ? undefined : sport,
          center,
          radiusKm,
          timeWindow: window ? { start: window.start, end: window.end } : undefined,
        });
        setPresence(points);
      } catch (error) {
        console.error('Failed to load presence', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [sport, radiusKm, timeWindowId, center]);

  useEffect(() => {
    const loadLists = async () => {
      try {
        const [savedSearches, alerts] = await Promise.all([
          discoveryService.listSavedSearches(userId),
          discoveryService.listGeoAlerts(userId),
        ]);
        setSaved(savedSearches);
        setGeoAlerts(alerts);
      } catch (error) {
        console.error('Failed to load saved searches', error);
      }
    };
    loadLists();
  }, [userId]);

  const clusters = useMemo(() => discoveryService.cluster(presence, radiusKm / 2), [presence, radiusKm]);
  const totalActive = presence.length;

  const handleSaveSearch = async () => {
    const window = timeWindowOptions.find((t) => t.id === timeWindowId);
    await discoveryService.saveSearch({
      user_id: userId,
      name: searchName || 'Saved search',
      sports: sport === 'all' ? sportOptions.filter((s) => s !== 'all') : [sport],
      radius_km: radiusKm,
      center_lat: center.lat,
      center_lng: center.lng,
      time_window: window ? { start: window.start, end: window.end } : undefined,
      notify: true,
    });
    toast.success('Saved search');
    const refreshed = await discoveryService.listSavedSearches(userId);
    setSaved(refreshed);
  };

  const handleGeofence = async () => {
    const window = timeWindowOptions.find((t) => t.id === timeWindowId);
    await discoveryService.subscribeAlert({
      user_id: userId,
      sport: sport === 'all' ? undefined : sport,
      radius_km: radiusKm,
      center_lat: center.lat,
      center_lng: center.lng,
      start_time: window?.start,
      end_time: window?.end,
      notify_channels: ['push'],
      active: true,
    });
    toast.success('Geofenced alert saved');
    const alerts = await discoveryService.listGeoAlerts(userId);
    setGeoAlerts(alerts);
  };

  return (
    <Card className="p-4 border border-slate-200/80 shadow-sm bg-white/80 dark:bg-slate-900/80">
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-cyan-600" />
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-300">Live presence map</p>
            <p className="text-xs text-slate-500">Heatmap + clustering + geofenced alerts</p>
          </div>
          <Badge>{totalActive} live spots</Badge>
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-end">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Layers className="w-4 h-4" />
            <span>Clusters</span>
            <Switch checked={useClusters} onCheckedChange={setUseClusters} />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Clock3 className="w-4 h-4" />
            <select
              className="text-sm border rounded-md px-2 py-1 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              value={timeWindowId}
              onChange={(e) => setTimeWindowId(e.target.value)}
            >
              {timeWindowOptions.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <span>Radius</span>
            <Input
              type="number"
              value={radiusKm}
              min={1}
              max={50}
              step={0.5}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="w-20 h-8"
            />
            <span className="text-xs text-slate-500">km</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
        {sportOptions.map((s) => (
          <Button
            key={s}
            size="sm"
            variant={sport === s ? 'default' : 'outline'}
            className="capitalize rounded-full"
            onClick={() => setSport(s)}
          >
            {s}
          </Button>
        ))}
      </div>

      <div className="relative h-80 rounded-xl overflow-hidden border border-slate-200 bg-white dark:bg-slate-900">
        <LeafletMap center={[center.lat, center.lng] as [number, number]} zoom={13} scrollWheelZoom className="h-full w-full">
          <LeafletTileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <LeafletCircleMarker
            center={[center.lat, center.lng] as [number, number]}
            radius={10}
            pathOptions={{ color: '#06b6d4', fillColor: '#22d3ee', fillOpacity: 0.4 }}
          >
            <LeafletTooltip direction="top" offset={[0, -4] as [number, number]} opacity={1}>
              <div className="text-xs font-medium text-cyan-800">You</div>
            </LeafletTooltip>
          </LeafletCircleMarker>

          {useClusters
            ? clusters.map((c) => (
                <LeafletCircleMarker
                  key={c.id}
                  center={[c.lat, c.lng] as [number, number]}
                  radius={Math.min(12 + c.count * 2, 28)}
                  pathOptions={{ color: '#f97316', fillColor: '#fb923c', fillOpacity: 0.35, weight: 3 }}
                >
                  <LeafletTooltip direction="top" offset={[0, -2] as [number, number]} opacity={1}>
                    <div className="space-y-1 text-xs">
                      <div className="font-semibold">Cluster • {c.count} players</div>
                      <div className="flex gap-2 flex-wrap">
                        {Object.entries(c.sports).map(([k, v]) => (
                          <span key={k} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded-full border text-[10px]">
                            {k}: {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  </LeafletTooltip>
                </LeafletCircleMarker>
              ))
            : presence.map((p) => (
                <LeafletCircleMarker
                  key={p.id}
                  center={[p.latitude, p.longitude] as [number, number]}
                  radius={10}
                  pathOptions={{ color: '#22c55e', fillColor: '#bbf7d0', fillOpacity: 0.3, weight: 3 }}
                >
                  <LeafletTooltip direction="top" offset={[0, -2] as [number, number]} opacity={1}>
                    <div className="space-y-1 text-xs">
                      <div className="font-semibold capitalize">{p.sport}</div>
                      <div className="text-slate-600">Radius {p.radius_km ?? 1} km</div>
                    </div>
                  </LeafletTooltip>
                </LeafletCircleMarker>
              ))}
        </LeafletMap>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-slate-900/70">
            <Loader2 className="w-5 h-5 animate-spin text-slate-600" />
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 border rounded-lg bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
              <Save className="w-4 h-4" />
              <span>Saved searches</span>
            </div>
            <div className="flex gap-2">
              <Input value={searchName} onChange={(e) => setSearchName(e.target.value)} className="h-8 text-sm" />
              <Button size="sm" onClick={handleSaveSearch}>Save</Button>
            </div>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {saved.length === 0 && <p className="text-xs text-slate-500">No saved searches yet.</p>}
            {saved.map((s) => (
              <div key={s.id} className="text-xs flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1">
                <span className="font-semibold">{s.name}</span>
                <span className="text-slate-500">{s.radius_km} km • {s.sports.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 border rounded-lg bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
              <BellRing className="w-4 h-4" />
              <span>Geofenced alerts</span>
            </div>
            <Button size="sm" variant="outline" onClick={handleGeofence}>
              <Target className="w-4 h-4 mr-1" />
              Save alert
            </Button>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {geoAlerts.length === 0 && <p className="text-xs text-slate-500">No alerts yet.</p>}
            {geoAlerts.map((a) => (
              <div key={a.id} className="text-xs flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1">
                <span className="font-semibold capitalize">{a.sport ?? 'any'} • {a.radius_km} km</span>
                <span className="text-slate-500">Active: {a.active ? 'yes' : 'no'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default LiveDiscoveryMap;
