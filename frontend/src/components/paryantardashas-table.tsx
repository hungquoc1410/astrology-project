import { intlFormat, parseJSON } from 'date-fns'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TAstrologyRawData } from '@/lib/types'

interface IProps {
  astrodata: TAstrologyRawData
  dashaLord: string
  bhuktiLord: string
}

export default function ParyantardashasTable({ astrodata, dashaLord, bhuktiLord }: IProps) {
  const { paryantardashas } = astrodata.Dashas.Vimshottari

  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lord</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Start Age</TableHead>
            <TableHead>End Age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(paryantardashas)
            .filter(
              (e) =>
                paryantardashas[e].dashaLord == dashaLord &&
                paryantardashas[e].bhuktiLord == bhuktiLord,
            )
            .sort(function (a, b) {
              return paryantardashas[a].pariNum - paryantardashas[b].pariNum
            })
            .map((dasha, index) => {
              let dashaData = paryantardashas[dasha]
              let startDate = intlFormat(
                parseJSON(dashaData.startDate),
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
              let endDate = intlFormat(
                parseJSON(dashaData.endDate),
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
                <TableRow key={index}>
                  <TableCell>{dasha}</TableCell>
                  <TableCell>{startDate}</TableCell>
                  <TableCell>{endDate}</TableCell>
                  <TableCell>{dashaData.startage}</TableCell>
                  <TableCell>{dashaData.endage}</TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </div>
  )
}
