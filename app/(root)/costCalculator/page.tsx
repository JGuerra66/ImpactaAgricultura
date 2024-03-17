"use client"
import React, { useContext } from 'react';
import CostCalculator from '@/components/shared/CostCalculator'; 
import { useOrganization, useUser } from '@clerk/nextjs';
import { DataTable } from './data-table';
import { columns } from './columns';
import { DetalleProductosContext } from '@/app/context/Context'; 

export default function costCalculatorPage() {
    const { user } = useUser();
    const { organization } = useOrganization();
    
    const userId = user?.id;
    const orgId = organization?.id;

    
    const { detalleProductosArray = [], costeTotal, costeTotalProductosUtilizados, costetotalLabor } = useContext(DetalleProductosContext);
    console.log(detalleProductosArray);

    if (!orgId) {
        return <div>Loading...</div>; 
    }


    return (
        <div>
            
            <h1 className="text-2xl font-bold mb-4">Calculadora de Costos</h1>
            <CostCalculator orgId={orgId} userId={userId || ''} />
        </div>
    );
};
