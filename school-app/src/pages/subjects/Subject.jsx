import React, { useEffect, useState } from 'react'
import { Key, Home, Edit, Male, Female, Add, Delete } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import useApidata from '../../useApi'
import { useOutletContext } from 'react-router-dom'
import { Button, IconButton, Tooltip } from '@mui/material'
import { useStateValue } from '../../StateProvider'
import Controls from '../../components/controls/Controls'
import Popup from '../../components/Popup'
import { addEditSubmit, deleteData } from '../../components/commonFunctions'
import Loading from '../../components/loading/Loading'

function Subject() {
  const setSubtitle = useOutletContext()[0]
  const [{ showForm, activeModal: subject }, dispatch] = useStateValue()
  const [showSubjectsEdit, setShowSubjects] = useState(false)

  useEffect(() => {
    setSubtitle('Subject Information')
    return () => dispatch({ type: 'SET_ACTIVE_MODAL', data: null })
  }, [])

  const { subjectID } = useParams()

  const [subjectData, stLoading, stError] = useApidata(`/subjects/${subjectID}`)
  useEffect(() => {
    dispatch({ type: 'SET_ACTIVE_MODAL', data: subjectData })
  }, [stLoading])
  if (stError) return <div>Error....</div>
  return stLoading ? (
    <Loading />
  ) : (
    <div>
      <div className='user__userContainer'>
        <div
          className='class__top shadowed'
          style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
        >
          <div className='user__userShow classPage'>
            <div className='modal_pageHeader'>
              <div className='userShow__top'>
                <div className='userShow__topTitle'>
                  <span className='username'>{subject?.subject}</span>
                  <span className='jobtitle'>
                    {subject?.section || 'JUNIOR'}
                  </span>
                </div>
                <IconButton
                  color='primary'
                  onClick={() => {
                    showForm.title('Edit Subject')
                    showForm.show(true)
                  }}
                >
                  <Tooltip title='Edit Subject'>
                    <Edit />
                  </Tooltip>
                </IconButton>
              </div>
            </div>
            <div className='userShow__bottom'>
              <div className='userShow__bottomGroup' style={{ width: '500px' }}>
                <span className='title'>Subject Information</span>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <Key className='userShow__icon' />
                    Title:{' '}
                  </span>
                  <span className='infoTitle'>
                    {subject?.subject || 'Class Name'}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    {' '}
                    <Home className='userShow__icon' />
                    Section:{' '}
                  </span>
                  <span className='infoTitle'>
                    {subject?.section || 'Senior'}
                  </span>
                </div>
              </div>
              <div className='userShow__bottomGroup'>
                <span className='title'>No of Teachers</span>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <Male className='userShow__icon' />
                    Male :{' '}
                  </span>
                  <span className='infoTitle'>
                    {
                      subject?.students?.filter(
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
                      subject?.students?.filter(
                        (std) => std.gender.toLowerCase() === 'female'
                      )?.length
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: '0.9' }}>
            <div className='modal_pageHeader'>
              <h4 className='username'>Teachers</h4>
              <Tooltip title='Add Subject Teacher'>
                <IconButton
                  onClick={() => setShowSubjects(true)}
                  color='primary'
                >
                  <Add />
                </IconButton>
              </Tooltip>
            </div>
            <SubjectTeachers
              groupings={subject?.groupings}
              setGroupings={(groups) =>
                dispatch({
                  type: 'SET_ACTIVE_MODAL',
                  data: { ...subject, groupings: groups },
                })
              }
            />
          </div>
        </div>
      </div>
      <Popup
        title='Add Subject Teacher'
        open={showSubjectsEdit}
        setOpen={setShowSubjects}
      >
        <AddSubjectTeacher
          subject={subject?._id}
          close={() => setShowSubjects(false)}
        />
      </Popup>
    </div>
  )
}

const SubjectTeachers = ({ groupings, setGroupings }) => {
  const { setConfirmDialog, setNotify } = useStateValue()[0]

  const deleteFunction = (id) => {
    const deleteCallback = () =>
      setGroupings(groupings.filter((g) => g._id !== id))
    setConfirmDialog({
      open: true,
      title: 'Are you sure you want to delete this grouping?',
      subtitle: 'You cant reverse this action',
      callback: () => {
        deleteData(`/teachsubs/${id}`, setNotify, deleteCallback)
      },
    })
  }
  return (
    <table border='border' className='teaching__subs'>
      <thead>
        <tr>
          <th className='numbering'>S/N</th>
          <th className='subject'>Teacher</th>
          <th className='class'>Class</th>
          <th className='numbering'></th>
        </tr>
      </thead>
      <tbody>
        {groupings?.map((row, i) => (
          <tr key={row._id}>
            <td className='numbering'>{i + 1}</td>
            <td className='subject'>{row.teacher?.name}</td>
            <td className='class'>{row.class?.class}</td>
            <td className='numbering'>
              <Tooltip title='Delete Grouping'>
                <IconButton
                  color='secondary'
                  onClick={() => deleteFunction(row._id)}
                >
                  <Delete fontSize='small' />
                </IconButton>
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const AddSubjectTeacher = ({ close, subject }) => {
  const [details, setDetails] = useState({ subject, class: '', teacher: '' })
  const { setNotify } = useStateValue()[0]

  const addSubject = () => {
    addEditSubmit(
      '/teachsubs',
      { subject, ...details },
      'add',
      setNotify,
      () => {
        close()
      }
    )
  }

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value })

  return (
    <div className='userShow__bottomGroup addEditForm'>
      <Controls.SelectStaff
        variant='outlined'
        value={details.teacher}
        required
        name='teacher'
        handleChange={handleChange}
        style={{ marginBottom: '8px' }}
      />
      <Controls.SelectClass
        handleChange={handleChange}
        required
        value={details.class}
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
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default Subject
