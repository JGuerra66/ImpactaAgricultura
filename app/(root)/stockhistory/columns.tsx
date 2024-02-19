"use client"

import { ColumnDef } from "@tanstack/react-table";
import { StockMovement } from "@/types";


export const columns: ColumnDef<StockMovement>[] = [
    {
        accessorKey: 'productId',
        header: 'Producto',
    }
    ,
    {
        accessorKey: 'quantity',
        header: 'Cantidad',
    }
    ,
    {
        accessorKey: 'depositId',
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