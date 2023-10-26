const express = require('express')
const path = require('path')

const studentRouter = require('./routes/studentsRoutes')
const classRouter = require('./routes/classRoutes')
const userRouter = require('./routes/userRoutes')
const subjectRouter = require('./routes/subjectRoutes')
const scoresRouter = require('./routes/scoresRoutes')
const sectionRouter = require('./routes/sectionRoutes')
const feeRouter = require('./routes/feeRoutes')
const paymentRouter = require('./routes/paymentRoutes')
const teachsubRouter = require('./routes/teachSubjRoutes')

const MyError = require('./utils/myError')
const GlobalErrorHandler = require('./controllers/errorController')

const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')

const app = express()

//set up rendering services
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

const limiter = rateLimit({
  max: 100,
  windowMs: 3600000,
  message: 'Too many request from this IP, please try again in an hour!!',
})

//global middlewares
app.use(cors())
//secured http headers
app.use(helmet())

//limit multiple request from single IP
app.use('/api', limiter)

//supply static files
app.use(express.static('./public'))

//body parsers to req.body
// app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '50kb' }))

//clean injected query attacks
app.use(mongoSanitize())
//clean xss cross site scripting attack
app.use(xss())
//prevent http parameter pollution provide options for allowing multiple in some fields
app.use(
  hpp({
    whiteList: [],
  })
)

//route handlers
app.use('/api/v1/students/', studentRouter)
app.use('/api/v1/classes/', classRouter)
app.use('/api/v1/users/', userRouter)
app.use('/api/v1/subjects/', subjectRouter)
app.use('/api/v1/scores/', scoresRouter)
app.use('/api/v1/sections/', sectionRouter)
app.use('/api/v1/fees', feeRouter)
app.use('/api/v1/payments', paymentRouter)
app.use('/api/v1/teachsubs', teachsubRouter)

//wild card handler for all routes that were not caught
app.all('*', (req, res, next) => {
  next(new MyError(`Can't find ${req.originalUrl} from this server`, 404))
})

//global error handling middleware
app.use(GlobalErrorHandler)

module.exports = app
