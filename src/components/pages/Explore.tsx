import { HowItWorks } from '../HowItWorks';
import { Features } from '../Features';
import { PaymentFlow } from '../PaymentFlow';

export function ExplorePage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Explore <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Everything</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how Civita works, explore powerful features, and understand our seamless payment process.
          </p>
        </div>
      </section>

      <Features />
      <HowItWorks />
      <PaymentFlow />
    </>
  );
}