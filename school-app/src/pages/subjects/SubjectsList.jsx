import React from 'react'
import { useStateValue } from '../../StateProvider'
import MyTable from '../../components/MyTable'

function SubjectsList() {
  const { subjects } = useStateValue()[0]
  const columns = [
    { field: 'subject', headerName: 'Class', width: 250 },
    { field: 'section', headerName: 'Section', width: 250 },
  ]

  return <MyTable data={subjects} columns={columns} label='Subject' />
}

export default SubjectsList
