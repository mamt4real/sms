const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const MyError = require('../utils/myError')
const factoryHandler = require('./handlerFactory')

const filterBody = (body, ...valids) => {
  const filtered = {}
  Object.keys(body)
    .filter((key) => valids.includes(key))
    .forEach((element) => {
      filtered[element] = body[element]
    })
  return filtered
}

exports.getAllUsers = factoryHandler.getAll(User)

exports.getUser = factoryHandler.getOne(User, [
  ['teachingSubs', 'class subject'],
])

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body)
  res.status(201).json({ status: 'success', data: newUser })
})

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.userID)
  res
    .status(204)
    .json({ status: 'succcess', message: 'User deleted successfully' })
})

exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userID,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )
  res.status(200).json({ status: 'success', data: updatedUser })
})

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmpass) {
    throw new MyError(
      'This is not for password updates, please use /updatepassword',
      400
    )
  }
  const filteredBody = filterBody(req.body, 'name', 'email')
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({ status: 'success', data: updatedUser })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { active: false },
    { new: true }
  )
  res.status(204).json({ status: 'success', data: null })
})

exports.getUsersTable = catchAsync(async (req, res, next) => {
  const users = await User.find({}).sort('-gender name')

  const tabledata = users.map((u) => ({
    id: u._id,
    staffno: u.staffno,
    name: u.name,
    fname: u.fname,
    mname: u.mname,
    surname: u.surname,
    image: u.image,
    clearance: u.clearance,
    gender: u.gender,
    email: u.email,
  }))

  res.status(200).json({ status: 'success', data: tabledata })
})
