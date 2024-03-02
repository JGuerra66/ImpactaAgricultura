import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { ILabour } from "@/lib/mongodb/database/models/labour.model"
  import { startTransition, useEffect, useState } from "react"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Input } from "../ui/input"
  import { createLabour, getAllLabours } from "@/lib/actions/labour.actions"
  
  
  type LabourDropdownProps = {
    value?: string
    onChangeHandler?: () => void
    userId: string
    orgId: string
  }
  
  const LabourDropdown = ({ value, onChangeHandler , userId, orgId}: LabourDropdownProps) => {
    const [labours, setLabours] = useState<ILabour[]>([])
    const [newLabour, setNewLabour] = useState('');
  
    const handleAddLabour = () => {
      createLabour({
        labourName: newLabour.trim(),
        userId,
        orgId
      })
        .then((labour) => {
          setLabours((prevState) => [...prevState, labour])
        })
    }
  
    useEffect(() => {
      const getLabours = async () => {
        const labourList = await getAllLabours();
  
        labourList && setLabours(labourList as ILabour[])
      }
  
      getLabours();
    }, [])
  
    return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Labour" />
        </SelectTrigger>
        <SelectContent>
          {labours.length > 0 && labours.map((labour) => (
            <SelectItem key={labour._id} value={labour._id} className="select-item p-regular-14">
              {labour.name}
            </SelectItem>
          ))}
  
          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Agrega nueva labour</AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Nueva Labour</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input type="text" placeholder="Categoria" className="input-field mt-3" onChange={(e) => setNewLabour(e.target.value)} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => startTransition(handleAddLabour)}>Agregar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    )
  }
  
  export default LabourDropdown;