import Controls from '../../components/controls/Controls'
import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Form, useForm } from '../../components/useForm'
import { useStateValue } from '../../StateProvider'
import { addEditSubmit } from '../../components/commonFunctions'

const initialFieldValues = {
  id: 0,
  subject: '',
  section: '',
}

function SubjectForm() {
  const [{ activeModal, showForm, setNotify }, dispatch] = useStateValue()

  const validate = (fields = subjectData) => {
    const temp = { ...errors }
    if ('subject' in fields)
      temp.subject = fields.subject ? '' : 'subject title is required'

    setErrors({ ...temp })
    // if (fields === subjectData)
    return Object.values(temp).every((x) => x === '')
  }

  const [
    subjectData,
    setsubject,
    resetsubject,
    errors,
    setErrors,
    handleChange,
  ] = useForm(activeModal || initialFieldValues, true, validate)

  const handleSubmit = (e) => {
    e.preventDefault()
    const action = activeModal ? 'edit' : 'add'
    if (validate()) {
      addEditSubmit('/subjects', subjectData, action, setNotify, (data) => {
        dispatch({
          type: `${action === 'edit' ? 'UPDATE' : 'ADD'}_SUBJECT`,
          data,
        })
        activeModal &&
          dispatch({
            type: 'SET_ACTIVE_MODAL',
            data: {
              ...data,
              groupings: subjectData.groupings,
            },
          })
        showForm.show(false)
      })
    }
  }

  useEffect(() => {
    activeModal && setsubject(activeModal)
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
            Subject Information
          </Typography>
          <Controls.Input
            variant='outlined'
            label='Subject Title'
            name='subject'
            value={subjectData?.subject}
            changeFxn={handleChange}
            error={errors.subject}
          />
          <Controls.Input
            variant='outlined'
            label='Section'
            name='section'
            value={subjectData?.section}
            changeFxn={handleChange}
            error={errors.section}
          />
          <div className=''>
            <Controls.Button
              text={activeModal ? 'Save' : 'Submit'}
              size='small'
              type='submit'
            />
            <Controls.Button
              text={activeModal ? 'Cancel' : 'Reset'}
              onClick={() => {
                activeModal ? showForm.show(false) : resetsubject()
              }}
              size='small'
              type='reset'
            />
          </div>
        </div>
      </div>
    </Form>
  )
}

export default SubjectForm
