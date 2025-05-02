
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-playfair font-semibold mb-4">Casa Digital Shop</h3>
            <p className="text-gray-600 mb-4">
              Curadoria especial de produtos selecionados com carinho para 
              encantar crianças, inspirar projetos e aconchegar lares.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-playfair font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/mundo-magico-infantil" className="text-gray-600 hover:text-gray-900">Mundo Mágico Infantil</Link></li>
              <li><Link to="/oficina-criativa" className="text-gray-600 hover:text-gray-900">Oficina Criativa</Link></li>
              <li><Link to="/lar-doce-lar" className="text-gray-600 hover:text-gray-900">Lar Doce Lar</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-playfair font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-gray-600" />
                <span className="text-gray-600">contato@casadigitalshop.com.br</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-gray-600" />
                <span className="text-gray-600">Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {currentYear} Casa Digital Shop. Todos os direitos reservados.
            </p>
            <p className="text-gray-600 text-sm">
              Este site contém links de afiliados. Ao clicar nestes links e realizar uma compra, 
              podemos receber uma comissão sem nenhum custo adicional para você.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
