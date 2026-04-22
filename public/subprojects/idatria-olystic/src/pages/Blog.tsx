import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, User, Clock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getBlogPosts, BlogPost } from '../lib/content';

export default function Blog() {
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load articles from content folder or Firebase
    async function fetchPosts() {
      const loadedPosts = await getBlogPosts();
      setArticles(loadedPosts);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  // Make human friendly dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-pink-600" /></div>;
  }

  return (
    <>
      <Helmet>
        <title>Blog | Idatria Olystic</title>
        <meta name="description" content="Reflexiones, guías y aprendizajes sobre sanación holística, energía, reiki y espiritualidad para acompañarte en tu viaje interior." />
        <meta name="keywords" content="sanación holística, reiki, registros akáshicos, espiritualidad, energía, meditación, péndulo hebreo, crecimiento personal" />
        
        {/* Open Graph Tags for Social Media */}
        <meta property="og:title" content="Blog | Idatria Olystic" />
        <meta property="og:description" content="Guías y aprendizajes sobre sanación holística y espiritualidad." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.idatriaolystic.com/blog" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Idatria Olystic" />
        <meta name="twitter:description" content="Guías y aprendizajes sobre sanación holística y espiritualidad." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-pink-600 font-medium tracking-widest text-sm uppercase mb-4 block">
              Blog y Recursos
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6 tracking-tight">
              Despertar & <span className="italic text-purple-700">Consciencia</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Reflexiones, guías y aprendizajes sobre sanación holística, energía y espiritualidad para acompañarte en tu viaje interior.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((article, idx) => (
              <motion.article 
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(202,138,166,0.3)] transition-all duration-300 group flex flex-col h-full"
              >
                <div className="relative overflow-hidden h-64">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-pink-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    {article.frontmatter.category}
                  </div>
                  <img 
                    src={article.frontmatter.image} 
                    alt={article.frontmatter.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium tracking-wide">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatDate(article.frontmatter.date)}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.frontmatter.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl font-serif text-gray-900 mb-4 leading-tight group-hover:text-pink-700 transition-colors">
                    <Link to={`/blog/${article.slug}`}>
                      {article.frontmatter.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                    {article.frontmatter.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-auto">
                    <div className="flex items-center gap-2 text-sm text-gray-700 font-medium tracking-wide">
                      <User className="w-4 h-4 text-pink-500" />
                      {article.frontmatter.author}
                    </div>
                    <Link 
                      to={`/blog/${article.slug}`}
                      className="text-pink-600 font-medium text-sm flex items-center gap-1.5 hover:text-purple-700 transition-colors"
                    >
                      Leer más <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          <div className="max-w-md mx-auto mt-20 p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl border border-pink-100 text-center">
            <h4 className="text-2xl font-serif text-gray-900 mb-3">Únete a la Newsletter</h4>
            <p className="text-gray-600 text-sm mb-6">Recibe artículos exclusivos, guías de luz y novedades directamente en tu correo.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Tu dirección de correo" 
                className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all shadow-sm"
              />
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all whitespace-nowrap">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
