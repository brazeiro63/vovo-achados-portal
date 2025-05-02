
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

export const useAdminUsers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Fetch all users
  const usersQuery = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      // We need to join the auth.users and public.profiles tables
      // But since we can't directly query auth.users from client, we'll get what we can from profiles
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) {
        console.error("Error fetching users:", error);
        toast.error("Falha ao carregar usuários");
        throw new Error("Failed to fetch users");
      }
      
      // Ensure the role property is available or set a default
      const processedProfiles = profiles.map(profile => {
        return {
          ...profile,
          role: profile.role || 'user' // Ensure role has a default value if not present
        } as UserProfile;
      });
      
      return processedProfiles;
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
      
      // Ensure role is set properly in the returned data
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
  
  // Delete user (this doesn't actually delete the auth user, just their profile)
  // In a real app, you might want to use Supabase admin functions to fully delete the user
  const deleteUser = async (id: string) => {
    setIsSubmitting(true);
    try {
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
