import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IProduct } from "@/lib/mongodb/database/models/product.model"
import { IDeposit } from "@/lib/mongodb/database/models/deposit.model" // Importa el tipo de depósito
import ProductStock, { IProductStock } from "@/lib/mongodb/database/models/productStock.model"; // Importa el tipo de stock de producto
import { useEffect, useState } from "react"

import { getAllProducts } from "@/lib/actions/product.actions"
import { getAllProductStocks } from "@/lib/actions/productStock.actions"

type ProductDropdownProps = {
  value?: string
  orgId: string
  deposit?: string 
  onChangeHandler: (value: string | null) => void;
}

const ProductDropdownv2 = ({ value, onChangeHandler, orgId, deposit }: ProductDropdownProps) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [productStocks, setProductStocks] = useState<IProductStock[]>([]) // Añade un estado para los stocks de productos

  useEffect(() => {
    const getProducts = async () => {
      const response = await getAllProducts(orgId);
      if (response && response.data) {
        const productList = response.data as IProduct[];
        setProducts(productList);
      }
    }

    const getStocks = async () => {
      if (deposit) {
        const response = await getAllProductStocks(orgId);
        if (response && response.data) {
          const stocks = response.data as IProductStock[];
          setProductStocks(stocks);
        }
      }
    }

    getProducts();
    getStocks();
  }, [deposit])

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Product" />
      </SelectTrigger>
      <SelectContent>
      {products.length > 0 && products.map((product) => {
  if (deposit) {
    // Encuentra el stock para este producto en el depósito
    const productStock = productStocks.find(stock => stock.productId === product._id && stock.depositId === deposit);
    console.log(productStock);
    const quantityInStock = productStock && productStock.currentStock ? productStock.currentStock : 0;
    const unit = product.unit ? product.unit.name : '';

    return (
      <SelectItem key={product._id} value={product._id} className="select-item p-regular-14">
        {product.name} - {quantityInStock} {unit} en stock
      </SelectItem>
    );
  } else {
    // Si no hay un depósito, solo muestra el nombre del producto
    return (
      <SelectItem key={product._id} value={product._id} className="select-item p-regular-14">
        {product.name}
      </SelectItem>
    );
  }
})}
      </SelectContent>
    </Select>
  )
}

export default ProductDropdownv2