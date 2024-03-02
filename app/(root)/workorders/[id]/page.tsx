
import ProductForm from '@/components/shared/ProductForm';
import WorkOrderForm from '@/components/shared/WorkOrderForm';
import { getProductById } from '@/lib/actions/product.actions';
import { getWorkOrderById } from '@/lib/actions/workOrder.actions';
import WorkOrder from '@/lib/mongodb/database/models/workOrder.model';
import { auth } from '@clerk/nextjs';

type UpdateWorkOrderProps = {
  params: {
    id: string
  }

}

const UpdateWorkOrder = async ({params:{id}}: UpdateWorkOrderProps) => {

    const workOrder = await getWorkOrderById(id);
    const { userId, orgId } = auth();
  
    const user = userId as string;
    const org = orgId as string;
  return (
    <><section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <h3 className="wrapper h3-bold text-center sm:text-left">Actualizar Orden de Trabajo</h3>
      </section><div className="wrapper my-8">
              <WorkOrderForm
              userId={user}
              orgId={org}
              initialData={workOrder}

               />
          </div></>
  )
}

export default UpdateWorkOrder