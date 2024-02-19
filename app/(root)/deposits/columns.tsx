"use client"

import { ColumnDef } from "@tanstack/react-table"


import { Deposit } from "@/types"


export const columns: ColumnDef<Deposit>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "depositLocation",
    header: "Ubicación",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
]
