import { Home } from '@mui/icons-material'
import React from 'react'
import PageContent from '../../components/PageContent'
import PageHeader from '../../components/PageHeader'

function AdminHome() {
  return (
    <div>
      <PageHeader
        icon={<Home fontSize='large' style={{ color: '#22B14C' }} />}
        title='Home'
        subtitle={'General Overview'}
      />
      <PageContent>
        <div className=''>This is the Home Page</div>
      </PageContent>
    </div>
  )
}

export default AdminHome
