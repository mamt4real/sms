import { Calculate } from '@mui/icons-material'
import { Grid, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import PageContent from '../../components/PageContent'
import PageHeader from '../../components/PageHeader'
import UploadForm from '../../components/UploadForm'
import Controls from '../../components/controls/Controls'
import useApidata from '../../useApi'
import Loading from '../../components/loading/Loading'
import useClassSubject from '../../components/useClassSubject'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    justifyContent: 'space-between',
  },
  uploadSection: {
    flex: 1,
    padding: theme.spacing(2),
  },
  previewSection: {
    flex: 2,
    padding: theme.spacing(2),
  },
  filterConatiner: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: theme.spacing(2) + ' 0',
    padding: '4px',
    '& .MuiFormControl-root': {
      minWidth: '200px',
      marginRight: theme.spacing(1),
    },
  },
  scoresPreview: {
    position: 'relative',
    height: '65vh',
    overflowY: 'scroll',
  },
}))

const scoresSchema = {
  Ca1: {
    prop: 'fstCa',
    type: Number,
  },
  Ca2: {
    prop: 'scnCa',
    type: Number,
  },
  Exam: {
    prop: 'exam',
    type: Number,
  },
  'Registration No': {
    prop: 'regno',
    type: String,
    required: true,
  },
}

function Scores() {
  const [filters, setFilters] = useState({
    section: '',
    classID: '',
    subjectID: '',
  })

  const [SelClass, SelSubject, { class: classID, subject: subjectID }] =
    useClassSubject()

  const handleFilters = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const classes = useStyles()
  return (
    <div>
      <PageHeader
        icon={<Calculate fontSize='large' color='primary' />}
        title='Scores'
        subtitle={"Student's Terminal Exam Scores"}
      />
      <PageContent>
        <Grid container className={classes.root}>
          <Grid
            component={'div'}
            item
            className={`${classes.previewSection} shadowed`}
          >
            <Typography>Score Preview</Typography>
            <Stack
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <div className={classes.filterConatiner}>
                <Controls.SelectSection
                  value={filters.section}
                  handleChange={handleFilters}
                />
                <SelClass />
                <SelSubject />
              </div>
              <UploadForm
                text='Scores'
                schema={scoresSchema}
                url='/scores/class'
                uploadParams={{ subjectID, classID, section: filters.section }}
              />
            </Stack>

            <ScoresPreview
              section={filters.section}
              {...{ classID, subjectID }}
            />
          </Grid>
        </Grid>
      </PageContent>
    </div>
  )
}

export const ScoresPreview = ({ classID, subjectID, section }) => {
  const classes = useStyles()
  const [url, setUrl] = useState('')
  const [{ scores, className, subject }, loading, error] = useApidata(
    `/scores/class?classID=${classID}&section=${section}&subjectID=${subjectID}`
  )
  if (error) return <Typography variant='h6'>{error}</Typography>
  return (
    <form action='' className={`${classes.scoresPreview} noscroller`}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Typography variant='subtitle'>{`${className} ${subject} scores`}</Typography>
          <table border='border' className='teaching__subs scores_preview'>
            <thead>
              <tr>
                <th className='numbering'>S/N</th>
                <th className='student'>Student</th>
                <th className='class score'>
                  1<sup>st</sup> CA
                </th>
                <th className='class score'>
                  2<sup>nd</sup> CA
                </th>
                <th className='class score'>Exam</th>
              </tr>
            </thead>
            <tbody>
              {scores?.map((row, i) => (
                <tr key={row._id}>
                  <td className='numbering'>{i + 1}</td>
                  <td className='student'>{row.name}</td>
                  <td className='class score'>{row.ca1}</td>
                  <td className='class score'>{row.ca2}</td>
                  <td className='class score'>{row.exam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </form>
  )
}

export default Scores
