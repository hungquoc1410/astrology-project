import { intlFormat } from 'date-fns'
import { useState } from 'react'
import { Params, useLoaderData } from 'react-router-dom'

import AntardashasTable from '@/components/antardashas-table'
import AstrologyChart from '@/components/astrology-chart'
import MahadashasTable from '@/components/mahadashas-table'
import ParyantardashasTable from '@/components/paryantardashas-table'
import PlanetsTable from '@/components/planets-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BASE_URL } from '@/lib/constants'
import { ApiStatus, FetchAstrologyProfile } from '@/lib/types'

export async function loader({ params }: { params: Params<'profileId'> }) {
  const res = await fetch(BASE_URL + `/astrology/${params.profileId}`, {
    method: 'GET',
  })
  const data = await res.json()
  return data
}

export default function AstrologyProfile() {
  const data = useLoaderData() as FetchAstrologyProfile
  const [dashaTable, setDashaTable] = useState('mahadashas')
  const [dashaLord, setDashaLord] = useState('')
  const [bhuktiLord, setBhuktiLord] = useState('')

  if (data.status == ApiStatus.OK) {
    const { profile, astrodata } = data
    const birthday = intlFormat(
      new Date(
        Number(profile.year),
        Number(profile.month) - 1,
        Number(profile.day),
        Number(profile.hour),
        Number(profile.min),
        Number(profile.sec) || 0,
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
    const onClickMahadashas = (dashaLord: string) => {
      setDashaTable('antardashas')
      setDashaLord(dashaLord)
    }
    const onClickAntardashas = (dashaLord: string) => {
      setDashaTable('paryantardashas')
      setBhuktiLord(dashaLord)
    }

    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>{profile.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{birthday}</p>
              </CardContent>
            </Card>
            <AstrologyChart chartData={astrodata.D1} />
          </div>
          <div className="flex-1">
            {dashaTable == 'mahadashas' ? (
              <MahadashasTable astrodata={astrodata} onClickMahadashas={onClickMahadashas} />
            ) : dashaTable == 'antardashas' ? (
              <div className="flex flex-col gap-4">
                <div>
                  <Button onClick={() => setDashaTable('mahadashas')}>Go back</Button>
                </div>
                <AntardashasTable
                  astrodata={astrodata}
                  dashaLord={dashaLord}
                  onClickAntardashas={onClickAntardashas}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div>
                  <Button onClick={() => setDashaTable('antardashas')}>Go back</Button>
                </div>
                <ParyantardashasTable
                  astrodata={astrodata}
                  dashaLord={dashaLord}
                  bhuktiLord={bhuktiLord}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex">
          <PlanetsTable chartData={astrodata.D1} />
        </div>
      </div>
    )
  }

  if (data.status == ApiStatus.ERROR) {
    return <div>{data.error}</div>
  }
}
