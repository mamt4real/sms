import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone'
import PageContent from '../../components/PageContent'
import { Outlet, useOutletContext } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import StudentForm from './StudentForm'

function Students() {
  const [showForm, setFormTitle] = useOutletContext()
  const [subtitle, setSubtitle] = useState('All Students')

  const dispatch = useStateValue()[1]
  useEffect(() => {
    dispatch({
      type: 'SET_ACTIVE_FORM',
      data: <StudentForm showForm={showForm} />,
    })
  }, [])

  return (
    <div>
      <PageHeader
        icon={
          <PeopleOutlineTwoToneIcon
            fontSize='large'
            style={{ color: '#22B14C' }}
          />
        }
        title='Manage Students'
        subtitle={subtitle}
      />
      <PageContent>
        <Outlet context={[setSubtitle, showForm, setFormTitle]} />
      </PageContent>
    </div>
  )
}

export default Students
