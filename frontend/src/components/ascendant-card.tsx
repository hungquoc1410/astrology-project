import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TDivisionalChartData } from '@/lib/types'

interface IProps {
  chartData: TDivisionalChartData
}

export default function AscendantCard({ chartData }: IProps) {
  const Ascendant = chartData.ascendant

  const listItems = [
    { title: 'Position', badge: `${Ascendant.pos.deg}:${Ascendant.pos.min}` },
    { title: 'Nakshatra', badge: Ascendant.nakshatra },
    { title: 'Pada', badge: Ascendant.pada },
    { title: 'Nak-Ruler', badge: Ascendant['nak-ruler'] },
    { title: 'Nak-Diety', badge: Ascendant['nak-diety'] },
    { title: 'Sign', badge: Ascendant.sign },
    { title: 'Lagna Lord', badge: Ascendant['lagna-lord'] },
    { title: 'Sign Tattva', badge: Ascendant['sign-tatva'] },
    { title: 'Lagnesh-Sign', badge: Ascendant['lagnesh-sign'] },
    { title: 'Lagnesh-Rashi', badge: Ascendant['lagnesh-rashi'] },
    { title: 'Lagnesh-Disp', badge: Ascendant['lagnesh-disp'] },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Ascendant</CardTitle>
      </CardHeader>
      <CardContent className="w-max">
        <ul>
          {listItems.map((item, index) => {
            return (
              <li key={`list_${index}`}>
                {item.title}
                <Badge className="pointer-events-none ml-2">{item.badge}</Badge>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
