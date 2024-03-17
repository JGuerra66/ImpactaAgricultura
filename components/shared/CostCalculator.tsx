"use client"
import React, { useContext, useEffect, useState } from 'react';
import { getAllWorkOrders } from '@/lib/actions/workOrder.actions';
import { getAllCampaigns } from '@/lib/actions/campaign.actions';
import { getAllDeposits } from '@/lib/actions/deposit.actions';
import { getAllLots } from '@/lib/actions/lots.actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ICampaign } from '@/lib/mongodb/database/models/campaign.model';
import { ILot } from '@/lib/mongodb/database/models/lot.model';
import { IDeposit } from '@/lib/mongodb/database/models/deposit.model';
import { IWorkOrder, usedProductsSubSchema } from '@/lib/mongodb/database/models/workOrder.model';
import { ILabour } from '@/lib/mongodb/database/models/labour.model';
import { DetalleProductosContext } from '../../app/context/Context';


interface IWorkOrderLocal {
    _id: string;
    name: string;
    campaign: ICampaign;
    activity: string;
    labour: {
        valuePerHectare: number;
        _id: string;
        name: string;
    }
    date: Date;
    valuePerHectare: number;
    status: string;
    lot: ILot;
    hectareas: number;
    usedProducts: {
        product: {
            name: string;
            _id: string;
        };
        quantity: number;
        unit: string;
        valuePerUnit: number;
        dose: number;
    }[];
    deposit: IDeposit;
    contractor: string;
    userId: string;
    orgId: string;
    totalCost: number;
}

interface Props {
    orgId: string;
    userId: string;
}

export interface ProductoDetalle {
    producto: string;
    lote: string;
    deposito: string;
    valorUnitario: number;
    totalUtilizado: number;
}

const CostCalculator = ({userId, orgId}: Props) => {
    const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
    const [lots, setLots] = useState<ILot[]>([]);
    const [deposits, setDeposits] = useState<IDeposit[]>([]);
    const [workOrders, setWorkOrders] = useState<IWorkOrderLocal[]>([]);
    const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
    const [selectedLot, setSelectedLot] = useState<string | null>(null);
    const [selectedDeposit, setSelectedDeposit] = useState<string | null>(null);
    const { setDetalleProductosArray, setCosteTotal, setCosteTotalProductosUtilizados, setCostetotalLabor } = useContext(DetalleProductosContext);
    

    useEffect(() => {
        async function getData(){
            const campaigns = await getAllCampaigns(orgId);
            const lots = await getAllLots(orgId);
            const deposits = await getAllDeposits(orgId);
            const workOrdersData = await getAllWorkOrders(orgId);
            if (workOrdersData) {
                setWorkOrders(workOrdersData.data || []);
            } else {
                setWorkOrders([]);
            }
            setCampaigns(campaigns || []);
            setLots(lots || []);
            setDeposits(deposits || []);
    
            // Mueve la lógica que calcula detalleProductosArray aquí
            const detalleProductos = realizadasWorkOrders.reduce((acc: Record<string, ProductoDetalle>, workOrder) => {
                workOrder.usedProducts.forEach(producto => {
                    const key = `${workOrder.lot.name}-${workOrder.deposit.name}-${producto.product.name}`;
            
                    if (!acc[key]) {
                        acc[key] = {
                            producto: producto.product.name,
                            lote: workOrder.lot.name,
                            deposito: workOrder.deposit.name,
                            valorUnitario: producto.valuePerUnit,
                            totalUtilizado: 0,
                        };
                    }
            
                    acc[key].totalUtilizado += producto.quantity * producto.valuePerUnit;
                });
            
                return acc;
            }, {});
            
            const detalleProductosArray = Object.values(detalleProductos);
            console.log(detalleProductosArray);
    
            if (setDetalleProductosArray) {
                setDetalleProductosArray(detalleProductosArray);
            }
        
            if (setCosteTotal) {
                setCosteTotal(costeTotal);
            }
        
            if (setCosteTotalProductosUtilizados) {
                setCosteTotalProductosUtilizados(costeTotalProductosUtilizados);
            }
        }
        getData();
    }, [orgId]);

    const filteredWorkOrders = workOrders.filter(workOrder => {
        return (!selectedCampaign || workOrder.campaign._id === selectedCampaign) &&
               (!selectedLot || workOrder.lot._id === selectedLot) &&
               (!selectedDeposit || workOrder.deposit._id === selectedDeposit);
    });

    const realizadasWorkOrders = filteredWorkOrders.filter(workOrder => workOrder.status === 'realizado');

    const costeTotal = realizadasWorkOrders.reduce((total, workOrder) => total + workOrder.totalCost, 0);

    const costeTotalProductosUtilizados = realizadasWorkOrders.reduce((total, workOrder) => {
        const costeProductos = workOrder.usedProducts.reduce((totalProductos, producto) => totalProductos + producto.quantity * producto.valuePerUnit, 0);
        return total + costeProductos;
    }, 0);

    const costetotalLabor = realizadasWorkOrders.reduce((total, workOrder) => {
        const valuePerHectare = Number(workOrder.labour.valuePerHectare);
        const hectareas = Number(workOrder.hectareas);
    
        if (isNaN(valuePerHectare) || isNaN(hectareas)) {
            console.error('Invalid value:', workOrder);
            return total;
        }
    
        return total + valuePerHectare * hectareas;
    }, 0);

    const detalleProductos = realizadasWorkOrders.reduce((acc: Record<string, ProductoDetalle>, workOrder) => {
        workOrder.usedProducts.forEach(producto => {
            const key = `${workOrder.lot.name}-${workOrder.deposit.name}-${producto.product.name}`;
    
            if (!acc[key]) {
                acc[key] = {
                    producto: producto.product.name,
                    lote: workOrder.lot.name,
                    deposito: workOrder.deposit.name,
                    valorUnitario: producto.valuePerUnit,
                    totalUtilizado: 0,
                };
            }
    
            acc[key].totalUtilizado += producto.quantity * producto.valuePerUnit;
        });
    
        return acc;
    }, {});
    
    const detalleProductosArray = Object.values(detalleProductos);

    return (
        <div>
            <div className="flex justify-center">
    <div className="w-1/2">
        <Select onValueChange={setSelectedCampaign}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Campaña" />
            </SelectTrigger>
            <SelectContent>
                {campaigns.length > 0 && campaigns.map((campaign) => (
                    <SelectItem key={campaign._id} value={campaign._id} className="select-item p-regular-14">
                        {campaign.campaignName}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

        <Select onValueChange={setSelectedLot}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Lote" />
            </SelectTrigger>
            <SelectContent>
                {lots.length > 0 && lots.map((lot) => (
                    <SelectItem key={lot._id} value={lot._id} className="select-item p-regular-14">
                        {lot.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

        <Select onValueChange={setSelectedDeposit}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Establecimiento" />
            </SelectTrigger>
            <SelectContent>
                {deposits.length > 0 && deposits.map((deposit) => (
                    <SelectItem key={deposit._id} value={deposit._id} className="select-item p-regular-14">
                        {deposit.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
</div>
                <div className="w-full mb-8">
    <table className="w-full table-auto">
        <thead>
            <tr>
                <th className="px-4 py-2 border-b-2 border-black">Producto</th>
                <th className="px-4 py-2 border-b-2 border-black">Lote</th>
                <th className="px-4 py-2 border-b-2 border-black">Depósito</th>
                <th className="px-4 py-2 border-b-2 border-black">Valor Unitario</th>
                <th className="px-4 py-2 border-b-2 border-black">Valor Total Utilizado</th>
            </tr>
        </thead>
        <tbody>
            {detalleProductosArray.map((detalle, index) => (
                <tr key={index}>
                    <td className="border px-4 py-2">{detalle.producto}</td>
                    <td className="border px-4 py-2">{detalle.lote}</td>
                    <td className="border px-4 py-2">{detalle.deposito}</td>
                    <td className="border px-4 py-2">{detalle.valorUnitario}</td>
                    <td className="border px-4 py-2">{detalle.totalUtilizado}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
<div className="flex justify-between">
    <h2 className="font-bold">Coste Total: {costeTotal}</h2>
    <h2 className="font-bold">Coste Total Productos Utilizados: {costeTotalProductosUtilizados}</h2>
    <h2 className="font-bold">Coste Total Labor: {costetotalLabor}</h2>
</div>
        </div>
    );
}

export default CostCalculator;