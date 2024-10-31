import { Dispatch, SetStateAction } from 'react'

import { ProfileForm } from '@/components/profile-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { TProfile } from '@/lib/types'

interface IProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  type: string
  title: string
  currentProfile: TProfile
}

export default function ProfileFormModal({ open, setOpen, type, title, currentProfile }: IProps) {
  const closeModal = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ProfileForm type={type} setOpen={setOpen} currentProfile={currentProfile} />
      </DialogContent>
    </Dialog>
  )
}
