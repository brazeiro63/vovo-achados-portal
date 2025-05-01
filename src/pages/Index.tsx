
import React from 'react';
import { Baby, Brush, Sofa } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import SectionCard from '../components/SectionCard';

const Index: React.FC = () => {
  // Section data
  const sections = [
    {
      id: 1,
      title: 'Mundo Mágico Infantil',
      description: 'Descubra produtos encantadores para estimular a imaginação e o desenvolvimento das crianças. Fantasias, brinquedos, livros e muito mais!',
      image: 'https://images.unsplash.com/photo-1616438747782-d21b70c5c83f?q=80&w=2940&auto=format&fit=crop',
      color: 'infantil',
      path: '/mundo-magico-infantil',
      icon: <Baby size={24} className="text-gray-800" />
    },
    {
      id: 2,
      title: 'Oficina Criativa',
      description: 'Ferramentas, materiais e insumos selecionados para despertar o empreendedor e artesão que existe em você. Crie, produza e lucre!',
      image: 'https://images.unsplash.com/photo-1513682121497-80211f36a7d3?q=80&w=2938&auto=format&fit=crop',
      color: 'empreendedorismo',
      path: '/oficina-criativa',
      icon: <Brush size={24} className="text-gray-800" />
    },
    {
      id: 3,
      title: 'Lar Doce Lar',
      description: 'Itens de decoração, utensílios e móveis que transformam sua casa em um refúgio acolhedor. Recrie experiências de hospedagem únicas!',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2958&auto=format&fit=crop',
      color: 'casa',
      path: '/lar-doce-lar',
      icon: <Sofa size={24} className="text-gray-800" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-vovo-neutral py-16">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">Achados da Vovó</h1>
              <p className="text-xl text-gray-600">
                Uma curadoria especial de produtos selecionados com o carinho e 
                a sabedoria de quem sabe escolher o melhor para você e sua família.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sections.map(section => (
                <SectionCard 
                  key={section.id}
                  title={section.title}
                  description={section.description}
                  image={section.image}
                  color={section.color}
                  path={section.path}
                  icon={section.icon}
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

export default Index;
