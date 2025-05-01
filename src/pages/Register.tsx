
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/sonner";

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormValues>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setRegisterError(null);
    
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      
      if (error) {
        setRegisterError(error.message);
        toast.error("Falha ao criar conta. Verifique os dados informados.");
      } else {
        toast.success("Conta criada com sucesso! Verificação pode ser necessária.");
      }
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      setRegisterError("Ocorreu um erro durante o cadastro. Por favor tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Se o usuário já estiver logado, redireciona para o dashboard
  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Junte-se ao Achados da Vovó
          </p>
        </div>
        
        {registerError && (
          <Alert variant="destructive">
            <AlertDescription>{registerError}</AlertDescription>
          </Alert>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email", { 
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido"
                  }
                })}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                {...register("password", { 
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres"
                  }
                })}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                {...register("confirmPassword", { 
                  required: "Confirme sua senha",
                  validate: value => value === password || "As senhas não coincidem"
                })}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrar"}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Faça login aqui.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
