import React, { useEffect, useState } from 'react'
import {
  CalendarToday,
  EmailOutlined,
  PermIdentity,
  PhoneAndroid,
  TrendingUp,
  AccountBalance,
  Book,
  Male,
  Key,
  Female,
  LocationCity,
  Edit,
} from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import useApidata from '../../useApi'
import { useOutletContext } from 'react-router-dom'
import MyImg from '../../components/MyImg'
import { formatDate } from '../../components/commonFunctions'
import { useStateValue } from '../../StateProvider'
import { IconButton, Tooltip } from '@mui/material'
import Loading from '../../components/loading/Loading'

function Staff() {
  const setSubtitle = useOutletContext()[0]
  const [{ showForm, activeModal: staff }, dispatch] = useStateValue()

  useEffect(() => {
    setSubtitle('Staff Information')
    return () => dispatch({ type: 'SET_ACTIVE_MODAL', data: null })
  }, [])

  const { staffID } = useParams()
  // const [staff, setstaff] = useState({})

  const [staffData, stLoading, stError] = useApidata(`/users/${staffID}`)

  useEffect(() => {
    // setstaff(staffData)
    dispatch({ type: 'SET_ACTIVE_MODAL', data: staffData })
  }, [stLoading])

  // if (stLoading) return <div>Loading....</div>
  if (stError) return <div>Error....</div>
  return stLoading ? (
    <Loading />
  ) : (
    <div>
      <div className='user__userContainer'>
        <div
          className='staff__top shadowed'
          style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
        >
          <div className='user__userShow'>
            <div className='userShow__top'>
              <MyImg src={staff?.image} alt='' className='user__image' />
              <div className='userShow__topTitle'>
                <span className='username'>{staff?.name}</span>
                <span className='jobtitle'>{staff?.staffno || 'SF001'}</span>
              </div>
              <IconButton
                variant='contained'
                onClick={() => {
                  showForm.title('Edit Staff')
                  showForm.show(true)
                }}
              >
                <Tooltip title='Edit Staff Information'>
                  <Edit color='primary' />
                </Tooltip>
              </IconButton>
            </div>
            <div className='userShow__bottom'>
              <div className='userShow__bottomGroup'>
                <span className='title'>Bio-Data</span>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <PermIdentity className='userShow__icon' />
                    Firstname:{' '}
                  </span>
                  <span className='infoTitle'>
                    {staff?.fname || staff?.name?.split(' ')[0] || 'Firstname'}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <PermIdentity className='userShow__icon' />
                    Middlename:{' '}
                  </span>
                  <span className='infoTitle'>
                    {staff?.mname || staff?.name?.split(' ').length === 3
                      ? staff?.name?.split(' ')[1]
                      : ''}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    {' '}
                    <PermIdentity className='userShow__icon' />
                    Surname:{' '}
                  </span>
                  <span className='infoTitle'>
                    {staff?.surname ||
                      staff?.name?.split(' ').pop() ||
                      'Surname'}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    {['Male', 'male', 'MALE'].includes(staff?.gender) ? (
                      <Male className='userShow__icon' />
                    ) : (
                      <Female className='userShow__icon' />
                    )}
                    Gender:{' '}
                  </span>
                  <span className='infoTitle'>{staff?.gender || 'Male'}</span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <CalendarToday className='userShow__icon' />
                    Dob:{' '}
                  </span>
                  <span className='infoTitle'>
                    {formatDate(staff?.dob) || '12 Jan, 1989'}
                  </span>
                </div>
              </div>
              <div className='userShow__bottomGroup'>
                <span className='title'>Academics</span>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <Key className='userShow__icon' />
                    Staff Number :{' '}
                  </span>
                  <span className='infoTitle'>
                    {staff?.staffno || 'SF0001'}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <CalendarToday className='userShow__icon' />
                    Date Appointed:{' '}
                  </span>
                  <span className='infoTitle'>
                    {formatDate(staff?.appointmentDate)}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <TrendingUp className='userShow__icon' />
                    Level :{' '}
                  </span>
                  <span className='infoTitle'>
                    {staff?.level || '8'} / {staff?.gradeLevel || '3'}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <Book className='userShow__icon' />
                    Qualification:{' '}
                  </span>
                  <span className='infoTitle'>
                    {staff?.qualification || 'Bsc. Mathematics'}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <PermIdentity className='userShow__icon' />
                    Position :{' '}
                  </span>
                  <span className='infoTitle'>
                    {staff?.clearance?.toUpperCase() || 'Teacher'}
                  </span>
                </div>
              </div>
              <div className='userShow__bottomGroup'>
                <span className='title'>Contact Information</span>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <PhoneAndroid className='userShow__icon' />
                    Mobile :{' '}
                  </span>
                  <span className='infoTitle'>
                    {staff?.phone || '+234 807 3456 1234'}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <EmailOutlined className='userShow__icon' />
                    Email:{' '}
                  </span>
                  <span className='infoTitle email'>
                    {staff?.email || 'example@email.com'}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <LocationCity className='userShow__icon' />
                    State | LGA:{' '}
                  </span>
                  <span className='infoTitle'>
                    {staff?.state || 'Kaduna'} | {staff?.lga || 'Zaria'}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <LocationCity className='userShow__icon' />
                    Address:{' '}
                  </span>
                  <span className='infoTitle'>
                    {staff?.address || 'No 24 Layin Zomo'}
                  </span>
                </div>
              </div>
              <div className='userShow__bottomGroup'>
                <span className='title'>Others</span>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <Key className='userShow__icon' />
                    NIN :{' '}
                  </span>
                  <span className='infoTitle'>
                    {staff?.nin || '23480734561234'}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <Key className='userShow__icon' />
                    BVN:{' '}
                  </span>
                  <span className='infoTitle'>
                    {staff?.bvn || '4747474747474'}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <AccountBalance className='userShow__icon' />
                    Account No:{' '}
                  </span>
                  <span className='infoTitle'>
                    {staff?.accno || '123123123123'}
                  </span>
                </div>
                <div className='userShow__info'>
                  <span className='infoTitle key'>
                    <AccountBalance className='userShow__icon' />
                    Bank:{' '}
                  </span>
                  <span className='infoTitle'>
                    {staff?.bank || 'First Bank PLC'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='subect__section' style={{ flex: '1' }}>
            <span className='studnetTitle'>Teaching Subjects</span>
            <table border='border' className='teaching__subs'>
              <thead>
                <tr>
                  <th className='numbering'>S/N</th>
                  <th className='subject'>Subject</th>
                  <th className='class'>Class</th>
                </tr>
              </thead>
              <tbody>
                {staff?.teachingSubs?.map((row, i) => (
                  <tr key={row._id}>
                    <td className='numbering'>{i + 1}</td>
                    <td className='subject'>{row.subject?.subject}</td>
                    <td className='class'>{row.class?.class}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className='user__userUpdate'>
          <span className='userUpdate__title'>Edit staff</span>
          <StaffForm edited={staff} />
        </div> */}
      </div>
    </div>
  )
}

export default Staff
