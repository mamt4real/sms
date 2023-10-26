import React, { useEffect, useState } from 'react'
import { People } from '@mui/icons-material'
import { Outlet } from 'react-router-dom'
import PageContent from '../../components/PageContent'
import PageHeader from '../../components/PageHeader'
import { useStateValue } from '../../StateProvider'
import StaffForm from './StaffForm'

function Staffs() {
  const [subtitle, setSubtitle] = useState('All Students')

  const dispatch = useStateValue()[1]
  useEffect(() => {
    dispatch({
      type: 'SET_ACTIVE_FORM',
      data: <StaffForm />,
    })
  }, [])

  return (
    <div>
      <PageHeader
        icon={<People fontSize='large' style={{ color: '#22B14C' }} />}
        title='Staffs'
        subtitle={subtitle}
      />
      <PageContent>
        <Outlet context={[setSubtitle]} />
      </PageContent>
    </div>
  )
}

export default Staffs
