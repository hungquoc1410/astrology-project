import { Check } from 'lucide-react'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
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
  const Ascendant = chartData.ascendant

  return (
    <div className="flex w-full flex-col gap-4">
      <ScrollArea className="flex rounded-md border">
        <Table className="min-w-max">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Nakshatra</TableHead>
              <TableHead>Pada</TableHead>
              <TableHead>Nak-Ruler</TableHead>
              <TableHead>Nak-Diety</TableHead>
              <TableHead>Sign</TableHead>
              <TableHead>Lagna Lord</TableHead>
              <TableHead>Sign Tattva</TableHead>
              <TableHead>Lagnesh-Sign</TableHead>
              <TableHead>Lagnesh-Rashi</TableHead>
              <TableHead>Lagnesh-Disp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{Ascendant.name}</TableCell>
              <TableCell>{`${Ascendant.pos.deg}:${Ascendant.pos.min}`}</TableCell>
              <TableCell>{Ascendant.nakshatra}</TableCell>
              <TableCell>{Ascendant.pada}</TableCell>
              <TableCell>{Ascendant['nak-ruler']}</TableCell>
              <TableCell>{Ascendant['nak-diety']}</TableCell>
              <TableCell>{Ascendant.sign}</TableCell>
              <TableCell>{Ascendant['lagna-lord']}</TableCell>
              <TableCell>{Ascendant['sign-tatva']}</TableCell>
              <TableCell>{Ascendant['lagnesh-sign']}</TableCell>
              <TableCell>{Ascendant['lagnesh-rashi']}</TableCell>
              <TableCell>{Ascendant['lagnesh-disp']}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ScrollArea className="flex rounded-md border">
        <Table className="min-w-max">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Retrograde</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Nakshatra</TableHead>
              <TableHead>Pada</TableHead>
              <TableHead>Nak-Ruler</TableHead>
              <TableHead>Nak-Diety</TableHead>
              <TableHead>Sign</TableHead>
              <TableHead>Dispositor</TableHead>
              <TableHead>Tattva</TableHead>
              <TableHead>Sign Tattva</TableHead>
              <TableHead>House-Rel</TableHead>
              <TableHead>House-Nature</TableHead>
              <TableHead>Planet-Nature</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Lord</TableHead>
              <TableHead>House-Num</TableHead>
              <TableHead>Friends</TableHead>
              <TableHead>Enemies</TableHead>
              <TableHead>Neutral</TableHead>
              <TableHead>Varna</TableHead>
              <TableHead>Guna</TableHead>
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
                  <TableCell>{`${planetData.pos.deg}:${planetData.pos.min}`}</TableCell>
                  <TableCell>{planetData.nakshatra}</TableCell>
                  <TableCell>{planetData.pada}</TableCell>
                  <TableCell>{planetData['nak-ruler']}</TableCell>
                  <TableCell>{planetData['nak-diety']}</TableCell>
                  <TableCell>{planetData.sign}</TableCell>
                  <TableCell>{planetData.dispositor}</TableCell>
                  <TableCell>{planetData.tattva}</TableCell>
                  <TableCell>{planetData['sign-tatva']}</TableCell>
                  <TableCell>{planetData['house-rel'].split('/')[0].trim()}</TableCell>
                  <TableCell>{planetData['house-nature']}</TableCell>
                  <TableCell>{planetData['planet-nature']}</TableCell>
                  <TableCell>{planetData.gender}</TableCell>
                  <TableCell>{planetData.category}</TableCell>
                  <TableCell>{lordOf.map((l) => l['house-num']).join(', ')}</TableCell>
                  <TableCell>{planetData['house-num']}</TableCell>
                  <TableCell>{planetData.friends.join(', ')}</TableCell>
                  <TableCell>{planetData.enemies.join(', ')}</TableCell>
                  <TableCell>{planetData.nuetral.join(', ')}</TableCell>
                  <TableCell>{planetData.varna}</TableCell>
                  <TableCell>{planetData.guna}</TableCell>
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
