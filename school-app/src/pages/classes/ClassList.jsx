import React from 'react'
import { useStateValue } from '../../StateProvider'
import MyTable from '../../components/MyTable'

function ClassList() {
  const { classes } = useStateValue()[0]
  const columns = [
    { field: 'class', headerName: 'Class', width: 150 },
    {
      field: 'noOfStudents',
      headerName: 'No of Students',
      width: 150,
      type: 'number',
    },
    { field: 'master', headerName: 'Class Master', width: 250 },
  ]

  return <MyTable data={classes} columns={columns} label='Class' />
}

export default ClassList
