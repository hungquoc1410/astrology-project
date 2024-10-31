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
  onClickAntardashas: (dashaLord: string) => void
}

export default function AntardashasTable({ astrodata, dashaLord, onClickAntardashas }: IProps) {
  const { antardashas } = astrodata.Dashas.Vimshottari

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
          {Object.keys(antardashas)
            .filter((e) => antardashas[e].dashaLord == dashaLord)
            .sort(function (a, b) {
              return antardashas[a].bhuktiNum - antardashas[b].bhuktiNum
            })
            .map((dasha, index) => {
              let dashaData = antardashas[dasha]
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
                <TableRow key={index} onClick={() => onClickAntardashas(dashaData.lord)}>
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
