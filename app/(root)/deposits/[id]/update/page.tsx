import DepositForm from '@/components/shared/DepositForm';
import { getDepositById } from '@/lib/actions/deposit.actions';
import { auth } from '@clerk/nextjs';

type UpdateDepositProps = {
  params: {
    id: string
  }
}

const UpdateDeposit = async ({params:{id}}: UpdateDepositProps) => {
    const deposit = await getDepositById(id);
    const { userId, orgId } = auth();
  
    const user = userId as string;
    const org = orgId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Actualizar Depósito</h3>
      </section>
      <div className="wrapper my-8">
        <DepositForm 
          userId={user}
          orgId={org} 
          type="Update" 
          deposit={deposit} 
          depositId={deposit._id} 
        />
      </div>
    </>
  )
}

export default UpdateDeposit