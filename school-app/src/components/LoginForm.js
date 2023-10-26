import Controls from './controls/Controls'
import {
  FormControl,
  FormHelperText,
  Grid,
  Paper,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Form, useForm } from './useForm'
import { makeStyles } from '@mui/styles'
import LockIcon from '@mui/icons-material/Lock'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined'
import { useStateValue } from '../StateProvider'
import instance from '../axios'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const initialFieldValues = {
  exam: '',
  regno: '',
  password: '',
}
const useStyles = makeStyles((theme) => ({
  loginForm: {
    margin: 'auto',
    maxWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    border: 'solid 1px darkblue',
    borderRadius: '10px',
    backgroundColor: '#fff',
    borderRadius: '12px !important',
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    objectFit: 'contain',
    height: '110px',
    width: '110px',
    display: 'block',
    margin: theme.spacing(1) + ' auto',
    border: ' solid 2px ' + theme.palette.background.mine,
    borderRadius: '50%',
  },
  title: {
    padding: theme.spacing(1),
    textAlign: 'center',
  },
}))

function LoginForm({ isAdmin = false }) {
  const validate = (fields = values) => {
    const temp = { ...errors }
    if ('exam' in fields) temp.exam = fields.exam ? '' : 'Please Select Exam'
    if ('regno' in fields)
      temp.regno = /.+/.test(fields.regno)
        ? ''
        : isAdmin
        ? 'Invalid Username'
        : 'Invalid Registration Number'
    if ('password' in fields)
      temp.password = fields.password?.length
        ? ''
        : 'There should be atleast 10 characters'

    setErrors({ ...temp })
    if (isAdmin) delete temp['exam']
    if (fields === values) return Object.values(temp).every((x) => x === '')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      instance({
        url: isAdmin ? '/users/login' : '/students/login',
        method: 'POST',
        data: {
          ...values,
          email: values.regno,
        },
      })
        .then((res) => {
          if (res.data.status === 'success') {
            setMessage({ message: 'Login Successfully', type: 'success' })
            const { token } = res.data
            localStorage.setItem('token', token)
            dispatch({ type: 'SET_TOKEN', data: token })

            if (!isAdmin) {
              const { student, exam } = res.data
              dispatch({ type: 'SET_USER', data: student })
              dispatch({ type: 'SET_ACTIVE_EXAM', data: exam })
            }

            setTimeout(
              () =>
                navigate(isAdmin ? '/admin/dashboard' : '/preview', {
                  replace: true,
                }),
              1500
            )
          } else {
            setMessage({ message: res.data.message, type: 'error' })
          }
        })
        .catch((err) => {
          setMessage({
            message: err.response?.data.message || err.message,
            type: 'error',
          })
        })
    }
  }

  //state variables
  const navigate = useNavigate()
  const [{ setNotify }, dispatch] = useStateValue()
  const [message, setMessage] = useState({ message: '', type: 'success' })
  const classes = useStyles()
  const [values, setvalues, resetvalues, errors, setErrors, handleChange] =
    useForm(initialFieldValues, true, validate)

  return (
    <Paper className={classes.loginForm} elevation={12}>
      <div className=''>
        <img src={logo} className={classes.logo} />
        <Typography variant='h6' component={'div'} className={classes.title}>
          Signin
        </Typography>
      </div>
      <Notification top={'10vh'} notify={message} setNotify={setMessage} />
      <Form onSubmit={handleSubmit}>
        <Controls.Input
          variant='outlined'
          label={isAdmin ? 'Username' : 'Registration Number'}
          size={isAdmin ? 'medium' : 'small'}
          value={values?.regno}
          InputProps={{
            startAdornment: <AccountCircleOutlinedIcon color='primary' />,
          }}
          name='regno'
          changeFxn={handleChange}
          error={errors.regno}
        />
        <Controls.Input
          variant='outlined'
          label='Password'
          type='password'
          InputProps={{ startAdornment: <LockIcon color='primary' /> }}
          size={isAdmin ? 'medium' : 'small'}
          value={values?.password}
          name='password'
          changeFxn={handleChange}
          error={errors.password}
        />
        <div className={classes.actionsContainer}>
          <Controls.Button
            text='Submit'
            onClick={() => {}}
            size='medium'
            type='submit'
            color={'primary'}
          />
        </div>
      </Form>
    </Paper>
  )
}

export default LoginForm
