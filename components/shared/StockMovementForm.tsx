"use client";
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { stockMovementFormSchema } from '@/lib/validator';
import { stockMovementDefaultValues } from '@/constants';
import DepositDropdown from './DepositDropdown';
import { useRouter } from 'next/navigation';
import { createStockMovement, updateStockMovement } from '@/lib/actions/stockMovement.actions';
import { IStockMovement } from '@/lib/mongodb/database/models/stockMovement.model';
import ProductDropdown from './ProductDropdown';
import MovementType from './MovementType';
import { getProductById } from '@/lib/actions/product.actions';

type StockMovementFormProps = {
    userId: string;
    orgId: string;
    type: 'Create' | 'Update';
    stockMovement?: IStockMovement;
    stockMovementId?: string;
}

const StockMovementForm = ({userId, type, stockMovement, stockMovementId, orgId}: StockMovementFormProps) => {
        const initialValues = stockMovement && type==='Update' 
        ? stockMovement : stockMovementDefaultValues;
        const router = useRouter();

        const form = useForm<z.infer<typeof stockMovementFormSchema>>({
          resolver: zodResolver(stockMovementFormSchema),
          defaultValues: initialValues
        })
       
        async function onSubmit(values: z.infer<typeof stockMovementFormSchema>) {
          if (type === 'Create') {
            try {
              const newStockMovement = await createStockMovement({
                stockMovement:{
                    ...values,
                    
                },
                userId,
                orgId,
                path:'/'
              });

              if (newStockMovement){
                form.reset();
                router.push('/stockhistory');
              }
            } catch (error) {
              console.log(error);
            }
          }

          if(type === 'Update') {
            if(!stockMovementId) {
              router.back()
              return;
            }
      
            try {
              const updatedStockMovement = await updateStockMovement({
                userId,
                orgId,
                stockMovement: {
                    ...values, _id: stockMovementId,
                    productId: '',
                    depositId: ''
                },
                path: `/`
              })
      
              if(updatedStockMovement) {
                form.reset();
                router.push(`/stockhistory`)
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 md:flex-row">
        

        <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                <ProductDropdown onChangeHandler={field.onChange} value={field.value} orgId={orgId}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Cantidad" 
                      value={field.value} 
                      onChange={e => field.onChange(e.target.valueAsNumber)} 
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        <FormField
            control={form.control}
            name="depositId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                <DepositDropdown onChangeHandler={field.onChange} value={field.value} orgId={orgId}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="movementType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <MovementType onChangeHandler={field.onChange} value={field.value}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="receipt"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormControl>
                    <Input placeholder="Recibo" {...field} className="input-field"/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

        <FormField
            control={form.control}
            name="concept"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormControl>
                    <Input placeholder="Concepto" {...field} className="input-field"/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
      </div>

        
        <Button type="submit">Registrar</Button>
      </form>
    </Form>
  )
}

export default StockMovementForm