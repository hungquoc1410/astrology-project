import { ColumnDef } from '@tanstack/react-table'
import { Check } from 'lucide-react'

import { DataTable } from '@/components/ui/data-table'
import { PLANETS } from '@/lib/astrology'
import { TDivisionalChartData, TPlanetData } from '@/lib/types'
import { sortObjectByKeys } from '@/lib/utils'

interface IProps {
  chartData: TDivisionalChartData
}

export default function PlanetsTable({ chartData }: IProps) {
  const columns: ColumnDef<TPlanetData>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      enableHiding: false,
    },
    {
      accessorKey: 'retro',
      header: 'Retrograde',
      cell: ({ row }) => {
        if (row.original.retro) {
          return <Check />
        }

        return null
      },
    },
    {
      accessorKey: 'pos',
      header: 'Position',
      cell: ({ row }) => {
        return `${row.original.pos.deg}:${row.original.pos.min}`
      },
    },
    {
      accessorKey: 'nakshatra',
      header: 'Nakshatra',
    },
    {
      accessorKey: 'pada',
      header: 'Pada',
    },
    {
      accessorKey: 'nak-ruler',
      header: 'Nak-Ruler',
    },
    {
      accessorKey: 'nak-diety',
      header: 'Nak-Diety',
    },
    {
      accessorKey: 'sign',
      header: 'Sign',
    },
    {
      accessorKey: 'dispositor',
      header: 'Dispositor',
    },
    {
      accessorKey: 'tattva',
      header: 'Tattva',
    },
    {
      accessorKey: 'sign-tatva',
      header: 'Sign Tattva',
    },
    {
      accessorKey: 'house-rel',
      header: 'House-Rel',
    },
    {
      accessorKey: 'house-nature',
      header: 'House-Nature',
    },
    {
      accessorKey: 'planet-nature',
      header: 'Planet-Nature',
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'house-num',
      header: 'House-Num',
    },
    {
      accessorKey: 'friends',
      header: 'Friends',
      cell: ({ row }) => {
        return row.original.friends.join(', ')
      },
    },
    {
      accessorKey: 'enemies',
      header: 'Enemies',
      cell: ({ row }) => {
        return row.original.enemies.join(', ')
      },
    },
    {
      accessorKey: 'nuetral',
      header: 'Neutral',
      cell: ({ row }) => {
        return row.original.nuetral.join(', ')
      },
    },
    {
      accessorKey: 'varna',
      header: 'Varna',
    },
    {
      accessorKey: 'guna',
      header: 'Guna',
    },
    {
      accessorKey: 'Aspects.planets',
      header: 'Aspects Planets',
      cell: ({ row }) => {
        return row.original.Aspects.planets.join(', ')
      },
    },
    {
      accessorKey: 'Aspects.houses',
      header: 'Aspects Houses',
      cell: ({ row }) => {
        return row.original.Aspects.houses.join(', ')
      },
    },
    {
      accessorKey: 'Aspects.signs',
      header: 'Aspects Signs',
      cell: ({ row }) => {
        return row.original.Aspects.signs.join(', ')
      },
    },
    {
      accessorKey: 'Aspected-by',
      header: 'Aspects by',
      cell: ({ row }) => {
        return row.original['Aspected-by'].join(', ')
      },
    },
    {
      accessorKey: 'status',
      header: 'Conjuncts',
      cell: ({ row }) => {
        return row.original.conjuncts.join(', ')
      },
    },
  ]

  const initialColumnVisibility = {
    name: true,
    retro: true,
    pos: true,
    nakshatra: true,
    pada: true,
    'nak-ruler': false,
    'nak-diety': false,
    sign: true,
    dispositor: true,
    tattva: false,
    'sign-tatva': false,
    'house-rel': true,
    'house-nature': false,
    'planet-nature': false,
    gender: false,
    category: false,
    'house-num': true,
    friends: true,
    enemies: true,
    nuetral: true,
    varna: false,
    guna: false,
    'Aspects.planets': true,
    'Aspects.houses': true,
    'Aspects.signs': true,
    'Aspected-by': true,
    status: true,
  }

  return (
    <DataTable
      columns={columns}
      data={Object.values(sortObjectByKeys(chartData.planets, PLANETS))}
      initialColumnVisibility={initialColumnVisibility}
      toggleTitle="Planets Table"
    />
  )
}
