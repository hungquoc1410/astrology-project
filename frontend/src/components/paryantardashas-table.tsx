import { intlFormat, parseJSON } from 'date-fns'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
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
  setDashaTable: (value: React.SetStateAction<string>) => void
}

export default function ParyantardashasTable({
  astrodata,
  dashaLord,
  bhuktiLord,
  setDashaTable,
}: IProps) {
  const { paryantardashas } = astrodata.Dashas.Vimshottari

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant={'outline'} className="pointer-events-none">
          Paryantardashas Table
        </Button>
        <Button variant={'secondary'} onClick={() => setDashaTable('antardashas')}>
          Go back
        </Button>
      </div>
      <ScrollArea className="w-full rounded-md border">
        <Table className="min-w-max">
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
      </ScrollArea>
    </div>
  )
}
