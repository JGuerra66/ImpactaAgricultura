export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Productos',
      route: '/products',
    },

    {
      label: 'Lotes',
      route: '/lots'
    },
    
   {
      label: 'Depositos',
      route: '/deposits'
   },

   {
      label: 'Movimientos de stock',
      route: '/stockhistory'
   },

   {
      label: 'Stock',
      route: '/stock'
   }

   
  ]

export const productDefaultValues = {
    name: '',
    description: '',
    photo: '',
    price: 0,
    unit: '',
    category: '',
}

export const lotDefaultValues = {
  name: '',
  deposit: '',
  kmzFile: '',
}

export const depositDefaultValues = {
  name: '',
  depositLocation: '',
  type: '',
  description: '',
}

export const initStockDefaultValues = {
  product: '',
  quantity: 0,
  deposit: '',
  movementType: '',
  receipt: '',
  concept: '',
}

export const stockMovementDefaultValues = {
  product: '',
  quantity: 0,
  deposit: '',
  movementType: '',
  receipt: '',
  concept: '',
}

export const workOrderDefaultValues = {
  name: '',
  date: new Date(),
  status: 'pendiente',
  labour: '',
  activity: '',
  lot: '',
  deposit: '',
  usedProducts: [],
  userId: '',
  orgId: '',
}