import React, { useEffect, useState } from 'react'
import { Subject } from '@mui/icons-material'
import { Outlet } from 'react-router-dom'
import PageContent from '../../components/PageContent'
import PageHeader from '../../components/PageHeader'
import { useStateValue } from '../../StateProvider'
import SubjectForm from './SubjectForm'

function Subjects() {
  const [subtitle, setSubtitle] = useState('All Subjects')

  const dispatch = useStateValue()[1]
  useEffect(() => {
    dispatch({
      type: 'SET_ACTIVE_FORM',
      data: <SubjectForm />,
    })
  }, [])

  // useEffect(()=>setSubtitle('All Subjects'),[])
  return (
    <div>
      <PageHeader
        icon={<Subject fontSize='large' style={{ color: '#22B14C' }} />}
        title='Subjects'
        subtitle={subtitle}
      />
      <PageContent>
        <Outlet context={[setSubtitle]} />
      </PageContent>
    </div>
  )
}

export default Subjects
