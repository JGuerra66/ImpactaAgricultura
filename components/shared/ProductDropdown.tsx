import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { IProduct } from "@/lib/mongodb/database/models/product.model"
  import { useEffect, useState } from "react"
  import { getAllProducts } from "@/lib/actions/product.actions"
  
  type ProductDropdownProps = {
    value?: string
    onChangeHandler?: (value: string) => void
  }
  
  const ProductDropdown = ({ value, onChangeHandler }: ProductDropdownProps) => {
    const [products, setProducts] = useState<IProduct[]>([])
  
    useEffect(() => {
      const getProducts = async () => {
        const productList = await getAllProducts()
        productList && setProducts(productList.data as IProduct[])
      }
  
      getProducts()
    }, [])
  
    return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Product" />
        </SelectTrigger>
        <SelectContent>
          {products.length > 0 &&
            products.map((product) => (
              <SelectItem
                key={product._id}
                value={product.name}
                className="select-item p-regular-14"
              >
                {product.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    )
  }
  
  export default ProductDropdown