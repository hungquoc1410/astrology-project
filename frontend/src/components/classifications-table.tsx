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
  chart: TDivisionalChartData
}

export default function ClassificationsTable({ chart }: IProps) {
  return (
    <Table className="min-w-max">
      <TableHeader>
        <TableRow>
          <TableHead>Benefics</TableHead>
          <TableHead>Malefics</TableHead>
          <TableHead>Neutral</TableHead>
          <TableHead>Quadrants - Kendra</TableHead>
          <TableHead>Trines - Trikona</TableHead>
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
          <TableCell>{chart.classifications.benefics.join(', ')}</TableCell>
          <TableCell>{chart.classifications.malefics.join(', ')}</TableCell>
          <TableCell>{chart.classifications.neutral.join(', ')}</TableCell>
          <TableCell>{chart.classifications.kendra.join(', ')}</TableCell>
          <TableCell>{chart.classifications.trikona.join(', ')}</TableCell>
          <TableCell>{chart.classifications.trik.join(', ')}</TableCell>
          <TableCell>{chart.classifications.upachaya.join(', ')}</TableCell>
          <TableCell>{chart.classifications.dharma.join(', ')}</TableCell>
          <TableCell>{chart.classifications.artha.join(', ')}</TableCell>
          <TableCell>{chart.classifications.kama.join(', ')}</TableCell>
          <TableCell>{chart.classifications.moksha.join(', ')}</TableCell>
          <TableCell>{chart.classifications['natural-benefics'].join(', ')}</TableCell>
          <TableCell>{chart.classifications['natural-malefics'].join(', ')}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
