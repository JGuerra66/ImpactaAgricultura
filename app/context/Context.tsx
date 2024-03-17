
import React, { createContext, useState } from 'react';

interface ProductoDetalle {
    producto: string;
    lote: string;
    deposito: string;
    valorUnitario: number;
    totalUtilizado: number;
}

interface Props {
    children: React.ReactNode;
}

interface ContextProps {
    detalleProductosArray: ProductoDetalle[];
    setDetalleProductosArray: React.Dispatch<React.SetStateAction<ProductoDetalle[]>>;
    costeTotal: number;
    setCosteTotal: React.Dispatch<React.SetStateAction<number>>;
    costeTotalProductosUtilizados: number;
    setCosteTotalProductosUtilizados: React.Dispatch<React.SetStateAction<number>>;
    costetotalLabor: number;
    setCostetotalLabor: React.Dispatch<React.SetStateAction<number>>;
}

export const DetalleProductosContext = createContext<Partial<ContextProps>>({});

export const DetalleProductosProvider: React.FC<Props> = ({ children }) => {
    const [detalleProductosArray, setDetalleProductosArray] = useState<ProductoDetalle[]>([]);

    return (
        <DetalleProductosContext.Provider value={{ detalleProductosArray, setDetalleProductosArray }}>
            {children}
        </DetalleProductosContext.Provider>
    );
};