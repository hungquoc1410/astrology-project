import { useState } from 'react'

import AntardashasTable from '@/components/antardashas-table'
import MahadashasTable from '@/components/mahadashas-table'
import ParyantardashasTable from '@/components/paryantardashas-table'
import { TAstrologyRawData } from '@/lib/types'

interface IProps {
  astrodata: TAstrologyRawData
}

export default function VimshottariTable({ astrodata }: IProps) {
  const [dashaTable, setDashaTable] = useState('mahadashas')
  const [dashaLord, setDashaLord] = useState('')
  const [bhuktiLord, setBhuktiLord] = useState('')

  const onClickMahadashas = (dashaLord: string) => {
    setDashaTable('antardashas')
    setDashaLord(dashaLord)
  }
  const onClickAntardashas = (dashaLord: string) => {
    setDashaTable('paryantardashas')
    setBhuktiLord(dashaLord)
  }

  return (
    <>
      {dashaTable == 'mahadashas' ? (
        <MahadashasTable astrodata={astrodata} onClickMahadashas={onClickMahadashas} />
      ) : dashaTable == 'antardashas' ? (
        <AntardashasTable
          astrodata={astrodata}
          dashaLord={dashaLord}
          onClickAntardashas={onClickAntardashas}
          setDashaTable={setDashaTable}
        />
      ) : (
        <ParyantardashasTable
          astrodata={astrodata}
          dashaLord={dashaLord}
          bhuktiLord={bhuktiLord}
          setDashaTable={setDashaTable}
        />
      )}
    </>
  )
}
