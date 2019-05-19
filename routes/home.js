const express = require('express')
const router = express.Router()
const db = require('../models')
const User = db.User
const Record = db.Record
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res, err) => {
  User.sync().then(() =>
    User.findByPk(req.user.id).then(user => {
      if (!user) return res.error()
      else
        return Record.findAll({
          where: {
            userId: req.user.id
          }
        })
          .then(records => {
            return res.render('home', { records })
          })
          .catch(error => {
            return res.status(422).json(error)
          })
    })
  )
})

module.exports = router
