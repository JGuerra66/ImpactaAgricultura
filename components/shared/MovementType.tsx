import * as React from "react"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Move } from "lucide-react"

type TypeSelectProps = {
    value?: string
    onChangeHandler?: () => void
    
}
 
const MovementType = ({ value, onChangeHandler}:TypeSelectProps)=> {
  
    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
          <SelectTrigger className="select-field">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="entrada">Entrada</SelectItem>
          <SelectItem value="salida">Salida</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default MovementType