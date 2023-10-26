import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  InputLabel,
  Tooltip,
  FormHelperText,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import Popup from './Popup'
import instance from '../axios'
import UploadIcon from '@mui/icons-material/Upload'
import { FilePresent } from '@mui/icons-material'
import { useStateValue } from '../StateProvider'
import readXlsxFile from 'read-excel-file'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'inline-flex',
    maxWidth: 'fit-content',
    flexDirection: 'column',
    // padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    '& .MuiFormControl-root': {
      marginBottom: theme.spacing(2),
    },
    // border: 'solid 1px darkgreen',
    // borderRadius: theme.spacing(0.5),
  },
  formRow: {
    display: 'flex',
    maxWidth: '280px',
    justifyContent: 'flex-start',
    // marginTop: theme.spacing(1),
    alignItems: 'center',
    // padding: theme.spacing(0.8),
  },
  chooseFile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
    height: '45px',
    width: '45px',
    padding: theme.spacing(1) + ' !important',
    marginRight: theme.spacing(1),
    border: 'solid 1px ' + theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'rgba(5,5,5,0.1)',
    },
  },
}))

function UploadForm({
  url,
  method = 'patch',
  schema,
  text,
  children,
  callback,
  uploadParams = {},
}) {
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState([])
  const [showError, setShowError] = useState(false)
  const [selectText, setText] = useState('No file selected')

  const { setNotify: setMessage } = useStateValue()[0]

  const [fileRows, setFileRows] = useState({ errors: [], rows: [] })

  const handleFileChange = (e) => {
    readXlsxFile(e.target.files[0], {
      schema,
    })
      .then((rows) => {
        setFileRows(rows)
        setText(e.target.files[0].name)
      })
      .catch((err) => console.log(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUploading(true)
    if (fileRows?.errors.length === 0) {
      // upload to url
      if (url)
        instance({
          method,
          url,
          data: {
            [text.toLowerCase()]: fileRows.rows,
            ...uploadParams,
          },
        })
          .then((res) => {
            const type = res.data.status === 'success' ? 'success' : 'error'
            setMessage({ message: res.data.message, type })
            callback && callback(res.data.data)
          })
          .catch((err) =>
            setMessage({
              message: err.response?.data.message || err.message,
              type: 'error',
            })
          )
    } else {
      setErrors(fileRows.errors)
      setShowError(true)
      e.target.reset()
    }
    setUploading(false)
  }
  const classes = useStyles()

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {/* <Typography variant='h6'>Upload {text}</Typography> */}
      {children}
      <div className={classes.formRow}>
        <InputLabel htmlFor='file' className={classes.chooseFile}>
          <Tooltip title='Choose File'>
            <FilePresent color='primary' />
          </Tooltip>
        </InputLabel>
        <Input
          type='file'
          style={{ display: 'none' }}
          required
          id='file'
          variant='outlined'
          inputProps={{
            accept:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .csv',
          }}
          onChange={handleFileChange}
        />
        <LoadingButton
          type='submit'
          loading={uploading}
          loadingIndicator='Uploading...'
          variant='outlined'
          endIcon={<UploadIcon />}
        >
          Upload {text}
        </LoadingButton>
      </div>

      <FormHelperText style={{ textAlign: 'center' }}>
        {selectText}
      </FormHelperText>
      <Popup
        title={'Error Uploading ' + text}
        open={showError}
        setOpen={setShowError}
      >
        <ShowExcelError errors={errors} />
      </Popup>
    </form>
  )
}

const ShowExcelError = ({ errors }) => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Row Number</TableCell>
              <TableCell>Column</TableCell>
              <TableCell>Error</TableCell>
              <TableCell>Value Given</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {errors?.map((err, i) => (
              <TableRow key={i}>
                <TableCell>{err.row}</TableCell>
                <TableCell>{err.column}</TableCell>
                <TableCell>{err.error}</TableCell>
                <TableCell>{err.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UploadForm
