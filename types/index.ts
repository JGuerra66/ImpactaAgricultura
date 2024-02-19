// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
  }
  
  export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
  }
  
 
  
 
  
 
  
  // ====== URL QUERY PARAMS
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }

// ====== LOT PARAMS
export type CreateLotParams = {
  userId: string
  orgId: string
  lot: {
    name: string;
    deposit: string; // deposit is now a string
    kmzFile?: string; // kmzFile is optional
  }
  path: string
}

export type UpdateLotParams = {
  userId: string
  lot: {
    _id: string;
    name: string;
    deposit: string; // deposit is now a string
    kmzFile?: string; // kmzFile is optional
  }
  path: string
}

export type DeleteLotParams = {
  lotId: string
  path: string
}

export type GetAllLotsParams = {
  query: string
  limit: number
  page: number
}

export type Lot = {
  _id: string
  name: string;
  deposit: string; // deposit is now a string
  kmzFile?: string; // kmzFile is optional
  userId: string;
  orgId: string;
}
// ====== ACTIVITY PARAMS
export type CreateActivityParams = {
  activityName: string
}

// ====== CONTRACTOR PARAMS
export type CreateContractorParams = {
  contractorName: string
}


import { Types } from 'mongoose';

// ====== STOCK MOVEMENT HISTORY PARAMS
export type CreateStockMovementHistoryParams = {
  userId: string
  stockMovementHistory: {
    date: Date;
    product: Types.ObjectId;
    quantity: number;
    typeOfMovement: string;
    receipt?: string;
    origin?: Types.ObjectId;
    destiny?: Types.ObjectId;
  }
  path: string
}

export type UpdateStockMovementHistoryParams = {
  userId: string
  stockMovementHistory: {
    _id: string;
    date: Date;
    product: Types.ObjectId;
    quantity: number;
    typeOfMovement: string;
    receipt?: string;
    origin?: Types.ObjectId;
    destiny?: Types.ObjectId;
  }
  path: string
}

export type DeleteStockMovementHistoryParams = {
  stockMovementHistoryId: string
  path: string
}

export type GetAllStockMovementHistoriesParams = {
  query: string
  limit: number
  page: number
}

export type StockMovementHistory = {
  _id: string
  date: Date;
  product:  {
    _id: string
    name: string 
  }
  quantity: number;
  typeOfMovement: string;
  receipt?: string;
  origin?:  {
    _id: string
    name: string 
  }
  destiny?:  {
    _id: string
    name: string 
  }
  creator: {
    _id: string
    firstName: string
    lastName: string
  }
}

// ====== DEPOSIT PARAMS
export type CreateDepositParams = {
  userId: string
  orgId: string
  deposit: {
    name: string;
    depositLocation: string;
    type: string;
  }
  path: string
}

export type UpdateDepositParams = {
  deposit: {
    _id: string;
    name: string;
    depositLocation: string;
    type: string;
  }
  path: string
}

export type DeleteDepositParams = {
  depositId: string
  path: string
}

export type GetAllDepositsParams = {
  query: string
  limit: number
  page: number
}

export type Deposit = {
  _id: string
  name: string;
  depositLocation: string;
  type: string;
  userId:string;
  orgId: string;
  
}

 // ====== PRODUCT PARAMS
 export type CreateProductParams = {
  userId: string
  orgId: string
  product: {
    name: string;
    price: number;
    unitId: string;
    categoryId: string;
  }
  path: string
}

export type UpdateProductParams = {
  userId: string
  orgId: string
  product: {
    _id: string;
    name: string;
    price: number;
    unitId: string;
    categoryId: string;
  }
  path: string
}

export type DeleteProductParams = {
  productId: string
  path: string
}

export type GetAllProductsParams = {
  query: string
  category: string
  limit: number
  page: number
}

export type Product = {
  _id: string
  name: string;
  price: number;
  
  category: {
    _id: string
    name: string
  }
  unit: {
    _id: string
    name: string
  }
}

 // ====== CATEGORY PARAMS
 export type CreateCategoryParams = {
  categoryName: string
  userId: string
  orgId: string
}

// ====== UNIT PARAMS
export type CreateUnitParams = {
  unitName: string
  userId: string
  orgId: string
}

// ====== STOCK MOVEMENT PARAMS
export type CreateStockMovementParams = {
  userId: string
  orgId: string
  stockMovement: {
    productId: string;
    quantity: number;
    depositId: string;
    movementType: string;
    concept?: string;
    receipt?: string;
  }
  path: string
}

export type UpdateStockMovementParams = {
  userId: string
  orgId: string
  stockMovement: {
    _id: string;
    productId: string;
    quantity: number;
    depositId: string;
    movementType: string;
    concept?: string;
    receipt?: string;

  }
  path: string
}

export type DeleteStockMovementParams = {
  stockMovementId: string
  path: string
} 

export type GetAllStockMovementsParams = {
  query: string
  limit: number
  page: number
}

export type StockMovement = {
  _id: string
  productId: {
    _id: string
    name: string
  }
  quantity: number;
  depositId: {
    _id: string
    name: string
  }
  movementType: string;
  userId : string;
  orgId: string;
  concept: string;
  receipt: string;
}

// ====== PRODUCT STOCK PARAMS
export type CreateProductStockParams = {
  userId: string
  orgId: string
  productStock: {
    productId: string;
    currentStock: number;
    projectedStock: number;
    depositId: string;
    unit: string;
  }
  path: string
}

export type UpdateProductStockParams = {
  userId: string
  orgId: string
  productStock: {
    _id: string;
    productId: string;
    currentStock: number;
    projectedStock: number;
    depositId: string;
    unit: string;
  }
  path: string
}

export type DeleteProductStockParams = {
  productStockId: string
  path: string
}

export type GetAllProductStocksParams = {
  query: string
  limit: number
  page: number
}

export type ProductStock = {
  _id: string
  productId: {
    _id: string
    name: string
  }
  unit: {
    _id: string
    name: string
  }
  currentStock: number;
  projectedStock: number;
  depositId: {
    _id: string
    name: string
  }
  userId: string
  orgId: string
}

