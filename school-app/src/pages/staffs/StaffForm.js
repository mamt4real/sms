import Controls from '../../components/controls/Controls'
import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Form, useForm } from '../../components/useForm'
import { Publish } from '@mui/icons-material'
import { useOutletContext } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import { addEditSubmit } from '../../components/commonFunctions'

const initialFieldValues = {
  id: 0,
  fname: '',
  mname: '',
  surname: '',
  gender: 'male',
  staffno: '',
  appointmentDate: Date(),
  qualification: '',
  level: '',
  gradeLevel: '',
  dob: new Date(),
  name: '',
  address: '',
  email: '',
  phone: '',
  clearance: 'teacher',
}
const genderItems = [
  { value: 'male', title: 'Male' },
  { value: 'female', title: 'Female' },
  { value: 'others', title: 'Others' },
]

function StaffForm({ addEdit }) {
  const [{ activeModal, showForm, setNotify }, dispatch] = useStateValue()

  const validate = (fields = staff) => {
    const temp = { ...errors }
    if ('fname' in fields)
      temp.fname = fields.fname ? '' : 'firstname is required'
    if ('surname' in fields)
      temp.surname = fields.surname ? '' : 'Surname is required'
    if ('gender' in fields)
      temp.gender = fields.gender ? '' : 'gender is required'
    if ('dob' in fields)
      temp.dob = fields.dob ? '' : 'Date of birth is required'
    if ('staffno' in fields)
      temp.staffno =
        fields.staffno.length === 8 ? '' : 'Staff No should be 8 characters'

    setErrors({ ...temp })
    // alert(Object.values(temp))
    if (fields === staff) return Object.values(temp).every((x) => x === '')
  }

  const [staff, setstaff, resetstaff, errors, setErrors, handleChange] =
    useForm(activeModal || initialFieldValues, true, validate)

  const handleSubmit = (e) => {
    e.preventDefault()
    const action = activeModal ? 'edit' : 'add'
    if (validate()) {
      const modal = { ...staff }
      if (!activeModal) {
        modal.password = modal.staffno
        modal.confirmpass = modal.staffno
        modal.username = modal.staffno
      }
      addEditSubmit('/users', modal, action, setNotify, (data) => {
        dispatch({
          type: `${action === 'edit' ? 'UPDATE' : 'ADD'}_STAFF`,
          data,
        })
        activeModal &&
          dispatch({
            type: 'SET_ACTIVE_MODAL',
            data: { ...data, techingSubs: staff.teachingSubs },
          })

        showForm.show(false)
      })
    }
  }
  useEffect(() => {
    activeModal && setstaff(activeModal)
  }, [activeModal])
  return (
    <Form onSubmit={handleSubmit}>
      <div className='userShow__bottom form'>
        <div className='userShow__bottomGroup addEditForm'>
          <Typography
            variant='subtitle'
            className='formgroup__title'
            component={'div'}
          >
            Bio Data
          </Typography>
          <Controls.Input
            variant='outlined'
            label='First Name'
            name='fname'
            value={staff?.fname}
            changeFxn={handleChange}
            error={errors.fname}
          />
          <Controls.Input
            variant='outlined'
            label='Surname'
            name='surname'
            value={staff?.surname}
            changeFxn={handleChange}
            error={errors.surname}
          />
          <Controls.Input
            variant='outlined'
            label='Other Names'
            name='mname'
            value={staff?.mname}
            changeFxn={handleChange}
            error={errors.mname}
          />
          <Controls.DatePicker
            variant='outlined'
            label='Date of Birth'
            value={staff?.dob}
            name='dob'
            changeFunction={handleChange}
            error={errors.dob}
          />
          <Controls.MyRadio
            value={staff?.gender}
            name='gender'
            changeFunction={handleChange}
            label='Gender'
            items={genderItems}
          />
        </div>
        <div className='userShow__bottomGroup addEditForm'>
          <Typography
            variant='subtitle'
            className='formgroup__title'
            component={'div'}
          >
            Contact Address
          </Typography>
          <Controls.Input
            name='phone'
            label='Phone No'
            type='text'
            value={staff?.phone}
            changeFxn={handleChange}
            error={errors.phone}
          />
          <Controls.Input
            name='email'
            label='Email'
            type='email'
            value={staff?.email}
            changeFxn={handleChange}
          />
          <Controls.Input
            variant='outlined'
            label='Nationality'
            value={staff?.nationality}
            name='nationality'
            changeFxn={handleChange}
          />
          <Controls.Input
            name='state'
            label='State of Origin'
            value={staff?.state}
            changeFxn={handleChange}
          />
          <Controls.Input
            name='lga'
            label='L.G.A'
            type='text'
            value={staff?.lga}
            changeFxn={handleChange}
          />
          <Controls.Input
            name='address'
            label='Home Address'
            type='text'
            value={staff?.address}
            changeFxn={handleChange}
          />
        </div>
        <div className='userShow__bottomGroup addEditForm'>
          <Typography
            variant='subtitle'
            className='formgroup__title'
            component={'div'}
          >
            Academic
          </Typography>
          <Controls.Input
            name='staffno'
            label='Staff Number'
            value={staff?.staffno}
            changeFxn={handleChange}
            error={errors.staffno}
          />
          <Controls.DatePicker
            name='appointmentDate'
            label='Appointment Date'
            value={staff?.appointmentDate}
            changeFunction={handleChange}
            error={errors.appointmentDate}
          />
          <Controls.Input
            name='qualification'
            label='Qualification'
            value={staff?.qualification}
            changeFxn={handleChange}
          />
          <Controls.Input
            name='level'
            label='Level'
            value={staff?.level}
            type='number'
            changeFxn={handleChange}
          />
          <Controls.SelectPosition
            value={staff?.clearance}
            name={'clearance'}
            handleChange={handleChange}
            error={errors.clearance}
          />
        </div>
        <div
          className='userShow__bottomGroup addEditForm'
          style={{ justifyContent: 'space-between' }}
        >
          <Typography
            variant='subtitle'
            className='formgroup__title'
            component={'div'}
          >
            Passport
          </Typography>
          <div className='userUpdate__upload'>
            <img
              src={staff.image}
              className='user__image userUpdate__img'
              alt=''
            />
            <label htmlFor='imgFile'>
              <Publish className='userUpdate__icon' />
            </label>
            <input
              type='file'
              id='imgFile'
              name='image'
              style={{ display: 'none' }}
            />
          </div>
          <div className=''>
            <Controls.Button
              text={activeModal ? 'Save' : 'Submit'}
              onClick={() => {}}
              size='small'
              type='submit'
            />
            <Controls.Button
              text={activeModal ? 'Cancel' : 'Reset'}
              onClick={() => {
                activeModal ? showForm.show(false) : resetstaff()
              }}
              size='small'
              // color={'default'}
              type='reset'
            />
          </div>
        </div>
      </div>
    </Form>
  )
}

export default StaffForm
