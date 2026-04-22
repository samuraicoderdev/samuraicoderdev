import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import { z } from 'zod';
import toast from 'react-hot-toast';

// Re-using the Zod validation explicitly for the Admin Form
const PostFormSchema = z.object({
  title: z.string().min(3, "El título es muy corto").max(200, "El título es muy largo"),
  slug: z.string().min(3, "El slug es muy corto").max(200, "El slug es muy largo").regex(/^[a-zA-Z0-9_\-]+$/, "Formato de slug inválido"),
  content: z.string().min(10, "El contenido debe tener al menos 10 caracteres").max(500000, "Demasiado largo"),
  excerpt: z.string().max(500, "Extracto demasiado largo").optional(),
  category: z.string().max(100, "Categoría demasiado larga").optional(),
  image: z.string().max(1000, "URL de imagen demasiado larga").optional(),
  date: z.string().max(100).optional(),
  readTime: z.string().max(50).optional(),
  author: z.string().max(100).optional(),
});

type PostFormData = z.infer<typeof PostFormSchema>;

export default function AdminEditor() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // 'new' or post ID
  
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: 'Crecimiento Personal',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min de lectura',
    author: 'Idatria Olystic',
  });
  
  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    async function fetchPost() {
      if (id && id !== 'new') {
        setLoadingData(true);
        try {
          const docRef = doc(db, 'posts', id);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const data = snap.data();
            setFormData({
              title: data.title || '',
              slug: data.slug || '',
              content: data.content || '',
              excerpt: data.excerpt || '',
              category: data.category || '',
              image: data.image || '',
              date: data.date || '',
              readTime: data.readTime || '',
              author: data.author || '',
            });
          } else {
            toast.error('El artículo no existe.');
            navigate('/admin');
          }
        } catch (error) {
          console.error(error);
          toast.error('Error al cargar el artículo.');
        } finally {
          setLoadingData(false);
        }
      }
    }
    if (isAdmin) fetchPost();
  }, [id, isAdmin, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Auto-generate slug from title if new
    if (e.target.name === 'title' && id === 'new') {
      let autoSlug = e.target.value.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/[^a-z0-9]+/g, '-') // dash replace
        .replace(/(^-|-$)/g, ''); // remove leading/trailing dashes
      setFormData(prev => ({ ...prev, title: e.target.value, slug: autoSlug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Zod Validation before submission
      PostFormSchema.parse(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
        });
        setErrors(fieldErrors);
        toast.error("Por favor, revisa los errores en el formulario.");
      }
      return;
    }

    setSaving(true);
    let successMessage = "";
    try {
      const timestamp = Date.now();
      
      if (id === 'new') {
        const postRef = doc(db, 'posts', formData.slug);
        
        // Anti-overwrite check
        const existing = await getDoc(postRef);
        if (existing.exists()) {
           toast.error("Ya existe un artículo con este Slug. Por favor, modifica el título o el slug.");
           setSaving(false);
           return;
        }

        await setDoc(postRef, {
          ...formData,
          createdAt: timestamp,
          updatedAt: timestamp
        });
        successMessage = "Artículo creado exitosamente.";
      } else {
        const postRef = doc(db, 'posts', id!);
        await updateDoc(postRef, {
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          category: formData.category,
          image: formData.image,
          date: formData.date,
          readTime: formData.readTime,
          author: formData.author,
          content: formData.content,
          updatedAt: timestamp
        });
        successMessage = "Artículo actualizado correctamente.";
      }
      toast.success(successMessage);
      navigate('/admin');
    } catch (error: any) {
      toast.error("Error al guardar: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || loadingData) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/admin" className="inline-flex items-center gap-2 text-pink-600 font-medium mb-8 hover:text-pink-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al Panel
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
           <h1 className="text-3xl font-serif text-gray-900 mb-8 border-b border-gray-100 pb-6">
             {id === 'new' ? 'Escribir Nuevo Artículo' : 'Editar Artículo'}
           </h1>

           <form onSubmit={handleSubmit} className="space-y-6">
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    placeholder="El Despertar de Consciencia..." />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL Amigable (Slug) {id !== 'new' && '- (No recomendado cambiar)'}</label>
                  <input type="text" name="slug" value={formData.slug} onChange={handleChange} disabled={id !== 'new'}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-pink-500 focus:outline-none disabled:opacity-70"
                    placeholder="el-despertar-de-consciencia" />
                  {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <input type="text" name="category" value={formData.category} onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-pink-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Autor</label>
                  <input type="text" name="author" value={formData.author} onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-pink-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha (Texto)</label>
                  <input type="text" name="date" value={formData.date} onChange={handleChange} 
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-pink-500 focus:outline-none" />
                </div>
             </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Extracto / Descripción corta (SEO)</label>
                <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows={2}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  placeholder="Un breve resumen que aparecerá en las tarjetas y en Google..." />
                {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt}</p>}
             </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL de Imagen de Portada</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-pink-500 focus:outline-none" />
             </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contenido (Markdown format)</label>
                <div className="relative">
                  <textarea name="content" value={formData.content} onChange={handleChange} rows={15}
                    className="w-full border border-gray-300 rounded-xl px-4 py-4 font-mono text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none bg-gray-50"
                    placeholder="## Empieza a escribir tu entrada en Markdown..." />
                  {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                </div>
             </div>

             <div className="flex justify-end pt-6 border-t border-gray-100">
               <button 
                  type="submit" 
                  disabled={saving}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-xl font-medium shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5"/>}
                  Guardar Publicación
               </button>
             </div>

           </form>
        </div>
      </div>
    </div>
  );
}
