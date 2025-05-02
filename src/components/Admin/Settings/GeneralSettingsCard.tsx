
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
import { Loader2 } from "lucide-react";

interface GeneralSettingsProps {
  siteName: string;
  contactEmail: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

const GeneralSettingsCard = ({ 
  siteName, 
  contactEmail, 
  onInputChange, 
  onSubmit, 
  isLoading 
}: GeneralSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações Gerais</CardTitle>
        <CardDescription>
          Configurações básicas da plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="siteName">Nome do Site</Label>
            <Input
              id="siteName"
              name="siteName"
              value={siteName}
              onChange={onInputChange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="contactEmail">Email de Contato</Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={contactEmail}
              onChange={onInputChange}
            />
          </div>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Salvar Configurações
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GeneralSettingsCard;
