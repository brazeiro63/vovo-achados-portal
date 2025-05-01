
import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Home, LampDesk, Bed, Sofa, Grid2X2 } from 'lucide-react';

const LarDoceLar: React.FC = () => {
  // Sample products - in a real application, these would come from an API or database
  const products = [
    {
      id: 1,
      title: 'Conjunto de Almofadas Decorativas - 4 peças',
      image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop',
      store: 'Amazon',
      url: 'https://www.amazon.com.br',
    },
    {
      id: 2,
      title: 'Kit de Jogos Americanos Rústicos - 6 unidades',
      image: 'https://images.unsplash.com/photo-1586208958839-06c17cacdf08?w=800&auto=format&fit=crop',
      store: 'Mercado Livre',
      url: 'https://www.mercadolivre.com.br',
    },
    {
      id: 3,
      title: 'Luminária de Mesa Estilo Vintage',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop',
      store: 'Shopee',
      url: 'https://www.shopee.com.br',
    },
    {
      id: 4,
      title: 'Jogo de Cama 100% Algodão Egípcio - 400 fios',
      image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=800&auto=format&fit=crop',
      store: 'Amazon',
      url: 'https://www.amazon.com.br',
    },
    {
      id: 5,
      title: 'Organizador de Utensílios para Cozinha - Bambu',
      image: 'https://images.unsplash.com/photo-1520981825232-ece5ef2cab8b?w=800&auto=format&fit=crop',
      store: 'Mercado Livre',
      url: 'https://www.mercadolivre.com.br',
    },
    {
      id: 6,
      title: 'Puff Decorativo Multifuncional com Baú',
      image: 'https://images.unsplash.com/photo-1615968679312-9b7ed9f04e79?w=800&auto=format&fit=crop',
      store: 'Shopee',
      url: 'https://www.shopee.com.br',
    },
  ];

  const categories = [
    { name: 'Todos', icon: <Grid2X2 size={20} /> },
    { name: 'Decoração', icon: <Home size={20} /> },
    { name: 'Iluminação', icon: <LampDesk size={20} /> },
    { name: 'Móveis', icon: <Sofa size={20} /> },
    { name: 'Cama & Banho', icon: <Bed size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div 
          className="h-64 bg-center bg-cover relative"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2940&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-vovo-casa bg-opacity-70"></div>
          <div className="container-custom relative z-10 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">Lar Doce Lar</h1>
            <p className="text-xl text-gray-800 max-w-2xl">
              Itens de decoração, utensílios e móveis que transformam sua casa em um refúgio acolhedor.
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
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-vovo-casa hover:bg-vovo-casaDark whitespace-nowrap"
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
            <h2 className="text-3xl font-playfair font-bold mb-8 text-center">Aconchego para o seu Lar</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  image={product.image}
                  store={product.store}
                  url={product.url}
                  color="casa"
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

export default LarDoceLar;
