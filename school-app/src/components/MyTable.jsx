import React from 'react'
import { useStateValue } from '../StateProvider'
import { IconButton, Tooltip } from '@mui/material'
import { Search, Add, Visibility } from '@mui/icons-material'
import { DataGrid, GridToolbar, GridToolbarExport } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import Controls from './controls/Controls'
import { deleteData } from './commonFunctions'

export const useStyles = makeStyles((theme) => ({
  studentList: {
    padding: theme.spacing(1),
    minHeight: 'height: calc(100vh-200px);',
    width: '100%',
  },
  searchContainer: {
    minWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterConatiner: {
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(1),
    padding: '4px',
    '& .MuiFormControl-root': {
      minWidth: '200px',
      marginRight: theme.spacing(1),
    },
  },
  serchInput: {
    width: '75%',
  },
  detailsBtn: {
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    borderRadius: '10px',
    padding: '4px 8px',
    backgroundColor: '#22b14c',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '8px',
  },
  detailsIcon: {
    marginRight: '5px',
    fontSize: '16px',
  },
  actions: {
    display: 'flex',
    '& *': {
      flex: '1',
    },
  },
}))

function MyTable({ columns, data, label, actions = true }) {
  const [{ setNotify, setConfirmDialog, showForm }, dispatch] = useStateValue()

  const handleDelete = (id) => {
    const deleteCallback = () =>
      dispatch({ type: `DELETE_${label.toUpperCase()}`, data: id })
    setConfirmDialog({
      title: `Are you sure you want to Delete this ${label}?`,
      subtitle: "You can't undo this action!",
      open: true,
      callback: () => {
        deleteData(`/${label.toLowerCase()}s/${id}`, setNotify, deleteCallback)
        setNotify({ message: label + ' Deleted successfully', type: 'error' })
      },
    })
  }

  const classes = useStyles()
  const handleSearch = (e) => {}
  const displayNewForm = (e) => {
    const { show, title } = showForm
    title(`Add New ${label}`)
    show(true)
  }

  if (actions && columns[columns.length - 1]?.field !== 'actions')
    columns.push({
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      disableExport: true,
      filterable: false,
      width: 160,
      renderCell: (params) => (
        <div className={classes.actions}>
          <Link to={`${params.row.id}`} className='link'>
            <button onClick={() => {}} className={classes.detailsBtn}>
              <Visibility className={classes.detailsIcon} /> Details
            </button>
          </Link>
          <Tooltip title={'Delete ' + label}>
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteOutlineRoundedIcon style={{ color: 'red' }} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    })
  return (
    <>
      {actions && (
        <div className={classes.searchContainer}>
          <Controls.Input
            className={classes.serchInput}
            label={`Search ${label}s`}
            name={'query'}
            size='small'
            InputProps={{ startAdornment: <Search fontSize='small' /> }}
            onChange={handleSearch}
          />
          <Controls.Button
            text={'Add New'}
            variant='outlined'
            onClick={displayNewForm}
            startIcon={<Add />}
          />
        </div>
      )}
      <DataGrid
        className={classes.studentList}
        components={{ Toolbar: GridToolbar }}
        autoHeight
        rows={data || []}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 15, 25]}
        checkboxSelection
        disableSelectionOnClick
      />
    </>
  )
}

export default MyTable
