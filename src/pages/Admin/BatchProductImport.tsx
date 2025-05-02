
import { useState } from "react";
import { useBatchProductImport } from "@/hooks/useBatchProductImport";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ProductFormData } from "@/hooks/useAdminProducts";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const BatchProductImport = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validatedProducts, setValidatedProducts] = useState<ProductFormData[] | null>(null);
  
  const { importProducts, isSubmitting, isError, error } = useBatchProductImport();

  const validateJson = () => {
    setValidationError(null);
    setValidatedProducts(null);
    
    try {
      // Try to parse the JSON input
      const parsed = JSON.parse(jsonInput);
      
      // Check if it's an array
      if (!Array.isArray(parsed)) {
        setValidationError("O formato JSON deve ser um array de produtos");
        return;
      }
      
      // Check if all required fields are present in each product
      const requiredFields = ["title", "image", "store", "url", "category", "color"];
      const invalidProducts = parsed.filter(
        product => !requiredFields.every(field => product[field])
      );
      
      if (invalidProducts.length > 0) {
        setValidationError(`${invalidProducts.length} produtos não possuem todos os campos obrigatórios`);
        return;
      }
      
      // Set validated products
      setValidatedProducts(parsed as ProductFormData[]);
    } catch (error) {
      setValidationError("JSON inválido. Por favor, verifique o formato");
    }
  };

  const handleImport = () => {
    if (validatedProducts) {
      importProducts(validatedProducts);
    }
  };

  const getSampleJson = () => {
    const sample = [
      {
        "title": "Produto de Exemplo 1",
        "image": "https://exemplo.com/imagem1.jpg",
        "store": "amazon",
        "url": "https://exemplo.com/produto1",
        "category": "Brinquedos",
        "color": "infantil"
      },
      {
        "title": "Produto de Exemplo 2",
        "image": "https://exemplo.com/imagem2.jpg",
        "store": "mercado livre",
        "url": "https://exemplo.com/produto2",
        "category": "Decoração",
        "color": "casa"
      }
    ];
    
    return JSON.stringify(sample, null, 2);
  };

  const handleSampleClick = () => {
    setJsonInput(getSampleJson());
    setValidationError(null);
    setValidatedProducts(null);
  };

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Importar Produtos em Lote</h2>
        <p className="text-sm text-gray-500">
          Cole a lista de produtos em formato JSON para importar vários produtos de uma vez.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="json-input" className="text-sm font-medium">
              Dados JSON dos produtos
            </label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSampleClick}
            >
              Ver Exemplo
            </Button>
          </div>
          
          <Textarea
            id="json-input"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='[{"title": "Nome do Produto", "image": "URL da imagem", ...}]'
            className="min-h-[300px] font-mono"
          />
          
          <p className="text-xs text-gray-500">
            Cada produto deve incluir os campos: title, image, store, url, category e color.
          </p>
        </div>

        {validationError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}

        {validatedProducts && (
          <Alert variant="success" className="bg-green-50 border-green-300">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertDescription>
              {`${validatedProducts.length} produtos validados e prontos para importação.`}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-4">
          <Button onClick={validateJson} disabled={!jsonInput.trim() || isSubmitting}>
            Validar JSON
          </Button>
          
          <Button 
            onClick={handleImport} 
            disabled={!validatedProducts || isSubmitting}
            variant="default"
          >
            {isSubmitting ? 'Importando...' : 'Importar Produtos'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default BatchProductImport;
