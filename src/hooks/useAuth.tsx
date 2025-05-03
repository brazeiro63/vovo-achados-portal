
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Configurar o listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Verificar role do usuário quando a sessão muda
        if (currentSession?.user) {
          checkUserRole(currentSession.user.id);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // Verificar se já existe uma sessão ativa
    const getInitialSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Verificar role do usuário na inicialização
      if (currentSession?.user) {
        checkUserRole(currentSession.user.id);
      }
      
      setLoading(false);
    };

    getInitialSession();

    // Limpar o listener ao desmontar o componente
    return () => subscription.unsubscribe();
  }, []);

  const checkUserRole = async (userId: string) => {
    try {
      // Query the profiles table to check if the user is an admin
      const { data, error } = await supabase
        .from('profiles')
        .select('*')  // Select all columns to ensure we get any that exist
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error("Error fetching user profile:", error);
        setIsAdmin(false);
        return;
      }
      
      // Safely check if the data has a role property and if it's 'admin'
      // Using optional chaining and type assertion to handle potential missing fields
      const profile = data as any;
      setIsAdmin(profile && profile.role === 'admin');
    } catch (err) {
      console.error("Exception when checking user role:", err);
      setIsAdmin(false);
    }
  };

  // Fixed signOut function to properly use the supabase client
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
        throw error;
      }
      // Clear local state after successful signout
      setSession(null);
      setUser(null);
      setIsAdmin(false);
    } catch (err) {
      console.error("Exception during sign out:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
