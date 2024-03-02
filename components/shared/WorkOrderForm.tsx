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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md" />
      </div>
      <div>
        <label>Fecha:</label>
        <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md" />
      </div>
      <div>
        <DepositDropdown
         value={formData.deposit}
         orgId={formData.orgId}
         onChangeHandler={(deposit: string) => handleDepositChange(deposit)}/>
      </div>
      <div>
        <label>Labor:</label>
        <LabourDropdown
          value={formData.labour}
          orgId={formData.orgId}
          onChangeHandler={handleLabourChange}
        />
      </div>
      <div>
        <label>Actividad:</label>
        <ActivityDropdown
          value={formData.activity}
          orgId={formData.orgId}
          onChangeHandler={handleActivityChange}
        />
      </div>
      <div>
        <label>Contratista:</label>
        <ContractorDropdown
          value={formData.contractor}
          orgId={formData.orgId}
          userId={formData.userId}
          onChangeHandler={handleContractorChange}
        />
      </div>
      <div>
        <h2>Lotes:</h2>
        {formData.lots.map((lot, index) => (
          <div key={index}>
            <label>Lote:</label>
            <LotDropdown
              value={lot.lot}
              orgId={formData.orgId}
              onChangeHandler={(selectedLot) => handleLotChange(index, selectedLot)}
            />
            <label>Hectáreas:</label>
            <input
              className="border-2 border-gray-300 p-2 rounded-md"
              type="number"
              value={lot.hectareas}
              onChange={(e) => handleHectareasChange(index, parseInt(e.target.value))}
            />
            <button type="button" onClick={() => handleRemoveLot(index)}>Eliminar lote</button>
          </div>
        ))}
        <Button type="button" onClick={handleAddLot}>Agregar lote</Button>
      </div>
      <div>
        <h2>Productos utilizados:</h2>
        {formData.usedProducts.map((product, index) => (
          <div key={index}>
            <ProductDropdown
              value={product.product}
              orgId={formData.orgId}
              onChangeHandler={(productId) => handleProductChange(index, productId)}
            />
            <input
              className="border-2 border-gray-300 p-2 rounded-md"
              type="number"
              value={product.quantity}
              onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
            />
            <button type="button" onClick={() => handleRemoveProduct(index)}>Eliminar Producto</button>
          </div>
        ))}
        <Button type="button" onClick={handleAddProduct}>Agregar producto</Button>
      </div>
      <Button type="submit">Enviar</Button>
    </form>
  );
}

export default WorkOrderForm;
