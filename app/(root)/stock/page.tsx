"use client"
import { useUser, useOrganization } from "@clerk/nextjs";
import { columns } from "./columns";
import { Product, ProductStock } from "@/types";
import { DataTable } from "./data-table";
import { getAllProductStocks } from "@/lib/actions/productStock.actions";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Añade la función flattenData aquí
function flattenData(data: ProductStock[]): any[] {
  return data.map(item => ({
    productName: item.productId?.name,
    currentStock: item.currentStock,
    projectedStock: item.projectedStock,
    depositName: item.depositId?.name,
    unitName: item.unit?.name,
  }));
}

export default function DemoPage() {
  const [data, setData] = React.useState<any[]>([]); // Actualiza el tipo de estado a any[]
  const [isLoading, setIsLoading] = React.useState(true); // Add isLoading state
  const { user } = useUser();
  const { organization } = useOrganization();
  
  const userId = user?.id;
  const orgId = organization?.id;

  const fetchData = async () => {
    if (orgId) { // Check if orgId is not undefined
      try {
        const response = await getAllProductStocks(orgId);
        console.log(response)
        if (response) {
          const flattenedData = flattenData(response.data); // Aplana los datos antes de establecer el estado
          setData(flattenedData)
        } else {
          console.error('getAllProductsStocks did not return a response')
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set isLoading to false after data is fetched
      }
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [orgId])

  if (isLoading) { // If data is loading, render a loading message
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}