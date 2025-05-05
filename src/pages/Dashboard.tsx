
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import NavBar from "@/components/NavBar";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { Package } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Dashboard = () => {
  const { session, user } = useAuth();
  const { data: products, isLoading } = useProducts({ 
    // Fetch a mix of products from different categories
  });
  
  // If not logged in, redirect to login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {/* User Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Seu Perfil</CardTitle>
              <CardDescription>Informações da sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Membro desde</p>
                  <p className="font-medium">{
                    user?.created_at 
                      ? new Date(user.created_at).toLocaleDateString('pt-BR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : '-'
                  }</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity / Products */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recomendações para você</CardTitle>
              <CardDescription>Produtos que podem te interessar</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-lg overflow-hidden border border-gray-100">
                      <AspectRatio ratio={1 / 1}>
                        <Skeleton className="h-full w-full" />
                      </AspectRatio>
                      <div className="p-4">
                        <Skeleton className="h-5 w-4/5 mb-2" />
                        <Skeleton className="h-4 w-3/5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : products && products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      title={product.title}
                      image={product.image}
                      store={product.store}
                      url={product.url}
                      color={product.color}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Nenhum produto disponível no momento</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <p className="text-sm text-gray-500">Os produtos acima são de parceiros afiliados.</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
