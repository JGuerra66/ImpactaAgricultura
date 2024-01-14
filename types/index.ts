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
  
  // ====== PRODUCT PARAMS
  export type CreateProductParams = {
    userId: string
    product: {
      name: string;
      description: string;
      imageUrl?: string;
      price: number;
      unitId: string;
      categoryId: string;
    }
    path: string
  }
  
  export type UpdateProductParams = {
    userId: string
    product: {
      _id: string;
      name: string;
      description: string;
      imageUrl?: string;
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
    description: string;
    imageUrl?: string;
    price: number;
    creator: {
      _id: string
      firstName: string
      lastName: string
    }
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
  }

  // ====== UNIT PARAMS
  export type CreateUnitParams = {
    unitName: string
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

// ====== DEPOSIT PARAMS
export type CreateDepositParams = {
  userId: string
  deposit: {
    name: string;
    depositLocation: string;
    photo?: string;
    type: string;
  }
  path: string
}

export type UpdateDepositParams = {
  userId: string
  deposit: {
    _id: string;
    name: string;
    depositLocation: string;
    photo?: string;
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
  photo: string;
  type: string;
  creator: {
    _id: string
    firstName: string
    lastName: string
  }
}

// ====== LOT PARAMS
export type CreateLotParams = {
  userId: string
  lot: {
    name: string;
    deposit: {
      _id: string;
      name: string;
    };
    kmzFile?: string; // kmzFile is optional
  }
  path: string
}

export type UpdateLotParams = {
  userId: string
  lot: {
    _id: string;
    name: string;
    deposit: {
      _id: string;
      name: string;
    };
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
  deposit: {
    _id: string;
    name: string;
  };
  kmzFile?: string; // kmzFile is optional
  creator: {
    _id: string
    firstName: string
    lastName: string
  }
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