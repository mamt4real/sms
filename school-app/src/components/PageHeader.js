import { Card, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
  },
  pageHeader: {
    padding: theme.spacing(2),
    display: 'flex',
    margin: theme.spacing(1),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  pageIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
  },
  pageTitle: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    fontWeight: '600',
    color: 'rgb(3, 3, 83)',
  },
  subtitle: {
    opacity: '0.6',
    color: '#fff',
  },
}))

function PageHeader({ icon, title, subtitle }) {
  const classes = useStyles()
  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div className={classes.pageTitle}>
          <Typography variant='h6' component={'div'} className={classes.title}>
            <Link to='' className='link'>
              {title}
            </Link>
          </Typography>
          <Typography
            variant='subtitle'
            component={'div'}
            className={classes.subtitle}
          >
            {subtitle}
          </Typography>
        </div>
      </div>
    </Paper>
  )
}

export default PageHeader
