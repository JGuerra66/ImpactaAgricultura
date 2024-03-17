"use client"
import React, { useState } from 'react';
import ActivityDropdown from './ActivityDropdown';
import ProductDropdown from './ProductDropdown';
import ContractorDropdown from './ContractorDropdown';
import { Button } from "@/components/ui/button"
import LotDropdown from './LotDropdown';
import DepositDropdown from './DepositDropdown';
import { WorkOrderFormData } from '@/types';
import LabourDropdown from './LabourDropdown';
import { createWorkOrders } from '@/lib/actions/workOrder.actions';
import CampaignDropdown from './CampaignDropdown';
import { getProductById } from '@/lib/actions/product.actions';
import ProductDropdownv2 from './ProductDropdownv2';
import Lot from '@/lib/mongodb/database/models/lot.model';
import LotDropdownv2 from './lotDropdownv2';


type WorkOrderFormProps = {
  orgId: string;
  userId: string;
  initialData?: FormData;
};
function WorkOrderForm({ orgId, userId, initialData }: WorkOrderFormProps) {
  
  const defaultFormData: WorkOrderFormData = {
    name: '',
    activity: '',
    campaign: '',
    labour: '',
    date: '',
    valuePerHectare: 0,
    status: 'pendiente',
    lots: [],
    usedProducts: [],
    deposit: '',
    contractor: '',
    userId: userId,
    orgId: orgId,
    totalCost: 0,
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

  const handleCampaignChange = (campaign: string) => {
    setFormData({
      ...formData,
      campaign,
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

  const handleProductChange = async (index: number, productId: string | null) => {
    if (productId === null) {
      // If the user selects the default option, do nothing
      return;
    }
  
    const updatedProducts = [...formData.usedProducts];
    updatedProducts[index].product = productId;
    const productDetails = await getProductById(productId);
  
    updatedProducts[index].unit = productDetails.unit.name;
    updatedProducts[index].valuePerUnit = productDetails.price;
    setFormData({ ...formData, usedProducts: updatedProducts });
  };
  
  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedProducts = [...formData.usedProducts];
    updatedProducts[index].quantity = quantity;
    updatedProducts[index].measurementType = 'quantity';
    setFormData({ ...formData, usedProducts: updatedProducts });
  };
  
  const handleDosisChange = (index: number, dose: number) => {
    const updatedProducts = [...formData.usedProducts];
    updatedProducts[index].dose = dose;
    updatedProducts[index].measurementType = 'dosis';
    setFormData({ ...formData, usedProducts: updatedProducts });
  };
  
  const handleAddProduct = () => {
    setFormData({
      ...formData,
      usedProducts: [
        ...formData.usedProducts,
        {
          product: '',
          quantity: 0,
          unit: '', 
          dose: 0,
          valuePerUnit: 0,
          measurementType: 'quantity', 
        },
      ],
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
        });
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

  const handleValuePerHectareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      valuePerHectare: parseFloat(e.target.value),
    });
  };
  

  const handleMeasurementTypeChange = (index: number, measurementType: string) => {
    const updatedProducts = [...formData.usedProducts];
    if (measurementType === 'dosis') {
      updatedProducts[index].measurementType = 'dosis';
      updatedProducts[index].dose = updatedProducts[index].quantity || 0; // Setear la dosis al valor actual de cantidad o 0 si no hay cantidad
      delete updatedProducts[index].quantity; // Eliminar la cantidad si existe
    } else if (measurementType === 'quantity') {
      updatedProducts[index].measurementType = 'quantity';
      updatedProducts[index].quantity = updatedProducts[index].dose || 0; // Setear la cantidad al valor actual de dosis o 0 si no hay dosis
      delete updatedProducts[index].dose; // Eliminar la dosis si existe
    }
    setFormData({
      ...formData,
      usedProducts: updatedProducts,
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
    <label className="font-bold text-lg">Campaña:</label>
    <CampaignDropdown
      value={formData.campaign}
      orgId={formData.orgId}
      userId={formData.userId}
      onChangeHandler={(campaign: string) => handleCampaignChange(campaign)}
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
  <label className="font-bold text-lg">Valor por Hectárea(opcional):</label>
  <input
    type="number"
    value={formData.valuePerHectare}
    onChange={handleValuePerHectareChange}
    className="border-2 border-gray-300 p-2 rounded-md"
  />
</div>
  <div className="flex flex-col space-y-2">
    <label className="font-bold text-lg">Fecha:</label>
    <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md" />
    
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
      <LotDropdownv2
        value={lot.lot}
        orgId={formData.orgId}
        deposit={formData.deposit}
        onChangeHandler={(selectedLot) => handleLotChange(index, selectedLot)}
        // Deshabilitar si no se ha seleccionado un depósito
      />
      <input
        className="border-2 border-gray-300 p-2 rounded-md flex-grow"
        type="number"
        value={lot.hectareas}
        onChange={(e) => handleHectareasChange(index, parseInt(e.target.value))}
        disabled={!formData.deposit} // Deshabilitar si no se ha seleccionado un depósito
      />
      <button type="button" onClick={() => handleRemoveLot(index)} className="bg-red-500 text-white py-2 px-4 rounded">Eliminar lote</button>
    </div>
  ))}
  <Button type="button" onClick={handleAddLot} className="bg-blue-500 text-white py-2 px-4 rounded" disabled={!formData.deposit}>Agregar lote</Button>
</div>
<div className="flex flex-col space-y-2">
  <h2 className="font-bold text-lg">Productos utilizados:</h2>
  {formData.usedProducts.map((product, index) => (
    <div key={index} className="flex items-center space-x-2">
      <ProductDropdown
        value={product.product}
        orgId={formData.orgId}
        onChangeHandler={(productId) => handleProductChange(index, productId)}
        // Deshabilitar si no se ha seleccionado un depósito
      />
      {/* Renderizado condicional del campo de cantidad y los radios */}
      <>
        <input
          className="border-2 border-gray-300 p-2 rounded-md flex-grow"
          type="number"
          value={product.quantity}
          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
          disabled={!formData.deposit} // Deshabilitar si no se ha seleccionado un depósito
        />
        <div className="flex flex-col">
          <div className="flex items-center">
            <input
              type="radio"
              name={`measurementType-${index}`}
              value="dosis"
              checked={product.measurementType === 'dosis'}
              onChange={() => handleMeasurementTypeChange(index, 'dosis')}
              disabled={!formData.deposit} // Deshabilitar si no se ha seleccionado un depósito
            />
            <label>Dosis</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name={`measurementType-${index}`}
              value="quantity"
              checked={product.measurementType === 'quantity'}
              onChange={() => handleMeasurementTypeChange(index, 'quantity')}
              disabled={!formData.deposit} // Deshabilitar si no se ha seleccionado un depósito
            />
            <label>Total</label>
          </div>
        </div>
      </>
      <button type="button" onClick={() => handleRemoveProduct(index)} className="bg-red-500 text-white py-2 px-4 rounded">Eliminar Producto</button>
    </div>
  ))}
  <Button type="button" onClick={handleAddProduct} className="bg-blue-500 text-white py-2 px-4 rounded" disabled={!formData.deposit}>Agregar producto</Button>
</div>

  <Button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Enviar</Button>
</form>
  );
}

export default WorkOrderForm;
