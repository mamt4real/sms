import { makeStyles } from '@mui/styles'
import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Popup from '../components/Popup'
import Sidebar from '../components/sidebar/Sidebar'
import Topbar from '../components/topbar/Topbar'
import { useStateValue } from '../StateProvider'
import useApidata from '../useApi'

const useStyles = makeStyles({
  appMain: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
  },
  page: {
    flex: '5',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
})

function AdminDashbord() {
  const [{ activeForm }, dispatch] = useStateValue()
  const [students, stLoading, stError] = useApidata('/students/table')
  const [staffs, sfLoading, sfError] = useApidata('/users/table')
  const [classTable, clLoading, clError] = useApidata('/classes/table')
  const [subjects, sbLoading, sbError] = useApidata('/subjects')
  const [fees, fsLoading, fsError] = useApidata('/fees')
  const [sections, scLoading, scError] = useApidata('/sections')

  const [showAddEditForm, setShowAddEditForm] = useState(false)
  const [formTitle, setFormTitle] = useState('')
  const appContentref = useRef(null)

  useEffect(() => {
    dispatch({
      type: 'SET_SHOWFORM',
      data: { show: setShowAddEditForm, title: setFormTitle },
    })
  }, [])

  useEffect(() => {
    dispatch({ type: 'SET_STUDENTS', data: students })
    dispatch({ type: 'SET_STAFFS', data: staffs })
    dispatch({ type: 'SET_CLASSES', data: classTable })
    dispatch({ type: 'SET_SUBJECTS', data: subjects })
    dispatch({ type: 'SET_FEES', data: fees })
    dispatch({ type: 'SET_SECTIONS', data: sections })
  }, [stLoading, sfLoading, clLoading, sbLoading, fsLoading, scLoading])

  const classes = useStyles()
  const loading =
    stLoading || sfLoading || clLoading || sbLoading || fsLoading || scLoading
  return (
    <div style={{}}>
      <Topbar />
      <div className={classes.appMain}>
        <Sidebar />
        <div className={classes.page} ref={appContentref}>
          <Outlet context={[setShowAddEditForm, setFormTitle]} />
          <Popup
            title={formTitle}
            open={showAddEditForm}
            setOpen={setShowAddEditForm}
          >
            {activeForm}
          </Popup>
        </div>
      </div>
    </div>
  )
}

export default AdminDashbord
