
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionCardProps {
  title: string;
  description: string;
  image: string;
  color: string;
  path: string;
  icon: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ 
  title, 
  description, 
  image, 
  color, 
  path,
  icon
}) => {
  // Determine button class based on section color
  const buttonClass = 
    color === 'infantil' 
      ? 'vovo-button vovo-button-infantil' 
      : color === 'empreendedorismo' 
        ? 'vovo-button vovo-button-empreendedorismo' 
        : 'vovo-button vovo-button-casa';
  
  // Determine background color class
  const bgColor = 
    color === 'infantil' 
      ? 'bg-vovo-infantil' 
      : color === 'empreendedorismo' 
        ? 'bg-vovo-empreendedorismo' 
        : 'bg-vovo-casa';

  return (
    <div className="rounded-xl overflow-hidden shadow-lg section-transition hover:shadow-xl h-full">
      <div 
        className="h-52 sm:h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute top-4 left-4 flex items-center">
          <div className={`rounded-full p-2 ${bgColor}`}>
            {icon}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-playfair font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link to={path} className={`flex items-center justify-center gap-2 ${buttonClass}`}>
          Explorar <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default SectionCard;
