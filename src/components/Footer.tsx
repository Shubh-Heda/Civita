import { Trophy, Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f1623' }} className="text-white border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 flex flex-col items-center text-center">
          {/* Logo + Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-wide">CIVITA</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-white text-sm leading-relaxed max-w-sm mb-8"
          >
            Connect, compete, and grow with the ultimate sports and gaming community platform. Build friendships through shared passions.
          </motion.p>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#"
              className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-cyan-500/50"
              style={{ backgroundColor: '#1e293b' }}>
              <Twitter className="w-5 h-5 text-white" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#"
              className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-blue-500/50"
              style={{ backgroundColor: '#1e293b' }}>
              <Facebook className="w-5 h-5 text-white" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#"
              className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-pink-500/50"
              style={{ backgroundColor: '#1e293b' }}>
              <Instagram className="w-5 h-5 text-white" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="#"
              className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 border border-slate-700 hover:border-red-500/50"
              style={{ backgroundColor: '#1e293b' }}>
              <Youtube className="w-5 h-5 text-white" />
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700"></div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-sm font-light">
            © 2026 Civita. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm">
            <a href="#" className="text-white hover:text-cyan-400 transition-colors duration-300">Privacy</a>
            <a href="#" className="text-white hover:text-cyan-400 transition-colors duration-300">Terms</a>
            <a href="#" className="text-white hover:text-cyan-400 transition-colors duration-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}