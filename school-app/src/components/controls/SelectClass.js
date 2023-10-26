import React from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useStateValue } from '../../StateProvider'

//       style={{ width, margin: '8px', marginLeft: mgLeft }}

const clasLists2 = ['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3']

function SelectExam({ value, handleChange, error, name = 'class', ...others }) {
  const { classes } = useStateValue()[0]

  return (
    <FormControl variant='outlined' error={error}>
      <InputLabel htmlFor='class'>Select Class</InputLabel>
      <Select
        name={name}
        value={value || ''}
        onChange={handleChange}
        {...others}
        id='class'
        label='Select Class'
      >
        <MenuItem value=''>None</MenuItem>
        {classes.map((op, i) => (
          <MenuItem value={op._id || op.id || op} key={op._id || i + 1}>
            {op.class || op}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export const SelectPosition = ({ value, handleChange, error, ...others }) => {
  return (
    <FormControl variant='outlined' error={error}>
      <InputLabel htmlFor='clearance'>Position</InputLabel>
      <Select
        name={'clearance'}
        value={value || ''}
        onChange={handleChange}
        id='clearance'
        label='Position'
        {...others}
      >
        <MenuItem value=''>None</MenuItem>
        {[
          'admin',
          'form master',
          'teacher',
          'exam officer',
          'accountant',
          'client',
        ].map((op) => (
          <MenuItem value={op} key={op}>
            {op.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export const SelectClass2 = ({
  value,
  handleChange,
  error,
  width,
  mgLeft = '8px',
}) => {
  if (!width) width = '90%'
  return (
    <FormControl variant='outlined' error={error}>
      <InputLabel htmlFor='class'>Select Class</InputLabel>
      <Select
        name={'class'}
        value={value || ''}
        onChange={handleChange}
        id='class'
        label='Select Class'
      >
        <MenuItem value=''>None</MenuItem>
        {clasLists2.map((op) => (
          <MenuItem value={op._id || op} key={op}>
            {op.title || op}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export function SelectSubjects({
  value,
  handleChange,
  error,
  name = 'subject',
  filterList = [],
  ...others
}) {
  const { subjects } = useStateValue()[0]
  const displaySubjects = subjects.filter(
    (sbj) => filterList.findIndex((f) => f._id == sbj._id) === -1
  )
  return (
    <FormControl variant='outlined' error={error}>
      <InputLabel htmlFor='class'>Select Subject</InputLabel>
      <Select
        name={name}
        value={value || ''}
        onChange={handleChange}
        id='subject'
        label='Select Subject'
        {...others}
      >
        <MenuItem value=''>None</MenuItem>
        {displaySubjects.map((op, i) => (
          <MenuItem value={op._id || op} key={op._id || i}>
            {op.subject || op}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export function SelectStaff({
  value,
  handleChange,
  error,
  name = 'staff',
  ...others
}) {
  const { staffs } = useStateValue()[0]

  return (
    <FormControl variant='outlined' error={error}>
      <InputLabel htmlFor='class'>Select Teacher</InputLabel>
      <Select
        name={name}
        value={value || ''}
        onChange={handleChange}
        {...others}
        id='class'
        label='Select Teacher'
      >
        <MenuItem value=''>None</MenuItem>
        {staffs.map((op, i) => (
          <MenuItem value={op._id || op.id || op} key={op._id || i + 1}>
            {op.name || op.fname + ' ' + op.surname}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export function SelectSection({
  value,
  handleChange,
  error,
  name = 'section',
  ...others
}) {
  const { sections } = useStateValue()[0]

  const active = sections.find((s) => s.active)?._id

  return (
    <FormControl variant='outlined' error={error}>
      <InputLabel htmlFor='section'>Select Section</InputLabel>
      <Select
        name={name}
        value={value || active || ''}
        onChange={handleChange}
        {...others}
        id='section'
        label='Select Section'
      >
        <MenuItem value=''>None</MenuItem>
        {sections?.map((op, i) => (
          <MenuItem value={op._id || op.id || op} key={op._id || i + 1}>
            {`${op.session}_${op.term}_Term`}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export function SelectFee({
  value,
  handleChange,
  error,
  name = 'fee',
  ...others
}) {
  const { fees } = useStateValue()[0]

  return (
    <FormControl variant='outlined' error={error}>
      <InputLabel htmlFor='fee'>Select Fee</InputLabel>
      <Select
        name={name}
        value={value || ''}
        onChange={handleChange}
        {...others}
        id='fee'
        label='Select Fee'
      >
        <MenuItem value=''>None</MenuItem>
        {fees?.map((op, i) => (
          <MenuItem value={op._id || op.id || op} key={op._id || i + 1}>
            {op.feeName || op}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default SelectExam
