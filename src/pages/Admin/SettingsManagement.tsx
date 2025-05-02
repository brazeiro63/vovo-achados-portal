import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";

const SettingsManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // These would typically come from database/API
  const [settings, setSettings] = useState({
    siteName: "Casa Digital Shop",
    contactEmail: "contato@casadigitalshop.com.br",
    enableUserRegistration: true,
    requireEmailVerification: false,
    maintenanceMode: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggleChange = (name: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Configurações atualizadas com sucesso");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
          <p className="text-sm text-gray-500">
            Gerencie as configurações gerais da plataforma.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Configurações Gerais</CardTitle>
            <CardDescription>
              Configurações básicas da plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="siteName">Nome do Site</Label>
                <Input
                  id="siteName"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="contactEmail">Email de Contato</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={handleInputChange}
                />
              </div>
              
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Configurações
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Feature Flags */}
        <Card>
          <CardHeader>
            <CardTitle>Recursos da Plataforma</CardTitle>
            <CardDescription>
              Habilitar ou desabilitar funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableRegistration">Registro de Usuários</Label>
                  <p className="text-sm text-gray-500">
                    Permitir que novos usuários se registrem
                  </p>
                </div>
                <Switch
                  id="enableRegistration"
                  checked={settings.enableUserRegistration}
                  onCheckedChange={(checked) => 
                    handleToggleChange("enableUserRegistration", checked)
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="requireVerification">Verificação de Email</Label>
                  <p className="text-sm text-gray-500">
                    Exigir verificação de email ao criar conta
                  </p>
                </div>
                <Switch
                  id="requireVerification"
                  checked={settings.requireEmailVerification}
                  onCheckedChange={(checked) => 
                    handleToggleChange("requireEmailVerification", checked)
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode">Modo de Manutenção</Label>
                  <p className="text-sm text-gray-500">
                    Ativar modo de manutenção (site indisponível)
                  </p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => 
                    handleToggleChange("maintenanceMode", checked)
                  }
                />
              </div>
              
              <Button 
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    toast.success("Configurações de recursos atualizadas");
                    setIsLoading(false);
                  }, 1000);
                }}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar Alterações
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* System Info */}
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
      </div>
    </>
  );
};

export default SettingsManagement;
