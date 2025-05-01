
import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Baby, Book, Rocket, Puzzle, Toy } from 'lucide-react';

const MundoMagicoInfantil: React.FC = () => {
  // Sample products - in a real application, these would come from an API or database
  const products = [
    {
      id: 1,
      title: 'Kit de Fantasias de Super-Heróis para Crianças',
      image: 'https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=800&auto=format&fit=crop',
      store: 'Amazon',
      url: 'https://www.amazon.com.br',
    },
    {
      id: 2,
      title: 'Livro Infantil Interativo - Aventuras na Floresta Encantada',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop',
      store: 'Mercado Livre',
      url: 'https://www.mercadolivre.com.br',
    },
    {
      id: 3,
      title: 'Quebra-Cabeça Educativo de Madeira - 100 peças',
      image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&auto=format&fit=crop',
      store: 'Shopee',
      url: 'https://www.shopee.com.br',
    },
    {
      id: 4,
      title: 'Conjunto de Brinquedos Montessori para Desenvolvimento Sensorial',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop',
      store: 'Amazon',
      url: 'https://www.amazon.com.br',
    },
    {
      id: 5,
      title: 'Kit de Artes e Pintura para Crianças',
      image: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?w=800&auto=format&fit=crop',
      store: 'Mercado Livre',
      url: 'https://www.mercadolivre.com.br',
    },
    {
      id: 6,
      title: 'Tenda de Brincadeira para Crianças - Castelo Encantado',
      image: 'https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?w=800&auto=format&fit=crop',
      store: 'Shopee',
      url: 'https://www.shopee.com.br',
    },
  ];

  const categories = [
    { name: 'Todos', icon: <Baby size={20} /> },
    { name: 'Livros', icon: <Book size={20} /> },
    { name: 'Brinquedos', icon: <Puzzle size={20} /> },
    { name: 'Fantasias', icon: <Rocket size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div 
          className="h-64 bg-center bg-cover relative"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1484820540004-14229fe36ca4?q=80&w=2940&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-vovo-infantil bg-opacity-70"></div>
          <div className="container-custom relative z-10 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">Mundo Mágico Infantil</h1>
            <p className="text-xl text-gray-800 max-w-2xl">
              Produtos encantadores para estimular a imaginação e o desenvolvimento das crianças.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white py-4 shadow-sm">
          <div className="container-custom">
            <div className="flex overflow-x-auto space-x-4 py-2">
              {categories.map((category, index) => (
                <button 
                  key={index} 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-vovo-infantil hover:bg-vovo-infantilDark whitespace-nowrap"
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-playfair font-bold mb-8 text-center">Nossos Achados para os Pequenos</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  image={product.image}
                  store={product.store}
                  url={product.url}
                  color="infantil"
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MundoMagicoInfantil;
