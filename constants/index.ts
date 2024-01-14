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
      label: 'Stock',
      route: '/stock',
    },

    {
      label: 'Ordenes de trabajo', 
      route: '/workorders'
    },

    {
      label: 'Planeamiento Futuro',
      route: '/futureplanning'
    },
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
  description: '',
  photo: '',
  quantity: 0,
  unit: '',
  category: '',
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