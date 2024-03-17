"use client"
import { useUser, useOrganization } from "@clerk/nextjs";
import { columns } from "./columns"; 
import { DataTable } from "./data-table"; 
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {getAllWorkOrders} from "@/lib/actions/workOrder.actions";
import { WorkOrderFormData } from "@/types";
import { getProductById } from "@/lib/actions/product.actions";
import { set } from "mongoose";
import WorkOrder from "@/lib/mongodb/database/models/workOrder.model";
import Campaign from "@/lib/mongodb/database/models/campaign.model";
import Contractor from "@/lib/mongodb/database/models/contractor.model";
import Deposit from "@/lib/mongodb/database/models/deposit.model";
import Labour from "@/lib/mongodb/database/models/labour.model";
import Lot from "@/lib/mongodb/database/models/lot.model";
import { Activity } from "lucide-react";

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

export default function Page() {
  const { user } = useUser();
  const { organization } = useOrganization();
  const orgId = organization?.id;
  
  
  const [data, setData] = useState<TableData[]>([]);

  useEffect(() => {
    getAllWorkOrders(orgId ? orgId : '')
      .then(res => {
        if (!res) {
          throw new Error('No response received');
        }
        
        return res.data;
      })
      .then(async data => {
        const transformedData = data.map((item: { usedProducts: { product: string; quantity: any; }[]; date: string | number | Date; }) => {
          const date = new Date(item.date);
          const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  
          return {
            ...item,
            date: formattedDate,
          };
        });
  
        setData(transformedData);
        console.log(transformedData);
      })
      .catch(err => console.error(err));
  }, [organization]);

  return (
    <div>
      <DataTable columns={columns} data={data} />
      <Link href="/workorders/create">
        <Button variant="default" size="default">Crear Orden de trabajo</Button>
      </Link>
    </div>
  )
}