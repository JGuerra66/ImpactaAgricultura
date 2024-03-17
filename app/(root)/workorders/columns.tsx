"use client"

import { Cell, CellContext, ColumnDef } from "@tanstack/react-table";
import { WorkOrderFormData } from "@/types";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Activity, ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation";
import { executeWorkOrder } from "@/lib/actions/workOrder.actions";
import Campaign from "@/lib/mongodb/database/models/campaign.model";
import Contractor from "@/lib/mongodb/database/models/contractor.model";
import Deposit from "@/lib/mongodb/database/models/deposit.model";
import Labour from "@/lib/mongodb/database/models/labour.model";
import Lot from "@/lib/mongodb/database/models/lot.model";
interface TableData {
  _id: string
  name: string
  activity: typeof Activity
  campaign: typeof Campaign
  labour: typeof Labour
  contractor: typeof Contractor
  date: string
  status: string
  lot: typeof Lot
  hectareas: number
  usedProducts: usedProducts[]
  deposit: typeof Deposit
  totalCost: number

}

interface usedProducts {
  product:{
    name: string
  }
  quantity: number
  unit: string
  dose: number
  valuePerUnit: number
}

export const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
},
{
    accessorKey: 'deposit.name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Depósito
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
},
{
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
},
{
  accessorKey: 'status',
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Estado
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    )
  },
  cell: ({ row }: CellContext<TableData, unknown>) => {
    const status = row.original.status;
    return (
      <div style={{ color: status === 'pendiente' ? 'red' : 'green' }}>
        {status}
      </div>
    )
  },
},
{
    accessorKey: 'labour.name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trabajo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
},
{
    accessorKey: 'activity.name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Actividad
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
},
{
    accessorKey: 'lot.name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lote
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
},
    {
      accessorKey: 'hectareas',
      header: 'Hectareas',
    },
    {
      accessorKey: 'totalCost',
      header: 'Costo total',
    },
    {
      accessorKey: 'contractor.name',
      header: 'Contratista',
    }
    ,
        {
          id: "actions",
          cell: ({ row }) => {
            const workOrder = row.original;
            const router = useRouter();

            const handleEditClick = () => {
              router.push(`/workorders/${workOrder._id}`);
            };

            const handleExecuteClick = async () => {
              await executeWorkOrder(workOrder._id ?? '');
              window.location.reload();
            };
        
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                  <DropdownMenuItem onClick={handleEditClick}>Editar</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExecuteClick}>Ejecutar</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Borrar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
        }
]