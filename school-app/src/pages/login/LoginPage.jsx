import { makeStyles } from '@mui/styles'
import React from 'react'
import LoginForm from '../../components/LoginForm'
import background2 from '../../assets/background1.jpg'
import { Stack, Typography } from '@mui/material'

const useStyles = makeStyles((theme) => ({
  loginPage: {
    display: 'grid',
    placeItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#ededed',
  },
  centerContainer: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    justifyContent: 'space-between',
    borderRadius: '12px',
    display: 'flex',
    backgroundImage: `url(${background2})`,
    marginTop: '-50px',
    height: '90vh',
    width: '70vw',
    '& > div': {
      flex: '1',
      borderCollapse: 'collapse',
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      width: '90vw',
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
    },
  },
  leftContainer: {
    overflowY: 'scroll',
    color: '#fff',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  formWrapper: {
    display: 'grid',
    placeItems: 'center',
  },
}))

function LoginPage() {
  const classes = useStyles()
  return (
    <div className={classes.loginPage}>
      <div className={`${classes.centerContainer} shadowed`}>
        <div className={classes.leftContainer}>
          <Stack spacing={6}>
            <div>
              <Typography fontSize={28} variant='h6'>
                Admissiom Requirements
              </Typography>
              <Typography paragraph fontSize={22} sx={{ mt: '16px' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                sed libero porro omnis sunt dolore blanditiis provident tempora,
                excepturi sit repudiandae assumenda animi numquam est. Quidem
                quod doloribus ullam eius?
              </Typography>
            </div>
            <div>
              <Typography fontSize={28} variant='h6'>
                Admissiom Requirements
              </Typography>
              <Typography paragraph fontSize={22} sx={{ mt: '16px' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                sed libero porro omnis sunt dolore blanditiis provident tempora,
                excepturi sit repudiandae assumenda animi numquam est. Quidem
                quod doloribus ullam eius?
              </Typography>
            </div>
          </Stack>
        </div>
        <div className={classes.formWrapper}>
          <LoginForm isAdmin={true} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
