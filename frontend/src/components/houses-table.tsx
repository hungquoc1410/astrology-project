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

export default function HousesTable({ chartData }: IProps) {
  console.log(chartData.houses)
  return (
    <Table className="min-w-max">
      <TableHeader>
        <TableRow>
          <TableHead>House-Num</TableHead>
          <TableHead>Planets</TableHead>
          <TableHead>Sign-Num</TableHead>
          <TableHead>Sign</TableHead>
          <TableHead>Sign-Lord</TableHead>
          <TableHead>Rashi</TableHead>
          <TableHead>Aspect-Planets</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {chartData.houses.map((house) => {
          return (
            <TableRow key={house['house-num']}>
              <TableCell>{house['house-num']}</TableCell>
              <TableCell>{house.planets.join(', ')}</TableCell>
              <TableCell>{house['sign-num']}</TableCell>
              <TableCell>{house.sign}</TableCell>
              <TableCell>{house['sign-lord']}</TableCell>
              <TableCell>{house.rashi}</TableCell>
              <TableCell>{house['aspect-planets'].join(', ')}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
