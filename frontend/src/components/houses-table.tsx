import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table'
import { TDivisionalChartData, THouseData } from '@/lib/types'

interface IProps {
  chartData: TDivisionalChartData
}

export default function HousesTable({ chartData }: IProps) {
  const columns: ColumnDef<THouseData>[] = [
    {
      accessorKey: 'house-num',
      header: 'House-Num',
      enableHiding: false,
    },
    {
      accessorKey: 'planets',
      header: 'Planets',
      cell: ({ row }) => {
        return row.original.planets.join(', ')
      },
    },
    {
      accessorKey: 'sign-num',
      header: 'Sign-Num',
    },
    {
      accessorKey: 'sign',
      header: 'Sign',
    },
    {
      accessorKey: 'sign-lord',
      header: 'Sign-Lord',
    },
    {
      accessorKey: 'rashi',
      header: 'Rashi',
    },
    {
      accessorKey: 'aspect-planets',
      header: 'Aspect-Planets',
      cell: ({ row }) => {
        return row.original['aspect-planets'].join(', ')
      },
    },
  ]

  const initialColumnVisibility = {
    'house-num': true,
    planets: true,
    'sign-num': true,
    sign: true,
    'sign-lord': true,
    rashi: false,
    'aspect-planets': true,
  }

  return (
    <DataTable
      columns={columns}
      data={chartData.houses}
      initialColumnVisibility={initialColumnVisibility}
      toggleTitle="Houses Table"
    />
  )
}
