import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Brush, Scissors, Wrench, PaintBucket, Grid2X2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

const OficinaCriativa: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const { data: products, isLoading } = useProducts({ 
    color: 'empreendedorismo',
    category: selectedCategory
  });

  const categories = [
    { name: undefined, label: 'Todos', icon: <Grid2X2 size={20} /> },
    { name: 'Artesanato', label: 'Artesanato', icon: <Brush size={20} /> },
    { name: 'Ferramentas', label: 'Ferramentas', icon: <Wrench size={20} /> },
    { name: 'Tecidos', label: 'Tecidos', icon: <Scissors size={20} /> },
    { name: 'Tintas', label: 'Tintas', icon: <PaintBucket size={20} /> },
  ];

  const handleCategoryClick = (category: string | undefined) => {
    setSelectedCategory(category);
  };

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
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category.name 
                      ? 'bg-vovo-empreendedorismoDark text-white' 
                      : 'bg-vovo-empreendedorismo hover:bg-vovo-empreendedorismoDark'
                  }`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-playfair font-bold mb-8 text-center">Ferramentas para Criar e Empreender</h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="rounded-lg overflow-hidden bg-white shadow-md">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-5 w-4/5 mb-2" />
                      <Skeleton className="h-4 w-3/5 mb-4" />
                      <Skeleton className="h-10 w-full rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products && products.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    image={product.image}
                    store={product.store}
                    url={product.url}
                    color={product.color}
                    price={product.price}
                    preco_de={product.preco_de}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OficinaCriativa;
