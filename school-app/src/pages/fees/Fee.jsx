import React, { useEffect, useState } from 'react'
import {
  Key,
  Home,
  Edit,
  Add,
  Paid,
  Delete,
  Numbers,
  PaidTwoTone,
  PaidOutlined,
} from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import useApidata from '../../useApi'
import { useOutletContext } from 'react-router-dom'
import { Button, IconButton, Tooltip } from '@mui/material'
import { useStateValue } from '../../StateProvider'
import Controls from '../../components/controls/Controls'
import Popup from '../../components/Popup'
import { addEditSubmit, deleteData } from '../../components/commonFunctions'
import CurrencyFormat from 'react-currency-format'
import Payments from './Payments'
import Loading from '../../components/loading/Loading'

function Fee() {
  const { feeID } = useParams()
  const setSubtitle = useOutletContext()[0]
  const [{ showForm, activeModal: fee }, dispatch] = useStateValue()
  const [url, setUrl] = useState(`/fees/${feeID}`)
  const [feeData, stLoading, stError] = useApidata(url)
  // const [fee, setfee] = useState({})
  const [showfeesEdit, setShowfees] = useState(false)
  const [edited, setEdited] = useState(null)

  const reloadFunction = () => {
    // const newUrl = url.endsWith('?')
    //   ? url.substring(0, url.length - 1)
    //   : url + '?'
    // setUrl(newUrl)
  }

  useEffect(() => {
    setSubtitle('Fee Information')
    return () => dispatch({ type: 'SET_ACTIVE_MODAL', data: null })
  }, [])

  useEffect(() => {
    // setfee(feeData.doc)
    dispatch({ type: 'SET_ACTIVE_MODAL', data: feeData.doc })
  }, [stLoading])

  // if (stLoading) return <Loading />
  if (stError) return <div>Error....</div>
  return stLoading ? (
    <Loading />
  ) : (
    <div>
      <div className='user__userContainer'>
        <div
          className='class__top shadowed'
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <div className='user__userShow classPage'>
            <div className='modal_pageHeader'>
              <div className='userShow__top'>
                <div className='userShow__topTitle'>
                  <span className='username'>{fee?.feeName}</span>
                  <span className='jobtitle'>{fee?.section || 'JUNIOR'}</span>
                </div>
                <IconButton
                  color='primary'
                  onClick={() => {
                    showForm.title('Edit Fee')
                    showForm.show(true)
                  }}
                >
                  <Tooltip title='Edit fee'>
                    <Edit />
                  </Tooltip>
                </IconButton>
              </div>
            </div>
            <div className='userShow__bottom'>
              <div className='userShow__bottomGroup'>
                <span className='title'>Fee Information</span>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <Key className='userShow__icon' />
                    Title:{' '}
                  </span>
                  <span className='infoTitle'>
                    {fee?.feeName || 'Fee Name'}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    {' '}
                    <Home className='userShow__icon' />
                    Section:{' '}
                  </span>
                  <span className='infoTitle'>{fee?.section || 'Senior'}</span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <Numbers className='userShow__icon' />
                    Amount Paid :{' '}
                  </span>
                  <CurrencyFormat
                    renderText={(value) => (
                      <h4 className='infoTitle'>{value}</h4>
                    )}
                    decimalScale={2}
                    value={fee?.payments?.reduce((t, p) => t + p.paid, 0)}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix='₦'
                  />
                </div>
              </div>
              <div className='userShow__bottomGroup'>
                <span className='title'>Payment Progress</span>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <Paid className='userShow__icon' />
                    Paid:{' '}
                  </span>
                  <span className='infoTitle'>
                    {fee?.payments?.filter((p) => p.status === 'Paid')?.length}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <PaidTwoTone className='userShow__icon' />
                    Deposit:{' '}
                  </span>
                  <span className='infoTitle'>
                    {
                      fee?.payments?.filter((p) => p.status === 'Deposit')
                        ?.length
                    }
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <PaidOutlined className='userShow__icon' />
                    Not Paid:{' '}
                  </span>
                  <span className='infoTitle'>
                    {
                      fee?.payments?.filter((p) => p.status === 'Not Paid')
                        ?.length
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              flex: 0.8,
            }}
          >
            <div className='modal_pageHeader'>
              <h4 className='username'>Classes</h4>
              <Tooltip title='Add fee Teacher'>
                <IconButton
                  onClick={() => {
                    setEdited(null)
                    setShowfees(true)
                  }}
                  color='primary'
                >
                  <Add />
                </IconButton>
              </Tooltip>
            </div>
            <FeeClasses
              groupings={feeData.stats}
              // setGroupings={(groups) => setfee({ ...fee, groupings: groups })}
              fee={fee?._id}
              editFunction={(row) => {
                setEdited(row)
                setShowfees(true)
              }}
              reloadFunction={reloadFunction}
            />
          </div>
        </div>
      </div>
      <div className='payments__section'>
        <Payments
          payments={fee?.payments}
          feeName={fee?.feeName}
          paymentTitle={`${fee?.feeName} Payment Records`}
        />
      </div>
      <Popup
        title={`Add ${fee?.feeName} Fee to Class`}
        open={showfeesEdit}
        setOpen={setShowfees}
      >
        <RegisterFeeToClass
          fee={fee?._id}
          close={() => setShowfees(false)}
          edited={edited}
          reloadFunction={reloadFunction}
        />
      </Popup>
    </div>
  )
}

const FeeClasses = ({
  groupings,
  setGroupings,
  fee,
  editFunction,
  reloadFunction,
}) => {
  const { setConfirmDialog, setNotify } = useStateValue()[0]

  const deleteFunction = (row) => {
    const deleteCallback = () => {
      // setGroupings(groupings.filter((g) => g._id !== row._id))
      reloadFunction()
    }
    setConfirmDialog({
      open: true,
      title: 'Are you sure you want to delete this grouping?',
      subtitle: 'You cant reverse this action',
      callback: () => {
        deleteData(`/fees/${fee}/class`, setNotify, deleteCallback, {
          classID: row.classID,
        })
      },
    })
  }
  return (
    <table border='border' className='teaching__subs'>
      <thead>
        <tr>
          <th className='numbering'>S/N</th>
          <th className='fee'>Class</th>
          <th className='class'>Amount</th>
          <th className='class'></th>
        </tr>
      </thead>
      <tbody>
        {groupings?.map((row, i) => (
          <tr key={row._id}>
            <td className='numbering'>{i + 1}</td>
            <td className='fee'>{row.class}</td>
            <td className='class amount'>
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <h4>{value}</h4>
                  </>
                )}
                decimalScale={2}
                value={row.amount}
                displayType={'text'}
                thousandSeparator={true}
                prefix='₦'
              />
            </td>
            <td className='class'>
              <div className='actions container'>
                <Tooltip title='Edit Fee Amount'>
                  <IconButton color='primary' onClick={() => editFunction(row)}>
                    <Edit fontSize='small' />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Remove Fee from Class'>
                  <IconButton
                    color='secondary'
                    onClick={() => deleteFunction(row)}
                  >
                    <Delete fontSize='small' />
                  </IconButton>
                </Tooltip>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const RegisterFeeToClass = ({ close, fee, edited, reloadFunction }) => {
  const [details, setDetails] = useState(
    edited
      ? { ...edited, classes: [edited.classID] }
      : { fee, classes: [], amount: 0 }
  )
  const { setNotify } = useStateValue()[0]

  const addfee = () => {
    addEditSubmit(
      `/fees/${fee}/class`,
      { fee, ...details },
      'add',
      setNotify,
      () => {
        reloadFunction()
        close()
      }
    )
  }

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value })

  return (
    <div className='userShow__bottomGroup addEditForm'>
      <Controls.SelectClass
        style={{ marginBottom: '8px' }}
        handleChange={handleChange}
        required
        multiple
        name='classes'
        value={details.classes}
      />
      <Controls.Input
        value={details.amount}
        required
        name='amount'
        label={'Amount'}
        type='number'
        changeFxn={handleChange}
      />

      <div
        className=''
        style={{
          padding: '8px',
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '8px',
        }}
      >
        <Button variant='contained' color='secondary' onClick={close}>
          Cancel
        </Button>
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={addfee}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default Fee
