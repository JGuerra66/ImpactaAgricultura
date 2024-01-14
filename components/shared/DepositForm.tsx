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
import { depositFormSchema } from '@/lib/validator';
import { depositDefaultValues } from '@/constants';
import Dropdown from './Dropdown';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/router';
import { createDeposit, updateDeposit } from '@/lib/actions/deposit.actions';
import { IDeposit } from '@/lib/mongodb/database/models/deposit.model';

type DepositFormProps = {
    userId: string;
    type: 'Create' | 'Update';
    deposit?: IDeposit;
    depositId?: string;
}

const DepositForm = ({userId, type, deposit, depositId}: DepositFormProps) => {
        const initialValues = deposit && type==='Update' 
        ? deposit:depositDefaultValues;
        const router = useRouter();

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
                path:'/'
              });

              if (newDeposit){
                form.reset();
                router.push('/deposits');
              }
            } catch (error) {
              console.log(error);
            }
          }
          console.log(values)
        

          if(type === 'Update') {
            if(!depositId) {
              router.back()
              return;
            }
      
            try {
              const updatedDeposit = await updateDeposit({
                userId,
                deposit: { ...values, _id: depositId },
                path: `/`
              })
      
              if(updatedDeposit) {
                form.reset();
                router.push(`/deposits`)
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

export default DepositForm