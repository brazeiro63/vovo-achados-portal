
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BlogPostCard from '../components/BlogPostCard';
import { Search } from 'lucide-react';

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  // Sample blog posts - in a real application, these would come from an API or database
  const blogPosts = [
    {
      id: 1,
      title: 'Os 5 Brinquedos que Todo Pequeno Deve Experimentar',
      excerpt: 'Selecionamos os melhores brinquedos que estimulam a criatividade e desenvolvimento infantil, com opções para diferentes idades.',
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop',
      date: '15 Abril 2025',
      category: 'Infantil',
    },
    {
      id: 2,
      title: 'Guia Completo para Montar seu Ateliê em Casa',
      excerpt: 'Descubra como transformar aquele espaço sem uso em um ateliê funcional para seus projetos de artesanato e pequenos negócios.',
      image: 'https://images.unsplash.com/photo-1513708929605-6dd0e1b081bd?w=800&auto=format&fit=crop',
      date: '28 Março 2025',
      category: 'Empreendedorismo',
    },
    {
      id: 3,
      title: 'Transforme seu Quarto de Hóspedes em uma Suíte de Hotel Boutique',
      excerpt: 'Dicas e produtos para criar uma experiência de hospedagem de luxo para seus convidados sem gastar uma fortuna.',
      image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format&fit=crop',
      date: '10 Março 2025',
      category: 'Casa',
    },
    {
      id: 4,
      title: 'Materiais Montessori que Você Pode Fazer em Casa',
      excerpt: 'Aprenda a criar brinquedos e jogos pedagógicos usando materiais simples que você já tem em casa. Economia e aprendizado!',
      image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&auto=format&fit=crop',
      date: '02 Março 2025',
      category: 'Infantil',
    },
    {
      id: 5,
      title: 'As Melhores Ferramentas para Quem Trabalha com Madeira',
      excerpt: 'Uma análise detalhada das ferramentas essenciais para marcenaria iniciante e projetos de média complexidade.',
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&auto=format&fit=crop',
      date: '19 Fevereiro 2025',
      category: 'Empreendedorismo',
    },
    {
      id: 6,
      title: 'Mesa Posta: Como Montar uma Mesa de Jantar Elegante',
      excerpt: 'Guia completo com dicas de decoração, utensílios e arranjos para deixar sua mesa de jantar digna de revista.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
      date: '05 Fevereiro 2025',
      category: 'Casa',
    },
  ];

  // Filter posts based on active category
  const filteredPosts = activeCategory === 'Todos' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  // Categories
  const categories = ['Todos', 'Infantil', 'Empreendedorismo', 'Casa'];

  // Determine category badge color based on name
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  image={post.image}
                  date={post.date}
                  category={post.category}
                />
              ))}
            </div>

            {/* No Results Message */}
            {filteredPosts.length === 0 && (
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
