"use client"
import { useUser, useOrganization } from "@clerk/nextjs";
import { columns } from "./columns";
import { Product, ProductStock } from "@/types";
import { DataTable } from "./data-table";
import { getAllProductStocks } from "@/lib/actions/productStock.actions";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WorkOrder, { IWorkOrder, usedProductsSubSchema } from "@/lib/mongodb/database/models/workOrder.model";
import { DatePicker } from "@/components/shared/DatePicker";
import { getPendingWorkOrdersBeforeDate } from "@/lib/actions/workOrder.actions";

interface usedProduct {
  product: Product;
  dose: number;
  quantity: number;
  valuePerUnit: number;
  unit: string;
}




export default function Page() {
  const { user } = useUser();
  const { organization } = useOrganization();
  const orgId = organization?.id;
  
  const [data, setData] = useState<ProductStock[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    getAllProductStocks(orgId? orgId : '')
      .then(res => {
        if (!res) {
          throw new Error('No response received');
        }
        return res.data;
      })
      .then(async (productStocks) => {
        const workOrders = await getPendingWorkOrdersBeforeDate(orgId ?? '', selectedDate);
        console.log('WorkOrders:', workOrders);
  
        
        const totalUsedProductsMap: { [key: string]: number } = {};
        workOrders.forEach((workOrder: IWorkOrder) => {
          workOrder.usedProducts.forEach((usedProduct: usedProductsSubSchema) => {
            const key: string = `${usedProduct.product}-${workOrder.deposit}`;
            totalUsedProductsMap[key] = (totalUsedProductsMap[key] || 0) + usedProduct.quantity;
          });
        });
  
        const updatedProductStocks: ProductStock[] = productStocks.map((productStock: ProductStock) => {
          // Use the map to get the total used products for this productStock
          const key = `${productStock.productId._id}-${productStock.depositId._id}`;
          const totalUsedProducts = totalUsedProductsMap[key] || 0;
  
          const volatileStock: number = productStock.currentStock - totalUsedProducts;
          return { ...productStock, volatileStock };
        });
  
        setData(updatedProductStocks);
        console.log('ProductStocks:', updatedProductStocks);
      })
      .catch(err => console.error(err));
  }, [organization, selectedDate]);

  
  return (
    <div>
      <DatePicker selected={selectedDate} onSelect={setSelectedDate} />
      <DataTable columns={columns} data={data} />
      <Link href="/stockhistory/create">
        <Button variant="default" size="default">Crear Movimiento</Button>
      </Link>
    </div>
  );
}