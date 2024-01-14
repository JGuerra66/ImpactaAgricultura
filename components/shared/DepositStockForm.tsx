/* import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { stockMovementHistoryFormSchema } from '@/lib/validator'; // You need to create this
import { stockMovementDefaultValues } from '@/constants'; // You need to create this
import Dropdown from './Dropdown';
import { useRouter } from 'next/router';
import { createStockMovementHistory, updateStockMovementHistory } from '@/lib/actions/stockMovementHistory.actions'; // You need to create these
import { IStockMovementHistorySubSchema } from '@/lib/mongodb/database/models/depositStock.model'; 
import DepositDropdown from './DepositDropdown';
import ProductDropdown from './ProductDropdown';
type StockMovementHistoryFormProps = {
    userId: string;
    type: 'Create' | 'Update';
    stockMovementHistory?: IStockMovementHistorySubSchema;
    stockMovementHistoryId?: string;
}

const StockMovementHistoryForm = ({userId, type, stockMovementHistory, stockMovementHistoryId}: StockMovementHistoryFormProps) => {
    const initialValues = stockMovementHistory && type==='Update' 
        ? stockMovementHistory:stockMovementDefaultValues;
        const router = useRouter();

        const form = useForm<z.infer<typeof stockMovementHistoryFormSchema>>({
          resolver: zodResolver(stockMovementHistoryFormSchema),
          defaultValues: initialValues
        })
       
        async function onSubmit(values: z.infer<typeof stockMovementHistoryFormSchema>) {
          if (type === 'Create') {
            try {
              const newStockMovementHistory = await createStockMovementHistory({
                stockMovementHistory:{
                  ...values,
                },
                userId,
                path:'/'
              });

              if (newStockMovementHistory){
                form.reset();
                router.push('/stockMovementHistories');
              }
            } catch (error) {
              console.log(error);
            }
          }
          console.log(values)
        

          if(type === 'Update') {
            if(!stockMovementHistoryId) {
              router.back()
              return;
            }
      
            try {
              const updatedStockMovementHistory = await updateStockMovementHistory({
                userId,
                stockMovementHistory: { ...values, _id: stockMovementHistoryId },
                path: `/`
              })
      
              if(updatedStockMovementHistory) {
                form.reset();
                router.push(`/stockMovementHistories`)
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
            name="deposit"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                <DepositDropdown onChangeHandler={field.onChange} value={field.value ? field.value.name : ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormControl>
                    <Input type="date" placeholder="Fecha" {...field} className="input-field"/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                  <ProductDropdown onChangeHandler={field.onChange} value={field.value ? field.value.name : ''} />
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
                  <Input type="number" placeholder="Cantidad" {...field} className="input-field"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="typeOfMovement"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      </div>
      
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default StockMovementHistoryForm  */