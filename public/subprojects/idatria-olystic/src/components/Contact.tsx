import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-[3rem] p-8 md:p-16 shadow-xl border border-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
                Da el primer paso hacia tu <span className="text-purple-600">Bienestar</span>
              </h2>
              <p className="text-gray-600 mb-10 text-lg">
                ¿Tienes alguna duda o quieres agendar una sesión? Escríbeme y estaré encantada de acompañarte.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-500 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">contacto@idatriaolystic.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-500 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <p className="font-medium text-gray-900">+34 600 000 000</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-500 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ubicación</p>
                    <p className="font-medium text-gray-900">Sesiones Online y Presenciales</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-pink-500 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-pink-500 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-purple-50"
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all resize-none"
                    placeholder="¿En qué puedo ayudarte?"
                  ></textarea>
                </div>
                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium py-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  Enviar Mensaje
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
