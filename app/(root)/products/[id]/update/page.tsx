import ProductForm from '@/components/shared/ProductForm';
import { getProductById } from '@/lib/actions/product.actions';
import { auth } from '@clerk/nextjs';

type UpdateProductProps = {
  params: {
    id: string
  }

}

const UpdateProduct = async ({params:{id}}: UpdateProductProps) => {

    const product = await getProductById(id);
    const { userId, orgId } = auth();
  
    const user = userId as string;
    const org = orgId as string;
  return (
    <><section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <h3 className="wrapper h3-bold text-center sm:text-left">Actualizar Producto</h3>
      </section><div className="wrapper my-8">
              <ProductForm 
              userId={user}
              orgId={org} 
              type="Update" 
              product={product} 
              productId={product._id} />
          </div></>
  )
}

export default UpdateProduct