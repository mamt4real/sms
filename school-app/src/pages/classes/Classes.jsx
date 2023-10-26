import React, { useEffect, useState } from 'react'
import { Class } from '@mui/icons-material'
import { Outlet } from 'react-router-dom'
import PageContent from '../../components/PageContent'
import PageHeader from '../../components/PageHeader'
import ClassForm from './ClassForm'
import { useStateValue } from '../../StateProvider'

function Classes() {
  const [subtitle, setSubtitle] = useState('All Classes')

  const dispatch = useStateValue()[1]
  useEffect(() => {
    dispatch({
      type: 'SET_ACTIVE_FORM',
      data: <ClassForm />,
    })
  }, [])

  return (
    <div>
      <PageHeader
        icon={<Class fontSize='large' style={{ color: '#22B14C' }} />}
        title='Classes'
        subtitle={subtitle}
      />
      <PageContent>
        <Outlet context={[setSubtitle]} />
      </PageContent>
    </div>
  )
}

export default Classes
