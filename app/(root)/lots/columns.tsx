import { LotDeleteConfirmation } from "@/components/shared/LotDeleteConfirmation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ILot } from "@/lib/mongodb/database/models/lot.model"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Link } from "lucide-react"
import Image from 'next/image'

export const columns: ColumnDef<ILot>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre del Lote
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "deposit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre del Deposito
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
 
  {
    id: "actions",
    cell: ({ row }) => {
      const lot = row.original
  
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>...</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href={`/lots/${lot._id}/update`}>
                <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                </Link>Actualizar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><LotDeleteConfirmation lotId={lot._id}/>Borrar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          </div>
        </>
      )
    },
  }
]