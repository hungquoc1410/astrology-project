import { intlFormat } from 'date-fns'
import { Params, useLoaderData } from 'react-router-dom'

import AscendantCard from '@/components/ascendant-card'
import AstrologyChart from '@/components/astrology-chart'
import ClassificationsInfoCards from '@/components/classifications-info-cards'
import HousesTable from '@/components/houses-table'
import PlanetsTable from '@/components/planets-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
        <div className="flex gap-4">
          <div>
            <AstrologyChart chartData={astrodata.D1} />
          </div>
          <div className="flex w-full flex-col gap-2">
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
            <div className="flex gap-2">
              <AscendantCard chartData={astrodata.D1} />
              <ClassificationsInfoCards chart={astrodata.D1} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <HousesTable chartData={astrodata.D1} />
          <div>
            <VimshottariTable astrodata={astrodata} />
          </div>
        </div>
        <PlanetsTable chartData={astrodata.D1} />
      </div>
    )
  }

  if (data.status == ApiStatus.ERROR) {
    return <div>{data.error}</div>
  }
}
