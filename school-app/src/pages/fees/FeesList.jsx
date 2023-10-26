import React from 'react'
import { useStateValue } from '../../StateProvider'
import MyTable from '../../components/MyTable'

function FeesList() {
  const { fees } = useStateValue()[0]
  const columns = [
    { field: 'feeName', headerName: 'Fee Title', width: 250 },
    { field: 'section', headerName: 'Section', width: 200 },
  ]

  return <MyTable data={fees} columns={columns} label='Fee' />
}

export default FeesList
