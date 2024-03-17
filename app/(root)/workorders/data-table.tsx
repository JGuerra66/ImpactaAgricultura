"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  
} from "@/components/ui/table"
import * as React from "react"
import { Button } from "@/components/ui/button"
import Labour from "@/lib/mongodb/database/models/labour.model"
import Campaign from "@/lib/mongodb/database/models/campaign.model"
import Contractor from "@/lib/mongodb/database/models/contractor.model"
import Deposit from "@/lib/mongodb/database/models/deposit.model"
import Lot from "@/lib/mongodb/database/models/lot.model"
import { Activity } from "lucide-react"

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

interface DataTableProps<TData extends TableData, TValue> {
    
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends TableData, TValue>({
  columns,
  data,
}: DataTableProps<TData , TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({});
    const [filteredData, setFilteredData] = React.useState("")
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setFilteredData,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
          sorting,
          globalFilter:filteredData,
          columnVisibility,
        },
        
      })
  return (
    <div className="rounded-md border">
      <div className="flex items-center py-4">
          <Input
            placeholder="Filtrar"
            value={filteredData}
            onChange={(event) =>setFilteredData(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Table>
  <TableHeader>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          return (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          );
        })}
      </TableRow>
    ))}
  </TableHeader>
  <TableBody>
    {table.getRowModel().rows?.length ? (
      table.getRowModel().rows.map((row) => (
        <>
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            onClick={() =>
              setExpandedRows({
                ...expandedRows,
                [row.id]: !expandedRows[row.id],
              })
            }
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
          {expandedRows[row.id] && (
            <TableRow>
              <TableCell colSpan={columns.length}>
                {/* Aquí puedes renderizar los datos adicionales */}
                <div>
                  <div><strong>Name:</strong> {row.original.name}</div>
                  <div><strong>Activity:</strong> {row.original.activity.name}</div>
                  <div><strong>Campaign:</strong> {row.original.campaign.name}</div>
                  <div><strong>Labour:</strong> {row.original.labour.name}</div>
                  <div><strong>Contractor:</strong> {row.original.contractor.name}</div>
                  <div><strong>Date:</strong> {row.original.date}</div>
                  <div><strong>Status:</strong> {row.original.status}</div>
                  <div><strong>Lot:</strong> {row.original.lot.name}</div>
                  <div><strong>Hectareas:</strong> {row.original.hectareas}</div>
                  <div><strong>Used Products:</strong>
                    {row.original.usedProducts.map((usedProduct, index) => (
                      <div key={index}>
                        Nombre: {usedProduct.product.name}, 
                        Cantidad Total: {usedProduct.quantity}, 
                        Unidad: {usedProduct.unit}, 
                        Dosis: {usedProduct.dose}, 
                        Valor unitario: {usedProduct.valuePerUnit}
                      </div>
                    ))}
                    <div><strong>Valor Total de Productos:</strong>
                      {row.original.usedProducts.reduce((total, usedProduct) => total + usedProduct.quantity * usedProduct.valuePerUnit, 0)}
                    </div>
                  </div>
                  <div><strong>Deposit:</strong> {row.original.deposit.name}</div>
                  <div><strong>Total Cost:</strong> {row.original.totalCost}</div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>
    </div>
  )
}