import { Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(2),
    paddingTop: '0',
    minHeight: '70vh',
    position: 'relative',
  },
}))
function PageContent({ children }) {
  const classes = useStyles()
  return (
    <Paper elevation={0} className={classes.pageContent}>
      {children}
    </Paper>
  )
}

export default PageContent
