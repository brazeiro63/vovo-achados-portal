
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BlogPostCard from '../components/BlogPostCard';
import { Search } from 'lucide-react';
import { usePublishedBlogPosts } from '@/hooks/useBlogPosts';
import { Skeleton } from '@/components/ui/skeleton';

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const { data: blogPosts, isLoading, isError } = usePublishedBlogPosts();

  // Filtragem de posts por categoria e busca
  const filteredPosts = blogPosts?.filter(post => {
    const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Categorias únicas dos posts
  const categories = blogPosts 
    ? ['Todos', ...Array.from(new Set(blogPosts.map(post => post.category)))]
    : ['Todos', 'Infantil', 'Empreendedorismo', 'Casa'];

  // Determina a cor da categoria com base no nome
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Infantil':
        return 'bg-vovo-infantil hover:bg-vovo-infantilDark';
      case 'Empreendedorismo':
        return 'bg-vovo-empreendedorismo hover:bg-vovo-empreendedorismoDark';
      case 'Casa':
        return 'bg-vovo-casa hover:bg-vovo-casaDark';
      default:
        return 'bg-gray-200 hover:bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-vovo-neutral py-16">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Dicas, reviews e inspirações para crianças, empreendedores e seu lar.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative">
              <input 
                type="text" 
                placeholder="Buscar no blog..." 
                className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-3 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="bg-white py-6">
          <div className="container-custom">
            <div className="flex justify-center flex-wrap gap-3">
              {categories.map((category, index) => (
                <button 
                  key={index} 
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeCategory === category 
                      ? getCategoryColor(category) + ' text-gray-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <Skeleton className="h-52 w-full" />
                    <div className="p-6">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-6 w-full mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-4" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-playfair mb-2">Erro ao carregar posts</h3>
                <p className="text-gray-600">Não foi possível carregar os posts do blog. Tente novamente mais tarde.</p>
              </div>
            ) : filteredPosts && filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogPostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    image={post.image}
                    date={new Date(post.published_at || post.created_at).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                    category={post.category}
                    slug={post.slug}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-playfair mb-2">Nenhum post encontrado</h3>
                <p className="text-gray-600">Tente selecionar outra categoria ou fazer uma busca diferente.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
