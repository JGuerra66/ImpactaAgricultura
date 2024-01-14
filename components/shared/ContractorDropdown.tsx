import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { IContractor } from "@/lib/mongodb/database/models/contractor.model"
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
  import { createContractor, getAllContractors } from "@/lib/actions/contractor.actions"
  
  
  type ContractorDropdownProps = {
    value?: string
    onChangeHandler?: () => void
  }
  
  const ContractorDropdown = ({ value, onChangeHandler }: ContractorDropdownProps) => {
    const [contractors, setContractors] = useState<IContractor[]>([])
    const [newContractor, setNewContractor] = useState('');
  
    const handleAddContractor = () => {
      createContractor({
        contractorName: newContractor.trim()
      })
        .then((contractor) => {
          setContractors((prevState) => [...prevState, contractor])
        })
    }
  
    useEffect(() => {
      const getContractors = async () => {
        const contractorList = await getAllContractors();
  
        contractorList && setContractors(contractorList as IContractor[])
      }
  
      getContractors();
    }, [])
  
    return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Contractor" />
        </SelectTrigger>
        <SelectContent>
          {contractors.length > 0 && contractors.map((contractor) => (
            <SelectItem key={contractor._id} value={contractor._id} className="select-item p-regular-14">
              {contractor.name}
            </SelectItem>
          ))}
  
          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add new Contractor</AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Contractor</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input type="text" placeholder="Contractor" className="input-field mt-3" onChange={(e) => setNewContractor(e.target.value)} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => startTransition(handleAddContractor)}>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    )
  }
  
  export default ContractorDropdown