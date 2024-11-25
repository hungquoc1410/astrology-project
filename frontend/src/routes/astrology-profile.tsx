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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
            <AstrologyChart chartData={astrodata.D1} />
          </div>
          <div className="flex flex-1 flex-col gap-4">
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
            {dashaTable == 'mahadashas' ? (
              <MahadashasTable astrodata={astrodata} onClickMahadashas={onClickMahadashas} />
            ) : dashaTable == 'antardashas' ? (
              <>
                <div>
                  <Button onClick={() => setDashaTable('mahadashas')}>Go back</Button>
                </div>
                <AntardashasTable
                  astrodata={astrodata}
                  dashaLord={dashaLord}
                  onClickAntardashas={onClickAntardashas}
                />
              </>
            ) : (
              <>
                <div>
                  <Button onClick={() => setDashaTable('antardashas')}>Go back</Button>
                </div>
                <ParyantardashasTable
                  astrodata={astrodata}
                  dashaLord={dashaLord}
                  bhuktiLord={bhuktiLord}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex">
          <div className="w-full rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Benefics</TableHead>
                  <TableHead>Malefics</TableHead>
                  <TableHead>Neutral</TableHead>
                  <TableHead>Kendra</TableHead>
                  <TableHead>Trikona</TableHead>
                  <TableHead>Trik</TableHead>
                  <TableHead>Upachaya</TableHead>
                  <TableHead>Dharma</TableHead>
                  <TableHead>Artha</TableHead>
                  <TableHead>Kama</TableHead>
                  <TableHead>Moksha</TableHead>
                  <TableHead>Natural Benefics</TableHead>
                  <TableHead>Natural Malefics</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{astrodata.D1.classifications.benefics.join(', ')}</TableCell>
                  <TableCell>{astrodata.D1.classifications.malefics.join(', ')}</TableCell>
                  <TableCell>{astrodata.D1.classifications.neutral.join(', ')}</TableCell>
                  <TableCell>{astrodata.D1.classifications.kendra.join(', ')}</TableCell>
                  <TableCell>{astrodata.D1.classifications.trikona.join(', ')}</TableCell>
                  <TableCell>{astrodata.D1.classifications.trik.join(', ')}</TableCell>
                  <TableCell>{astrodata.D1.classifications.upachaya.join(', ')}</TableCell>
                  <TableCell>{astrodata.D1.classifications.dharma.join(', ')}</TableCell>
                  <TableCell>{astrodata.D1.classifications.artha.join(', ')}</TableCell>
                  <TableCell>{astrodata.D1.classifications.kama.join(', ')}</TableCell>
                  <TableCell>{astrodata.D1.classifications.moksha.join(', ')}</TableCell>
                  <TableCell>
                    {astrodata.D1.classifications['natural-benefics'].join(', ')}
                  </TableCell>
                  <TableCell>
                    {astrodata.D1.classifications['natural-malefics'].join(', ')}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
