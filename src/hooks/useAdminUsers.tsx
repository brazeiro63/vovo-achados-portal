
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export type UserProfile = {
  id: string;
  email?: string;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  role: 'user' | 'admin';
  created_at?: string;
};

// Define a type for the raw profile data coming from the database
type RawProfile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: string | null;
  updated_at: string | null;
};

// Define a type for auth users to avoid 'never' type errors
type AuthUser = {
  id: string;
  email?: string;
  created_at?: string;
};

export const useAdminUsers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Fetch all users
  const usersQuery = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      // Obter todos os usuários do auth.users através de join com profiles
      // Como não podemos consultar diretamente auth.users do cliente, usaremos um endpoint personalizado
      // que busca informações adicionais de usuário da tabela profiles
      
      try {
        // Consultamos os perfis, que contêm as informações de usuário que podemos acessar
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*');
        
        if (error) {
          console.error("Error fetching users:", error);
          toast.error("Falha ao carregar usuários");
          throw new Error("Failed to fetch users");
        }
        
        if (!profiles) {
          return [] as UserProfile[];
        }
        
        // Garantimos que a propriedade role esteja disponível
        const processedProfiles = (profiles as RawProfile[]).map(profile => {
          return {
            ...profile,
            // Garantir que o papel tenha um valor padrão se não estiver presente
            role: profile.role === 'admin' ? 'admin' : 'user'
          } as UserProfile;
        });
        
        try {
          // Obtemos informações de usuário do Supabase Auth
          const { data, error: authError } = await supabase.auth.admin.listUsers();
          
          if (authError || !data || !data.users) {
            console.error("Error fetching auth users:", authError);
            return processedProfiles; // Retorna os perfis mesmo sem informações de autenticação
          }
          
          const authUsers = data.users as AuthUser[];
          
          // Combina os dados de perfil com informações de auth.users
          const enrichedProfiles = processedProfiles.map(profile => {
            const authUser = authUsers.find(user => user.id === profile.id);
            return {
              ...profile,
              email: authUser?.email,
              created_at: authUser?.created_at
            } as UserProfile;
          });
          
          return enrichedProfiles;
        } catch (authError) {
          console.error("Error processing auth users:", authError);
          return processedProfiles; // Retorna os perfis mesmo sem informações de autenticação
        }
      } catch (error) {
        console.error("Error in usersQuery:", error);
        toast.error("Falha ao carregar usuários");
        return [] as UserProfile[];
      }
    },
  });

  // Update user profile (admin can update roles)
  const updateUserProfile = async (profile: Partial<UserProfile> & { id: string }) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', profile.id)
        .select()
        .single();
        
      if (error) throw error;
      
      // Garantir que role esteja definido corretamente nos dados retornados
      const processedProfile = {
        ...data,
        // Garantir que o papel tenha um valor padrão se não estiver presente
        role: (data as any).role || 'user'
      } as UserProfile;
      
      toast.success("Perfil de usuário atualizado com sucesso");
      return processedProfile;
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Falha ao atualizar perfil de usuário");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Delete user (isso não exclui realmente o usuário de auth, apenas seu perfil)
  // Em um aplicativo real, você pode querer usar funções de administrador do Supabase para excluir completamente o usuário
  const deleteUser = async (id: string) => {
    setIsSubmitting(true);
    try {
      // Primeiro, tente excluir o usuário do sistema de autenticação
      const { error: authError } = await supabase.auth.admin.deleteUser(id);
      
      if (authError) {
        console.error("Error deleting auth user:", authError);
        toast.error("Falha ao excluir usuário do sistema de autenticação");
      }
      
      // Em seguida, exclua o perfil do usuário
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success("Usuário excluído com sucesso");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Falha ao excluir usuário");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create mutations
  const updateMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    }
  });

  return {
    users: usersQuery.data || [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    isSubmitting,
    updateUserProfile: updateMutation.mutate,
    deleteUser: deleteMutation.mutate,
  };
};
