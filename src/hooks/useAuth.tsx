
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
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Verify user role when session changes
        if (currentSession?.user) {
          checkUserRole(currentSession.user.id);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    const getInitialSession = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Initial session check:", currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Check user role on initialization
        if (currentSession?.user) {
          checkUserRole(currentSession.user.id);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Clean up the listener when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUserRole = async (userId: string) => {
    try {
      // Query the profiles table to check if the user is an admin
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error("Error fetching user profile:", error);
        setIsAdmin(false);
        return;
      }
      
      // Safely check if the data has a role property and if it's 'admin'
      const profile = data as any;
      setIsAdmin(profile && profile.role === 'admin');
    } catch (err) {
      console.error("Exception when checking user role:", err);
      setIsAdmin(false);
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out...");
      // Clear state first to prevent UI flashes
      setSession(null);
      setUser(null);
      setIsAdmin(false);
      
      // Then call Supabase signOut
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error during sign out:", error);
        throw error;
      }
      
      console.log("Sign out successful");
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
