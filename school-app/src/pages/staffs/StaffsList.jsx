import React from 'react'
import { useStateValue } from '../../StateProvider'
import MyTable from '../../components/MyTable'
import MyImg from '../../components/MyImg'

function StaffsList() {
  const { staffs } = useStateValue()[0]
  const columns = [
    {
      field: 'fullname',
      headerName: 'Staff',
      valueGetter: (params) => params.row.name,
      width: 300,
      renderCell: (params) => {
        return (
          <div className='users__user'>
            <MyImg src={params.row.image} alt='' className='user__image' />
            {params.row.name}
          </div>
        )
      },
    },
    { field: 'gender', headerName: 'Gender', width: 150 },
    { field: 'staffno', headerName: 'Staff No', width: 150 },
    { field: 'clearance', headerName: 'Position', width: 150 },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
  ]

  return <MyTable data={staffs} columns={columns} label='Staff' />
}

export default StaffsList
