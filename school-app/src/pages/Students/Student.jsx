import React, { useEffect, useState } from 'react'
import {
  CalendarToday,
  EmailOutlined,
  PermIdentity,
  PhoneAndroid,
  Male,
  Key,
  Female,
  Edit,
  LocationCity,
  Add,
} from '@mui/icons-material'
import './User.css'
import { useParams } from 'react-router-dom'
import useApidata from '../../useApi'
import { useOutletContext } from 'react-router-dom'
import Payments from '../fees/Payments'
import MyImg from '../../components/MyImg'
import { useStateValue } from '../../StateProvider'
import { Button, IconButton, Tooltip } from '@mui/material'
import Loading from '../../components/loading/Loading'
import { addEditSubmit, formatDate } from '../../components/commonFunctions'
import { Form, useForm } from '../../components/useForm'
import Controls from '../../components/controls/Controls'
import Popup from '../../components/Popup'

function Student() {
  const [{ activeModal: student, setNotify }, dispatch] = useStateValue()
  const [setSubtitle, showForm, setFormTitle] = useOutletContext()
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    setSubtitle('Student Information')
    return () => dispatch({ type: 'SET_ACTIVE_MODAL', data: null })
  }, [])

  const { studentID } = useParams()
  // const [student, setStudent] = useState({})

  const [studentData, stLoading, stError] = useApidata(`/students/${studentID}`)

  useEffect(() => {
    // setStudent(studentData)
    dispatch({ type: 'SET_ACTIVE_MODAL', data: studentData })
  }, [stLoading])

  if (stError) return <div>Error....</div>
  return stLoading ? (
    <Loading />
  ) : (
    <div>
      <div className='user__userContainer'>
        <div className='user__userShow shadowed'>
          <div className='modal_pageHeader'>
            <div className='userShow__top'>
              <MyImg src={student?.passport} alt='' className='user__image' />
              <div className='userShow__topTitle'>
                <span className='username'>{student?.name}</span>
                <span className='jobtitle'>
                  {student?.regno || 'EZPP/13/MACO/013'}
                </span>
              </div>
            </div>
            <Button
              variant='contained'
              endIcon={<Edit />}
              onClick={() => {
                setFormTitle('Edit Student')
                showForm(true)
              }}
            >
              Edit
            </Button>
          </div>
          <div className='userShow__bottom'>
            <div className='userShow__bottomGroup'>
              <span className='title'>Bio-Data</span>
              <div className='userShow__info'>
                <span className='infoTitle key'>
                  <PermIdentity className='userShow__icon' />
                  Firstname:{' '}
                </span>
                <span className='infoTitle'>
                  {student?.fname ||
                    student?.name?.split(' ')[0] ||
                    'Firstname'}
                </span>
              </div>
              <div className='userShow__info'>
                <span className='infoTitle key'>
                  <PermIdentity className='userShow__icon' />
                  Middlename:{' '}
                </span>
                <span className='infoTitle'>
                  {student?.mname || student?.name?.split(' ').length === 3
                    ? student?.name?.split(' ')[1]
                    : ''}
                </span>
              </div>
              <div className='userShow__info'>
                <span className='infoTitle key'>
                  {' '}
                  <PermIdentity className='userShow__icon' />
                  Surname:{' '}
                </span>
                <span className='infoTitle'>
                  {student?.surname ||
                    student?.name?.split(' ').pop() ||
                    'Surname'}
                </span>
              </div>
              <div className='userShow__info'>
                <span className='infoTitle key'>
                  {['Male', 'male', 'MALE'].includes(student?.gender) ? (
                    <Male className='userShow__icon' />
                  ) : (
                    <Female className='userShow__icon' />
                  )}
                  Gender:{' '}
                </span>
                <span className='infoTitle'>{student?.gender || 'Male'}</span>
              </div>
              <div className='userShow__info'>
                <span className='infoTitle key'>
                  <CalendarToday className='userShow__icon' />
                  Dob:{' '}
                </span>
                <span className='infoTitle'>
                  {formatDate(student?.dob) || '12 Jan, 1989'}
                </span>
              </div>
            </div>

            <div className='userShow__bottomGroup'>
              <span className='title'>Parent / Gurdian Info</span>
              <div className='userShow__info'>
                <span className='infoTitle key'>
                  <PermIdentity className='userShow__icon' />
                  Name :{' '}
                </span>
                <span className='infoTitle'>
                  {student?.guardian?.name || 'Guardian Name'}
                </span>
              </div>
              <div className='userShow__info'>
                <span className='infoTitle key'>
                  <PermIdentity className='userShow__icon' />
                  Realationship:{' '}
                </span>
                <span className='infoTitle'>
                  {student?.guardian?.relationship || 'Father'}
                </span>
              </div>
              <div className='userShow__info'>
                <span className='infoTitle key'>
                  <PhoneAndroid className='userShow__icon' />
                  Phone:{' '}
                </span>
                <span className='infoTitle'>
                  {student?.guardian?.phone || '+234 80642 41674'}
                </span>
              </div>
              <div className='userShow__info'>
                <span className='infoTitle key'>
                  <EmailOutlined className='userShow__icon' />
                  Email:{' '}
                </span>
                <span className='infoTitle email'>
                  {student?.guardian?.email || 'example@email.com'}
                </span>
              </div>
              <div className='userShow__info'>
                <span className='infoTitle key'>
                  <LocationCity className='userShow__icon' />
                  Address:{' '}
                </span>
                <span className='infoTitle'>
                  {student?.guardian?.address || 'No 24 Layin Zomo'}
                </span>
              </div>
            </div>
            <div className='userShow__bottomGroup'>
              <span className='title'>Academics</span>
              <div className='userShow__info'>
                <span className='infoTitle key'>
                  <Key className='userShow__icon' />
                  Registration No :{' '}
                </span>
                <span className='infoTitle'>
                  {student?.regno || 'EZPP/13/MACO/013'}
                </span>
              </div>
              <div className='userShow__info'>
                <span className='infoTitle key'>
                  <PermIdentity className='userShow__icon' />
                  Class :{' '}
                </span>
                <span className='infoTitle'>
                  {student?.classID?.class || 'Nursery One'}
                </span>
              </div>
              <div className='userShow__info'>
                <span className='infoTitle key'>
                  <CalendarToday className='userShow__icon' />
                  Year Admitted:{' '}
                </span>
                <span className='infoTitle'>{student?.regyear || '2020'}</span>
              </div>
              <div className='userShow__info'>
                <span className='infoTitle key'>
                  <LocationCity className='userShow__icon' />
                  State of Origin:{' '}
                </span>
                <span className='infoTitle'>{student?.state || 'Kaduna'}</span>
              </div>
              <div className='userShow__info'>
                <span className='infoTitle key'>
                  <LocationCity className='userShow__icon' />
                  L.G.A of Origin:{' '}
                </span>
                <span className='infoTitle'>{student?.lga || 'Zaria'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <Payments
          payments={student?.payments}
          isStudent={true}
          paymentTitle={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>Student Payments Records</span>
              <Tooltip title='Register New Fee To this Student'>
                <IconButton
                  onClick={() => setShowAddForm(true)}
                  style={{ marginLeft: '8px' }}
                >
                  <Add color='primary' />
                </IconButton>
              </Tooltip>
            </div>
          }
        />
        <Popup
          title={'Register a Fee'}
          open={showAddForm}
          setOpen={setShowAddForm}
        >
          <AddFeeToStudent
            close={() => setShowAddForm(false)}
            setMessage={setNotify}
            student={student?._id}
          />
        </Popup>
      </>
    </div>
  )
}

const AddFeeToStudent = ({ close, student, setMessage }) => {
  const [details, setdetails, resetdetails, errors, setErrors, handleChange] =
    useForm({ fee: '', amount: 0 })

  const validate = (fields = details) => {
    const temp = { ...errors }
    if ('fee' in fields) temp.fee = fields.fee ? '' : 'Fee is required'
    if ('amount' in fields)
      temp.amount = fields.amount > 0 ? '' : 'Amount Has to be positive'

    setErrors({ ...temp })
    if (fields === details) return Object.values(temp).every((x) => x === '')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      addEditSubmit(
        `/fees/${details.fee}/student`,
        { student, amount: details.amount },
        'add',
        setMessage,
        () => close()
      )
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Controls.SelectFee
        value={details.fee}
        error={errors.fee}
        handleChange={handleChange}
      />
      <Controls.Input
        value={details.amount}
        name='amount'
        changeFxn={handleChange}
        error={errors.amount}
      />
      <div className='actions container'>
        <Controls.Button
          size='small'
          text={'Cancel'}
          onClick={close}
          color='secondary'
        />
        <Controls.Button size='small' type='submit' text={'Add'} />
      </div>
    </Form>
  )
}

export default Student
