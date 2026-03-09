import { CommunityHighlights } from '../CommunityHighlights';
import { Star, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export function CommunityPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState<string>('');

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Join the <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Community</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with verified players, share your experiences, and grow together
          </p>
        </div>
      </section>

      <CommunityHighlights />

      {/* Feedback Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Share your experience
              </h2>
              <p className="text-gray-600">
                Your feedback helps us improve the platform.
              </p>
            </div>

            {/* Rating Stars */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-gray-900">Your Rating</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-12 h-12 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Text */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-gray-700" />
                <span className="font-bold text-gray-900">Your Feedback</span>
              </div>
              <textarea
                placeholder="Tell us what you liked or what we can improve..."
                className="w-full h-32 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />
            </div>

            {/* Feature Selection */}
            <div className="mb-8">
              <div className="font-bold text-gray-900 mb-3">
                What feature did you use?
              </div>
              <div className="flex flex-wrap gap-3">
                {['Sports', 'Events', 'Gaming'].map((feature) => (
                  <button
                    key={feature}
                    onClick={() => setSelectedFeature(feature)}
                    className={`px-5 py-2.5 rounded-xl transition-all ${
                      selectedFeature === feature
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all">
              Submit Feedback
            </button>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Community Impact
            </h2>
            <p className="text-gray-600">
              See how our community is growing and thriving together
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-4xl mb-3">👥</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">50K+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-4xl mb-3">🤝</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">125K</div>
              <div className="text-gray-600">Connections Made</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-4xl mb-3">⭐</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-4xl mb-3">🎯</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
