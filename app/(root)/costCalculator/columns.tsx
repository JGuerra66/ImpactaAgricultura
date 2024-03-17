"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ProductoDetalle } from "@/components/shared/CostCalculator";

export const columns: ColumnDef<ProductoDetalle>[] = [
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
    },
    {
        accessorKey: 'unit',
        header: 'Unidad',
    },
    {
        accessorKey: 'valuePerUnit',
        header: 'Valor por Unidad',
    },
    {
        accessorKey: 'totalUtilizado',
        header: 'Total',
    }
   
    
]