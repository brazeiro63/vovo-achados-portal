
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/hooks/useProducts";
import { toast } from "@/components/ui/sonner";

export type ProductFormData = Omit<Product, 'id' | 'created_at' | 'updated_at' | 'store_id'>;

export const useAdminProducts = (storeFilter?: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Fetch products with optional store filtering
  const productsQuery = useQuery({
    queryKey: ["admin-products", storeFilter],
    queryFn: async () => {
      let query = supabase.from("products").select("*");
      
      if (storeFilter) {
        query = query.eq("store_id", storeFilter);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching products:", error);
        toast.error("Falha ao carregar produtos");
        throw new Error("Failed to fetch products");
      }
      
      return data as Product[];
    },
  });

  // Create a new product
  const createProduct = async (productData: ProductFormData) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success("Produto adicionado com sucesso");
      return data as Product;
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Falha ao adicionar produto");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Update an existing product
  const updateProduct = async ({ id, ...productData }: Product) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success("Produto atualizado com sucesso");
      return data as Product;
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Falha ao atualizar produto");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Delete a product
  const deleteProduct = async (id: string) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success("Produto excluído com sucesso");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Falha ao excluir produto");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create mutations
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    }
  });
  
  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    }
  });

  return {
    products: productsQuery.data || [],
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    isSubmitting,
    createProduct: createMutation.mutate,
    updateProduct: updateMutation.mutate,
    deleteProduct: deleteMutation.mutate,
  };
};
