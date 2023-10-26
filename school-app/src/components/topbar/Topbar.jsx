import React from 'react'
import './Topbar.css'
import NotificationAddIcon from '@mui/icons-material/NotificationAdd'
import LanguageIcon from '@mui/icons-material/Language'
import { Badge, IconButton } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import user from '../../assets/default_user.jpg'

function Topbar() {
  return (
    <div className='topbar'>
      <div className='topbar__wrapper'>
        <div className='wrapperLeft'>
          <span className='logo'>AAIT NIG</span>
        </div>
        <div className='wrapperRight'>
          <div className='topbar__iconsContainer'>
            <IconButton>
              <Badge badgeContent={4} color='secondary'>
                <NotificationAddIcon fontSize='small' />
              </Badge>
            </IconButton>
          </div>
          <div className='topbar__iconsContainer'>
            <IconButton>
              <Badge badgeContent={3} color='primary'>
                <LanguageIcon fontSize='small' />
              </Badge>
            </IconButton>
          </div>
          <div className='topbar__iconsContainer'>
            <IconButton>
              <SettingsIcon fontSize='small' />
            </IconButton>
          </div>
          <img src={user} alt='' className='topAvatar' />
        </div>
      </div>
    </div>
  )
}

export default Topbar
