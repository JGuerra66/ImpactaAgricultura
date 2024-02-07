"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { depositFormSchema } from '@/lib/validator';
import { depositDefaultValues } from '@/constants';
import { createDeposit, updateDeposit } from '@/lib/actions/deposit.actions';
import { IDeposit } from '@/lib/mongodb/database/models/deposit.model';
import  TypeSelect  from './TypeSelect'

type DepositFormProps = {
    userId: string;
    orgId: string;
    type: 'Create' | 'Update';
    deposit?: IDeposit;
    depositId?: string;
}

const DepositForm = ({userId, type, deposit, depositId,orgId}: DepositFormProps) => {
        const initialValues = deposit && type==='Update' 
        ? deposit:depositDefaultValues;
        

        const form = useForm<z.infer<typeof depositFormSchema>>({
          resolver: zodResolver(depositFormSchema),
          defaultValues: initialValues
        })
       
        async function onSubmit(values: z.infer<typeof depositFormSchema>) {
          if (type === 'Create') {
            try {
              const newDeposit = await createDeposit({
                deposit:{
                  ...values,
                },
                userId,
                orgId,
                path:'/'
              });

              if (newDeposit){
                form.reset();
                
              }
            } catch (error) {
              console.log(error);
            }
          }
          console.log(values)
        

          if(type === 'Update') {
            if(!depositId) {
              
              return;
            }
      
            try {
              const updatedDeposit = await updateDeposit({
                deposit: { ...values, _id: depositId },
                path: `/`
              })
      
              if(updatedDeposit) {
                form.reset();
                
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
            name="name"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormControl>
                    <Input placeholder="Nombre" {...field} className="input-field"/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
              control={form.control}
              name="depositLocation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input 
                      placeholder="Ubicación del depósito" 
                      {...field} 
                      className="input-field"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        
        <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <TypeSelect onChangeHandler={field.onChange} value={field.value}/>
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

export default DepositForm