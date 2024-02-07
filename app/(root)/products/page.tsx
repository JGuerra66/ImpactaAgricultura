"use client"
import { useUser, useOrganization } from "@clerk/nextjs";
import { columns } from "./columns";
import { Product } from "@/types";
import { DataTable } from "./data-table";
import { getAllProducts } from "../../../lib/actions/product.actions";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DemoPage() {
  const [data, setData] = React.useState<Product[]>([]);
  const { user } = useUser();
  const { organization } = useOrganization();
  
  const userId = user?.id;
  const orgId = organization?.id;

  React.useEffect(() => {
    if (orgId) { // Check if orgId is not undefined
      getAllProducts(orgId).then(response => {
        if (response) {
          setData(response.data)
        } else {
          console.error('getAllProducts did not return a response')
        }
      }).catch(console.error)
    }
  }, [orgId]) // Add orgId as a dependency

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <Link href="/products/create">
        <Button variant="default" size="default">Crear Producto</Button>
      </Link>
    </div>
  )
}