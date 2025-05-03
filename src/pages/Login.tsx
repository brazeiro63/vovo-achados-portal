
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";

type LoginFormValues = {
  email: string;
  password: string;
};

type ResetPasswordFormValues = {
  email: string;
};

const Login = () => {
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>();

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors }
  } = useForm<ResetPasswordFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error) {
        setLoginError(error.message);
        toast.error("Falha ao fazer login. Verifique suas credenciais.");
      } else {
        toast.success("Login realizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setLoginError("Ocorreu um erro durante o login. Por favor tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const onResetPasswordSubmit = async (data: ResetPasswordFormValues) => {
    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        console.error("Erro ao enviar email de recuperação:", error);
        toast.error("Não foi possível enviar o email de recuperação.");
      } else {
        toast.success("Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.");
        setIsResetDialogOpen(false);
      }
    } catch (error) {
      console.error("Erro ao solicitar recuperação de senha:", error);
      toast.error("Ocorreu um erro ao solicitar a recuperação de senha.");
    } finally {
      setResetLoading(false);
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
            Acesse sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Bem-vindo(a) de volta ao Achados da Vovó
          </p>
        </div>
        
        {loginError && (
          <Alert variant="destructive">
            <AlertDescription>{loginError}</AlertDescription>
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
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Senha</Label>
                <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-sm text-blue-600 p-0" type="button">
                      Esqueceu a senha?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Recuperar senha</DialogTitle>
                      <DialogDescription>
                        Insira seu email para receber um link de recuperação de senha.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitReset(onResetPasswordSubmit)}>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="reset-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <Input
                              id="reset-email"
                              className="pl-10"
                              placeholder="seu@email.com"
                              type="email"
                              {...registerReset("email", {
                                required: "Email é obrigatório",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Email inválido"
                                }
                              })}
                            />
                          </div>
                          {resetErrors.email && (
                            <p className="text-red-500 text-xs mt-1">{resetErrors.email.message}</p>
                          )}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={resetLoading}>
                          {resetLoading ? "Enviando..." : "Enviar link de recuperação"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password", { required: "Senha é obrigatória" })}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Crie uma aqui.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
