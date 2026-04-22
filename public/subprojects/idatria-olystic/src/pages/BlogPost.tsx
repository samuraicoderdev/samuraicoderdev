import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Clock, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet-async';
import { getBlogPostBySlug, BlogPost as BlogPostType } from '../lib/content';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (slug) {
        const foundPost = await getBlogPostBySlug(slug);
        setPost(foundPost || null);
      }
      setLoading(false);
    }
    loadPost();
  }, [slug]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-pink-600" /></div>;
  }

  if (!post) return (
    <div className="min-h-screen py-32 flex flex-col items-center justify-center text-gray-500">
      <h2 className="text-2xl font-serif text-gray-900 mb-4">Artículo no encontrado</h2>
      <Link to="/blog" className="flex items-center gap-2 hover:text-pink-600 transition-colors">
        <ArrowLeft className="w-5 h-5"/> Volver al blog
      </Link>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{post.frontmatter.title} | Idatria Olystic Blog</title>
        <meta name="description" content={post.frontmatter.excerpt} />
        <meta name="keywords" content={`${post.frontmatter.category}, sanación, terapias holísticas, Idatria Olystic, bienestar`} />
        
        {/* Open Graph Tags for Social Media */}
        <meta property="og:title" content={`${post.frontmatter.title} | Idatria Olystic`} />
        <meta property="og:description" content={post.frontmatter.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.idatriaolystic.com/blog/${post.slug}`} />
        <meta property="og:image" content={post.frontmatter.image} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.frontmatter.title} | Idatria Olystic`} />
        <meta name="twitter:description" content={post.frontmatter.excerpt} />
        <meta name="twitter:image" content={post.frontmatter.image} />
      </Helmet>

      <article className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/blog" className="inline-flex items-center gap-2 text-pink-600 font-medium mb-12 hover:text-pink-700 transition-colors">
             <ArrowLeft className="w-4 h-4" /> Volver al Blog
          </Link>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              {post.frontmatter.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-8 leading-tight">
              {post.frontmatter.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 font-medium tracking-wide">
               <span className="flex items-center gap-2"><User className="w-4 h-4 text-pink-500" /> {post.frontmatter.author}</span>
               <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-pink-500" /> {formatDate(post.frontmatter.date)}</span>
               <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-pink-500" /> {post.frontmatter.readTime}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-16 shadow-xl"
          >
             <img 
                src={post.frontmatter.image} 
                alt={post.frontmatter.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
             />
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="max-w-[700px] mx-auto prose prose-lg prose-pink prose-headings:font-serif prose-h3:text-2xl prose-h3:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-pink-600 hover:prose-a:text-pink-700"
          >
             <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
             </ReactMarkdown>
          </motion.div>

        </div>
      </article>
    </>
  )
}
