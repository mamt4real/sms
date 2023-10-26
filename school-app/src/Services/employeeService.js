const KEYS = {
  employees: 'employees',
  employeeId: '_id',
}

export const getDepartments = () => [
  { _id: 1, title: 'Mathematics' },
  { _id: 2, title: 'English' },
  { _id: 3, title: 'Marketing' },
  { _id: 4, title: 'Sales' },
]

export const getEmployees = () => {
  if (localStorage.getItem(KEYS.employees) === null)
    localStorage.setItem(KEYS.employees, '[]')
  const employees = JSON.parse(localStorage.getItem(KEYS.employees))

  const departments = getDepartments()
  return employees.map((emp) => ({
    ...emp,
    department: departments.find((d) => d._id == emp.deptId).title,
  }))
}

export const addEmployee = (data) => {
  data.id = generateEmployeeId()
  // alert(generateEmployeeId())
  const employess = getEmployees()
  employess.push(data)
  localStorage.setItem(KEYS.employees, JSON.stringify(employess))
}

const generateEmployeeId = () => {
  return getEmployees().length + 1
}

export const editEmployee = (data) => {
  const employees = getEmployees()
  const i = employees.findIndex((a) => a.id === data.id)
  employees[i] = { ...data }
  localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

export const deleteEmployee = (id) => {
  const employees = getEmployees()
  const i = employees.findIndex((a) => a.id === id)
  employees.splice(i, 1)
  localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

// deleteEmployee(null)
