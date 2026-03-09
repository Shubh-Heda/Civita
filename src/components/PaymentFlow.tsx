import { UserPlus, Lock, Clock, Shield, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';

export function PaymentFlow() {
  const steps = [
    {
      id: '01',
      icon: UserPlus,
      iconBg: 'from-green-400 to-green-500',
      title: 'Join Free',
      badge: 'No card needed',
      features: [
        'Browse lobbies',
        'Pick your slot',
        'Stay flexible',
      ],
    },
    {
      id: '02',
      icon: Lock,
      iconBg: 'from-blue-400 to-blue-500',
      title: 'Soft Lock',
      badge: 'Min players hit',
      features: [
        'Squad is secured',
        'Everyone notified',
        'Trust nudges start',
      ],
    },
    {
      id: '03',
      icon: Clock,
      iconBg: 'from-yellow-400 to-yellow-500',
      title: 'Pay Window',
      badge: '30-90 mins',
      features: [
        'Timer auto-sets',
        'Split is visible',
        'Smart reminders (push/SMS)',
        'Stripe + UPI ready',
      ],
    },
    {
      id: '04',
      icon: Shield,
      iconBg: 'from-orange-400 to-orange-500',
      title: 'Hard Lock',
      badge: 'Only paid stay',
      features: [
        'Unpaid drop off',
        'Teams stabilize',
      ],
    },
    {
      id: '05',
      icon: Receipt,
      iconBg: 'from-purple-400 to-purple-500',
      title: 'Final Receipt',
      badge: 'Zero surprises',
      features: [
        'Exact share shown',
        'Instant confirmations',
      ],
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              How <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">Payment</span> Works
            </h2>
            <p className="text-sm md:text-base text-gray-300 font-normal max-w-3xl mx-auto">
              A 5-step visual flow: short cards, clear timers, and zero surprise charges.
            </p>
          </motion.div>
        </div>

        {/* Steps Grid - All in One Row */}
        <div className="grid grid-cols-5 gap-3 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative"
              >
                {/* Card */}
                <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-700/50 hover:border-slate-600/80 transition-all duration-300 h-full flex flex-col">
                  {/* Step Number */}
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-gray-400 tracking-wider">STEP {step.id}</span>
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${step.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                    {step.title}
                  </h3>

                  {/* Badge */}
                  <div className="inline-flex items-center px-2.5 py-1 bg-slate-700/50 backdrop-blur-sm rounded-full text-xs text-gray-300 mb-4 border border-slate-600/50 w-fit">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                    <span className="text-xs">{step.badge}</span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2 flex-grow">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-gray-300 flex items-start group/item">
                        <span className="text-green-400/80 mr-2 font-bold text-sm leading-none pt-0.5">•</span>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Hover effect border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info Cards - All in One Row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              emoji: '🔒',
              title: 'Secure Payments',
              description: 'Bank-grade encryption with Stripe and UPI integration',
              gradient: 'from-green-500/20 to-green-600/20',
              border: 'border-green-500/30',
              icon_bg: 'bg-green-500/10',
            },
            {
              emoji: '⚡',
              title: 'Instant Split',
              description: 'Fair cost distribution calculated automatically',
              gradient: 'from-blue-500/20 to-blue-600/20',
              border: 'border-blue-500/30',
              icon_bg: 'bg-blue-500/10',
            },
            {
              emoji: '💳',
              title: 'Flexible Options',
              description: 'Pay via card, UPI, wallet, or net banking',
              gradient: 'from-purple-500/20 to-purple-600/20',
              border: 'border-purple-500/30',
              icon_bg: 'bg-purple-500/10',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className={`bg-gradient-to-br ${item.gradient} backdrop-blur-xl rounded-2xl p-6 border ${item.border} transition-all duration-300 group hover:border-opacity-100`}
            >
              <div className={`w-12 h-12 ${item.icon_bg} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {item.emoji}
              </div>
              <h4 className="font-bold text-base mb-2 text-white group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}