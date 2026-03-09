import { Calendar, MapPin, Users, Clock, Star, TrendingUp, Ticket } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Summer Music Festival 2026',
      type: 'Music',
      date: 'Feb 15, 2026',
      time: '6:00 PM',
      location: 'Central Park Arena',
      attendees: 2847,
      price: '₹1,299',
      image: 'https://images.unsplash.com/photo-1577042816206-2e85c23f2392?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBvdXRkb29yJTIwZmVzdGl2YWwlMjBzdGFnZXxlbnwxfHx8fDE3NzAyMjczODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: 'Trending',
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      id: 2,
      title: 'Street Basketball Championship',
      type: 'Sports',
      date: 'Feb 20, 2026',
      time: '10:00 AM',
      location: 'Downtown Sports Complex',
      attendees: 156,
      price: '₹499',
      image: 'https://images.unsplash.com/photo-1766136809028-1603fac2101a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBpbmRvb3IlMjBwbGF5ZXJzJTIwZ2FtZXxlbnwxfHx8fDE3NzAyMjczODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: 'Hot',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 3,
      title: 'E-Sports Championship Finals',
      type: 'Gaming',
      date: 'Feb 25, 2026',
      time: '2:00 PM',
      location: 'Gaming Arena Pro',
      attendees: 892,
      price: '₹799',
      image: 'https://images.unsplash.com/photo-1558008322-9793c57cb73b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudCUyMGNyb3dkfGVufDF8fHx8MTc3MDIyNzM4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      badge: 'New',
      gradient: 'from-cyan-500 to-blue-500',
    },
  ];

  const categories = [
    { name: 'All Events', icon: '🎯', count: 142, active: true },
    { name: 'Music', icon: '🎵', count: 45, active: false },
    { name: 'Sports', icon: '⚽', count: 67, active: false },
    { name: 'Gaming', icon: '🎮', count: 30, active: false },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Discover <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Events</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join festivals, tournaments, concerts, and cultural celebrations with your community
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                  category.active
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  category.active ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">142</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-purple-500">38</div>
              <div className="text-sm text-gray-600">This Week</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-pink-500">12.5K</div>
              <div className="text-sm text-gray-600">Attendees</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-cyan-500">4.8★</div>
              <div className="text-sm text-gray-600">Avg. Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <button className="flex items-center gap-2 text-purple-500 hover:text-purple-600">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Trending First</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r ${event.gradient} text-white rounded-full text-sm font-medium shadow-lg`}>
                    {event.badge}
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900">
                    {event.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                      <span>•</span>
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Starting from</div>
                      <div className="text-2xl font-bold text-gray-900">{event.price}</div>
                    </div>
                    <button className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${event.gradient} text-white rounded-xl hover:shadow-lg transition-all`}>
                      <Ticket className="w-4 h-4" />
                      <span className="font-medium">Book Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all">
              Load More Events
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
