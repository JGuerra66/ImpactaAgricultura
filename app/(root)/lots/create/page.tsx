import LotsForm from '@/components/shared/LotsForm';
import { auth } from '@clerk/nextjs';

const CreateLots = () => {
  const { userId, orgId } = auth();
  
  const user = userId as string;
  const org = orgId as string;
  return (
    <><section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <h3 className="wrapper h3-bold text-center sm:text-left">Crear Lote</h3>
      </section><div className="wrapper my-8">
              <LotsForm userId={user} orgId={org} type="Create" />
          </div></>
  )
}

export default CreateLots