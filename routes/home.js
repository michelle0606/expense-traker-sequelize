const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res, err) => {
  const category = req.query.category ? req.query.category : false
  const date = req.query.month ? new Date() : false

  Record.findAll({
    where: {
      category: category,
      userId: req.user.id
    }
  })
    .then(records => {
      let total = 0
      records = records
        .filter(record => {
          if (date) {
            date.setMonth(Number(req.query.month) - 1)
            return (
              record.date.toLocaleDateString().slice(0, 7) ===
              date.toLocaleDateString().slice(0, 7)
            )
          }
          return true
        })
        .map(record => {
          total += record.amount
          setIcon(record)
          return record
        })
      res.render('home', {
        records,
        total,
        select: { month: req.query.month, category: req.query.category }
      })
    })
    .catch(err => {
      console.log(err)
    })
})

function setIcon(record) {
  switch (record.category) {
    case '家居物業':
      record.category = 'fas fa-home'
      break
    case '交通出行':
      record.category = 'fas fa-shuttle-van'
      break
    case '休閒娛樂':
      record.category = 'fas fa-grin-beam'
      break
    case '餐飲食品':
      record.category = 'fas fa-utensils'
      break
    case '其它':
      record.category = 'fas fa-pen'
      break
    default:
      break
  }
}

module.exports = router
