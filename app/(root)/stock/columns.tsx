"use client"

import { CellContext, ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import {ProductStock} from "@/types"




// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface TableData {
  _id: string
  productId: {
    _id: string
    name: string
  }
  unit: {
    _id: string
    name: string
  }
  currentStock: number;
  projectedStock: number;
  depositId: {
    _id: string
    name: string
  }
  userId: string
  orgId: string
  volatileStock: number;
}

export const columns: ColumnDef<TableData>[] = [
  
    {
      accessorKey: "productId.name",
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
      accessorKey: "currentStock",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock Actual
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
      accessorKey: "depositId.name",
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
      accessorKey: "unit.name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Unidad
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },

  {
    accessorKey: "volatileStock",
    header: "Stock a la fecha designada",
    cell: ({ row }: CellContext<TableData, unknown>) => {
        const volatileStock = row.original.volatileStock;
        return (
            <div style={{ color: volatileStock < 0 ? 'red' : 'black' }}>
                {volatileStock}
            </div>
        )
    },
}
  
  ]