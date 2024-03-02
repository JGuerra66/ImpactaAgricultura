import { useState, useEffect } from 'react';
import ProductDropdown from './ProductDropdown';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ProductLoaderSchema } from '@/lib/validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getAllProducts } from '@/lib/actions/product.actions'

type ProductLoaderProps = {
  orgId: string;
  usedProducts: any;
  setUsedProducts: any;
}

type ResponseType = {
  data: Product[];
};
type Unit = {
  _id: string;
  name: string;
}

type Product = {
  _id: string;
  name: string;
  quantity: number;
  unit: Unit;
}

const ProductLoader = ({orgId}:ProductLoaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]); 

  useEffect(() => {
    getAllProducts(orgId).then((response: ResponseType | undefined) => {
      if (response) {
        setAllProducts(response.data);
      }
    });
  }, []);

  function handleDelete(id: string) {
    setProducts(products.filter((product) => product._id !== id));
  }

  const form = useForm<z.infer<typeof ProductLoaderSchema>>({
    resolver: zodResolver(ProductLoaderSchema),
  })

  async function onSubmit(data: z.infer<typeof ProductLoaderSchema>) {
    const productDetails = allProducts.find(product => product._id === data.product);
    if (productDetails) {
      const productExists = products.some(product => product._id === productDetails._id);
      if (!productExists) {
        setProducts([...products, { ...productDetails, quantity: data.quantity }]);
      } else {
        alert('Este producto ya esta en la lista');
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <ProductDropdown onChangeHandler={field.onChange} value={field.value} orgId={orgId}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Cantidad" 
                    value={field.value} 
                    onChange={e => field.onChange(e.target.valueAsNumber)} 
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Añadir Producto</Button>
        {products.length === 0 ? (
              <p>Aun no hay elementos cargados</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}>Producto</th>
                    <th style={{ textAlign: 'center' }}>Cantidad</th>
                    <th style={{ textAlign: 'center' }}>Unidad</th>
                    <th style={{ textAlign: 'center' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td style={{ textAlign: 'center' }}>{product.name}</td>
                      <td style={{ textAlign: 'center' }}>{product.quantity}</td>
                      <td style={{ textAlign: 'center' }}>{product.unit.name}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button onClick={() => handleDelete(product._id)}>Borrar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
      </form>
    </Form>
  )
}

export default ProductLoader;