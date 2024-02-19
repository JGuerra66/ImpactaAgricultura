"use client"

import { ColumnDef } from "@tanstack/react-table";
import { StockMovement } from "@/types";


export const columns: ColumnDef<StockMovement>[] = [
    {
        accessorKey: 'productId.name',
        header: 'Producto',
    }
    ,
    {
        accessorKey: 'quantity',
        header: 'Cantidad',
    }
    ,
    {
        accessorKey: 'depositId.name',
        header: 'Depósito',
    }
    ,
    {
        accessorKey: 'movementType',
        header: 'Tipo de movimiento',
    } 
    ,
    {
        accessorKey: 'receipt',
        header: 'Recibo',
    }
    ,
    {
        accessorKey: 'concept',
        header: 'Concepto',
    }
]