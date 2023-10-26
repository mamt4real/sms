import Controls from '../../components/controls/Controls'
import { Typography } from '@mui/material'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Form, useForm } from '../../components/useForm'
import { Publish } from '@mui/icons-material'
import { useOutletContext } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import MyImg from '../../components/MyImg'
import { addEditSubmit } from '../../components/commonFunctions'

const initialFieldValues = {
  id: 0,
  fname: '',
  mname: '',
  surname: '',
  gender: 'male',
  classID: '',
  passport: 'default.jpg',
  regno: '',
  regyear: '',
  dob: new Date(),
  guardian: {
    name: '',
    relationship: '',
    email: '',
    phone: '',
  },
}
const genderItems = [
  { value: 'male', title: 'Male' },
  { value: 'female', title: 'Female' },
  { value: 'others', title: 'Others' },
]

const StudentForm = forwardRef(({ addEdit }, ref) => {
  const [{ activeModal, showForm, setNotify }, dispatch] = useStateValue()

  const validate = (fields = student) => {
    const temp = { ...errors }
    if ('fname' in fields)
      temp.fname = fields.fname ? '' : 'firstname is required'
    if ('surname' in fields)
      temp.surname = fields.surname ? '' : 'Surname is required'
    if ('classID' in fields)
      temp.classID = fields.classID ? '' : 'Please select a class'
    if ('deptId' in fields)
      temp.deptId = fields.deptId ? '' : 'Department is required'

    setErrors({ ...temp })
    // alert(Object.values(temp))
    if (fields === student) return Object.values(temp).every((x) => x === '')
  }

  // const setSubtitle = useOutletContext()[0]
  // !activeModal && setSubtitle('Add New Student')
  const [student, setstudent, resetstudent, errors, setErrors, handleChange] =
    useForm(activeModal || initialFieldValues, true, validate)

  const [imgsrc, setImgsrc] = useState(
    `http://localhost:5000/${student?.passport}`
  )
  const handlePassportChange = (e) => {
    setImgsrc(URL.createObjectURL(e.target.files[0]))
  }

  const imageRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const action = activeModal ? 'edit' : 'add'
    if (validate()) {
      // const modal = { ...student }
      const modal = new FormData(e.target)
      modal.append('_id', student._id)
      if (!activeModal) {
        //
      }
      addEditSubmit('/students', modal, action, setNotify, (data) => {
        dispatch({
          type: `${action === 'edit' ? 'UPDATE' : 'ADD'}_STUDENT`,
          data,
        })
        activeModal &&
          dispatch({
            type: 'SET_ACTIVE_MODAL',
            data: { ...data, payments: student?.payments },
          })
        showForm.show(false)
      })
    }
  }
  return (
    // <div
    //   ref={ref}
    //   className='form__wrapper'
    //   onClick={closeModal}
    //   id='form__wrapper'
    // >
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
            value={student.fname}
            changeFxn={handleChange}
            error={errors.fname}
          />
          <Controls.Input
            variant='outlined'
            label='Surname'
            name='surname'
            value={student?.surname}
            changeFxn={handleChange}
            error={errors.surname}
          />
          <Controls.Input
            variant='outlined'
            label='Other Names'
            name='mname'
            value={student?.mname}
            changeFxn={handleChange}
            error={errors.mname}
          />
          <Controls.DatePicker
            variant='outlined'
            label='Date of Birth'
            value={student?.dob}
            name='dob'
            changeFunction={handleChange}
            error={errors.dob}
          />
          <Controls.MyRadio
            value={student?.gender}
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
            Loaction
          </Typography>
          <Controls.Input
            variant='outlined'
            label='Nationality'
            value={student?.nationality}
            name='nationality'
            changeFxn={handleChange}
          />
          <Controls.Input
            name='state'
            label='State of Origin'
            value={student?.state}
            changeFxn={handleChange}
          />
          <Controls.Input
            name='lga'
            label='L.G.A'
            type='text'
            value={student?.lga}
            changeFxn={handleChange}
          />
          <Controls.Input
            name='address'
            label='Home Address'
            type='text'
            value={student?.address}
            changeFxn={handleChange}
          />
        </div>
        <div className='userShow__bottomGroup addEditForm'>
          <Typography
            variant='subtitle'
            className='formgroup__title'
            component={'div'}
          >
            Parent / Guardian Information
          </Typography>
          <Controls.Input
            variant='outlined'
            label='Name'
            value={student?.guardian?.name}
            name='guardian.name'
            required
            changeFxn={handleChange}
          />
          <Controls.Input
            name='guardian.relationship'
            label='Relationship'
            value={student?.guardian?.relationship}
            changeFxn={handleChange}
          />
          <Controls.Input
            name='guardian.phoneNo'
            label='Phone No'
            required
            type='text'
            value={student?.guardian?.phoneNo}
            changeFxn={handleChange}
          />
          <Controls.Input
            name='guardian.email'
            label='Email'
            type='email'
            value={student?.guardian?.email}
            changeFxn={handleChange}
          />
          <Controls.Input
            name='guardian.address'
            label='Address'
            type='text'
            value={student?.guardian?.address}
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
          <Controls.SelectClass
            variant='outlined'
            label='Class'
            value={student?.classID._id || student?.classID}
            name='classID'
            handleChange={handleChange}
            error={errors.classID}
          />
          <Controls.Input
            name='regyear'
            label='Admission Year'
            value={student?.regyear}
            changeFxn={handleChange}
            error={errors.regyear}
          />
          <Controls.Input
            name='regno'
            label='Registration No'
            value={student?.regno}
            changeFxn={handleChange}
            readOnly
          />
          <div className='userUpdate__upload'>
            <img src={imgsrc} className='user__image userUpdate__img' alt='' />
            <label htmlFor='imgFile'>
              <Publish className='userUpdate__icon' />
            </label>
            <input
              type='file'
              id='imgFile'
              name='passport'
              ref={imageRef}
              onChange={handlePassportChange}
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
                activeModal ? showForm.show(false) : resetstudent()
              }}
              size='small'
              // color={'default'}
              type='reset'
            />
          </div>
        </div>
      </div>
    </Form>
    // </div>
  )
})

export default StudentForm
