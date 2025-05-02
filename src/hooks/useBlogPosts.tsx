
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

export type BlogPost = Tables<"blog_posts">;

// Hook para buscar todos os posts publicados (visível para todos)
export function usePublishedBlogPosts() {
  return useQuery({
    queryKey: ["published-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false })
        .is("published_at", "not.null")
        .lt("published_at", new Date().toISOString());

      if (error) {
        console.error("Erro ao buscar posts publicados:", error);
        throw new Error("Falha ao carregar posts");
      }

      return data as BlogPost[];
    },
  });
}

// Hook para buscar um post específico por slug (visível para todos se publicado)
export function usePublishedBlogPostBySlug(slug: string) {
  return useQuery({
    queryKey: ["published-blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .is("published_at", "not.null")
        .lt("published_at", new Date().toISOString())
        .single();

      if (error) {
        console.error(`Erro ao buscar post com slug ${slug}:`, error);
        throw new Error("Post não encontrado");
      }

      return data as BlogPost;
    },
    enabled: Boolean(slug),
  });
}

// Hook para buscar todos os posts (publicados e não publicados - apenas para admin)
export function useAllBlogPosts() {
  return useQuery({
    queryKey: ["all-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar todos os posts:", error);
        throw new Error("Falha ao carregar posts");
      }

      return data as BlogPost[];
    },
  });
}

// Hook para criar um novo post
export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (post: Omit<BlogPost, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .insert(post)
        .select()
        .single();

      if (error) {
        console.error("Erro ao criar post:", error);
        throw new Error("Falha ao criar post");
      }

      return data as BlogPost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["published-blog-posts"] });
      toast({
        title: "Post criado com sucesso!",
        description: "O novo post foi adicionado ao blog.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar post",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Hook para atualizar um post existente
export function useUpdateBlogPost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...post }: Partial<BlogPost> & { id: string }) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .update(post)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar post:", error);
        throw new Error("Falha ao atualizar post");
      }

      return data as BlogPost;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["all-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["published-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["published-blog-post", data.slug] });
      toast({
        title: "Post atualizado com sucesso!",
        description: "As alterações foram salvas.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar post",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Hook para excluir um post
export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);

      if (error) {
        console.error("Erro ao excluir post:", error);
        throw new Error("Falha ao excluir post");
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["published-blog-posts"] });
      toast({
        title: "Post excluído com sucesso!",
        description: "O post foi removido permanentemente.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao excluir post",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
