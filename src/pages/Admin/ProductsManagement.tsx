
import { useState } from "react";
import { useAdminProducts, ProductFormData } from "@/hooks/useAdminProducts";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash, Plus } from "lucide-react";
import { Product } from "@/hooks/useProducts";

const ProductsManagement = () => {
  const { products, isLoading, isSubmitting, createProduct, updateProduct, deleteProduct } = useAdminProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    image: "",
    store: "",
    url: "",
    color: "",
    category: "",
    price: 0,
    preco_de: null
  });

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Tratar o campo de preço para garantir formato correto de número
    if (name === 'price' || name === 'preco_de') {
      // Substituir vírgula por ponto e converter para número
      const numericValue = value === '' ? null : parseFloat(value.replace(',', '.')) || 0;
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddNewClick = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      image: "",
      store: "",
      url: "",
      color: "",
      category: "",
      price: 0,
      preco_de: null
    });
    setIsDialogOpen(true);
  };
  
  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      image: product.image,
      store: product.store,
      url: product.url,
      color: product.color,
      category: product.category,
      price: product.price || 0,
      preco_de: product.preco_de
    });
    setIsDialogOpen(true);
  };
  
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      updateProduct({ ...editingProduct, ...formData });
    } else {
      createProduct(formData);
    }
    
    setIsDialogOpen(false);
  };
  
  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setIsDeleteDialogOpen(false);
    }
  };

  // Formatação de preço em BRL
  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return "-";
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Gerenciar Produtos</h2>
          <p className="text-sm text-gray-500">
            Adicione, edite ou remova produtos da plataforma.
          </p>
        </div>
        <Button onClick={handleAddNewClick}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">Carregando produtos...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum produto encontrado</p>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Preço De</TableHead>
                <TableHead>Loja</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Cor</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>{formatPrice(product.preco_de)}</TableCell>
                  <TableCell>{product.store}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEditClick(product)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDeleteClick(product)}>
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Product Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Título
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Preço (R$)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price ?? ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="preco_de" className="text-right">
                  Preço De (R$)
                </Label>
                <Input
                  id="preco_de"
                  name="preco_de"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.preco_de ?? ''}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Preço original (opcional)"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  URL da Imagem
                </Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="store" className="text-right">
                  Loja
                </Label>
                <Input
                  id="store"
                  name="store"
                  value={formData.store}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                  URL do Produto
                </Label>
                <Input
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Categoria
                </Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">
                  Cor (Seção)
                </Label>
                <Select
                  value={formData.color}
                  onValueChange={(value) => handleSelectChange("color", value)}
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione a seção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Lar Doce Lar</SelectItem>
                    <SelectItem value="infantil">Mundo Mágico Infantil</SelectItem>
                    <SelectItem value="empreendedorismo">Oficina Criativa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o produto "{productToDelete?.title}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductsManagement;
