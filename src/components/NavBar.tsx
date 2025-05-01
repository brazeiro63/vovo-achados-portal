
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Você saiu da sua conta");
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-playfair font-bold text-gray-800">Achados da Vovó</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Início</Link>
            <Link to="/mundo-magico-infantil" className="text-gray-600 hover:text-gray-900">Mundo Mágico Infantil</Link>
            <Link to="/oficina-criativa" className="text-gray-600 hover:text-gray-900">Oficina Criativa</Link>
            <Link to="/lar-doce-lar" className="text-gray-600 hover:text-gray-900">Lar Doce Lar</Link>
            <Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Minha Conta</Link>
                <Button onClick={handleSignOut} variant="ghost" className="text-gray-600 hover:text-gray-900">Sair</Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">Registrar</Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white py-4 animate-fade-in">
          <div className="container-custom flex flex-col space-y-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900 py-2" onClick={toggleMenu}>Início</Link>
            <Link to="/mundo-magico-infantil" className="text-gray-600 hover:text-gray-900 py-2" onClick={toggleMenu}>Mundo Mágico Infantil</Link>
            <Link to="/oficina-criativa" className="text-gray-600 hover:text-gray-900 py-2" onClick={toggleMenu}>Oficina Criativa</Link>
            <Link to="/lar-doce-lar" className="text-gray-600 hover:text-gray-900 py-2" onClick={toggleMenu}>Lar Doce Lar</Link>
            <Link to="/blog" className="text-gray-600 hover:text-gray-900 py-2" onClick={toggleMenu}>Blog</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 py-2" onClick={toggleMenu}>Minha Conta</Link>
                <button onClick={handleSignOut} className="text-left text-gray-600 hover:text-gray-900 py-2">Sair</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900 py-2" onClick={toggleMenu}>Login</Link>
                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium py-2" onClick={toggleMenu}>Registrar</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
