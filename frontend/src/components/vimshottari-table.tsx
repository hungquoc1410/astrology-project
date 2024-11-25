import { useState } from 'react'

import { TAstrologyRawData } from '@/lib/types'

import AntardashasTable from './antardashas-table'
import MahadashasTable from './mahadashas-table'
import ParyantardashasTable from './paryantardashas-table'
import { Button } from './ui/button'

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
        <>
          <div className="mb-4">
            <Button onClick={() => setDashaTable('mahadashas')}>Go back</Button>
          </div>
          <AntardashasTable
            astrodata={astrodata}
            dashaLord={dashaLord}
            onClickAntardashas={onClickAntardashas}
          />
        </>
      ) : (
        <>
          <div className="mb-4">
            <Button onClick={() => setDashaTable('antardashas')}>Go back</Button>
          </div>
          <ParyantardashasTable
            astrodata={astrodata}
            dashaLord={dashaLord}
            bhuktiLord={bhuktiLord}
          />
        </>
      )}
    </>
  )
}
