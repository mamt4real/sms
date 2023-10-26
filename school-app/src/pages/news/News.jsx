import { Add, MoreVert, Newspaper, Search } from '@mui/icons-material'
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Controls from '../../components/controls/Controls'
import PageContent from '../../components/PageContent'
import PageHeader from '../../components/PageHeader'
import cert from '../../assets/Hcia.png'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: '100%',
  },
  coverPhoto: {
    objectFit: 'cover',
    width: '100%',
    height: '35%',
  },
  searchContainer: {
    minWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1.5),
  },
  serchInput: {
    width: '75%',
  },
}))

function News() {
  const classes = useStyles()
  const handleSearch = (e) => {}

  return (
    <div>
      <PageHeader
        icon={<Newspaper fontSize='large' style={{ color: '#22B14C' }} />}
        title='News'
        subtitle={'School News'}
      />
      <PageContent>
        {/* xs={12} sm={6} lg={4} */}
        <div className={classes.searchContainer}>
          <Controls.Input
            className={classes.serchInput}
            label={`Search News`}
            name={'query'}
            size='small'
            InputProps={{ startAdornment: <Search fontSize='small' /> }}
            onChange={handleSearch}
          />
          <Link to={'new'} className='link'>
            <Controls.Button
              text={'Add New'}
              variant='outlined'
              startIcon={<Add />}
            />
          </Link>
        </div>
        <Grid
          container
          className={classes.root}
          gap='16px'
          justifyContent={'space-between'}
        >
          {[0, 1, 2, 3, 4, 5].map((x, i) => (
            <Grid item xs={12} sm={6} lg={3} key={x * i + 4}>
              <Post post={'This is a post ' + x} />
            </Grid>
          ))}
        </Grid>
      </PageContent>
    </div>
  )
}

const Post = ({ post }) => {
  const classes = useStyles()
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label={'Article'}>
            N
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVert />
          </IconButton>
        }
        title={post}
        subheader={'Subheader'}
      />
      <CardMedia
        component={'img'}
        image={cert}
        alt='Cover Screen'
        height={'194'}
      />

      <CardContent>
        <Typography gutterBottom variant='h5'>
          News Title
        </Typography>
        <Typography paragraph>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat ab
          dolore incidunt cupiditate ullam neque. Inventore animi, quae
          aspernatur eius quasi repellat, corrupti fugiat iste sit magni et
          odio. Sed magni itaque unde perferendis natus sapiente numquam sequi
          tempore blanditiis quidem, eius, suscipit, vitae ducimus assumenda
          nulla facilis laudantium quod...
        </Typography>
      </CardContent>
      <CardActions>
        <CardActionArea>
          {/* <Controls.Button text='More' size='small' /> */}
          <Typography variant='h6'>Read More</Typography>
        </CardActionArea>
        {/* <Controls.Button text='Edit' size='small' />
        <Controls.Button text='Delete' size='small' color={'secondary'} /> */}
      </CardActions>
    </Card>
  )
}

export default News
