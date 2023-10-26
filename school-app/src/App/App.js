import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/sidebar/Sidebar'
import Topbar from '../components/topbar/Topbar'
import Students from '../pages/Students/Students'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import AdminDashbord from '../pages/AdminDashbord'
import StudentsList from '../pages/Students/StudentsList'
import Student from '../pages/Students/Student'
import StudentForm from '../pages/Students/StudentForm'
import AdminHome from '../pages/home/AdminHome'
import News from '../pages/news/News'
import Gallery from '../pages/gallery/Gallery'
import Staffs from '../pages/staffs/Staffs'
import Staff from '../pages/staffs/Staff'
import StaffsList from '../pages/staffs/StaffsList'
import Classes from '../pages/classes/Classes'
import ClassList from '../pages/classes/ClassList'
import Subjects from '../pages/subjects/Subjects'
import SubjectsList from '../pages/subjects/SubjectsList'
import { useStateValue } from '../StateProvider'
import Notification from '../components/Notification'
import ConfirmDialog from '../components/ConfirmDialog'
import ClassForm from '../pages/classes/ClassForm'
import ClassPage from '../pages/classes/ClassPage'
import StaffForm from '../pages/staffs/StaffForm'
import Subject from '../pages/subjects/Subject'
import Fees from '../pages/fees/Fees'
import FeesList from '../pages/fees/FeesList'
import Fee from '../pages/fees/Fee'
import Scores from '../pages/scores/Scores'
import SchoolAccount from '../pages/school account/SchoolAccount'
import Index from '../pages/home/Index'
import LoginPage from '../pages/login/LoginPage'

const useStyles = makeStyles({
  appMain: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
  },
  page: {
    flex: '5',
    display: 'flex',
    flexDirection: 'column',
  },
})

const theme = createTheme({
  palette: {
    primary: {
      main: '#22B14C',
      light: '#3c44b126',
      dark: 'ash',
    },
    secondary: {
      main: '#FF0000',
      light: '#FF6347',
      dark: 'ash',
    },
    background: {
      default: '#fff',
      white: '#fff',
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)',
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
})

function App() {
  const [_, dispatch] = useStateValue()

  const [notify, setNotify] = useState({ message: '', type: 'success' })
  const [confirmDialog, setConfirmDialog] = useState({
    title: '',
    subtile: '',
    open: false,
    callback: () => {},
  })

  useEffect(() => {
    dispatch({
      type: 'SET_ALERT_CONFIRM',
      alert: setNotify,
      confirm: setConfirmDialog,
    })
  }, [])

  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route index element={<Index />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin' element={<Outlet />}>
            <Route path={'dashboard'} element={<AdminDashbord />}>
              <Route index element={<AdminHome />} />
              <Route path='students' element={<Students />}>
                <Route index element={<StudentsList />} />
                <Route path='new' element={<StudentForm />} />
                <Route path=':studentID' element={<Student />} />
              </Route>
              <Route path='news' element={<News />}></Route>
              <Route path='staffs' element={<Staffs />}>
                <Route index element={<StaffsList />} />
                <Route path=':staffID' element={<Staff />} />
                <Route path='new' element={<StaffForm />} />
              </Route>
              <Route path='classes' element={<Classes />}>
                <Route index element={<ClassList />} />
                <Route path='new' element={<ClassForm />} />
                <Route path=':classID' element={<ClassPage />} />
              </Route>
              <Route path='subjects' element={<Subjects />}>
                <Route index element={<SubjectsList />} />
                <Route path=':subjectID' element={<Subject />} />
              </Route>
              <Route path='scores' element={<Scores />}>
                {/* <Route index element={<SubjectsList />} /> */}
                {/* <Route path=':subjectID' element={<Subject />} /> */}
              </Route>
              <Route path='fees' element={<Fees />}>
                <Route index element={<FeesList />} />
                <Route path=':feeID' element={<Fee />} />
              </Route>
              <Route path='gallery' element={<Gallery />}></Route>
              <Route path='accounts' element={<SchoolAccount />}></Route>
            </Route>
          </Route>
        </Routes>
      </Router>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog options={confirmDialog} setOptions={setConfirmDialog} />
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App
