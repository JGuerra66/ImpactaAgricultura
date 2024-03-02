"use client"
import React, { useState } from 'react';
import ActivityDropdown from './ActivityDropdown';
import ProductDropdown from './ProductDropdown';
import ContractorDropdown from './ContractorDropdown';
import { Button } from "@/components/ui/button"
import LotDropdown from './LotDropdown';
import {

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import DepositDropdown from './DepositDropdown';
import { string } from 'zod';
import { WorkOrderFormData } from '@/types';
import LabourDropdown from './LabourDropdown';
import { create } from 'domain';
import { createWorkOrders } from '@/lib/actions/workOrder.actions';


type WorkOrderFormProps = {
  orgId: string;
  userId: string;
  initialData?: FormData;
};
function WorkOrderForm({ orgId, userId, initialData }: WorkOrderFormProps) {
  
  const defaultFormData: WorkOrderFormData = {
    name: '',
    activity: '',
    labour: '',
    date: '',
    status: 'pendiente',
    lots: [],
    usedProducts: [],
    deposit: '',
    contractor: '',
    userId: userId,
    orgId: orgId,
    _id: ''
  };

  const [formData, setFormData] = useState<WorkOrderFormData>({
    ...defaultFormData,
    ...initialData,
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleActivityChange = (activity: string) => {
    setFormData({
      ...formData,
      activity,
    });
  };
  const date = new Date(formData.date);
  const formattedDate = date.toISOString().split('T')[0];

  const handleContractorChange = (contractor:string) => {
    setFormData({
      ...formData,
      contractor,
    });
  };

  const handleDepositChange = (deposit:string) => {
    setFormData({
      ...formData,
      deposit,
    });
  };

  const handleLotChange = (index: number, selectedLot: string) => {
    const updatedLots = [...formData.lots];
    updatedLots[index].lot = selectedLot;
    setFormData({
      ...formData,
      lots: updatedLots,
    });
  };

  const handleHectareasChange = (index: number, value: number) => {
    const updatedLots = [...formData.lots];
    updatedLots[index].hectareas = value;
    setFormData({
      ...formData,
      lots: updatedLots,
    });
  };

  const handleProductChange = (index: number, productId: string | null) => {
    const updatedProducts = [...formData.usedProducts];
    updatedProducts[index].product = productId as string;
    setFormData({
      ...formData,
      usedProducts: updatedProducts,
    });
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedProducts = [...formData.usedProducts];
    updatedProducts[index].quantity = quantity;
    setFormData({
      ...formData,
      usedProducts: updatedProducts,
    });
  };

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      usedProducts: [...formData.usedProducts, { product: '', quantity: 0 }],
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      console.log(formData);
      createWorkOrders(formData).then((res) => {
        console.log(res);
        setFormData({
          ...defaultFormData,
          ...initialData,
        }); // Reset formData to initial state
      });
    } catch (error) {
      
    }
    console.log(formData);
  };

  const handleAddLot = () => {
    setFormData({
      ...formData,
      lots: [...formData.lots, { lot: '', hectareas: 0 }],
    });
  };
  
  const handleRemoveLot = (index: number) => {
    const updatedLots = [...formData.lots];
    updatedLots.splice(index, 1);
    setFormData({
      ...formData,
      lots: updatedLots,
    });
  };
  const handleRemoveProduct = (index: number) => {
    const updatedProducts = [...formData.usedProducts];
    updatedProducts.splice(index, 1);
    setFormData({
      ...formData,
      usedProducts: updatedProducts,
    });
  };

  const handleLabourChange = (labour: string) => {
    setFormData({
      ...formData,
      labour,
    });
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
  <div className="flex flex-col space-y-2">
    <label className="font-bold text-lg">Nombre:</label>
    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md" />
  </div>
  <div className="flex flex-col space-y-2">
    <label className="font-bold text-lg">Actividad:</label>
    <ActivityDropdown
      value={formData.activity}
      orgId={formData.orgId}
      userId={formData.userId}
      onChangeHandler={(activity: string) => handleActivityChange(activity)}
    />
  </div>
  <div className="flex flex-col space-y-2">
    <label className="font-bold text-lg">Contratista:</label>
    <ContractorDropdown
      value={formData.contractor}
      orgId={formData.orgId}
      userId={formData.userId}
      onChangeHandler={(contractor: string) => handleContractorChange(contractor)}
    />
  </div>
  <div className="flex flex-col space-y-2">
    <label className="font-bold text-lg">Labor:</label>
    <LabourDropdown
      value={formData.labour}
      orgId={formData.orgId}
      userId={formData.userId}
      onChangeHandler={(labour: string) => handleLabourChange(labour)}
      
    />
  </div>
  <div className="flex flex-col space-y-2">
    <label className="font-bold text-lg">Fecha:</label>
    <input type="date" name="date" value={formattedDate} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md" />
  </div>
  <div className="flex flex-col space-y-2">
    <label className="font-bold text-lg">Depósito:</label>
    <DepositDropdown
      value={formData.deposit}
      orgId={formData.orgId}
      onChangeHandler={(deposit: string) => handleDepositChange(deposit)}
    />
  </div>
  <div className="flex flex-col space-y-2">
    <h2 className="font-bold text-lg">Lotes:</h2>
    {formData.lots.map((lot, index) => (
  <div key={index} className="flex items-center space-x-2">
    <LotDropdown
      value={lot.lot}
      orgId={formData.orgId}
      onChangeHandler={(selectedLot) => handleLotChange(index, selectedLot)}
      
    />
    <input
      className="border-2 border-gray-300 p-2 rounded-md flex-grow"
      type="number"
      value={lot.hectareas}
      onChange={(e) => handleHectareasChange(index, parseInt(e.target.value))}
    />
    <button type="button" onClick={() => handleRemoveLot(index)} className="bg-red-500 text-white py-2 px-4 rounded">Eliminar lote</button>
  </div>
))}
    <Button type="button" onClick={handleAddLot} className="bg-blue-500 text-white py-2 px-4 rounded">Agregar lote</Button>
  </div>
  <div className="flex flex-col space-y-2">
    <h2 className="font-bold text-lg">Productos utilizados:</h2>
    {formData.usedProducts.map((product, index) => (
  <div key={index} className="flex items-center space-x-2">
    <ProductDropdown
      value={product.product}
      orgId={formData.orgId}
      onChangeHandler={(productId) => handleProductChange(index, productId)}
      
    />
    <input
      className="border-2 border-gray-300 p-2 rounded-md flex-grow"
      type="number"
      value={product.quantity}
      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
    />
    <button type="button" onClick={() => handleRemoveProduct(index)} className="bg-red-500 text-white py-2 px-4 rounded">Eliminar Producto</button>
  </div>
))}
    <Button type="button" onClick={handleAddProduct} className="bg-blue-500 text-white py-2 px-4 rounded">Agregar producto</Button>
  </div>
  <Button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Enviar</Button>
</form>
  );
}

export default WorkOrderForm;
