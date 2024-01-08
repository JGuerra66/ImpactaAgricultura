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
      imageUrl: string;
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
      imageUrl: string;
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
    imageUrl: string;
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