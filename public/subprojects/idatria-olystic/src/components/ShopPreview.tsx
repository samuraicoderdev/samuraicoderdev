import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    image: "https://images.unsplash.com/photo-1590845947321-dfdf5b23dfff?q=80&w=800&auto=format&fit=crop",
    title: "Cristales y Minerales",
    description: "Cuarzos blancos, drusas de amatista, puntas generadoras de selenita y labradorita."
  },
  {
    image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=800&auto=format&fit=crop",
    title: "Péndulos y Herramientas",
    description: "Péndulos facetados de cristal natural y varas masajeadoras para armonización."
  },
  {
    image: "https://images.unsplash.com/photo-1620011502446-0b13575ed291?q=80&w=800&auto=format&fit=crop",
    title: "Ropa Vegana y Sostenible",
    description: "Prendas confeccionadas con amor, respeto y materiales orgánicos de alta vibración."
  }
];

export default function ShopPreview() {
  return (
    <section id="tienda" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-pink-500 font-medium tracking-wider uppercase text-sm mb-2 block">
              Tienda Online
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
              Tesoros <span className="text-purple-600">Energéticos</span>
            </h2>
            <p className="text-gray-600">
              He seleccionado cuidadosamente estas herramientas holísticas de la mejor calidad para acompañar tu proceso de sanación y elevar la vibración de tu entorno.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-0"
          >
            <a href="#tienda" className="flex items-center gap-2 text-purple-700 font-medium hover:text-pink-600 transition-colors group">
              Explorar todo el catálogo 
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {product.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
