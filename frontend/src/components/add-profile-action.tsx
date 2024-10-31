import { Plus } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { Button } from '@/components/ui/button'

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>
  setTitle: Dispatch<SetStateAction<string>>
  setType: Dispatch<SetStateAction<string>>
}

export default function AddProfileAction({ setOpen, setTitle, setType }: IProps) {
  function openAddProfileModal() {
    setTitle('Add New Profile')
    setType('ADD')
    setOpen(true)
  }

  return (
    <div>
      <Button onClick={openAddProfileModal}>
        <Plus className="mr-2 h-4 w-4" /> Add New Profile
      </Button>
    </div>
  )
}
