import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TDivisionalChartData } from '@/lib/types'

interface IProps {
  chartData: TDivisionalChartData
}

export default function AscendantTable({ chartData }: IProps) {
  const Ascendant = chartData.ascendant

  return (
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
  )
}
