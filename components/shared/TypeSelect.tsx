import * as React from "react"
import { useState } from "react"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type TypeSelectProps = {
    value?: string
    onChangeHandler?: () => void
    
}
 
const TypeSelect = ({ value, onChangeHandler}:TypeSelectProps)=> {
  const [selectedValue, setSelectedValue] = useState("");

  
    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
          <SelectTrigger className="select-field">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="establecimiento">Establecimiento</SelectItem>
          <SelectItem value="acopio">Acopio</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default TypeSelect