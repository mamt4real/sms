export const initialState = {
  students: [],
  staffs: [],
  classes: [],
  subjects: [],
  fees: [],
  sections: [],
  user: null,
  userType: null,
  activeModal: null,
  activeForm: null,
  token: null,
  setNotify: () => {},
  setConfirmDialog: () => {},
  showForm: { show: () => {}, title: () => {} },
}

export const formatdate = (dateObj) => {
  const date = dateObj?.hasOwnProperty('seconds')
    ? new Date(dateObj?.seconds * 1000 + dateObj?.nanoseconds / 1000000)
    : new Date(dateObj)

  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

const updateFunction = (collection, modified, isDelete = false) => {
  const index = collection.findIndex((ses) => ses.id === modified.id)
  const updated = [...collection]
  if (isDelete) updated.splice(index, 1)
  else updated[index] = modified
  return updated
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_STUDENTS':
      return {
        ...state,
        students: action.data,
      }
    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: updateFunction(state.students, action.data),
      }
    case 'DELETE_STUDENT':
      return {
        ...state,
        students: updateFunction(state.students, { id: action.data }, true),
      }
    case 'ADD_STUDENT':
      return { ...state, students: [...state.students, action.data] }
    case 'SET_STAFFS':
      return {
        ...state,
        staffs: action.data,
      }
    case 'UPDATE_STAFF':
      return {
        ...state,
        staffs: updateFunction(state.staffs, action.data),
      }
    case 'DELETE_STAFF':
      return {
        ...state,
        staffs: updateFunction(state.staffs, { id: action.data }, true),
      }
    case 'ADD_STAFF':
      return { ...state, staffs: [...state.staffs, action.data] }

    case 'SET_CLASSES':
      return {
        ...state,
        classes: action.data,
      }
    case 'UPDATE_CLASS':
      return {
        ...state,
        classes: updateFunction(state.classes, action.data),
      }
    case 'DELETE_CLASS':
      return {
        ...state,
        classes: updateFunction(state.classes, { id: action.data }, true),
      }
    case 'ADD_CLASS':
      return { ...state, classes: [...state.classes, action.data] }
    case 'SET_SUBJECTS':
      return {
        ...state,
        subjects: action.data,
      }
    case 'UPDATE_SUBJECT':
      return {
        ...state,
        subjects: updateFunction(state.subjects, action.data),
      }
    case 'DELETE_SUBJECT':
      return {
        ...state,
        subjects: updateFunction(state.subjects, { id: action.data }, true),
      }
    case 'ADD_SUBJECT':
      return { ...state, subjects: [...state.subjects, action.data] }
    case 'SET_FEES':
      return {
        ...state,
        fees: action.data,
      }
    case 'UPDATE_FEE':
      return {
        ...state,
        fees: updateFunction(state.fees, action.data),
      }
    case 'DELETE_FEE':
      return {
        ...state,
        fees: updateFunction(state.fees, { id: action.data }, true),
      }
    case 'ADD_FEE':
      return { ...state, fees: [...state.fees, action.data] }
    case 'SET_SECTIONS':
      return {
        ...state,
        sections: action.data,
      }
    case 'TOGGLE_MODAL':
      return {
        ...state,
        modal: !state.modal,
      }
    case 'SET_ACTIVE_MODAL':
      return { ...state, activeModal: action.data }
    case 'SET_ACTIVE_FORM':
      return { ...state, activeForm: action.data }
    case 'SET_SHOWFORM':
      return { ...state, showForm: action.data }
    case 'SET_students_LOADED':
      return { ...state, studentsLoaded: true }
    case 'SET_USER':
      return {
        ...state,
        user: action.data,
      }
    case 'SET_USER_TYPE':
      return {
        ...state,
        userType: action.data,
      }
    case 'UPDATE_USER': {
      return {
        ...state,
        user: { ...state.user, [action.key]: action.value },
      }
    }
    case 'SET_ALERT_CONFIRM':
      return {
        ...state,
        setNotify: action.alert,
        setConfirmDialog: action.confirm,
      }
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      }
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        user: null,
      }
    default:
      console.error(`Action ${action.type} not Implemented`)
      return state
  }
}
