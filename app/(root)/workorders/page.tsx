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

export default function Page() {
  const { user } = useUser();
  const { organization } = useOrganization();
  const orgId = organization?.id;
  
  const [data, setData] = useState<WorkOrderFormData[]>([]);

  useEffect(() => {
    getAllWorkOrders(orgId ? orgId : '')
      .then(res => {
        if (!res) {
          throw new Error('No response received');
        }
  
        return res.data;
      })
      .then(async data => {
        const transformedData = await Promise.all(data.map(async (item: { usedProducts: { product: string; quantity: any; }[]; date: string | number | Date; }) => {
          const usedProducts = await Promise.all(item.usedProducts.map(async (product: { product: string; quantity: any; }) => {
            const productDetails = await getProductById(product.product);
            return `${productDetails.name}: ${product.quantity}`;
          }));
  
          const date = new Date(item.date);
          const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  
          return {
            ...item,
            date: formattedDate,
            usedProducts: usedProducts.join(', ')
          };
        }));
  
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