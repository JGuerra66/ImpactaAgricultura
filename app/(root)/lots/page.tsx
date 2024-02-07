"use client"
import { useUser, useOrganization } from "@clerk/nextjs";
import { columns } from "./columns"; 
import { Lot } from "@/types"; 
import { DataTable } from "./data-table"; 
import { getAllLots } from "../../../lib/actions/lots.actions"; 
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DemoPage() {
  
  const { user } = useUser();
  const { organization } = useOrganization();
  
  const userId = user?.id;
  const orgId = organization?.id;

  const [data, setData] = useState<Lot[]>([]);

  useEffect(() => {
    const fetchLots = async () => {
      if (orgId) {
        const lots = await getAllLots(orgId);
        setData(lots);
      }
    };

    fetchLots();
  }, [orgId]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <Link href="/lots/create">
        <Button variant="default" size="default">Crear Lote</Button>
      </Link>
    </div>
  )
}