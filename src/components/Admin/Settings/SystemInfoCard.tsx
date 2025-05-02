
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const SystemInfoCard = () => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Informações do Sistema</CardTitle>
        <CardDescription>
          Dados sobre a versão e status do sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Versão do Sistema</h4>
            <p className="text-sm text-gray-500">v1.0.0</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Status da Base de Dados</h4>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Servidor</h4>
            <p className="text-sm text-gray-500">Supabase</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Última Atualização</h4>
            <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemInfoCard;
