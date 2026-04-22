import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Key, Database } from 'lucide-react';
import { getLocalBlogPosts } from '../lib/content';
import toast from 'react-hot-toast';

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [migrating, setMigrating] = useState(false);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(postsData);
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchPosts();
    }
  }, [isAdmin]);

  const migratePostsToDB = async () => {
    if (!window.confirm("Esto importará todos los archivos Markdown locales a la base de datos en la nube. ¿Continuar?")) return;
    setMigrating(true);
    
    try {
      const localPosts = getLocalBlogPosts();
      for (const p of localPosts) {
        const postRef = doc(db, 'posts', p.slug);
        await setDoc(postRef, {
          title: p.frontmatter.title,
          slug: p.slug,
          excerpt: p.frontmatter.excerpt || '',
          category: p.frontmatter.category || '',
          image: p.frontmatter.image || '',
          date: p.frontmatter.date || '',
          readTime: p.frontmatter.readTime || '',
          author: p.frontmatter.author || '',
          content: p.content,
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
      }
      toast.success("¡Importación de posts completada éxitosamente!");
      fetchPosts();
    } catch (error: any) {
      toast.error("Error al migrar: " + error.message);
    }
    setMigrating(false);
  };

  const deletePost = async (id: string) => {
    if(!window.confirm("¿Estás seguro de que quieres eliminar este post permanentemente?")) return;
    
    toast.promise(
      deleteDoc(doc(db, 'posts', id)).then(fetchPosts),
      {
        loading: 'Eliminando...',
        success: 'Post eliminado correctamente',
        error: (err) => `Error al eliminar: ${err.message}`
      }
    );
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  if (user && !isAdmin) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <Key className="w-16 h-16 text-pink-500 mb-4" />
        <h2 className="text-3xl font-serif text-gray-900 mb-4">Acceso Denegado</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">No tienes permisos de Administrador para ver el Dashboard. Contacta a soporte para vincular tu correo "{user.email}" a un rol de admin.</p>
        <Link to="/" className="text-pink-600 font-medium hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h1 className="text-3xl font-serif text-gray-900">Panel de Administración</h1>
          <div className="flex gap-4 mt-4 sm:mt-0">
            {posts.length === 0 && (
               <button 
                onClick={migratePostsToDB}
                disabled={migrating}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition-all">
                <Database className="w-5 h-5"/> {migrating ? 'Migrando...' : 'Migrar Local a Nube'}
               </button>
            )}
            <Link to="/admin/editor/new" className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition-all">
              <Plus className="w-5 h-5"/> Nuevo Post
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-semibold text-gray-800">Publicaciones (Cloud Firestore)</h3>
          </div>
          
          {posts.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
               No hay artículos en la base de datos todavía. Haz click en "Migrar Local a Nube" si es la primera vez.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {posts.map(post => (
                <li key={post.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <img src={post.image || 'https://via.placeholder.com/50'} className="w-12 h-12 rounded-lg object-cover" alt="" />
                    <div>
                      <h4 className="font-medium text-gray-900">{post.title}</h4>
                      <p className="text-sm text-gray-500">{post.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/admin/editor/${post.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4"/>
                    </Link>
                    <button onClick={() => deletePost(post.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
