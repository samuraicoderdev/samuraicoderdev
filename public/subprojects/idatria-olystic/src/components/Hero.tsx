import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center bg-gray-900 overflow-hidden">
      {/* Img background updated to correct AVIF format extension and responsive object position */}
      <img 
        src="hero-image.avif" 
        alt="Sanación Consciente" 
        className="absolute inset-0 w-full h-full object-cover object-[70%_30%] opacity-80"
        referrerPolicy="no-referrer"
      />
      
      {/* Overlays to make text readable matching the vibe */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/40 via-transparent to-pink-900/30 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent"></div>

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-xl text-left"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl font-serif text-teal-100 leading-tight mb-6 shadow-sm drop-shadow-md"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
          >
            Sanación Consciente
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-10 font-light leading-relaxed drop-shadow-sm"
          >
            Conéctate con tu esencia y equilibra tu energía con terapias y formaciones de Reiki, Registros Akáshicos y más.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button className="flex items-center justify-center gap-2 bg-[#db7093] hover:bg-[#c75d80] text-white px-8 py-3.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              Ver todos los cursos
              <Sparkles className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative gradient overlay at bottom to blend into next section */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}
