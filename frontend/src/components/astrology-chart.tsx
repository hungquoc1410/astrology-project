import { Layer, Line, Stage, Text } from 'react-konva'

import {
  PLANETS,
  PLANET_COLORS,
  SIGN_ABBREVIATIONS,
  SIGN_COLORS,
  getHouseCoordinates,
  getHousePlanetsStartingCoordinates,
  getPlanetCoordinates,
  prepareData,
} from '@/lib/astrology'
import { TDivisionalChartData } from '@/lib/types'

interface IProps {
  chartData: TDivisionalChartData
}

export default function AstrologyChart({ chartData }: IProps) {
  const canvasSize = 600
  const canvasColor = '#fb923c'
  const houseLineCoordinates = [
    [0, canvasSize / 2, canvasSize / 2, canvasSize],
    [0, 0, canvasSize, canvasSize],
    [canvasSize / 2, 0, canvasSize, canvasSize / 2],
    [canvasSize / 2, 0, 0, canvasSize / 2],
    [canvasSize, 0, 0, canvasSize],
    [canvasSize, canvasSize / 2, canvasSize / 2, canvasSize],
  ]
  const padding = 30
  const preparedChartData = prepareData(chartData)

  return (
    <div className="bg-white p-2">
      <Stage width={canvasSize} height={canvasSize} className="border-2 border-orange-400">
        <Layer>
          {houseLineCoordinates.map((coordinates, index) => {
            return <Line key={index} points={coordinates} stroke={canvasColor} />
          })}
          {chartData.houses
            .sort((a, b) => a['house-num'] - b['house-num'])
            .map((house, index) => {
              const fillStyle = Object.values(SIGN_COLORS)[house['sign-num'] - 1]
              const fillText = `${house['house-num']} - ${Object.values(SIGN_ABBREVIATIONS)[house['sign-num'] - 1]}`
              const coordinates = getHouseCoordinates(house['house-num'], canvasSize, padding)

              return (
                <Text
                  key={index}
                  fill={fillStyle}
                  text={fillText}
                  fontSize={12}
                  width={padding * 2}
                  height={padding * 2}
                  x={coordinates[0] - padding}
                  y={coordinates[1] - padding}
                  align="center"
                  verticalAlign="middle"
                />
              )
            })}
          {PLANETS.map((planet, index) => {
            const planetData = preparedChartData[planet]
            const startingCoordinates = getHousePlanetsStartingCoordinates(
              planetData['house-num'],
              canvasSize,
            )
            const planetCoordinates = getPlanetCoordinates(
              planetData['house-num'],
              startingCoordinates[0],
              startingCoordinates[1],
              40,
            )

            return (
              <Text
                key={planet}
                fill={PLANET_COLORS[planet]}
                text={`${planetData.symbol}`}
                fontSize={20}
                fontStyle="bold"
                width={padding * 2}
                height={padding * 2}
                x={planetCoordinates[index].x - padding}
                y={planetCoordinates[index].y - padding}
                align="center"
                verticalAlign="middle"
              />
            )
          })}
        </Layer>
      </Stage>
    </div>
  )
}
