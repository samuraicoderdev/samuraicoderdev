import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-purple-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Background accent */}
              <div className="absolute top-8 -left-8 w-full h-full border-2 border-pink-300 rounded-[2rem] rounded-tr-[5rem] rounded-bl-[5rem]"></div>
              
              <div className="relative aspect-square rounded-[2rem] rounded-tr-[5rem] rounded-bl-[5rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1500&auto=format&fit=crop" 
                  alt="Perfil holístico" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6"
          >
            <span className="text-pink-500 font-medium tracking-wider uppercase text-sm">Sobre Mí</span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900">
              Acompañándote en tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Despertar</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Soy una apasionada del bienestar integral y el autoconocimiento. Mi misión es guiarte en tu proceso de sanación a través de terapias holísticas que integran mente, cuerpo y espíritu.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed pb-4">
              A lo largo de mi camino he descubierto que la verdadera transformación ocurre cuando aprendemos a escuchar la sabiduría de nuestra propia alma. Te invito a crear un espacio seguro donde puedas florecer.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-purple-200">
              <div>
                <p className="text-4xl font-serif font-bold text-purple-700">10+</p>
                <p className="text-gray-600 text-sm mt-1">Años de experiencia</p>
              </div>
              <div>
                <p className="text-4xl font-serif font-bold text-pink-600">500+</p>
                <p className="text-gray-600 text-sm mt-1">Consultantes felices</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
