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
import { productFormSchema } from '@/lib/validator';
import { productDefaultValues } from '@/constants';
import Dropdown from './Dropdown';
import { Textarea } from '../ui/textarea';
//import { FileUploader } from './FileUploader';
//import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/lib/actions/product.actions';
import UnitDropdown from './UnitDropdown';
import { IProduct } from '@/lib/mongodb/database/models/product.model';
 


type ProductFormProps = {
    userId: string;
    orgId: string;
    type: 'Create' | 'Update';
    product?: IProduct;
    productId?: string;

}

const ProductForm = ({userId, type, product, productId, orgId}: ProductFormProps) => {
        //const [files, setFiles] = React.useState<File[]>([]);
        const initialValues = product && type==='Update' 
        ? product:productDefaultValues;
        //const {startUpload} = useUploadThing('imageUploader')
        const router = useRouter();

        // 1. Define your form.
        const form = useForm<z.infer<typeof productFormSchema>>({
          resolver: zodResolver(productFormSchema),
          defaultValues: initialValues
        })
       
        // 2. Define a submit handler.
        async function onSubmit(values: z.infer<typeof productFormSchema>) {
          if (type === 'Create') {
            try {
              const newProduct = await createProduct({
                product:{
                  ...values,
                },
                userId,
                orgId,
                path:'/'
              });

              if (newProduct){
                form.reset();
                router.push('/products');
              }
            } catch (error) {
              console.log(error);
            }
          }
          console.log(values)
        

          if(type === 'Update') {
            if(!productId) {
              router.back()
              return;
            }
      
            try {
              const updatedProduct = await updateProduct({
                userId,
                orgId,
                product: { ...values, _id: productId },
                path: `/`
              })
      
              if(updatedProduct) {
                form.reset();
                router.push(`/products`)
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
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Precio en u$d" 
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
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} userId={userId} orgId={orgId}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="unitId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <UnitDropdown onChangeHandler={field.onChange} value={field.value} userId={userId} orgId={orgId}/>
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

export default ProductForm