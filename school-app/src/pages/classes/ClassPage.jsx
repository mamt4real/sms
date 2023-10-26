import React, { useEffect, useState } from 'react'
import {
  CalendarToday,
  Key,
  Home,
  PermIdentity,
  Info,
  Edit,
  Male,
  Female,
  Add,
  Delete,
} from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import useApidata from '../../useApi'
import { useOutletContext, Link } from 'react-router-dom'
import MyImg from '../../components/MyImg'
import { Button, IconButton, Tooltip, Typography } from '@mui/material'
import { useStateValue } from '../../StateProvider'
import Controls from '../../components/controls/Controls'
import Popup from '../../components/Popup'
import instance from '../../axios'
import { deleteData } from '../../components/commonFunctions'
import MyTable from '../../components/MyTable'
import Loading from '../../components/loading/Loading'

function ClassPage() {
  const setSubtitle = useOutletContext()[0]
  const [
    { showForm, setConfirmDialog, setNotify, activeModal: classData },
    dispatch,
  ] = useStateValue()

  useEffect(() => {
    setSubtitle('Class Information')
    return () => dispatch({ type: 'SET_ACTIVE_MODAL', data: null })
  }, [])

  const { classID } = useParams()
  const [showSubjectsEdit, setShowSubjects] = useState(false)

  const [classDataData, stLoading, stError] = useApidata(`/classes/${classID}`)
  useEffect(() => {
    dispatch({ type: 'SET_ACTIVE_MODAL', data: classDataData })
  }, [stLoading])

  const deleteSubject = (id) => {
    const deleteCallback = () =>
      dispatch({
        type: 'SET_ACTIVE_MODAL',
        data: {
          ...classData,
          subjects: classData?.subjects?.filter((sbj) => sbj._id !== id),
        },
      })
    setConfirmDialog({
      open: true,
      title: 'Are you sure you want to remove this subject',
      subtitle: 'You cant reverse this action',
      callback: () => {
        deleteData(
          `/classes/${classData?._id}/subjects`,
          setNotify,
          deleteCallback,
          { subject: id }
        )
      },
    })
  }

  if (stError) return <div>Error....</div>
  return stLoading ? (
    <Loading />
  ) : (
    <div>
      <div className='user__userContainer classPage'>
        <div
          className='class__top shadowed'
          style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
        >
          <div className='user__userShow classPage'>
            <div className='modal_pageHeader'>
              <div className='userShow__top'>
                <div className='userShow__topTitle'>
                  <span className='username'>{classData?.class}</span>
                  <span className='jobtitle'>
                    {classData?.block || 'Block B'}
                  </span>
                </div>
                <IconButton
                  variant='contained'
                  onClick={() => {
                    showForm.title('Edit Class')
                    showForm.show(true)
                  }}
                >
                  <Tooltip title='Edit Class Information'>
                    <Edit />
                  </Tooltip>
                </IconButton>
              </div>
            </div>
            <div className='userShow__bottom'>
              <div className='userShow__bottomGroup'>
                <span className='title'>Class Information</span>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <Key className='userShow__icon' />
                    Class Title:{' '}
                  </span>
                  <span className='infoTitle'>
                    {classData?.class || 'Class Name'}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    {' '}
                    <Home className='userShow__icon' />
                    Block:{' '}
                  </span>
                  <span className='infoTitle'>
                    {classData?.block || 'Block A'}
                  </span>
                </div>
              </div>
              <div className='userShow__bottomGroup'>
                <span className='title'>Class Teacher</span>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <PermIdentity className='userShow__icon' />
                    Name :{' '}
                  </span>
                  <span className='infoTitle'>
                    {`${classData?.master?.fname} ${
                      classData?.master?.mname || ''
                    } ${classData?.master?.surname}`}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <CalendarToday className='userShow__icon' />
                    Start Date:{' '}
                  </span>
                  <span className='infoTitle'>
                    {classData?.masterStart || 'Jan, 2020'}
                  </span>
                </div>
              </div>
              <div className='userShow__bottomGroup'>
                <span className='title'>No of Students</span>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <Male className='userShow__icon' />
                    Male :{' '}
                  </span>
                  <span className='infoTitle'>
                    {
                      classData?.students?.filter(
                        (std) => std.gender.toLowerCase() === 'male'
                      )?.length
                    }
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <Female className='userShow__icon' />
                    Female:{' '}
                  </span>
                  <span className='infoTitle'>
                    {
                      classData?.students?.filter(
                        (std) => std.gender.toLowerCase() === 'female'
                      )?.length
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='subject__section' style={{ flex: '1' }}>
            <div className='modal_pageHeader'>
              <h4 className='username'>Subjects</h4>
              <IconButton onClick={() => setShowSubjects(true)}>
                <Tooltip title='Add Subject'>
                  <Add color='primary' />
                </Tooltip>
              </IconButton>
            </div>
            <table border='border' className='teaching__subs'>
              <thead>
                <tr>
                  <th className='numbering'>S/N</th>
                  <th className='subject'>Subject</th>
                  <th className='numbering'></th>
                </tr>
              </thead>
              <tbody>
                {classData?.subjects?.map((row, i) => (
                  <tr key={row._id}>
                    <td className='numbering'>{i + 1}</td>
                    <td className='subject'>{row.subject}</td>
                    <td className='numbering'>
                      <Tooltip title='Remove Subject'>
                        <IconButton onClick={() => deleteSubject(row._id)}>
                          <Delete fontSize='small' style={{ color: 'red' }} />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className='student__section shadowed'
          style={{ padding: '8px 16px', marginTop: '8px' }}
        >
          <span className='studnetTitle'>Students</span>
          <ClassStudents students={classData?.students} />
        </div>
      </div>
      <Popup
        title='Add Subject'
        open={showSubjectsEdit}
        setOpen={setShowSubjects}
      >
        <EditSubjects
          currentSubs={classData?.subjects}
          classID={classData?._id}
          close={() => setShowSubjects(false)}
        />
      </Popup>
    </div>
  )
}

const ClassStudents = ({ students }) => {
  const columns = [
    {
      field: 'fullname',
      headerName: 'Student',
      valueGetter: (params) => params.row.name,
      width: 300,
      renderCell: (params) => {
        return (
          <div className='users__user'>
            <MyImg src={params.row.passport} alt='' className='user__image' />
            {params.row.name}
          </div>
        )
      },
    },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'regno', headerName: 'Registration No', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params) => (
        <div className='actions'>
          <Link to={`/admin/dashboard/students/${params.row.id}`}>
            <Tooltip title={'view details'}>
              <IconButton onClick={() => {}}>
                <Info style={{ color: 'darkgreen' }} />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      ),
    },
  ]
  return (
    <MyTable
      data={students}
      columns={columns}
      actions={false}
      label='Student'
    />
  )
}

const EditSubjects = ({ currentSubs, classID, close }) => {
  const [subject, setSubject] = useState([])
  const [{ setNotify, activeModal, subjects }, dispatch] = useStateValue()

  const getNewSubjects = () => {
    const newsbj = subject.map((s) => ({ _id: s }))
    return [...new Set([...activeModal.subjects, ...newsbj])].map((sbj) =>
      subjects.find((s) => s._id === sbj._id)
    )
  }

  const addSubject = () => {
    instance({
      url: `/classes/${classID}/subjects`,
      method: 'POST',
      data: {
        subjects: subject,
      },
    })
      .then((res) => {
        if (res.data.status === 'success') {
          setNotify({ message: res.data.message, type: 'success' })
          dispatch({
            type: 'SET_ACTIVE_MODAL',
            data: { ...activeModal, subjects: getNewSubjects() },
          })
          close()
        } else setNotify({ message: res.data.message, type: 'error' })
      })
      .catch((err) =>
        setNotify({
          message: err.response?.data.message || err.message,
          type: 'error',
        })
      )
  }
  return (
    <div className='userShow__bottomGroup addEditForm'>
      <div className='classform__subjects'></div>
      <Controls.SelectSubjects
        variant='outlined'
        filterList={currentSubs}
        multiple
        value={subject}
        handleChange={(e) => setSubject(e.target.value)}
      />

      <div
        className=''
        style={{
          padding: '8px',
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '8px',
        }}
      >
        <Button variant='contained' color='secondary' onClick={close}>
          Cancel
        </Button>
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={addSubject}
          startIcon={<Add />}
        >
          Add Subjects
        </Button>
      </div>
    </div>
  )
}

export default ClassPage
