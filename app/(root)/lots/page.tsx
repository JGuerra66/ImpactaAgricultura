'use client'
import { columns } from "./columns"
import { Lot } from "@/types"
import { DataTable } from "./data-table"
import { getAllLots } from "../../../lib/actions/lots.actions"
import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DemoPage() {
  const [data, setData] = React.useState<Lot[]>([])

  React.useEffect(() => {
    getAllLots().then(response => {
      if (response) {
        setData(response.data)
      } else {
        console.error('getAllLots did not return a response')
      }
    }).catch(console.error)
  }, [])

  return (
    <div className="container mx-auto py-10">
      
      <Link href="/lots/create">
        <Button variant="default" size="default">Crear Lote</Button>
      </Link>
    </div>
    //<DataTable columns={columns} data={data} />
  )
}