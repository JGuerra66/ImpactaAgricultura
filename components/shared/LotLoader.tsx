import { useState, useEffect } from 'react';
import LotDropdown from './LotDropdown';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { LotLoaderSchema } from '@/lib/validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getAllLots } from '@/lib/actions/lots.actions'

type LotLoaderProps = {
  orgId: string;
}

type ResponseType = {
  data: Lot[];
};

type Lot = {
  _id: string;
  name: string;
  hectareas: number;
}

const LotLoader = ({orgId}:LotLoaderProps) => {
  const [lots, setLots] = useState<Lot[]>([]);
  const [allLots, setAllLots] = useState<Lot[]>([]); 

  useEffect(() => {
    getAllLots(orgId).then((response: ResponseType | undefined) => {
      if (response) {
        setAllLots(response.data);
      }
    });
  }, []);

  function handleDelete(id: string) {
    setLots(lots.filter((lot) => lot._id !== id));
  }

  const form = useForm<z.infer<typeof LotLoaderSchema>>({
    resolver: zodResolver(LotLoaderSchema),
  })

  async function onSubmit(data: z.infer<typeof LotLoaderSchema>) {
    if (allLots) {
      const lotDetails = allLots.find(lot => lot._id === data.lot);
      if (lotDetails) {
        setLots([...lots, { ...lotDetails, hectareas: data.hectareas }]);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="lot"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <LotDropdown onChangeHandler={field.onChange} value={field.value} orgId={orgId}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
  control={form.control}
  name="hectareas"
  render={({ field }) => (
    <FormItem className="w-full">
      <FormControl>
        <Input 
          type="number" 
          placeholder="Hectareas" 
          value={field.value || ""} 
          onChange={e => field.onChange(e.target.valueAsNumber)} 
          className="input-field"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
        </div>
        <Button type="submit">Añadir Lote</Button>
        {lots.length === 0 ? (
              <p>Aun no hay elementos cargados</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}>Lote</th>
                    <th style={{ textAlign: 'center' }}>Hectáreas</th>
                    <th style={{ textAlign: 'center' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {lots.map((lot) => (
                    <tr key={lot._id}>
                      <td style={{ textAlign: 'center' }}>{lot.name}</td>
                      <td style={{ textAlign: 'center' }}>{lot.hectareas}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button onClick={() => handleDelete(lot._id)}>Borrar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
      </form>
    </Form>
  )
}

export default LotLoader;