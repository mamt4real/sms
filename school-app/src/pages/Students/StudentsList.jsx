import React, { useEffect } from 'react'
import { useStateValue } from '../../StateProvider'
import MyTable from '../../components/MyTable'
import { useOutletContext } from 'react-router-dom'
import MyImg from '../../components/MyImg'

function StudentsList() {
  const { students } = useStateValue()[0]
  const [setSubtitle] = useOutletContext()
  useEffect(() => setSubtitle('All Students'), [])
  const columns = [
    {
      field: 'fullname',
      headerName: 'Student',
      width: 400,
      valueGetter: (params) => params.row.name,
      renderCell: (params) => {
        return (
          <div className='users__user'>
            <MyImg src={params.row.passport} alt='' className='user__image' />
            {params.row.name}
          </div>
        )
      },
    },
    { field: 'gender', headerName: 'Gender', width: 150 },
    { field: 'regno', headerName: 'Registration No', width: 200 },
    {
      field: 'class',
      headerName: 'Class',
      width: 150,
    },
  ]

  return <MyTable data={students} columns={columns} label='Student' />
}

export default StudentsList
