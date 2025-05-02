
import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useStoreApi, getSupportedStores } from "@/hooks/useStoreApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, RefreshCw, Database } from "lucide-react";
import { useAdminProducts } from "@/hooks/useAdminProducts";

const StoreApiManagement = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const stores = getSupportedStores();
  const currentStore = stores.find(store => store.id === storeId);
  
  const { isLoading: storeApiLoading, syncProductsWithStore } = useStoreApi(storeId || "");
  const { products, isLoading: productsLoading } = useAdminProducts(storeId);
  
  // If store doesn't exist, redirect to the first store
  if (!currentStore && stores.length > 0) {
    return <Navigate to={`/admin/loja/${stores[0].id}`} replace />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">API de Loja: {currentStore?.name}</h2>
          <p className="text-sm text-gray-500">
            Gerencie os dados e sincronize produtos com {currentStore?.name}.
          </p>
        </div>
      </div>

      <Tabs defaultValue="lojas" className="mb-6">
        <TabsList>
          {stores.map(store => (
            <TabsTrigger 
              key={store.id} 
              value={store.id}
              asChild
            >
              <Link to={`/admin/loja/${store.id}`}>
                {store.name}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Sincronização</CardTitle>
            <CardDescription>
              Sincronize produtos com a API da {currentStore?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={() => syncProductsWithStore()}
              disabled={storeApiLoading}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {storeApiLoading ? "Sincronizando..." : "Sincronizar Produtos"}
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Última sincronização: Nunca
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Status da API</CardTitle>
            <CardDescription>
              Status da conexão com a {currentStore?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-400 rounded-full mr-2"></div>
              <span className="text-sm font-medium">
                Não implementado
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              A integração com a API da {currentStore?.name} ainda não foi implementada.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Resumo de Produtos</CardTitle>
            <CardDescription>
              Produtos da {currentStore?.name} na base
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {productsLoading ? "..." : products.length}
            </div>
            <p className="text-sm text-gray-500">
              produtos cadastrados desta loja
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6" />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Instruções de Implementação</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-yellow-800 text-sm">
            Esta é uma página placeholder para integração futura com a API da {currentStore?.name}. A implementação real da API exigirá:
          </p>
          <ul className="list-disc text-sm text-yellow-800 pl-5 mt-2">
            <li>Credenciais da API da {currentStore?.name}</li>
            <li>Implementação dos endpoints específicos</li>
            <li>Mapeamento entre os dados da API e o schema do banco de dados</li>
            <li>Implementação da lógica de sincronização</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h4 className="text-md font-medium mb-2 flex items-center">
              <Database className="h-4 w-4 mr-2" />
              Endpoints que serão implementados:
            </h4>
            <ul className="space-y-1 list-disc pl-5">
              <li><code>GET /api/admin/produtos/{storeId}</code> - Listar produtos</li>
              <li><code>POST /api/admin/produtos/{storeId}/sync</code> - Sincronizar produtos</li>
              <li><code>GET /api/admin/produtos/{storeId}/status</code> - Status da API</li>
              <li><code>PUT /api/admin/produtos/{storeId}/:id</code> - Atualizar produto</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-2 flex items-center">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Operações suportadas:
            </h4>
            <ul className="space-y-1 list-disc pl-5">
              <li>Buscar produtos da {currentStore?.name}</li>
              <li>Sincronizar preços e disponibilidade</li>
              <li>Atualizar informações de produto</li>
              <li>Verificar comissões de afiliados</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreApiManagement;
