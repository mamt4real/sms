import React, { useEffect, useState } from 'react'
import { Subject } from '@mui/icons-material'
import { Outlet } from 'react-router-dom'
import PageContent from '../../components/PageContent'
import PageHeader from '../../components/PageHeader'
import { useStateValue } from '../../StateProvider'
import FeeForm from './FeeForm'

function Fees() {
  const [subtitle, setSubtitle] = useState('All Fees')

  const dispatch = useStateValue()[1]
  useEffect(() => {
    dispatch({
      type: 'SET_ACTIVE_FORM',
      data: <FeeForm />,
    })
  }, [])

  // useEffect(()=>setSubtitle('All fees'),[])
  return (
    <div>
      <PageHeader
        icon={<Subject fontSize='large' style={{ color: '#22B14C' }} />}
        title='Fees'
        subtitle={subtitle}
      />
      <PageContent>
        <Outlet context={[setSubtitle]} />
      </PageContent>
    </div>
  )
}

export default Fees
