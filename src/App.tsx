
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import MundoMagicoInfantil from "./pages/MundoMagicoInfantil";
import OficinaCriativa from "./pages/OficinaCriativa";
import LarDoceLar from "./pages/LarDoceLar";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";

// Admin Components
import AdminLayout from "./components/AdminLayout";
import ProductsManagement from "./pages/Admin/ProductsManagement";
import BatchProductImport from "./pages/Admin/BatchProductImport";
import UsersManagement from "./pages/Admin/UsersManagement";
import StoreApiManagement from "./pages/Admin/StoreApiManagement";
import SettingsManagement from "./pages/Admin/SettingsManagement";
import BlogPostsManagement from "./pages/Admin/BlogPostsManagement";
import BlogPostForm from "./pages/Admin/BlogPostForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mundo-magico-infantil" element={<MundoMagicoInfantil />} />
            <Route path="/oficina-criativa" element={<OficinaCriativa />} />
            <Route path="/lar-doce-lar" element={<LarDoceLar />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<ProductsManagement />} />
              <Route path="importar-produtos" element={<BatchProductImport />} />
              <Route path="usuarios" element={<UsersManagement />} />
              <Route path="loja/:storeId" element={<StoreApiManagement />} />
              <Route path="configuracoes" element={<SettingsManagement />} />
              <Route path="blog" element={<BlogPostsManagement />} />
              <Route path="blog/new" element={<BlogPostForm />} />
              <Route path="blog/edit/:id" element={<BlogPostForm />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
