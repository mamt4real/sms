import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Layout from '../../components/Layout'
import Program from '../../components/Program'
import background1 from '../../assets/background1.jpg'
import logo from '../../assets/logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '8px',
    // padding: theme.spacing(3),
    position: 'relative',
    width: '100%',
  },
  upperSection: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    height: '630px',
    backgroundColor: 'rgba(5,5,5,0.1)',
  },
  leftCard: {
    minHeight: '600px',
    backgroundImage: `url(${background1})`,
    backgroundSize: 'cover',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
    position: 'absolute',
    top: '24px',
    left: '2vw',
    width: '70%',
    zIndex: '10',
  },
  rightCard: {
    width: '40%',
    height: '400px',
    position: 'absolute',
    right: '2vw',
    top: '100px',
    zIndex: '15',
    backgroundColor: '#fff !important',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
  },
  schoolLogo: {
    objectFit: 'contain',
    height: '50%',
    width: '50%',
    [theme.breakpoints.only('xs')]: {
      width: '100px',
      height: '100px',
    },
    [theme.breakpoints.up('md')]: {
      height: '250px',
      width: '80%',
    },
  },
  programmsSection: {
    width: '100%',
    padding: theme.spacing(3),
  },
}))

function Index() {
  const classes = useStyles()
  return (
    <Layout>
      <div className={classes.root}>
        {/* upper section */}
        <div className={classes.upperSection}>
          <Box maxWidth='lg' className={`${classes.leftCard} shadowed`}>
            <Typography variant='h4'>
              Welcome To Arewa Academy of Information Technology
            </Typography>
            <Stack sx={{ width: { lg: 1 / 5, md: 8 / 10 }, mt: 8 }}>
              <Typography>
                Technology has never been easier Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Repudiandae quas reiciendis est
                ducimus, blanditiis reprehenderit sit nulla dicta, et nam,
                corrupti veritatis aspernatur! Temporibus odit odio cumque
                veritatis fuga perferendis.
              </Typography>
              <Button
                variant='contained'
                style={{
                  backgroundColor: '#1FA75E',
                  marginTop: '2rem',
                  lineHeight: '22px',
                  alignItems: 'center',
                  marginBottom: '3rem',
                  color: '#fff',
                  width: '210px',
                  height: '55px',
                  border: '2px solid #fff',
                  boxShadow: '0px 10px 35px 2px rgba(81, 75, 201, 0.25)',
                  borderRadius: '8px',
                }}
                className={classes.contactBtn}
              >
                Read More
              </Button>
            </Stack>

            {/* <Grid div>
            <Grid xs={6}></Grid>
          </Grid> */}
          </Box>
          <Box className={`${classes.rightCard} shadowed`}>
            <Grid container justifyContent={'space-between'} sx={{ height: 1 }}>
              <Grid item xs={12} md={6}>
                <Typography variant='h4' color={'primary'} sx={{ mb: '16px' }}>
                  Our Mission
                </Typography>
                <Typography
                  paragraph
                  sx={{
                    fontSize: { xs: '12px', sm: '18px', lg: '20px' },
                    textAlign: 'justify',
                  }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae iusto recusandae eveniet corrupti a labore
                  sapiente neque, quibusdam vitae praesentium.
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img src={logo} alt='' className={`${classes.schoolLogo}`} />
              </Grid>
            </Grid>
          </Box>
        </div>
        <div className={classes.programmsSection}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={12}
              sx={{ alignItems: 'center', textAlign: 'center' }}
            >
              <Typography variant='h5' sx={{ fontWeight: '700' }}>
                Our Programs
              </Typography>
              <Typography variant='body1'>
                Consectetur adipiscing elit. Lorem integer diam ullamcorper vel
                ullamcorper erat.{' '}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            maxWidth={'lg'}
            sx={{ p: 1, mt: 4, mx: 'auto' }}
            spacing={3}
            justifyContent='space-around'
            alignItems='center'
          >
            <Grid item xs={8} md={4}>
              <Program
                bgB='#E6FDF1'
                bgT='#B4EDCE'
                bgL='#1FA75E'
                title='Certifications'
                content='Consectetur adipiscing elit. Lorem integer diam ullamcorper vel ullamcorper erat. '
                link='meetups'
              />
            </Grid>
            <Grid item xs={8} md={4}>
              <Program
                bgB='#FDE6EB'
                bgT='#EDB4C1'
                bgL='#FD295A'
                title='Graphic Design'
                link='mentorship'
                content='Consectetur adipiscing elit. Lorem integer diam ullamcorper vel ullamcorper erat. '
              />
            </Grid>
            <Grid item xs={8} md={4}>
              <Program
                bgB='#FDF0E6'
                bgT='#EDCCB4'
                bgL='#F78C40'
                title='Software Development'
                content='Consectetur adipiscing elit. Lorem integer diam ullamcorper vel ullamcorper erat. '
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  )
}

export default Index
