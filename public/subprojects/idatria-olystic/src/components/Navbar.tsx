import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, User, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      name: 'CURSOS', 
      dropdown: [
        { name: 'Cursos de Reiki', href: '/#cursos' },
        { name: 'Cursos de Registros Akáshicos', href: '/#cursos' },
        { name: 'Cursos Complementarios', href: '/#cursos' }
      ]
    },
    { name: 'TERAPIAS', href: '/#services' },
    { name: 'BLOG', href: '/blog' },
    { 
      name: 'TIENDA ONLINE', 
      dropdown: [
        { name: 'Explorar todo', href: '/#tienda' },
        { name: 'Cristales y Minerales', href: '/#tienda' },
        { name: 'Ropa Vegana y Respetuosa', href: '/#tienda' },
        { name: 'Péndulos y Herramientas', href: '/#tienda' }
      ]
    },
    { name: 'SOBRE MÍ', href: '/#about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gradient-to-r from-pink-600/95 to-purple-700/95 backdrop-blur-md shadow-md py-3'
          : 'bg-gradient-to-b from-pink-800/60 to-transparent py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer z-50 group">
             <div className="w-[180px] h-auto flex items-center justify-center opacity-90 shadow-lg brightness-0 invert group-hover:opacity-100 transition-opacity">
               <svg preserveAspectRatio="xMidYMid meet" data-bbox="2.031 18.238 369.418 74.965" height="100%" viewBox="0 0 375 112.5" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <g>
                      <path d="M107.828 60.719c.461-1.723 1.305-3.48 1.344-5.254.156-7.246.144-14.504 0-21.75-.035-1.73-.805-3.445-1.266-5.3 4.246.179 9.067-.727 13.758.788 3.875 1.246 6.262 4.063 7.426 7.89 1.55 5.075 1.418 10.16-.559 15.079-2.07 5.156-6.039 8.066-11.57 8.508-3.176.258-6.395.047-9.137.047m6.668-28.672V57.34c3.543.137 6.207-1.219 7.871-4.082 3.075-5.297 3.34-10.91.953-16.512-1.582-3.726-5.097-5.441-8.824-4.7" fill="currentColor"></path>
                      <path d="M263.203 44.75c-.926 3.457-1.504 7.063-2.871 10.34-1.594 3.828-4.687 6.176-9.102 6.152-4.43-.023-7.378-2.453-9.054-6.258-2.938-6.664-3.106-13.55-.516-20.347 1.52-4.004 4.528-6.457 8.98-6.7 4.575-.246 7.637 2.114 9.692 5.958 1.781 3.332 2.293 6.976 2.309 10.703.191.05.375.101.566.152m-5.289 3.648c-.43-5.109-1.2-10.007-4.055-14.324-1.09-1.652-2.523-2.969-4.738-2.605-2.156.355-2.95 2.07-3.469 3.89-1.23 4.278-.933 8.598.313 12.758.824 2.758 1.992 5.582 3.676 7.875 2.23 3.04 5.71 2.336 6.968-1.222.719-2.028.89-4.243 1.305-6.375" fill="currentColor"></path>
                      <path d="M136.348 28.707c1.652 0 3.57.102 5.48-.031 1.492-.11 2.133.39 2.516 1.867 2.156 8.336 4.37 16.66 6.683 24.957.536 1.902 1.504 3.688 2.258 5.484l-25.101.012c.629-1.242 1.53-2.465 1.902-3.836a1127 1127 0 0 0 6.219-24.012c.324-1.312.043-2.78.043-4.445m10.867 27.875c-1.356-4.98-5.242-17.137-6.86-21.976-.042-.13-.324-.079-.464-.079-1.16 4.77-5.012 17.563-6.207 22.48l13.53-.421Zm0 0" fill="currentColor"></path>
                      <path d="M305.164 49.52c.45 1.304.676 2.132 1.012 2.91 1.14 2.61 3.058 4.36 5.883 4.925 2.007.407 3.84-.027 5.109-1.789 1.129-1.558 1.144-3.89-.215-5.562-.965-1.195-2.234-2.195-3.496-3.098-1.668-1.191-3.508-2.129-5.191-3.3-4.118-2.868-5.512-7.102-3.739-11.047 1.582-3.528 5.95-5.391 10.508-4.442 1.66.348 3.3.805 5.164 1.266v6.758c-.828-.996-1.566-2.141-2.562-2.993-.852-.734-1.934-1.293-3.012-1.644-2.203-.73-4.312.012-5.242 1.633-.95 1.644-.602 3.851 1.02 5.433.87.848 1.91 1.543 2.929 2.223 1.363.902 2.809 1.695 4.184 2.586 4.976 3.223 6.593 7.45 4.691 12.184-1.695 4.214-6.781 6.55-12.066 5.472a14.8 14.8 0 0 1-3.106-1.023c-3.726-1.707-4.101-2.528-3.055-6.375.332-1.219.692-2.426 1.18-4.125" fill="currentColor"></path>
                      <path d="M287.707 28.473c-.137 5 3.234 8.457 4.941 12.617 1.622-4.238 5.114-7.695 4.801-12.656h7.07c-3.574 3.082-4.519 7.554-6.914 11.117-3.753 5.582-3.183 11.672-2.64 17.785.101 1.121.867 2.187 1.336 3.312h-8.121c.445-1.648 1.164-3.386 1.332-5.171.242-2.579.101-5.192.066-7.79a4.2 4.2 0 0 0-.422-1.757c-2.285-4.586-4.562-9.18-6.953-13.707-.707-1.344-1.781-2.489-2.707-3.75h8.223Zm0 0" fill="currentColor"></path>
                      <path d="M167.457 60.703h-8.805c.45-1.594 1.29-3.262 1.325-4.953.144-7.855.062-15.719.062-23.566-3.004-1.036-5.117-.051-7.687 3.867l.921-7.727h18.63c.308 2.399.624 4.805.937 7.215-1.688-2.797-4.031-4.2-7.488-3.637-.055.461-.168.914-.168 1.364-.004 7.18-.032 14.363.02 21.547.015 2.093 0 4.273 2.253 5.882" fill="currentColor"></path>
                      <path d="M341.988 28.316c.309 2.5.614 4.926.914 7.348-1.687-2.91-4.047-4.352-7.66-3.71v7.816c0 5.132-.11 10.27.07 15.394.063 1.852.829 3.68 1.27 5.512h-7.93c.45-1.387 1.286-2.809 1.309-4.246.129-8.117.059-16.239.059-24.461-3.457-.696-5.793.734-7.579 3.613.305-2.418.61-4.832.91-7.262h18.633Zm0 0" fill="currentColor"></path>
                      <path d="M271.465 28.496c-.395 1.89-1.09 3.805-1.13 5.734-.14 7.18-.062 14.364-.062 21.551 0 .465.075.93.118 1.52 4.195.308 8.191.398 10.988-3.723-.219 1.203-.442 2.41-.664 3.61-.23 1.269-.465 2.53-.68 3.671H263.75c.457-1.875 1.227-3.648 1.258-5.425a570 570 0 0 0 0-21.758c-.031-1.723-.778-3.442-1.2-5.18Zm0 0" fill="currentColor"></path>
                      <path d="M343.418 28.453h7.742c-.422 1.781-1.172 3.555-1.207 5.34a585 585 0 0 0 .004 21.738c.035 1.719.793 3.426 1.215 5.137h-7.73c.406-1.773 1.152-3.61 1.183-5.461.14-7.105.14-14.223 0-21.328-.031-1.797-.777-3.578-1.21-5.43" fill="currentColor"></path>
                      <path d="M98.973 28.164h7.84c-.426 1.8-1.192 3.598-1.223 5.41q-.209 11.016.004 22.02c.035 1.742.804 3.468 1.23 5.203H99c.41-1.797 1.16-3.652 1.2-5.527q.21-10.808 0-21.61c-.04-1.82-.79-3.62-1.227-5.496" fill="currentColor"></path>
                      <path d="M252.941 45.46c-.14.716-.195 1.462-.437 2.142-.422 1.191-1.59 1.425-2.336.41-.566-.77-.953-1.719-1.234-2.637-.414-1.395-.516-2.848-.106-4.277.172-.614.442-1.188 1.16-1.305.742-.121 1.223.32 1.59.875.957 1.45 1.215 3.094 1.363 4.805" fill="currentColor"></path>
                      <path d="M370.324 29.758c.153 2.543.293 4.976.473 7.965-.895-1.45-1.418-2.47-2.102-3.368-2.632-3.44-6.941-3.27-9.336.336-3 4.536-3.011 14.918-.015 19.446 2.683 4.047 7.742 4 10.363-.102.363-.574.668-1.18 1.055-1.863 1.386 4.91.941 6.183-3.828 8.016-5.637 2.152-11.184-.489-13.477-6.204-2.441-6.09-2.324-12.332-.086-18.421 2-5.442 7.047-7.965 12.75-6.797 1.352.273 2.688.62 4.207.98Zm0 0" fill="currentColor"></path>
                      <path d="M181.227 60.617c-2.625-6.52-.707-13.246-1.45-20.238.778.586 1.063.773 1.305 1.004q.524.5.988 1.039c3.176 3.726 5.13 8.086 6.246 12.781.41 1.715.067 3.617.067 5.5h7.445c-1.14-2.824-2.152-6.539-3.43-9.297-1.293-2.773-2.832-5.426-4.289-8.187.426-.086.942-.168 1.453-.293 3.165-.77 5.305-3.074 5.61-6.04.336-3.335-1.14-6.136-4.29-7.406-1.612-.644-3.425-.945-5.171-1.058-2.727-.168-5.473-.047-8.211-.047h-4.047c.45 1.863 1.16 3.516 1.195 5.184.145 6.84.102 13.687.09 20.53 0 2.337.094 4.727-1.863 6.536h8.363Zm-1.239-29.25c2.223.227 4.348.227 6.352.707 2.027.489 3.406 2.082 3.2 4.207-.11 1.16-.981 2.653-1.966 3.25-1.785 1.082-3.726.492-5.258-.933-1.937-1.801-2.558-4.114-2.328-7.223Zm0 0" fill="currentColor"></path>
                      <path d="M228.488 60.715c-.738-1.735-1.636-3.336-2.113-5.055a1483 1483 0 0 1-6.89-25.539c-.368-1.414-.942-1.875-2.36-1.785-1.973.125-3.96.035-5.672.035 0 1.777.328 3.512-.055 5.078-1.898 7.77-3.968 15.492-6.023 23.223-.266 1-.902 3.07-1.32 4.031ZM214.93 34.848l.39-.075c1.317 4.778 2.63 9.555 3.98 14.497l1.762 6.914h-11.765c1.195-4.918 4.476-16.582 5.633-21.329Zm0 0" fill="currentColor"></path>
                      <path d="M197.543 56.281c-.012 1.188-.582 3.239-.89 4.422h6.734c-.219-1.375-.512-3.953-.52-5.328-.062-7.184-.113-14.375.028-21.559.03-1.793.785-3.57 1.199-5.32h-7.867c.46 1.48 1.277 2.922 1.3 4.375.13 7.805.102 15.606.024 23.41Zm0 0" fill="currentColor"></path>
                  </g>
              </svg>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link, idx) => (
              <div 
                key={idx} 
                className="relative group cursor-pointer flex items-center py-2"
                onMouseEnter={() => setActiveDropdown(idx)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to={link.href} className="text-[11px] xl:text-xs tracking-widest text-white hover:text-pink-200 transition-colors font-medium whitespace-nowrap flex items-center">
                  {link.name}
                  {link.dropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 text-white ml-1 transition-transform duration-300 ${activeDropdown === idx ? 'rotate-180 text-pink-200' : 'group-hover:text-pink-200'}`} />
                  )}
                </Link>

                {/* Desktop Dropdown Menu */}
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-12 left-0 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(202,138,166,0.3)] border border-pink-100 overflow-hidden py-3 z-50 ring-1 ring-pink-50"
                      >
                        {link.dropdown.map((subItem, subIdx) => (
                          <Link
                            key={subIdx}
                            to={subItem.href}
                            className="block px-6 py-3 text-[13px] text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-700 transition-all duration-300 tracking-wide font-medium"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            
            <div className="flex items-center gap-3 pl-4 border-l border-white/20">
              <button 
                onClick={() => setSearchOpen(!searchOpen)} 
                className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors text-white"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link to="/auth" className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors text-white block">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors text-white focus:outline-none"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 overflow-hidden z-50 origin-top"
          >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
              <div className="relative w-full max-w-2xl flex items-center">
                <Search className="absolute left-6 w-6 h-6 text-pink-500 font-bold" />
                <input 
                  type="text" 
                  placeholder="¿Qué estás buscando?" 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xl font-serif rounded-full py-5 pl-16 pr-14 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white transition-all shadow-inner"
                  autoFocus
                />
                <button 
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-4 font-medium tracking-wide text-center">
                Busca cursos, terapias, productos en nuestra tienda online...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-gradient-to-br from-pink-600 to-purple-700 border-t border-white/20 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
              {navLinks.map((link, idx) => (
                <div key={idx} className="flex flex-col border-b border-white/10 last:border-0">
                  <Link to={link.href} className="py-3 px-2 flex justify-between items-center text-white text-sm tracking-widest font-medium" onClick={() => !link.dropdown && setIsOpen(false)}>
                    {link.name}
                    {link.dropdown && <ChevronDown className="w-4 h-4 opacity-70" />}
                  </Link>
                  {link.dropdown && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="px-4 pb-3 space-y-1"
                    >
                      {link.dropdown.map((sub, sidx) => (
                        <Link 
                          key={sidx} 
                          to={sub.href} 
                          className="block py-2.5 px-3 rounded-lg text-pink-100 hover:text-white hover:bg-white/10 text-[13px] tracking-wider transition-all duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              <Link to="/auth" onClick={() => setIsOpen(false)} className="py-5 px-2 flex items-center gap-3 text-white text-sm tracking-wider border-t border-white/10 mt-2 hover:bg-white/5 transition-colors rounded-lg">
                <User className="w-5 h-5" /> Mi Cuenta
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
