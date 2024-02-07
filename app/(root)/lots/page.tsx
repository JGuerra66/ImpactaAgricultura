"use client"
import { useUser, useOrganization } from "@clerk/nextjs";
import { columns } from "./columns"; 
import { Lot } from "@/types"; 
import { DataTable } from "./data-table"; 
import { getAllLots } from "../../../lib/actions/lots.actions"; 
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DemoPage() {
  const [data, setData] = React.useState<Lot[]>([]);
  const { user } = useUser();
  const { organization } = useOrganization();
  
  const userId = user?.id;
  const orgId = organization?.id;

  React.useEffect(() => {
    if (orgId) { 
      getAllLots(orgId).then(response => {
        if (response) {
          setData(response.data)
        } else {
          console.error('getAllLots did not return a response')
        }
      }).catch(console.error)
    }
  }, [orgId]) 

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <Link href="/lots/create">
        <Button variant="default" size="default">Crear Lote</Button>
      </Link>
    </div>
  )
}