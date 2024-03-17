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
interface IDeposit {
    _id: string;
    
}
type LotDropdownProps = {
    value?: string
    orgId: string
    deposit?: string
    onChangeHandler?: (value: string) => void
}

const LotDropdownv2 = ({ value, onChangeHandler, orgId, deposit }: LotDropdownProps) => {
    const [lots, setLots] = useState<ILot[]>([])

    useEffect(() => {
        const getLots = async () => {
            const lotList = await getAllLots(orgId);

            if (lotList) {
                const filteredLots = lotList.filter((lot: ILot) => {
                    if (typeof lot.deposit === 'string') {
                        return lot.deposit === deposit;
                    } else if (typeof lot.deposit === 'object' && lot.deposit !== null) {
                        return (lot.deposit as IDeposit)._id === deposit;
                    } else {
                        return false;
                    }
                });
                setLots(filteredLots);
            }
        }

        getLots();
    }, [deposit])

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Lot" />
            </SelectTrigger>
            <SelectContent>
                {lots.length > 0 && lots.map((lot) => (
                    <SelectItem key={lot._id} value={lot._id} className="select-item p-regular-14">
                        {lot.name} ({lot.hectares} hectareas)
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default LotDropdownv2;