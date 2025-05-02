
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { ProductFormData } from "@/hooks/useAdminProducts";

export const useBatchProductImport = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Function to import multiple products at once
  const importProducts = async (products: ProductFormData[]) => {
    setIsSubmitting(true);
    
    try {
      // Validate products before insertion
      if (!products.length) {
        throw new Error("Nenhum produto para importar");
      }

      // Make sure all required fields are present in each product
      const invalidProducts = products.filter(
        p => !p.title || !p.image || !p.store || !p.url || !p.category || !p.color
      );
      
      if (invalidProducts.length > 0) {
        throw new Error(`${invalidProducts.length} produtos não possuem todos os campos obrigatórios`);
      }

      // Insert products in batch
      const { data, error } = await supabase
        .from('products')
        .insert(products)
        .select();

      if (error) throw error;

      toast.success(`${products.length} produtos importados com sucesso`);
      return data;
    } catch (error: any) {
      console.error("Error importing products:", error);
      toast.error(`Falha ao importar produtos: ${error.message || "Erro desconhecido"}`);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const importMutation = useMutation({
    mutationFn: importProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    }
  });

  return {
    importProducts: importMutation.mutate,
    isSubmitting,
    isError: importMutation.isError,
    error: importMutation.error
  };
};
