"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import {Product, ProductStock} from "@/types"




// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ProductStock>[] = [
  {
    accessorKey: "product.name",
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
    header: "Stock Actual",
  },
  {
    accessorKey: "projectedStock",
    header: "Stock Proyectado",
  },
  {
    accessorKey: "deposit.name",
    header: "Depósito",
  },
  {
    accessorKey: "product.unit.name",
    header: "Unidad",
  },
  {
    accessorKey: "product.category.name",
    header: "Categoría",
  },
  
  ]