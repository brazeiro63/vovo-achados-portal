
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
  phone?: string | null;
  role: 'user' | 'admin';
  created_at?: string;
};

export const useAdminUsers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Fetch user profiles from the profiles table
  const usersQuery = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      try {
        // Get all profiles - RLS policies will ensure only appropriate profiles are returned
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*');
        
        if (error) {
          console.error("Error fetching profiles:", error);
          toast.error("Falha ao carregar usuários");
          throw error;
        }
        
        // Process profiles to ensure they have the expected structure
        const processedProfiles = profiles.map(profile => {
          return {
            ...profile,
            // Ensure role has a default value if not present
            role: profile.role === 'admin' ? 'admin' : 'user',
            email: profile.username, // Use username as email if email not available
          } as UserProfile;
        });
        
        return processedProfiles;
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
      console.log("Updating user profile:", profile);
      
      // Removendo campos que não existem na tabela profiles
      const { email, created_at, ...profileData } = profile;
      
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', profile.id)
        .select()
        .single();
        
      if (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
      
      // Process the returned profile
      const processedProfile = {
        ...data,
        role: data.role || 'user'
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
  
  // Delete user profile
  const deleteUser = async (id: string) => {
    setIsSubmitting(true);
    try {
      console.log("Deleting user profile:", id);
      // Delete the user's profile from the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);
        
      if (profileError) {
        console.error("Error deleting profile:", profileError);
        throw profileError;
      }
      
      toast.success("Usuário excluído com sucesso");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Falha ao excluir usuário. Você pode não ter permissões para esta ação.");
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
