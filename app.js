const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const db = require('./models')
const Record = db.Record
const User = db.User

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/users/register', (req, res) => {
  res.render('register')
})

app.post('/users/register', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(() => res.redirect('/'))
})

app.listen(3000, () => {
  db.sequelize.sync()
  console.log(`App is running!`)
})
