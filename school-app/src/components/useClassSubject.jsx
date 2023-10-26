import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider'

function useClassSubject(isAdmin = true) {
  const { subjects, classes } = useStateValue()[0]

  const [cls, setCls] = useState(classes[0]?.id)
  const [subject, setSubject] = useState('')

  const updatedSubjects = (id) => {
    const activeClass = classes.find((cl) => cl.id === id)
    return subjects.filter((sbj) => activeClass?.subjects?.includes(sbj._id))
  }
  const [selClasses, setSelClasses] = useState(classes)
  const [selSubjects, setSelSubjects] = useState(updatedSubjects(cls))

  useEffect(() => {
    setSelClasses(classes)
  }, [classes])

  useEffect(() => {
    setSelSubjects(updatedSubjects(cls))
  }, [cls])

  const SelClass = () => (
    <FormControl variant='outlined'>
      <InputLabel htmlFor='class'>Select Class</InputLabel>
      <Select
        name={'class'}
        value={cls || ''}
        onChange={(e) => setCls(e.target.value)}
        id='class'
        label='Select Class'
      >
        <MenuItem value=''>None</MenuItem>
        {selClasses.map((op, i) => (
          <MenuItem value={op._id || op.id || op} key={op._id || i + 1}>
            {op.class || op}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )

  const SelSubject = () => (
    <FormControl variant='outlined'>
      <InputLabel htmlFor='class'>Select Subject</InputLabel>
      <Select
        name={'subject'}
        value={subject || ''}
        onChange={(e) => setSubject(e.target.value)}
        id='subject'
        label='Select Subject'
      >
        <MenuItem value=''>None</MenuItem>
        {selSubjects?.map((op, i) => (
          <MenuItem value={op._id || op.id || op} key={op._id || i + 1}>
            {op.subject || op}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )

  return [SelClass, SelSubject, { class: cls, subject }]
}

export default useClassSubject
