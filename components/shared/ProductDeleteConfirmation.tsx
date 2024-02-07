import { useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'



import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { deleteProduct } from '@/lib/actions/product.actions'

export const ProductDeleteConfirmation = ({ productId }: { productId: string }) => {
  const pathname = usePathname()
  const router = useRouter();
  let [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      await deleteProduct({ productId, path: pathname })
      router.refresh()
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={handleDelete}>
        <button>
          <Image src="/assets/icons/delete.svg" alt="edit" width={20} height={20} />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro que quieres borrar este producto?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            Esto borrara permanentemente el producto
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction>
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}