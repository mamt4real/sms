import React from 'react'
import './Sidebar.css'
import {
  LineStyle,
  Timeline,
  TrendingUp,
  AccountBoxOutlined,
  ProductionQuantityLimits,
  Money,
  BarChart,
  Mail,
  Feed,
  Message,
  People,
  PhotoAlbum,
  Info,
  Cases,
  Class,
  Subject,
  Calculate,
  Facebook,
  FacebookRounded,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar__wrapper'>
        <div className='sidebar__menu'>
          <h3 className='sidebar__title'>Dashbard</h3>
          <ul className='sidebar__list'>
            <li>
              <Link to=''>
                <LineStyle className='sidebar__icon' /> Home
              </Link>
            </li>
            <li>
              <Link to='news'>
                <Timeline className='sidebar__icon' /> News
              </Link>
            </li>
            <li>
              <Link to='gallery'>
                <PhotoAlbum className='sidebar__icon' /> Gallery
              </Link>
            </li>
            <li>
              <Link to='/'>
                <TrendingUp className='sidebar__icon' /> Activities
              </Link>
            </li>
          </ul>
        </div>
        <div className='sidebar__menu'>
          <h3 className='sidebar__title'>Entities</h3>
          <ul className='sidebar__list'>
            <li>
              <Link to='students'>
                <People className='sidebar__icon' /> Students
              </Link>
            </li>
            <li>
              <Link to='/admin/dashboard/classes'>
                <Class className='sidebar__icon' /> Classes
              </Link>
            </li>
            <li>
              <Link to='/admin/dashboard/subjects'>
                <Subject className='sidebar__icon' /> Subjects
              </Link>
            </li>
            <li>
              <Link to='/admin/dashboard/staffs'>
                <ProductionQuantityLimits className='sidebar__icon' /> Staffs
              </Link>
            </li>
          </ul>
        </div>
        <div className='sidebar__menu'>
          <h3 className='sidebar__title'>Utilities</h3>
          <ul className='sidebar__list'>
            <li>
              <Link to='/admin/dashboard/fees'>
                <Money className='sidebar__icon' /> Fees
              </Link>
            </li>
            <li>
              <Link to='/admin/dashboard/scores'>
                <Calculate className='sidebar__icon' /> Scores
              </Link>
            </li>
            <li>
              <Link to='/admin/dashboard/scores'>
                <FacebookRounded className='sidebar__icon' /> Scores
              </Link>
            </li>
            <li>
              <Link to='/'>
                <BarChart className='sidebar__icon' /> Rport cards
              </Link>
            </li>
            <li>
              <Link to='/admin/dashboard/accounts'>
                <Money className='sidebar__icon' /> School Account
              </Link>
            </li>
          </ul>
        </div>
        <div className='sidebar__menu'>
          <h3 className='sidebar__title'>Staffs</h3>
          <ul className='sidebar__list'>
            <li>
              <Link to='/'>
                <Mail className='sidebar__icon' /> Manage
              </Link>
            </li>
            <li>
              <Link to='/'>
                <TrendingUp className='sidebar__icon' /> Analytics
              </Link>
            </li>
            <li>
              <Link to='/'>
                <Info className='sidebar__icon' /> Reports
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
