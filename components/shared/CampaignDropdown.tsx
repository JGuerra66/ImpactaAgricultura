import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { ICampaign } from "@/lib/mongodb/database/models/campaign.model"
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
  import { createCampaign, getAllCampaigns } from "@/lib/actions/campaign.actions"
  
  type CampaignDropdownProps = {
    value?: string
    onChangeHandler?: (value: string) => void;
    userId: string
    orgId: string
  }
  
  const CampaignDropdown = ({ value, onChangeHandler, userId, orgId }: CampaignDropdownProps) => {
    const [campaigns, setCampaigns] = useState<ICampaign[]>([])
    const [newCampaign, setNewCampaign] = useState('');
  
    const handleAddCampaign = () => {
      createCampaign({
        campaignName: newCampaign.trim(),
        orgId,
        userId
      })
        .then((campaign) => {
          setCampaigns((prevState) => [...prevState, campaign])
        })
    }
  
    useEffect(() => {
      const getCampaigns = async () => {
        const campaignList = await getAllCampaigns(orgId);
  
        campaignList && setCampaigns(campaignList as ICampaign[])
      }
  
      getCampaigns();
    }, [])
  
    return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Campaign" />
        </SelectTrigger>
        <SelectContent>
          {campaigns.length > 0 && campaigns.map((campaign) => (
            <SelectItem key={campaign._id} value={campaign._id} className="select-item p-regular-14">
              {campaign.campaignName}
            </SelectItem>
          ))}
  
          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add new Campaign</AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Campaign</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input type="text" placeholder="Campaign" className="input-field mt-3" onChange={(e) => setNewCampaign(e.target.value)} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => startTransition(handleAddCampaign)}>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    )
  }
  
  export default CampaignDropdown