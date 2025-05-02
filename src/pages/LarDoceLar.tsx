
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Home, LampDesk, Bed, Sofa, Grid2X2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

const LarDoceLar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const { data: products, isLoading } = useProducts({ 
    color: 'casa',
    category: selectedCategory 
  });

  const categories = [
    { name: undefined, label: 'Todos', icon: <Grid2X2 size={20} /> },
    { name: 'Decoração', label: 'Decoração', icon: <Home size={20} /> },
    { name: 'Iluminação', label: 'Iluminação', icon: <LampDesk size={20} /> },
    { name: 'Móveis', label: 'Móveis', icon: <Sofa size={20} /> },
    { name: 'Cama & Banho', label: 'Cama & Banho', icon: <Bed size={20} /> },
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category.name 
                      ? 'bg-vovo-casaDark text-white' 
                      : 'bg-vovo-casa hover:bg-vovo-casaDark'
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
            <h2 className="text-3xl font-playfair font-bold mb-8 text-center">Aconchego para o seu Lar</h2>
            
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

export default LarDoceLar;
