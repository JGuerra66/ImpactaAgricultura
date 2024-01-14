import LotsForm from '@/components/shared/LotsForm';
import { getLotById } from '@/lib/actions/lots.actions';
import { auth } from '@clerk/nextjs';

type UpdateLotProps = {
  params: {
    id: string
  }

}

const UpdateLot = async ({params:{id}}: UpdateLotProps) => {

    const lot = await getLotById(id);
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
  return (
    <><section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <h3 className="wrapper h3-bold text-center sm:text-left">Actualizar loto</h3>
      </section><div className="wrapper my-8">
              <LotsForm 
              userId={userId} 
              type="Update" 
              lot={lot} 
              lotId={lot._id} />
          </div></>
  )
}

export default UpdateLot