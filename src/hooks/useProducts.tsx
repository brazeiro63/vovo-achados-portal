
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Product = Tables<"products">;

/**
 * Hook to fetch products from the database with optional filtering by category and color
 */
export function useProducts(options?: { category?: string; color?: string }) {
  return useQuery({
    queryKey: ["products", options?.category, options?.color],
    queryFn: async () => {
      let query = supabase.from("products").select("*");
      
      if (options?.category) {
        query = query.eq("category", options.category);
      }
      
      if (options?.color) {
        query = query.eq("color", options.color);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
      }
      
      return data as Product[];
    },
  });
}
