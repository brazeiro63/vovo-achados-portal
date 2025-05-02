
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, Save, Calendar } from 'lucide-react';
import { useCreateBlogPost, useUpdateBlogPost } from '@/hooks/useBlogPosts';
import { BlogPost } from '@/hooks/useBlogPosts';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  slug: z.string().optional(),
  excerpt: z.string().min(10, 'O resumo deve ter pelo menos 10 caracteres'),
  content: z.string().min(50, 'O conteúdo deve ter pelo menos 50 caracteres'),
  image: z.string().url('A URL da imagem deve ser válida'),
  category: z.string().min(1, 'Selecione uma categoria'),
  isPublished: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

const BlogPostForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;
  
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image: '',
      category: '',
      isPublished: false,
    },
  });

  const { formState } = form;
  const [isLoading, setIsLoading] = React.useState(isEditMode);
  
  // Carregar dados do post se estiver no modo de edição
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        form.reset({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          image: data.image,
          category: data.category,
          isPublished: !!data.published_at,
        });
      } catch (error) {
        console.error('Erro ao carregar post:', error);
        toast({
          title: 'Erro ao carregar post',
          description: 'Não foi possível carregar os dados do post.',
          variant: 'destructive',
        });
        navigate('/admin/blog');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isEditMode) {
      fetchPost();
    } else {
      setIsLoading(false);
    }
  }, [id, navigate, form, toast]);
  
  const onSubmit = async (data: FormData) => {
    try {
      if (isEditMode && id) {
        // Modo de edição
        const postData: Partial<BlogPost> & { id: string } = {
          id,
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          image: data.image,
          category: data.category,
          slug: data.slug || undefined,
        };
        
        // Atualizar status de publicação
        if (data.isPublished) {
          postData.published_at = new Date().toISOString();
        } else {
          postData.published_at = null;
        }
        
        await updatePost.mutateAsync(postData);
      } else {
        // Modo de criação
        const postData = {
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          image: data.image,
          category: data.category,
          slug: data.slug || undefined,
          published_at: data.isPublished ? new Date().toISOString() : null,
          author_id: (await supabase.auth.getUser()).data.user?.id,
        };
        
        await createPost.mutateAsync(postData);
      }
      
      navigate('/admin/blog');
    } catch (error) {
      console.error('Erro ao salvar post:', error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="mr-4" onClick={() => navigate('/admin/blog')}>
            <ChevronLeft size={16} className="mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">Carregando...</h1>
        </div>
        
        <Card className="p-6">
          <div className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-4" onClick={() => navigate('/admin/blog')}>
          <ChevronLeft size={16} className="mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">
          {isEditMode ? 'Editar Post' : 'Novo Post'}
        </h1>
      </div>

      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o título do post" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (opcional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="slug-personalizado (se vazio, será gerado automaticamente)" 
                        {...field} 
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resumo</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Um breve resumo do conteúdo do post" 
                      {...field} 
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Conteúdo completo do post" 
                      {...field} 
                      rows={15}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da imagem</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://exemplo.com/imagem.jpg" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                    >
                      <option value="" disabled>Selecione uma categoria</option>
                      <option value="Infantil">Infantil</option>
                      <option value="Empreendedorismo">Empreendedorismo</option>
                      <option value="Casa">Casa</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Publicar post</FormLabel>
                    <p className="text-sm text-gray-500">
                      Se marcado, o post ficará visível para todos os visitantes do site.
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                className="flex items-center"
                disabled={formState.isSubmitting || !formState.isValid}
              >
                {formState.isSubmitting ? (
                  <>Salvando...</>
                ) : (
                  <>
                    <Save className="mr-2" size={16} />
                    Salvar Post
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default BlogPostForm;
