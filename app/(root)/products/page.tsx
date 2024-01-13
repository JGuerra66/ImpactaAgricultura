import { columns } from "./columns"
import { Product } from "@/types"
import { DataTable } from "./data-table"
 
async function getData(): Promise<Product[]> {
  // Fetch data from your API here.
  return [
    {
      _id: "dsadad4",
      name: "Product 1",
      category: { _id: "dsadad1", name: "Category 1" },
      unit: { _id: "sdad1", name: "Unit 1" },
      price: 10.00,
      description: "Product description",
      imageUrl: "product-image.jpg",
      creator: { _id: "id123", firstName: "John", lastName: "Doe" }
    },
    {
      _id: "dsadad5",
      name: "Product 2",
      category: { _id: "dsadad1", name: "Category 3" },
      unit: { _id: "sdad1", name: "Unit 1" },
      price: 10.00,
      description: "Product description",
      imageUrl: "product-image.jpg",
      creator: { _id: "id123", firstName: "John", lastName: "Doe" }
    },
    {
      _id: "dsadad6",
      name: "Product 3",
      category: { _id: "dsadad1", name: "Category 2" },
      unit: { _id: "sdad1", name: "Unit 1" },
      price: 10.00,
      description: "Product description",
      imageUrl: "product-image.jpg",
      creator: { _id: "id123", firstName: "John", lastName: "Doe" }
    }
   
  ]
}
 
export default async function DemoPage() {
  const data = await getData()
 
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}