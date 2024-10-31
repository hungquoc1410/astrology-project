import { TDivisionalChartData, THouse, TPlanet } from '@/lib/types'

export function prepareData(rawData: TDivisionalChartData) {
  const Ascendant = rawData.ascendant

  const house1st = rawData.houses[0]
  const house2nd = rawData.houses[1]
  const house3rd = rawData.houses[2]
  const house4th = rawData.houses[3]
  const house5th = rawData.houses[4]
  const house6th = rawData.houses[5]
  const house7th = rawData.houses[6]
  const house8th = rawData.houses[7]
  const house9th = rawData.houses[8]
  const house10th = rawData.houses[9]
  const house11th = rawData.houses[10]
  const house12th = rawData.houses[11]

  const lord1st = house1st['sign-lord']
  const lord2nd = house2nd['sign-lord']
  const lord3rd = house3rd['sign-lord']
  const lord4th = house4th['sign-lord']
  const lord5th = house5th['sign-lord']
  const lord6th = house6th['sign-lord']
  const lord7th = house7th['sign-lord']
  const lord8th = house8th['sign-lord']
  const lord9th = house9th['sign-lord']
  const lord10th = house10th['sign-lord']
  const lord11th = house11th['sign-lord']
  const lord12th = house12th['sign-lord']

  return {
    Ascendant,
    house1st,
    house2nd,
    house3rd,
    house4th,
    house5th,
    house6th,
    house7th,
    house8th,
    house9th,
    house10th,
    house11th,
    house12th,
    lord1st,
    lord2nd,
    lord3rd,
    lord4th,
    lord5th,
    lord6th,
    lord7th,
    lord8th,
    lord9th,
    lord10th,
    lord11th,
    lord12th,
    ...rawData.planets,
  }
}

export const SIGN_COLORS = {
  Aries: '#D2222D',
  Taurus: '#3CB371',
  Gemini: '#87CEEB',
  Cancer: '#B0C4DE',
  Leo: '#FFD700',
  Virgo: '#228B22',
  Libra: '#FFB6C1',
  Scorpio: '#800080',
  Sagittarius: '#FFA500',
  Capricorn: '#8B4513',
  Aquarius: '#00BFFF',
  Pisces: '#DA70D6',
}

export const SIGN_ABBREVIATIONS = {
  Aries: 'Ar',
  Taurus: 'Ta',
  Gemini: 'Ge',
  Cancer: 'Cn',
  Leo: 'Le',
  Virgo: 'Vi',
  Libra: 'Li',
  Scorpio: 'Sc',
  Sagittarius: 'Sg',
  Capricorn: 'Cp',
  Aquarius: 'Aq',
  Pisces: 'Pi',
}

export function getHouseCoordinates(houseNumber: THouse, canvasSize: number, padding: number) {
  switch (houseNumber) {
    case 1:
      return [canvasSize / 2, canvasSize / 2 - padding]
    case 2:
      return [canvasSize / 4, canvasSize / 4 - padding]
    case 3:
      return [canvasSize / 4 - padding, canvasSize / 4]
    case 4:
      return [canvasSize / 2 - padding, canvasSize / 2]
    case 5:
      return [canvasSize / 4 - padding, (canvasSize / 4) * 3]
    case 6:
      return [canvasSize / 4, (canvasSize / 4) * 3 + padding]
    case 7:
      return [canvasSize / 2, canvasSize / 2 + padding]
    case 8:
      return [(canvasSize / 4) * 3, (canvasSize / 4) * 3 + padding]
    case 9:
      return [(canvasSize / 4) * 3 + padding, (canvasSize / 4) * 3]
    case 10:
      return [canvasSize / 2 + padding, canvasSize / 2]
    case 11:
      return [(canvasSize / 4) * 3 + padding, canvasSize / 4]
    case 12:
      return [(canvasSize / 4) * 3, canvasSize / 4 - padding]
  }
}

export function getHousePlanetsStartingCoordinates(houseNumber: THouse, canvasSize: number) {
  switch (houseNumber) {
    case 1:
      return [canvasSize / 2, canvasSize / 4]
    case 2:
      return [canvasSize / 4, canvasSize / 8]
    case 3:
      return [canvasSize / 8, canvasSize / 4]
    case 4:
      return [canvasSize / 4, canvasSize / 2]
    case 5:
      return [canvasSize / 8, (canvasSize / 4) * 3]
    case 6:
      return [canvasSize / 4, (canvasSize / 8) * 7]
    case 7:
      return [canvasSize / 2, (canvasSize / 4) * 3]
    case 8:
      return [(canvasSize / 4) * 3, (canvasSize / 8) * 7]
    case 9:
      return [(canvasSize / 8) * 7, (canvasSize / 4) * 3]
    case 10:
      return [(canvasSize / 4) * 3, canvasSize / 2]
    case 11:
      return [(canvasSize / 8) * 7, canvasSize / 4]
    case 12:
      return [(canvasSize / 4) * 3, canvasSize / 8]
  }
}

export function getPlanetCoordinates(
  houseNumber: THouse,
  startX: number,
  startY: number,
  padding: number,
) {
  if ([1, 4, 7, 10].includes(houseNumber)) {
    return getHouse1st4th7th10thPlanetsCoordinates(startX, startY, padding)
  } else if ([2, 12].includes(houseNumber)) {
    return getHouse2nd12thPlanetsCoordinates(startX, startY, padding)
  } else if ([6, 8].includes(houseNumber)) {
    return getHouse6th8thPlanetsCoordinates(startX, startY, padding)
  } else if ([3, 5].includes(houseNumber)) {
    return getHouse3rd5thPlanetsCoordinates(startX, startY, padding)
  } else {
    return getHouse9th11thPlanetsCoordinates(startX, startY, padding)
  }
}

export const PLANETS: TPlanet[] = [
  'Sun',
  'Moon',
  'Mars',
  'Mercury',
  'Jupiter',
  'Venus',
  'Saturn',
  'Rahu',
  'Ketu',
]

function getHouse1st4th7th10thPlanetsCoordinates(
  centerX: number,
  centerY: number,
  padding: number,
) {
  const coordinates = []

  for (let row = -1; row <= 1; row++) {
    for (let col = -1; col <= 1; col++) {
      const x = centerX + col * padding
      const y = centerY + row * padding
      coordinates.push({ x, y })
    }
  }

  return coordinates
}

function getHouse2nd12thPlanetsCoordinates(centerX: number, centerY: number, padding: number) {
  const coordinates = []

  // Calculate the y-coordinates for each row
  const row1Y = centerY - padding * 1.5
  const row2Y = centerY - padding * 0.5
  const row3Y = centerY + padding * 0.5

  // Add the first row (bottom row)
  for (let i = -2; i <= 2; i++) {
    const x = centerX + i * padding
    const y = row1Y
    coordinates.push({ x, y })
  }

  // Add the second row
  for (let i = -1; i <= 1; i++) {
    const x = centerX + i * padding
    const y = row2Y
    coordinates.push({ x, y })
  }

  // Add the third row (top row)
  coordinates.push({ x: centerX, y: row3Y })

  return coordinates
}

function getHouse6th8thPlanetsCoordinates(centerX: number, centerY: number, padding: number) {
  const coordinates = []

  // Calculate the y-coordinates for each row
  const row1Y = centerY + padding * 1.5
  const row2Y = centerY + padding * 0.5
  const row3Y = centerY - padding * 0.5

  // Add the first row (bottom row)
  for (let i = -2; i <= 2; i++) {
    const x = centerX + i * padding
    const y = row1Y
    coordinates.push({ x, y })
  }

  // Add the second row
  for (let i = -1; i <= 1; i++) {
    const x = centerX + i * padding
    const y = row2Y
    coordinates.push({ x, y })
  }

  // Add the third row (top row)
  coordinates.push({ x: centerX, y: row3Y })

  return coordinates
}

function getHouse3rd5thPlanetsCoordinates(centerX: number, centerY: number, padding: number) {
  const coordinates = []

  // Calculate the x-coordinate for the second column
  const col1X = centerX - padding * 0.25
  const col2X = centerX - padding * 1.25

  // Add the first column (4 elements)
  for (let i = -1.5; i <= 1.5; i++) {
    const x = col1X
    const y = centerY + i * padding
    coordinates.push({ x, y })
  }

  // Add the second column (5 elements)
  for (let i = -2; i <= 2; i++) {
    const x = col2X
    const y = centerY + i * padding
    coordinates.push({ x, y })
  }

  return coordinates
}

function getHouse9th11thPlanetsCoordinates(centerX: number, centerY: number, padding: number) {
  const coordinates = []

  // Calculate the x-coordinate for the second column
  const col1X = centerX + padding * 0.25
  const col2X = centerX + padding * 1.25

  // Add the first column (4 elements)
  for (let i = -1.5; i <= 1.5; i++) {
    const x = col1X
    const y = centerY + i * padding
    coordinates.push({ x, y })
  }

  // Add the second column (5 elements)
  for (let i = -2; i <= 2; i++) {
    const x = col2X
    const y = centerY + i * padding
    coordinates.push({ x, y })
  }

  return coordinates
}

export const PLANET_COLORS = {
  Sun: '#FFD700',
  Moon: '#DCDCDC',
  Mars: '#D2222D',
  Mercury: '#B0C4DE',
  Jupiter: '#8B4513',
  Venus: '#FFC0CB',
  Saturn: '#191970',
  Rahu: '#800080',
  Ketu: '#696969',
}
