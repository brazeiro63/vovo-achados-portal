
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import NavBar from "@/components/NavBar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";
import { 
  Package, 
  Users, 
  ShoppingBag, 
  Settings 
} from "lucide-react";

const AdminLayout = () => {
  const { session, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  // Redirect to login if not authenticated
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to dashboard if not an admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/admin') return 'produtos';
    if (path === '/admin/usuarios') return 'usuarios';
    if (path.startsWith('/admin/loja')) return 'lojas';
    if (path === '/admin/configuracoes') return 'configuracoes';
    return 'produtos';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <header className="bg-white border-b">
        <div className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Administração</h1>
          
          <Tabs value={getActiveTab()} className="mt-6">
            <TabsList className="grid grid-cols-4 sm:grid-cols-4 w-full max-w-xl">
              <TabsTrigger value="produtos" asChild>
                <Link to="/admin" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span className="hidden sm:inline">Produtos</span>
                </Link>
              </TabsTrigger>
              <TabsTrigger value="usuarios" asChild>
                <Link to="/admin/usuarios" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Usuários</span>
                </Link>
              </TabsTrigger>
              <TabsTrigger value="lojas" asChild>
                <Link to="/admin/loja/amazon" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline">Lojas</span>
                </Link>
              </TabsTrigger>
              <TabsTrigger value="configuracoes" asChild>
                <Link to="/admin/configuracoes" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Configurações</span>
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>
      
      <main className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
