import { Alert, Snackbar } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(12),
  },
}))

function Notification({ notify, setNotify }) {
  const classes = useStyles()
  const handleClose = () => {
    setNotify({ ...notify, message: '' })
  }
  return (
    <Snackbar
      open={notify.message ? true : false}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert
        severity={notify.type}
        onClose={handleClose}
        className={classes.root}
      >
        {notify.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
