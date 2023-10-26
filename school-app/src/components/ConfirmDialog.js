import NotListedLocationIcon from '@mui/icons-material/NotListedLocation'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Controls from './controls/Controls'

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    top: theme.spacing(3) + ' !important',
  },
  dialogContent: {
    textAlign: 'center',
  },
  dialogActions: {
    justifyContent: 'center',
  },
}))

function ConfirmDialog({ options, setOptions }) {
  const classes = useStyles()
  const closeFxn = () => [setOptions({ ...options, open: false })]
  return (
    <Dialog open={options.open} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogContent}>
        <IconButton
          disableRipple
          size='large'
          style={{ padding: '10px', backgroundColor: 'red' }}
        >
          <NotListedLocationIcon fontSize='large' style={{ color: '#FFF' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <Typography variant='h6' component={'div'}>
          {options.title}
        </Typography>
        <Typography variant='subtitle' component={'div'}>
          {options.subtitle}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Controls.Button text='No' color='secondary' onClick={closeFxn} />
        <Controls.Button
          text='Yes'
          color='primary'
          onClick={() => {
            options.callback()
            closeFxn()
          }}
        />
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
