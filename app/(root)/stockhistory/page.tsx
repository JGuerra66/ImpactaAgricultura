"use client"
import { useUser, useOrganization } from "@clerk/nextjs";
import { columns } from "./columns"; 
import { DataTable } from "./data-table"; 
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {getAllStockMovements} from "@/lib/actions/stockMovement.actions";
import { StockMovement } from "@/types";

export default function Page() {
  const { user } = useUser();
  const { organization } = useOrganization();
  const orgId = organization?.id;
  
  const [data, setData] = useState<StockMovement[]>([]);

  useEffect(() => {
    getAllStockMovements(orgId? orgId : '')
  .then(res => {
    if (!res) {
      throw new Error('No response received');
    }

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