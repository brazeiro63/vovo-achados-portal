
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/sonner";
import { Lock } from "lucide-react";

type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ChangePasswordFormValues>();
  
  const newPassword = watch("newPassword", "");
  
  const onSubmit = async (data: ChangePasswordFormValues) => {
    if (!user) {
      toast.error("Você precisa estar logado para alterar a senha");
      navigate("/login");
      return;
    }
    
    if (data.newPassword !== data.confirmPassword) {
      setError("As novas senhas não conferem.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Primeiro verifica a senha atual
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email || "",
        password: data.currentPassword,
      });
      
      if (signInError) {
        setError("Senha atual incorreta.");
        setIsLoading(false);
        return;
      }
      
      // Atualiza para a nova senha
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });
      
      if (error) {
        setError(error.message);
        toast.error("Falha ao atualizar senha.");
      } else {
        toast.success("Senha alterada com sucesso!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      setError("Ocorreu um erro ao alterar sua senha. Por favor tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Alterar senha
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Atualize a senha da sua conta
          </p>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Senha atual</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="currentPassword"
                  type="password"
                  className="pl-10"
                  {...register("currentPassword", { required: "Senha atual é obrigatória" })}
                />
              </div>
              {errors.currentPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="newPassword"
                  type="password"
                  className="pl-10"
                  {...register("newPassword", { 
                    required: "Nova senha é obrigatória",
                    minLength: {
                      value: 6,
                      message: "A senha deve ter pelo menos 6 caracteres"
                    }
                  })}
                />
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirme a nova senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="confirmPassword"
                  type="password"
                  className="pl-10"
                  {...register("confirmPassword", { 
                    required: "Confirmação de senha é obrigatória",
                    validate: value => value === newPassword || "As senhas não conferem"
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline"
              className="flex-1" 
              onClick={() => navigate("/dashboard")}
            >
              Cancelar
            </Button>
            
            <Button 
              type="submit" 
              className="flex-1" 
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
