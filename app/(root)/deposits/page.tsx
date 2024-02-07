"use client"
import { useUser, useOrganization } from "@clerk/nextjs";
import { columns } from "./columns"; 
import { Deposit} from "@/types"; 
import { DataTable } from "./data-table"; 

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllDeposits } from "@/lib/actions/deposit.actions";

export default function DemoPage() {
  
  const { user } = useUser();
  const { organization } = useOrganization();
  
  const userId = user?.id;
  const orgId = organization?.id;

  const [data, setData] = useState<Deposit[]>([]);

  useEffect(() => {
    const fetchdeposit = async () => {
      if (orgId) {
        const deposit = await getAllDeposits(orgId);
        setData(deposit);
      }
    };

    fetchdeposit();
  }, [orgId]);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <Link href="/deposits/create">
        <Button variant="default" size="default">Crear Deposito</Button>
      </Link>
    </div>
  )
}