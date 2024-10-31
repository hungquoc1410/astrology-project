import { intlFormat } from 'date-fns'
import { useState } from 'react'
import { Link, useLoaderData, useRevalidator } from 'react-router-dom'

import AddProfileAction from '@/components/add-profile-action'
import ProfileFormModal from '@/components/profile-form-modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { BASE_URL } from '@/lib/constants'
import { ApiStatus, DeleteProfile, FetchProfiles, TProfile } from '@/lib/types'

export async function loader() {
  const res = await fetch(BASE_URL + '/profiles', { method: 'GET' })
  const data = await res.json()
  return data
}

export default function Astrology() {
  const revalidator = useRevalidator()
  const data = useLoaderData() as FetchProfiles
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [currentProfile, setCurrentProfile] = useState({
    id: 0,
    name: '',
    gender: 'others',
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
  })

  const deleteProfile = async (profileId: number) => {
    const res = await fetch(BASE_URL + `/delete_profile/${profileId}`, {
      method: 'DELETE',
    })
    const data: DeleteProfile = await res.json()
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
    return revalidator.revalidate()
  }

  const editProfile = (p: TProfile) => {
    setCurrentProfile(p)
    setType('EDIT')
    setTitle('Edit Profile')
    setOpen(true)
  }

  return (
    <div className="flex flex-col gap-4 lg:gap-8">
      <AddProfileAction setOpen={setOpen} setTitle={setTitle} setType={setType} />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {data.status == ApiStatus.OK &&
          Array.isArray(data.profiles) &&
          data.profiles.length > 0 &&
          data.profiles.map((p) => {
            const birthday = intlFormat(
              new Date(
                Number(p.year),
                Number(p.month) - 1,
                Number(p.day),
                Number(p.hour),
                Number(p.min),
                Number(p.sec) || 0,
              ),
              {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              },
              { locale: 'vi-VN' },
            )
            return (
              <Card key={p.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>{p.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{birthday}</p>
                  <p className="text-muted-foreground">{p.place}</p>
                  <p className="text-muted-foreground">{`Longtitude: ${p.longitude}, Lattitude: ${p.lattitude}`}</p>
                </CardContent>
                <CardFooter className="grid gap-2 md:grid-cols-3 md:gap-4">
                  <Button variant="destructive" onClick={() => deleteProfile(p.id)}>
                    Delete
                  </Button>
                  <Button variant="outline" onClick={() => editProfile(p)}>
                    Edit
                  </Button>
                  <Button asChild>
                    <Link to={`/astrology/profile/${p.id}`}>Open</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
      </div>
      <ProfileFormModal
        open={open}
        setOpen={setOpen}
        type={type}
        title={title}
        currentProfile={currentProfile}
      />
    </div>
  )
}
