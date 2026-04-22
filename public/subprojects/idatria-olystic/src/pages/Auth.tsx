import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User as UserIcon, ArrowRight, Chrome, Facebook, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import toast from 'react-hot-toast';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, isAdmin, signInWithGoogle, signInWithFacebook, logout } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/admin'); // Redirect to admin or user dashboard
    } catch (error: any) {
      toast.error("Error al iniciar sesión con Google: " + error.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
      navigate('/admin');
    } catch (error: any) {
      toast.error("El inicio de sesión con Facebook debe habilitarse en Firebase.");
    }
  };

  if (user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-sm w-full">
           <img src={user.photoURL || 'https://via.placeholder.com/150'} alt="Perfil" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-pink-100" />
           <h2 className="text-2xl font-serif text-gray-900 mb-2">¡Hola, {user.displayName?.split(' ')[0] || 'Viajero'}!</h2>
           <p className="text-gray-500 mb-6">{user.email}</p>
           
           {isAdmin && (
             <Link to="/admin" className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 rounded-xl mb-3 shadow-md hover:shadow-lg transition-all">
               Ir al Panel de Administración
             </Link>
           )}
           
           <button onClick={logout} className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">
             <LogOut className="w-4 h-4" /> Cerrar Sesión
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden pt-24 pb-12">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-100/40 via-purple-50/20 to-white"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden border border-white/50">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif text-gray-900 mb-2">
                {isLogin ? 'Bienvenido de vuelta' : 'Crea tu espacio interior'}
              </h2>
              <p className="text-gray-500 text-sm">
                {isLogin ? 'Conéctate para acceder a tus herramientas y perfil.' : 'Únete a nuestra comunidad de crecimiento holístico.'}
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6 space-y-4">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-gray-200 rounded-xl shadow-sm bg-white text-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
                >
                  <Chrome className="w-5 h-5 text-gray-600" />
                  <span>Continuar con Google</span>
                </button>
                <button
                  type="button"
                  onClick={handleFacebookSignIn}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border border-[#1877F2]/20 rounded-xl shadow-sm bg-[#1877F2]/5 text-md font-medium text-[#1877F2] hover:bg-[#1877F2]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2] transition-colors"
                >
                  <Facebook className="w-5 h-5 text-[#1877F2]" />
                  <span>Continuar con Facebook</span>
                </button>
              </div>
            </div>
            
          </div>
          
          {/* Footer of the card */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Al continuar, aceptas nuestros{' '}
              <a href="#" className="font-medium text-pink-600 hover:text-pink-500">
                Términos de Servicio
              </a>{' '}
              y nuestra{' '}
              <a href="#" className="font-medium text-pink-600 hover:text-pink-500">
                Política de Privacidad
              </a>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
