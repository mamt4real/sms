import React from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useStateValue } from '../../StateProvider'

function SelectExam({ value, handleChange, error, width, mgLeft = '8px' }) {
  const [{ exams }, _] = useStateValue()
  if (!width) width = '90%'
  return (
    <FormControl
      variant='outlined'
      error={error}
      size='small'
      style={{ width, margin: '8px', marginLeft: mgLeft }}
    >
      <InputLabel htmlFor='exam'>Select Exam</InputLabel>
      <Select
        name={'exam'}
        value={value}
        onChange={handleChange}
        id='exam'
        label='Select Exam'
      >
        <MenuItem value=''>None</MenuItem>
        {exams.map((op) => (
          <MenuItem value={op._id} key={op._id}>
            {op.examName}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default SelectExam
