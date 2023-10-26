import { styled } from '@mui/material/styles'
import { Typography, Box, Paper, Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

const Program = ({ ...props }) => {
  const ProgramCard = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.primary.main,
    lineHeight: '29px',
    alignItems: 'center',
    textAlign: 'center',
    margin: '2px 0px',
    color: theme.palette.primary.dark,
    width: '100%',
    height: '100%',
    backgroundColor: props.bgB,
    padding: '10% 20%',
    radius: '1.3rem',
  }))

  const ProgramButton = styled(Button)(({ theme }) => ({
    backgroundColor: props.bgL,
    Padding: '2rem 1.8rem',
    minWidth: '180px',
    width: '100%',
    height: '60px',
    color: theme.palette.background.white,
    margin: '0 auto',
    Stroke: 'Solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0px 14px 53px 2px rgba(0, 0, 0, 0.09)',

    '&:hover': {
      backgroundColor: '0 0 0 0.5rem rgba(0,0,255,.8)',
      color: theme.palette.primary.dark,
      borderRadius: '2px solid #504E67',
    },
  }))

  return (
    <ProgramCard>
      <Stack spacing={3}>
        <Box
          sx={{
            width: 100,
            height: 100,
            backgroundColor: props.bgT,
            radius: '1.3rem',
            margin: '0 auto',
          }}
        >
          <Paper elevation={12} />
        </Box>
        <Typography variant='h6' gutterBottom>
          {props.title}
        </Typography>
        <Typography variant='caption' gutterBottom>
          {props.content}
        </Typography>
        <Link to={props.link || ''} className='link'>
          <ProgramButton>Explore</ProgramButton>
        </Link>
      </Stack>
    </ProgramCard>
  )
}

export default Program
