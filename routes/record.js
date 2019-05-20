const express = require('express')
const router = express.Router()
const db = require('../models')
const User = db.User
const Record = db.Record
const { authenticated } = require('../config/auth')

router.get('/new', authenticated, (req, res) => {
  const date = new Date()
  res.render('new', { date })
})

router.post('/', authenticated, (req, res) => {
  Record.create({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount,
    userId: req.user.id
  })
    .then(() => {
      return res.redirect('/')
    })
    .catch(err => {
      return res.status(422).json(err)
    })
})

router.get('/:id/edit', authenticated, (req, res) => {
  User.findByPk(req.user.id).then(user => {
    if (!user) return res.error()
    Record.findOne({
      where: {
        userId: req.user.id,
        id: req.params.id
      }
    }).then(record => {
      res.render('edit', { record })
    })
  })
})

router.put('/:id', authenticated, (req, res) => {
  Record.findOne({
    where: {
      userId: req.user.id,
      id: req.params.id
    }
  }).then(record => {
    Object.assign(record, req.body)
    record
      .save()
      .then(() => {
        return res.redirect('/')
      })
      .catch(err => {
        return res.status(422).json(err)
      })
  })
})

router.delete('/:id/delete', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) return res.error()
      Record.destroy({
        where: {
          userId: req.user.id,
          id: req.params.id
        }
      }).then(() => {
        return res.redirect('/')
      })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})

module.exports = router
