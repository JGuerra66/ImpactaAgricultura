"use client";
import React from 'react'
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
import { lotFormSchema } from '@/lib/validator';
import { lotDefaultValues } from '@/constants';
import DepositDropdown from './DepositDropdown';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/navigation';
import { createLot, updateLot } from '@/lib/actions/lots.actions';
import { ILot } from '@/lib/mongodb/database/models/lot.model';

type LotFormProps = {
    userId: string;
    type: 'Create' | 'Update';
    lot?: ILot;
    lotId?: string;
}

const LotForm = ({userId, type, lot, lotId}: LotFormProps) => {
        const initialValues = lot && type==='Update' 
        ? lot:lotDefaultValues;
        const router = useRouter();

        const form = useForm<z.infer<typeof lotFormSchema>>({
          resolver: zodResolver(lotFormSchema),
          defaultValues: initialValues
        })
       
        async function onSubmit(values: z.infer<typeof lotFormSchema>) {
          if (type === 'Create') {
            try {
              const newLot = await createLot({
                lot:{
                  ...values,
                },
                userId,
                path:'/'
              });

              if (newLot){
                form.reset();
                router.push('/lots');
              }
            } catch (error) {
              console.log(error);
            }
          }

          if(type === 'Update') {
            if(!lotId) {
              router.back()
              return;
            }
      
            try {
              const updatedLot = await updateLot({
                userId,
                lot: { ...values, _id: lotId },
                path: `/`
              })
      
              if(updatedLot) {
                form.reset();
                router.push(`/lots`)
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
            name="deposit"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <DepositDropdown onChangeHandler={field.onChange} value={field.value.name} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="kmzFile"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="h-72">
                    <Textarea placeholder="KMZ File" {...field} className="textarea rounded-2xl" />
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

export default LotForm