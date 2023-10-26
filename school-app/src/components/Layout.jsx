import { makeStyles } from '@mui/styles'
import React from 'react'
import Header from './Header'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: '100vh',
    minWidth: '100vw',
  },
}))

function Layout({ children, withHeader = true, withFooter = true }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {withHeader && <Header />}
      {children}
    </div>
  )
}

export default Layout
