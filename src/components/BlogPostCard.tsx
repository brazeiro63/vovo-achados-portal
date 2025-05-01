
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';

interface BlogPostCardProps {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ id, title, excerpt, image, date, category }) => {
  // Determine category badge color based on category
  const categoryColor = 
    category === 'Infantil' 
      ? 'bg-vovo-infantil' 
      : category === 'Empreendedorismo' 
        ? 'bg-vovo-empreendedorismo' 
        : 'bg-vovo-casa';

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-52">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-4 left-4 ${categoryColor} px-3 py-1 rounded-full text-sm`}>
          <div className="flex items-center gap-1">
            <Tag size={14} />
            <span>{category}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Calendar size={14} className="mr-1" />
          <span>{date}</span>
        </div>
        <h3 className="text-xl font-playfair font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        <Link to={`/blog/${id}`} className="text-gray-800 font-medium hover:underline">
          Leia mais
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;
