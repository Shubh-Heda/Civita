import { ArrowRight, Smartphone, Zap } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-10 rounded-full translate-y-40 -translate-x-40 blur-3xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-white mb-8">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Join 50,000+ Active Players</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Connect & Compete?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Start your journey today. Book matches, join events, and build lasting friendships with verified players in your community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <button className="flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-50 transition-all shadow-xl group">
                <span className="font-bold text-lg">Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-3 px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all">
                <Smartphone className="w-5 h-5" />
                <span className="font-bold text-lg">Download App</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 fill-yellow-300" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">4.9/5 Rating</span>
              </div>
              <div>•</div>
              <div className="font-medium">✓ Free to Join</div>
              <div>•</div>
              <div className="font-medium">✓ No Credit Card Required</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}