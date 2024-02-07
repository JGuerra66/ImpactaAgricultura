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

export const stockMovementDefaultValues = {
  quantity: 0,
  unit: '',
  movementType: '',
  description: '',
  date: new Date().toISOString(),
}