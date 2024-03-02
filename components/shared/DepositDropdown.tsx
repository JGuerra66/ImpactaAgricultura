import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { IDeposit } from "@/lib/mongodb/database/models/deposit.model"
  import {  useEffect, useState } from "react"
  
  import { getAllDeposits } from "@/lib/actions/deposit.actions"
  
  type DepositDropdownProps = {
    value?: string
    orgId: string
    onChangeHandler?: (value: string) => void;
  }
  
  const DepositDropdown = ({ value, onChangeHandler, orgId }: DepositDropdownProps) => {
    const [deposits, setDeposits] = useState<IDeposit[]>([])
  
    useEffect(() => {
      const getDeposits = async () => {
        const depositList = await getAllDeposits(orgId);
  
        depositList && setDeposits(depositList as IDeposit[])
      }
  
      getDeposits();
    }, [])
  
    return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Deposit" />
        </SelectTrigger>
        <SelectContent>
          {deposits.length > 0 && deposits.map((deposit) => (
            <SelectItem key={deposit._id} value={deposit._id} className="select-item p-regular-14">
              {deposit.name}
            </SelectItem>
          ))}  
        </SelectContent>
      </Select>
    )
  }
  
  export default DepositDropdown