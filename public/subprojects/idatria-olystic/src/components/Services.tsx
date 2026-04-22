import { motion } from 'motion/react';
import { Moon, Sparkles, Sun, Heart, Flame, Droplets } from 'lucide-react';

const services = [
  {
    icon: <Moon className="w-8 h-8" />,
    title: "Lectura de Tarot Evolutivo",
    description: "Encuentra claridad y guía para tu momento actual a través de la sabiduría de los arcanos."
  },
  {
    icon: <Sun className="w-8 h-8" />,
    title: "Astrología Psicológica",
    description: "Descubre el mapa de tu alma y tu propósito de vida interpretando tu carta astral."
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Reiki y Sanación Energética",
    description: "Equilibra tus chakras y restaura la armonía natural de tu cuerpo físico y sutil."
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Acompañamiento Holístico",
    description: "Sesiones de integración personal para conectar con tu esencia, superar bloqueos y sanar."
  },
  {
    icon: <Droplets className="w-8 h-8" />,
    title: "Flores de Bach",
    description: "Terapia floral personalizada para gestionar emociones, miedos y estados de estrés."
  },
  {
    icon: <Flame className="w-8 h-8" />,
    title: "Rituales de Transformación",
    description: "Ceremonias y ritos de paso personalizados para honrar cambios de ciclos e intenciones."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-pink-50 opacity-50 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-purple-50 opacity-50 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-pink-500 font-medium tracking-wider uppercase text-sm mb-2 block"
          >
            Mis Servicios
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif text-gray-900 mb-4"
          >
            Caminos de <span className="text-purple-600">Sanación</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            Cada herramienta que ofrezco es un puente hacia tu interior para ayudarte a reconectar con tu sabiduría innata.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
