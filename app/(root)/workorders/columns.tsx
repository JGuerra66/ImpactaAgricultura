"use client"

import { ColumnDef } from "@tanstack/react-table";
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
import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation";
import { executeWorkOrder } from "@/lib/actions/workOrder.actions";


export const columns: ColumnDef<WorkOrderFormData>[] = [
    {
        accessorKey: 'name',
        header: 'Nombre',
    }
    ,
    {
        accessorKey: 'deposit.name',
        header: 'Depósito',
    }
    ,
    {
        accessorKey: 'date',
        header: 'Fecha',
    },
    {
        accessorKey: 'status',
        header: 'Estado',
    },
    {
        accessorKey: 'labour.name',
        header: 'Trabajo',
    },
    {
        accessorKey: 'activity.name',
        header: 'Actividad',
    },
    {
        accessorKey: 'lot.name',
        header: 'Lote',
    },
    {
        header: 'Productos utizados',
        accessorKey: 'usedProducts',}, 


        {
          id: "actions",
          cell: ({ row }) => {
            const workOrder = row.original;
            const router = useRouter();
        
            const handleEditClick = () => {
              router.push(`/workorders/${workOrder._id}`);
            };
        
            const handleExecuteClick = async () => {
              await executeWorkOrder(workOrder._id);
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