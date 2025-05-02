
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Tag, ArrowLeft, Edit } from 'lucide-react';
import { usePublishedBlogPostBySlug } from '@/hooks/useBlogPosts';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  const { 
    data: post, 
    isLoading, 
    isError 
  } = usePublishedBlogPostBySlug(slug || '');

  // Determine category badge color based on category
  const getCategoryColor = (category: string | undefined) => {
    switch (category) {
      case 'Infantil':
        return 'bg-vovo-infantil';
      case 'Empreendedorismo':
        return 'bg-vovo-empreendedorismo';
      case 'Casa':
        return 'bg-vovo-casa';
      default:
        return 'bg-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container-custom">
            <Link to="/blog" className="flex items-center text-gray-600 hover:text-gray-800 mb-6">
              <ArrowLeft className="mr-2" size={18} />
              <span>Voltar para o Blog</span>
            </Link>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <Skeleton className="h-72 w-full" />
              <div className="p-8">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <div className="flex items-center space-x-4 mb-8">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container-custom text-center py-16">
            <h1 className="text-3xl font-playfair font-bold mb-4">Post não encontrado</h1>
            <p className="text-gray-600 mb-8">O post que você está procurando não existe ou não está mais disponível.</p>
            <Button onClick={() => navigate('/blog')}>
              <ArrowLeft className="mr-2" size={18} />
              Voltar para o Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <Link to="/blog" className="flex items-center text-gray-600 hover:text-gray-800">
              <ArrowLeft className="mr-2" size={18} />
              <span>Voltar para o Blog</span>
            </Link>
            
            {isAdmin && (
              <Link to={`/admin/blog/edit/${post.id}`}>
                <Button variant="outline" className="flex items-center">
                  <Edit className="mr-2" size={16} />
                  Editar Post
                </Button>
              </Link>
            )}
          </div>
          
          <article className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative h-72">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className={`${getCategoryColor(post.category)} px-3 py-1 rounded-full text-sm flex items-center gap-1`}>
                  <Tag size={14} />
                  <span>{post.category}</span>
                </div>
                <div className="text-gray-500 text-sm flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>{new Date(post.published_at || post.created_at).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-6">{post.title}</h1>
              
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
