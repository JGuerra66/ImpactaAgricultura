
import StockMovementForm from '@/components/shared/StockMovementForm';
import { auth } from '@clerk/nextjs';

const CreateStockMovement = () => {
  const { userId, orgId } = auth();
  
  const user = userId as string;
  const org = orgId as string;
  return (
    <><section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <h3 className="wrapper h3-bold text-center sm:text-left">Registrar Movimiento de Stock</h3>
      </section><div className="wrapper my-8">
              <StockMovementForm userId={user} orgId={org} type="Create" />
          </div></>
  )
}

export default CreateStockMovement