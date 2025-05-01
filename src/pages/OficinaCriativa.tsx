
import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Brush, Scissors, Wrench, PaintBucket, Grid2X2 } from 'lucide-react';

const OficinaCriativa: React.FC = () => {
  // Sample products - in a real application, these would come from an API or database
  const products = [
    {
      id: 1,
      title: 'Kit Completo para Artesanato em Feltro',
      image: 'https://images.unsplash.com/photo-1499744937866-d7e566a20a61?w=800&auto=format&fit=crop',
      store: 'Amazon',
      url: 'https://www.amazon.com.br',
    },
    {
      id: 2,
      title: 'Máquina de Costura Portátil para Iniciantes',
      image: 'https://images.unsplash.com/photo-1545342084-d03fe58ea023?w=800&auto=format&fit=crop',
      store: 'Mercado Livre',
      url: 'https://www.mercadolivre.com.br',
    },
    {
      id: 3,
      title: 'Conjunto de Ferramentas para Marcenaria - 24 peças',
      image: 'https://images.unsplash.com/photo-1426927308491-6380b6a9936f?w=800&auto=format&fit=crop',
      store: 'Shopee',
      url: 'https://www.shopee.com.br',
    },
    {
      id: 4,
      title: 'Kit de Tintas Acrílicas Profissionais - 12 cores',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop',
      store: 'Amazon',
      url: 'https://www.amazon.com.br',
    },
    {
      id: 5,
      title: 'Impressora 3D Compacta para Pequenos Negócios',
      image: 'https://images.unsplash.com/photo-1563787765755-b1b8efb49405?w=800&auto=format&fit=crop',
      store: 'Mercado Livre',
      url: 'https://www.mercadolivre.com.br',
    },
    {
      id: 6,
      title: 'Curso Digital: Como Montar seu Pequeno Negócio Artesanal',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop',
      store: 'Hotmart',
      url: 'https://www.hotmart.com',
    },
  ];

  const categories = [
    { name: 'Todos', icon: <Grid2X2 size={20} /> },
    { name: 'Artesanato', icon: <Brush size={20} /> },
    { name: 'Ferramentas', icon: <Wrench size={20} /> },
    { name: 'Tecidos', icon: <Scissors size={20} /> },
    { name: 'Tintas', icon: <PaintBucket size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div 
          className="h-64 bg-center bg-cover relative"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=2940&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-vovo-empreendedorismo bg-opacity-70"></div>
          <div className="container-custom relative z-10 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">Oficina Criativa</h1>
            <p className="text-xl text-gray-800 max-w-2xl">
              Ferramentas, materiais e insumos para despertar o empreendedor e artesão que existe em você.
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
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-vovo-empreendedorismo hover:bg-vovo-empreendedorismoDark whitespace-nowrap"
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
            <h2 className="text-3xl font-playfair font-bold mb-8 text-center">Ferramentas para Criar e Empreender</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  image={product.image}
                  store={product.store}
                  url={product.url}
                  color="empreendedorismo"
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

export default OficinaCriativa;
