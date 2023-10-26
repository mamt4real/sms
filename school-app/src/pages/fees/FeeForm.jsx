import Controls from '../../components/controls/Controls'
import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Form, useForm } from '../../components/useForm'
import { useStateValue } from '../../StateProvider'
import { addEditSubmit } from '../../components/commonFunctions'

const initialFieldValues = {
  id: 0,
  feeName: '',
  section: '',
}

function FeeForm({}) {
  const [{ activeModal, showForm, setNotify }, dispatch] = useStateValue()

  const validate = (fields = feeData) => {
    const temp = { ...errors }
    if ('feeName' in fields)
      temp.feeName = fields.feeName ? '' : 'Fee title is required'

    setErrors({ ...temp })
    if (fields === feeData) return Object.values(temp).every((x) => x === '')
  }

  const [feeData, setfee, resetfee, errors, setErrors, handleChange] = useForm(
    activeModal || initialFieldValues,
    true,
    validate
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const action = activeModal ? 'edit' : 'add'
    if (validate()) {
      addEditSubmit('/fees', feeData, action, setNotify, (data) => {
        dispatch({
          type: `${action === 'edit' ? 'UPDATE' : 'ADD'}_FEE`,
          data,
        })
        activeModal &&
          dispatch({
            type: 'SET_ACTIVE_MODAL',
            data: { ...data, payments: feeData.payments },
          })

        showForm.show(false)
      })
    }
  }

  useEffect(() => {
    activeModal && setfee(activeModal)
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
            Fee Information
          </Typography>
          <Controls.Input
            variant='outlined'
            label='Fee Title'
            name='feeName'
            value={feeData?.feeName}
            changeFxn={handleChange}
            error={errors.feeName}
          />
          <Controls.Input
            variant='outlined'
            label='Section'
            name='section'
            value={feeData?.section}
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
                activeModal ? showForm.show(false) : resetfee()
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

export default FeeForm
