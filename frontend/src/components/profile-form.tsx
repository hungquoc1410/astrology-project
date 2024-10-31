import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useRevalidator } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { BASE_URL, profileFormSchema } from '@/lib/constants'
import { ApiStatus, CreateEditProfile, TProfile } from '@/lib/types'
import { capitalizeName, cn } from '@/lib/utils'

interface IProps {
  className?: string
  type: string
  setOpen: Dispatch<SetStateAction<boolean>>
  currentProfile: TProfile
}

export function ProfileForm({ className, type, setOpen, currentProfile }: IProps) {
  const { toast } = useToast()
  const revalidator = useRevalidator()

  let defaultValues = {
    name: '',
    day: '',
    month: '',
    year: '',
    place: '',
    longitude: '',
    lattitude: '',
    timezone: '',
    hour: '',
    min: '',
    sec: '',
  }
  if (currentProfile) {
    defaultValues.name = currentProfile.name
    defaultValues.day = currentProfile.day
    defaultValues.month = currentProfile.month
    defaultValues.year = currentProfile.year
    defaultValues.place = currentProfile.place
    defaultValues.longitude = currentProfile.longitude
    defaultValues.lattitude = currentProfile.lattitude
    defaultValues.timezone = currentProfile.timezone
    defaultValues.hour = currentProfile.hour
    defaultValues.min = currentProfile.min
    if (currentProfile.sec) {
      defaultValues.sec = currentProfile.sec
    }
  }

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultValues,
  })

  const onSubmit = async (data: FieldValues) => {
    let profile = {
      name: capitalizeName(data.name),
      day: data.day,
      month: data.month,
      year: data.year,
      place: capitalizeName(data.place),
      longitude: Number(data.longitude).toFixed(4).toString(),
      lattitude: Number(data.lattitude).toFixed(4).toString(),
      timezone: data.timezone,
      hour: data.hour,
      min: data.min,
      sec: data.sec,
    }
    try {
      if (type == 'ADD') {
        const res = await fetch(BASE_URL + `/create_profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profile),
        })
        const data: CreateEditProfile = await res.json()
        if (data.status == ApiStatus.OK) {
          toast({
            description: data.message,
          })
        }
        if (data.status == ApiStatus.ERROR) {
          toast({
            variant: 'destructive',
            description: data.error,
          })
        }
      } else if (type == 'EDIT') {
        const res = await fetch(BASE_URL + `/update_profile/${currentProfile.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profile),
        })
        const data: CreateEditProfile = await res.json()
        if (data.status == ApiStatus.OK) {
          toast({
            description: data.message,
          })
        }
        if (data.status == ApiStatus.ERROR) {
          toast({
            variant: 'destructive',
            description: data.error,
          })
        }
      }
    } catch (error) {
      console.log(error)
      let errorMessage = 'Uh oh! Something went wrong.'
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        variant: 'destructive',
        description: errorMessage,
      })
    } finally {
      setOpen(false)
      revalidator.revalidate()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid items-start gap-4', className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Nguyen Van A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="day"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Day</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Month</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input placeholder="1999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="place"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place</FormLabel>
                  <FormControl>
                    <Input placeholder="Ho Chi Minh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timezone</FormLabel>
                <FormControl>
                  <Input placeholder="+7" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longtitude</FormLabel>
                <FormControl>
                  <Input placeholder="+74.4439" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lattitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lattitude</FormLabel>
                <FormControl>
                  <Input placeholder="+14.2798" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="hour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hour</FormLabel>
                <FormControl>
                  <Input placeholder="14" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="min"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minute</FormLabel>
                <FormControl>
                  <Input placeholder="47" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sec"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Second</FormLabel>
                <FormControl>
                  <Input placeholder="9" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
