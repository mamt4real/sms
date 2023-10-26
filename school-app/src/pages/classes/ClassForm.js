import Controls from '../../components/controls/Controls'
import React, { useEffect } from 'react'
import { Form, useForm } from '../../components/useForm'
import { useStateValue } from '../../StateProvider'
import { addEditSubmit } from '../../components/commonFunctions'

const initialFieldValues = {
  id: 0,
  class: '',
  master: '',
  subjects: [],
}

function ClassForm() {
  const [{ activeModal, showForm, setNotify, staffs }, dispatch] =
    useStateValue()

  const validate = (fields = classData) => {
    const temp = { ...errors }
    if ('class' in fields)
      temp.class = fields.class ? '' : 'class name is required'
    if ('master' in fields)
      temp.master = fields.master ? '' : 'Class Teacher is required'

    setErrors({ ...temp })
    if (fields === classData) return Object.values(temp).every((x) => x === '')
  }

  const [classData, setclass, resetclass, errors, setErrors, handleChange] =
    useForm(activeModal || initialFieldValues, true, validate)

  const handleSubmit = (e) => {
    e.preventDefault()
    const action = activeModal ? 'edit' : 'add'
    if (validate()) {
      const model = { ...classData }
      delete model.subjects
      addEditSubmit('/classes', model, action, setNotify, (data) => {
        dispatch({
          type: `${action === 'edit' ? 'UPDATE' : 'ADD'}_CLASS`,
          data: {
            ...data,
            master: staffs.find((stf) => stf.id === data.master)?.name,
            ...(action === 'add' ? { noOfStudents: 0 } : {}),
          },
        })
        activeModal &&
          dispatch({
            type: 'SET_ACTIVE_MODAL',
            data: {
              ...data,
              master: staffs.find((stf) => stf.id === data.master)?.name,
              students: classData?.students,
              subjects: classData?.subjects,
            },
          })
        showForm.show(false)
      })
    }
  }

  useEffect(() => {
    activeModal && setclass(activeModal)
  }, [activeModal])

  return (
    <Form onSubmit={handleSubmit}>
      <div className='userShow__bottom form'>
        <div className='userShow__bottomGroup addEditForm'>
          <Controls.Input
            variant='outlined'
            label='Class Name'
            name='class'
            value={classData?.class}
            changeFxn={handleChange}
            error={errors.class}
          />
          <Controls.Input
            variant='outlined'
            label='Block'
            name='block'
            value={classData?.block}
            changeFxn={handleChange}
            error={errors.block}
          />
          <Controls.SelectStaff
            name='master'
            handleChange={handleChange}
            value={classData?.master?._id || classData?.master}
            error={errors.master}
          />
          <div className='actions container'>
            <Controls.Button
              text={activeModal ? 'Save' : 'Submit'}
              size='small'
              type='submit'
            />
            <Controls.Button
              text={activeModal ? 'Cancel' : 'Reset'}
              onClick={() => {
                activeModal ? showForm.show(false) : resetclass()
              }}
              size='small'
              color={'secondary'}
            />
          </div>
        </div>
      </div>
    </Form>
  )
}

export default ClassForm
