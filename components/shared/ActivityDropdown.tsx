import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { IActivity } from "@/lib/mongodb/database/models/activities.model"
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
  import { createActivity, getAllActivities } from "@/lib/actions/activity.actions"
  
  
  type ActivityDropdownProps = {
    value?: string
    onChangeHandler?: () => void
    userId: string
    orgId: string
  }
  
  const ActivityDropdown = ({ value, onChangeHandler,userId, orgId }: ActivityDropdownProps) => {
    const [activities, setActivities] = useState<IActivity[]>([])
    const [newActivity, setNewActivity] = useState('');
  
    const handleAddActivity = () => {
      createActivity({
        activityName: newActivity.trim(),
        orgId,
        userId
      })
        .then((activity) => {
          setActivities((prevState) => [...prevState, activity])
        })
    }
  
    useEffect(() => {
      const getActivities = async () => {
        const activityList = await getAllActivities();
  
        activityList && setActivities(activityList as IActivity[])
      }
  
      getActivities();
    }, [])
  
    return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Activity" />
        </SelectTrigger>
        <SelectContent>
          {activities.length > 0 && activities.map((activity) => (
            <SelectItem key={activity._id} value={activity._id} className="select-item p-regular-14">
              {activity.name}
            </SelectItem>
          ))}
  
          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add new Activity</AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Activity</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input type="text" placeholder="Activity" className="input-field mt-3" onChange={(e) => setNewActivity(e.target.value)} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => startTransition(handleAddActivity)}>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    )
  }
  
  export default ActivityDropdown