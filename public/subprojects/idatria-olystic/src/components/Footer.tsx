import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="font-serif text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
              Idatri Aolystic
            </span>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-pink-400 transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-pink-400 transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-pink-400 transition-colors">Cookies</a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-800 pt-8">
          <p>&copy; {new Date().getFullYear()} Idatri Aolystic. Todos los derechos reservados.</p>
          <p className="mt-2 text-xs">Diseñado con amor y luz.</p>
        </div>
      </div>
    </footer>
  );
}
