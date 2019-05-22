if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const db = require('./models')

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(
  session({
    secret: 'your secret key',
    resave: 'false',
    saveUninitialized: 'false'
  })
)

require('./config/passport')(passport)

app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use('/', require('./routes/home'))
app.use('/users', require('./routes/user'))
app.use('/record', require('./routes/record'))
app.use('/auth', require('./routes/auth'))

app.listen(3000, () => {
  db.sequelize.sync()
  console.log(`App is running!`)
})
