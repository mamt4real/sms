import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import {
  AppBar,
  Grid,
  InputBase,
  IconButton,
  Toolbar,
  Badge,
  Drawer,
  Hidden,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import { makeStyles, styled } from '@mui/styles'
import SearchIcon from '@mui/icons-material/Search'
import { Link } from 'react-router-dom'
import { MenuRounded } from '@mui/icons-material'
import logo from '../assets/logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white !important',
  },
  menuDrawer: {
    width: 'auto',
    '& .divider': {
      margin: '1rem 0',
    },
    '& .btn': {
      textTransform: 'none',
      fontWeight: 600,
      boxShadow: 'none',
      padding: '.8rem 2rem',
      borderRadius: '8px',
      fontSize: '1rem',
    },
    '& .link2': {
      color: theme.palette.secondary.main,
      fontWeight: 500,
      transition: '.2s ease',
      width: '100%',

      '&:hover': {
        transition: '.2s ease',
        borderBottom: `1px inset ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
      },
      '&.active': {
        transition: '.2s ease',
        color: theme.palette.primary.main,
      },
      '&.dropdown': {
        fontSize: '1rem',
        padding: 0,
      },
    },
  },
  searchInput: {
    opacity: '0.6',
    padding: '0px 8px',
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1),
    },
  },
  logo: {
    objectFit: 'contain',
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    marginRight: theme.spacing(1),
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  links: {
    display: 'flex',
    width: '100%',
    columnGap: '2rem',
    justifyContent: 'flex-end',
  },
}))

function Header() {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Grid container alignItems='center'>
          <Grid className={classes.brandContainer}>
            <img src={logo} alt='' className={classes.logo} />
            <Typography color='primary' variant='h4'>
              AAIT NIG
            </Typography>
          </Grid>
          <Grid item sm />
          <Grid item>
            <Hidden mdDown>
              <div className={classes.links}>
                <Link to='/about' className='link2'>
                  About Us
                </Link>
                <Link to='/blog' className='link2'>
                  News
                </Link>
                <Link to='/contact' className='link2'>
                  Gallery
                </Link>
                <Link to='/contact' className='link2'>
                  Contact Us
                </Link>
              </div>
            </Hidden>

            <Hidden lgUp>
              <Grid />
              <IconButton
                color='secondary'
                size='large'
                onClick={() => setDrawerOpen(true)}
              >
                <MenuRounded fontSize='large' />
              </IconButton>

              <Drawer
                anchor='right'
                transitionDuration={400}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                className={classes.menuDrawer}
              >
                <div>
                  <List disablePadding>
                    <ListItem button onClick={() => setDrawerOpen(false)}>
                      <Link to='/about' className='link stretch'>
                        About Us
                      </Link>
                    </ListItem>
                    <ListItem button>
                      <Link to='/gallery' className='link stretch'>
                        Gallery
                      </Link>
                    </ListItem>
                    <ListItem button>
                      <Link to='/blog' className='link stretch'>
                        News
                      </Link>
                    </ListItem>

                    <ListItem button>
                      <Link to='/contact' className='link stretch'>
                        Contact Us
                      </Link>
                    </ListItem>
                  </List>
                </div>
              </Drawer>
            </Hidden>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
