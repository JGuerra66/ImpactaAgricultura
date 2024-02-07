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
import { Lot } from "@/types" // Update this to your "Lot" type
import { LotDeleteConfirmation } from "@/components/shared/LotDeleteConfirmation" // Update this to your "LotDeleteConfirmation" component
import Link from "next/link"
import Image from 'next/image'

export const columns: ColumnDef<Lot>[] = [
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
          Establecimiento
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
              <DropdownMenuItem>
                <div onClick={(e) => e.stopPropagation()}>
                  <LotDeleteConfirmation lotId={lot._id}/>Borrar 
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          </div>
        </>
      )
    },
  }
]