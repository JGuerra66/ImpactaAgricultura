"use client"

import { ColumnDef } from "@tanstack/react-table"


import { Deposit } from "@/types"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"


export const columns: ColumnDef<Deposit>[] = [
  {
    accessorKey: "name",
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
    accessorKey: "depositLocation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ubicación
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
},
{
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
},
]
