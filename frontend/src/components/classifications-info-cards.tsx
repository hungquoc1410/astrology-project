import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TDivisionalChartData } from '@/lib/types'

interface IProps {
  chart: TDivisionalChartData
}

export default function ClassificationsInfoCards({ chart }: IProps) {
  const infoCards = [
    { title: 'Benefics', text: chart.classifications.benefics.join(', ') },
    { title: 'Malefics', text: chart.classifications.malefics.join(', ') },
    { title: 'Neutral', text: chart.classifications.neutral.join(', ') },
    { title: 'Quadrants - Kendra', text: chart.classifications.kendra.join(', ') },
    { title: 'Trines - Trikona', text: chart.classifications.trikona.join(', ') },
    { title: 'Dushanta - Trik', text: chart.classifications.trik.join(', ') },
    { title: 'Upachaya', text: chart.classifications.upachaya.join(', ') },
    { title: 'Dharma', text: chart.classifications.dharma.join(', ') },
    { title: 'Artha', text: chart.classifications.artha.join(', ') },
    { title: 'Kama', text: chart.classifications.kama.join(', ') },
    { title: 'Moksha', text: chart.classifications.moksha.join(', ') },
    { title: 'Natural Benefics', text: chart.classifications['natural-benefics'].join(', ') },
    { title: 'Natural Malefics', text: chart.classifications['natural-malefics'].join(', ') },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {infoCards.map((card, index) => {
        return (
          <Card key={`card_${index}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{card.text}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
