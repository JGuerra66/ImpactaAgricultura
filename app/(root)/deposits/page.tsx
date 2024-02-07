"use client"
import { useUser, useOrganization } from "@clerk/nextjs";
import { columns } from "./columns";
import { Deposit } from "@/types";
import { DataTable } from "./data-table";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllDeposits } from "@/lib/actions/deposit.actions";

export default function DemoPage() {
  const [data, setData] = React.useState<Deposit[]>([]);
  const { user } = useUser();
  const { organization } = useOrganization();
  
  const userId = user?.id;
  const orgId = organization?.id;

  React.useEffect(() => {
    if (orgId) { 
      getAllDeposits().then(response => {
        if (response) {
          setData(response.data)
        } else {
          console.error('getAllProducts did not return a response')
        }
      }).catch(console.error)
    }
  }, [orgId]) 

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <Link href="/products/create">
        <Button variant="default" size="default">Crear Deposito</Button>
      </Link>
    </div>
  )
}