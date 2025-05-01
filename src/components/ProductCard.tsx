
import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';

interface ProductCardProps {
  title: string;
  image: string;
  store: string;
  url: string;
  color: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image, store, url, color }) => {
  // Determine button class based on section color
  const buttonClass = 
    color === 'infantil' 
      ? 'vovo-button vovo-button-infantil' 
      : color === 'empreendedorismo' 
        ? 'vovo-button vovo-button-empreendedorismo' 
        : 'vovo-button vovo-button-casa';

  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">{title}</h3>
        <div className="text-sm text-gray-500 mb-3">
          <span>Disponível na loja: {store}</span>
        </div>
        <div className="mt-auto">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`flex items-center justify-center gap-2 w-full ${buttonClass}`}
          >
            Ver na Loja <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
