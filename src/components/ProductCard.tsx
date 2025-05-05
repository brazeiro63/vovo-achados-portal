
import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProductCardProps {
  title: string;
  image: string;
  store: string;
  url: string;
  color: string;
  price?: number;
  preco_de?: number | null;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image, store, url, color, price, preco_de }) => {
  // Determine button class based on section color
  const buttonClass = 
    color === 'infantil' 
      ? 'vovo-button vovo-button-infantil' 
      : color === 'empreendedorismo' 
        ? 'vovo-button vovo-button-empreendedorismo' 
        : 'vovo-button vovo-button-casa';

  // Formatar preço como BRL
  const formatCurrency = (value?: number | null) => {
    if (value === undefined || value === null) return undefined;
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  };

  // Verificar se deve exibir o preço de (tachado)
  const showOriginalPrice = preco_de !== undefined && preco_de !== null && price !== undefined && preco_de > price;
  
  const formattedCurrentPrice = formatCurrency(price);
  const formattedOriginalPrice = formatCurrency(preco_de);

  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white h-full flex flex-col">
      <div className="w-full overflow-hidden">
        <AspectRatio ratio={1 / 1} className="bg-gray-100">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </AspectRatio>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">{title}</h3>
        {formattedCurrentPrice && (
          <div className="mb-2">
            {showOriginalPrice && (
              <span className="text-sm text-gray-500 line-through mr-2">{formattedOriginalPrice}</span>
            )}
            <span className="text-lg font-semibold text-gray-800">{formattedCurrentPrice}</span>
          </div>
        )}
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
