import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { IProductUnit } from "@/lib/mongodb/database/models/productUnit.model"
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
import { createUnit, getAllUnits } from "@/lib/actions/unit.actions"
  
  
  type UnitDropdownProps = {
    value?: string
    onChangeHandler?: () => void
  }
  
  const UnitDropdown = ({ value, onChangeHandler }: UnitDropdownProps) => {
    const [Units, setUnits] = useState<IProductUnit[]>([])
    const [newUnit, setNewUnit] = useState('');
  
    const handleAddUnit = () => {
      createUnit({
        unitName: newUnit.trim()
      })
        .then((unit) => {
          setUnits((prevState) => [...prevState, unit])
        })
    }
  
    useEffect(() => {
      const getUnits = async () => {
        const UnitList = await getAllUnits();
  
        UnitList && setUnits(UnitList as IProductUnit[])
      }
  
      getUnits();
    }, [])
  
    return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Unit" />
        </SelectTrigger>
        <SelectContent>
          {Units.length > 0 && Units.map((Unit) => (
            <SelectItem key={Unit._id} value={Unit._id} className="select-item p-regular-14">
              {Unit.name}
            </SelectItem>
          ))}
  
          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Agrega nueva unidad</AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Nueva Unidad</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input type="text" placeholder="Categoria" className="input-field mt-3" onChange={(e) => setNewUnit(e.target.value)} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => startTransition(handleAddUnit)}>Agregar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    )
  }
  
  export default UnitDropdown