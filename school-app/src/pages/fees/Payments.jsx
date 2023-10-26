import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import MyImg from '../../components/MyImg'
import { Delete, Edit, Update, Visibility } from '@mui/icons-material'
import { IconButton, Tooltip, Typography } from '@mui/material'
import MyTable, { useStyles } from '../../components/MyTable'
import { Form, useForm } from '../../components/useForm'
import Controls from '../../components/controls/Controls'
import Popup from '../../components/Popup'
import {
  addEditSubmit,
  deleteData,
  formatDate,
} from '../../components/commonFunctions'
import { useStateValue } from '../../StateProvider'

function Payments({ payments, feeName, isStudent = false, paymentTitle }) {
  const classes = useStyles()
  const [showForm, setShowForm] = useState(false)
  const [{ setNotify, setConfirmDialog }, dispatch] = useStateValue()
  const [normalizePayments, setNormalizePayments] = useState(
    getNormalizePayments(payments)
  )
  const [payment, setPayment] = useState({})
  const [filters, setFilters] = useState({ class: '', section: '' })

  useEffect(() => {
    setNormalizePayments(getNormalizePayments(payments))
  }, [payments])

  useEffect(() => {
    setNormalizePayments(
      getNormalizePayments(payments)?.filter((p) => {
        return (
          (p.classID === filters.class || filters.class === '') &&
          (p.section === filters.section || filters.section === '')
        )
      })
    )
  }, [filters])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const columns = [
    {
      field: 'fullname',
      headerName: 'Student',
      width: 250,
      valueGetter: (params) => params.row.name,
      renderCell: (params) => {
        return (
          <div className='users__user'>
            <MyImg src={params.row.passport} alt='' className='user__image' />
            {params.row.name}
          </div>
        )
      },
    },
    { field: 'regno', headerName: 'Reg. No', width: 150 },
    { field: 'class', headerName: 'Class', width: 130 },
    { field: 'session', headerName: 'Session', width: 130 },
    { field: 'term', headerName: 'Term', width: 130 },
    {
      field: 'paid',
      headerName: 'Paid',
      width: 130,
      renderCell: (params) => (
        <CurrencyFormat
          renderText={(value) => <h4>{value}</h4>}
          decimalScale={2}
          value={params.row.paid}
          displayType={'text'}
          thousandSeparator={true}
          prefix='₦'
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      valueGetter: (params) => params.row.status,
      renderCell: (params) => (
        <span
          className={`status-button ${params.row.status
            ?.toLowerCase()
            .replace(' ', '-')}`}
        >
          {params.row.status}
        </span>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      disableExport: true,
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params) => (
        <div
          style={{ justifyContent: 'center', display: 'flex', width: '100%' }}
        >
          <Tooltip
            title={
              params.row.status === 'Paid' ? 'View Details' : 'Update Payment'
            }
          >
            <IconButton
              onClick={() => {
                setPayment(params.row)
                setShowForm(true)
              }}
              className={classes.detailsBtn}
            >
              {params.row.status === 'Paid' ? (
                <Visibility className={classes.detailsIcon} color='primary' />
              ) : (
                <Edit className={classes.detailsIcon} />
              )}
              {/* {params.row.status === 'Paid' ? 'Details' : 'Update'} */}
            </IconButton>
          </Tooltip>
          {params.row.paid === 0 && (
            <Tooltip title='Deregister Fee'>
              <IconButton onClick={() => deleteFee(params.row.id)}>
                <Delete className={classes.detailsIcon} color='secondary' />
              </IconButton>
            </Tooltip>
          )}
        </div>
      ),
    },
  ]

  const deleteFee = (id) => {
    const deleteCallback = () =>
      setNormalizePayments(normalizePayments.filter((p) => p.id !== id))
    setConfirmDialog({
      title: `Are you sure you want to Remove this record`,
      subtitle: "You can't undo this action!",
      open: true,
      callback: () => {
        deleteData(`/payments/${id}`, setNotify, deleteCallback)
        setNotify({ message: 'Fee Removed successfully', type: 'error' })
      },
    })
  }

  isStudent &&
    columns.splice(0, 2, {
      field: 'feeName',
      headerName: 'Fee Type',
      width: 280,
    })
  return (
    <div className='payments shadowed'>
      <div className={classes.searchContainer}>
        <Typography component={'div'} variant='h6'>
          {paymentTitle}
        </Typography>
        <div className={classes.filterConatiner}>
          <Controls.SelectClass
            value={filters.class}
            handleChange={handleFilterChange}
            name='class'
          />
          <Controls.SelectSection
            value={filters.section}
            handleChange={handleFilterChange}
            name='section'
          />
        </div>
      </div>
      <MyTable
        columns={columns}
        data={normalizePayments}
        label='Payment'
        actions={false}
      />
      <Popup
        title={`${feeName ? feeName + ' Fee ' : ''}Payment Details`}
        open={showForm}
        setOpen={setShowForm}
      >
        <UpdatePayment details={payment} close={() => setShowForm(false)} />
      </Popup>
    </div>
  )
}

const UpdatePayment = ({ details, close }) => {
  const { setNotify } = useStateValue()[0]

  const [updateInfo, setUpdateInfo] = useState({
    paid: 0,
    paymentRef: '',
    pMethod: 'Cash',
  })

  const validate = (fields = formDetails) => {
    const temp = { ...errors }
    if ('paid' in fields)
      temp.paid =
        fields.paid <= details?.balance && fields.paid > 0
          ? ''
          : 'Invalid Amount'

    setErrors({ ...temp })
    if (fields === formDetails)
      return Object.values(temp).every((x) => x === '')
  }

  const [formDetails, setfee, resetfee, errors, setErrors, handleChange] =
    useForm(updateInfo, true, validate)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      const model = {
        ...formDetails,
        _id: details.id,
        paid: parseFloat(details.paid + '') + parseFloat(formDetails.paid + ''),
        datePaid: Date(),
      }
      addEditSubmit('/payments', model, 'edit', setNotify, () => close())
    }
    //
  }

  return (
    <div className='updateFee'>
      <div
        className='updateFee__info'
        {...(details?.balance <= 0 && { style: { minWidth: '380px' } })}
      >
        <div className='userShow__top'>
          <MyImg src={details?.passport} alt='' className='user__image' />
          <div className='userShow__topTitle'>
            <span className='username'>{details?.name}</span>
            <span className='jobtitle'>{details?.regno}</span>
          </div>
        </div>
        <div className='userShow__info'>
          <span className='infoTitle key'>Class:</span>
          <span className='infoTitle'>{details?.class}</span>
        </div>
        <div className='userShow__info'>
          <span className='infoTitle key'>Session:</span>
          <span className='infoTitle'>{details?.session}</span>
        </div>
        <div className='userShow__info'>
          <span className='infoTitle key'>Term:</span>
          <span className='infoTitle'>{details?.term}</span>
        </div>
        <div className='userShow__info'>
          <span className='infoTitle key'>Total fee:</span>
          <CurrencyFormat
            renderText={(value) => <span className='infoTitle'>{value}</span>}
            decimalScale={2}
            value={details?.amount}
            displayType={'text'}
            thousandSeparator={true}
            prefix='₦'
          />
        </div>
        <div className='userShow__info'>
          <span className='infoTitle key'>Status:</span>
          <span className='infoTitle'>{details?.status}</span>
        </div>
        {details.status !== 'Paid' && (
          <>
            <div className='userShow__info'>
              <span className='infoTitle key'>Amount Paid:</span>
              <CurrencyFormat
                renderText={(value) => (
                  <span className='infoTitle'>{value}</span>
                )}
                decimalScale={2}
                value={details?.paid}
                displayType={'text'}
                thousandSeparator={true}
                prefix='₦'
              />
            </div>
            <div className='userShow__info'>
              <span className='infoTitle key'>Balance:</span>
              <CurrencyFormat
                renderText={(value) => (
                  <span className='infoTitle'>{value}</span>
                )}
                decimalScale={2}
                value={details?.balance}
                displayType={'text'}
                thousandSeparator={true}
                prefix='₦'
              />
            </div>
          </>
        )}
        {details?.balance <= 0 && (
          <>
            <div className='userShow__info'>
              <span className='infoTitle key'>Date Paid:</span>
              <span className='infoTitle'>
                {formatDate(details?.datePaid, true)}
              </span>
            </div>
            <div className='userShow__info'>
              <span className='infoTitle key'>Pay Method:</span>
              <span className='infoTitle'>{details?.pMethod}</span>
            </div>
            <div className='actions container'>
              <Controls.Button
                text={'Close'}
                onClick={() => close()}
                size='small'
                type='reset'
                color={'secondary'}
              />
              <Controls.Button text='Print' size='small' />
            </div>
          </>
        )}
      </div>
      {details?.balance > 0 && (
        <div className='updateFee__update'>
          <Form onSubmit={handleSubmit}>
            <Typography
              variant='subtitle'
              className='formgroup__title'
              component={'div'}
            >
              Update Payment
            </Typography>
            <Controls.Input
              variant='outlined'
              label='Amount'
              name='paid'
              type='number'
              value={formDetails.paid}
              changeFxn={handleChange}
              error={errors.paid}
            />
            <Controls.Input
              variant='outlined'
              label='Ref / Teller No'
              name='paymentRef'
              value={formDetails?.paymentRef}
              changeFxn={handleChange}
              error={errors.paymentRef}
            />
            <Controls.Select
              changeFunction={handleChange}
              value={formDetails?.pMethod}
              name='pMethod'
              label={'Payment Method'}
              error={errors.pMethod}
              options={['Cash', 'Bank']}
            />
            <div className='actions container'>
              <Controls.Button
                text={'Reset'}
                onClick={() => resetfee()}
                size='small'
                type='reset'
                color={'secondary'}
              />
              <Controls.Button text={'Update'} size='small' type='submit' />
            </div>
          </Form>
        </div>
      )}
    </div>
  )
}

const getNormalizePayments = (payments) =>
  payments?.map((p) => ({
    id: p._id,
    name: p.student?.name,
    passport: p.student?.passport || 'default.jpg',
    regno: p.student?.regno,
    amount: p.amount,
    status: p.status,
    balance: p.amount - p.paid,
    class: p.class?.class,
    classID: p.class?._id,
    paid: p.paid,
    term: p.section?.term,
    session: p.section?.session,
    section: p.section?._id,
    datePaid: p.datePaid,
    pMethod: p.pMethod,
    feeName: p.fee?.feeName,
  }))

export default Payments
