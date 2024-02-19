"use client"
import { useUser, useOrganization } from "@clerk/nextjs";
import { columns } from "./columns";
import { Product, ProductStock } from "@/types";
import { DataTable } from "./data-table";
import { getAllProductStocks } from "@/lib/actions/productStock.actions";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const { user } = useUser();
  const { organization } = useOrganization();
  const orgId = organization?.id;
  
  const [data, setData] = useState<ProductStock[]>([]);

  useEffect(() => {
    getAllProductStocks(orgId? orgId : '')
  .then(res => {
    if (!res) {
      throw new Error('No response received');
    }
    console.log(res.data);
    return res.data;
    
  })
  .then(data => setData(data))
  .catch(err => console.error(err));
  }, [organization]);

  return (
    <div>
      <DataTable columns={columns} data={data} />
      <Link href="/stockhistory/create">
        <Button variant="default" size="default">Crear Movimiento</Button>
      </Link>
    </div>
  )
}