import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ILot } from "@/lib/mongodb/database/models/lot.model"
import { useEffect, useState } from "react"

import { getAllLots } from "@/lib/actions/lots.actions"

type LotDropdownProps = {
    value?: string
    orgId: string
    onChangeHandler?: (value: string) => void
}

const LotDropdown = ({ value, onChangeHandler, orgId }: LotDropdownProps) => {
    const [lots, setLots] = useState<ILot[]>([])

    useEffect(() => {
        const getLots = async () => {
            const lotList = await getAllLots(orgId);

            lotList && setLots(lotList as ILot[])
        }

        getLots();
    }, [])

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Lot" />
            </SelectTrigger>
            <SelectContent>
                {lots.length > 0 && lots.map((lot) => (
                    <SelectItem key={lot._id} value={lot._id} className="select-item p-regular-14">
                        {lot.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default LotDropdown;