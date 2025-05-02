
import { useState } from "react";
import { toast } from "@/components/ui/sonner";
import GeneralSettingsCard from "@/components/Admin/Settings/GeneralSettingsCard";
import FeatureFlagsCard from "@/components/Admin/Settings/FeatureFlagsCard";
import SystemInfoCard from "@/components/Admin/Settings/SystemInfoCard";

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

  const handleSaveFeatures = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Configurações de recursos atualizadas");
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
        <GeneralSettingsCard
          siteName={settings.siteName}
          contactEmail={settings.contactEmail}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        
        <FeatureFlagsCard
          featureFlags={{
            enableUserRegistration: settings.enableUserRegistration,
            requireEmailVerification: settings.requireEmailVerification,
            maintenanceMode: settings.maintenanceMode
          }}
          onToggleChange={handleToggleChange}
          onSaveFeatures={handleSaveFeatures}
          isLoading={isLoading}
        />
        
        <SystemInfoCard />
      </div>
    </>
  );
};

export default SettingsManagement;
