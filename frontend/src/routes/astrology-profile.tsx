import { intlFormat } from 'date-fns'
import { Params, useLoaderData } from 'react-router-dom'

import AscendantTable from '@/components/ascendant-table'
import AstrologyChart from '@/components/astrology-chart'
import ClassificationsTable from '@/components/classifications-table'
import HousesTable from '@/components/houses-table'
import PlanetsTable from '@/components/planets-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import VimshottariTable from '@/components/vimshottari-table'
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

    return (
      <div className="flex w-full flex-col gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>{profile.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{birthday}</p>
            <p className="text-sm text-muted-foreground">{profile.place}</p>
            <p className="text-sm text-muted-foreground">{`Longtitude: ${profile.longitude}, Lattitude: ${profile.lattitude}`}</p>
          </CardContent>
        </Card>
        <div className="flex justify-center gap-4">
          <div className="flex flex-col">
            <h2 className="text-center">{astrodata.D1.name}</h2>
            <AstrologyChart chartData={astrodata.D1} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-center">{astrodata.D9.name}</h2>
            <AstrologyChart chartData={astrodata.D9} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ScrollArea className="flex rounded-md border">
            <HousesTable chartData={astrodata.D1} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div>
            <VimshottariTable astrodata={astrodata} />
          </div>
        </div>
        <ScrollArea className="w-full rounded-md border">
          <ClassificationsTable chart={astrodata.D1} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <ScrollArea className="flex rounded-md border">
          <AscendantTable chartData={astrodata.D1} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <ScrollArea className="flex rounded-md border">
          <PlanetsTable chartData={astrodata.D1} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    )
  }

  if (data.status == ApiStatus.ERROR) {
    return <div>{data.error}</div>
  }
}
