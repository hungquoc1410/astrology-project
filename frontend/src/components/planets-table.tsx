import { Check } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PLANETS } from '@/lib/astrology'
import { TDivisionalChartData } from '@/lib/types'

interface IProps {
  chartData: TDivisionalChartData
}

export default function PlanetsTable({ chartData }: IProps) {
  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Retrograde</TableHead>
            <TableHead>Nakshatra</TableHead>
            <TableHead>Pada</TableHead>
            <TableHead>Sign</TableHead>
            <TableHead>Relation</TableHead>
            <TableHead>Lord</TableHead>
            <TableHead>House</TableHead>
            <TableHead>Aspects Planets</TableHead>
            <TableHead>Aspects Houses</TableHead>
            <TableHead>Aspects Signs</TableHead>
            <TableHead>Aspects by</TableHead>
            <TableHead>Conjuncts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PLANETS.map((planet) => {
            let planetData = chartData.planets[planet]
            let lordOf = chartData.houses.filter((h) => h['sign-lord'] == planet)

            return (
              <TableRow key={planet}>
                <TableCell>{planetData.name}</TableCell>
                <TableCell>{planetData.retro ? <Check /> : null}</TableCell>
                <TableCell>{planetData.nakshatra}</TableCell>
                <TableCell>{planetData.pada}</TableCell>
                <TableCell>{planetData.sign}</TableCell>
                <TableCell>{planetData['house-rel'].split('/')[0].trim()}</TableCell>
                <TableCell>{lordOf.map((l) => l['house-num']).join(', ')}</TableCell>
                <TableCell>{planetData['house-num']}</TableCell>
                <TableCell>{planetData.Aspects.planets.join(', ')}</TableCell>
                <TableCell>{planetData.Aspects.houses.join(', ')}</TableCell>
                <TableCell>{planetData.Aspects.signs.join(', ')}</TableCell>
                <TableCell>{planetData['Aspected-by'].join(', ')}</TableCell>
                <TableCell>{planetData.conjuncts.join(', ')}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
