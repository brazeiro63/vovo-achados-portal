
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

interface FeatureFlags {
  enableUserRegistration: boolean;
  requireEmailVerification: boolean;
  maintenanceMode: boolean;
}

interface FeatureFlagsCardProps {
  featureFlags: FeatureFlags;
  onToggleChange: (name: string, checked: boolean) => void;
  onSaveFeatures: () => void;
  isLoading: boolean;
}

const FeatureFlagsCard = ({ 
  featureFlags, 
  onToggleChange, 
  onSaveFeatures, 
  isLoading 
}: FeatureFlagsCardProps) => {
  return (
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
              checked={featureFlags.enableUserRegistration}
              onCheckedChange={(checked) => 
                onToggleChange("enableUserRegistration", checked)
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
              checked={featureFlags.requireEmailVerification}
              onCheckedChange={(checked) => 
                onToggleChange("requireEmailVerification", checked)
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
              checked={featureFlags.maintenanceMode}
              onCheckedChange={(checked) => 
                onToggleChange("maintenanceMode", checked)
              }
            />
          </div>
          
          <Button 
            onClick={onSaveFeatures}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Alterações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureFlagsCard;
