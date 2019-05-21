const LocalStrategy = require('passport-local').Strategy
const db = require('../models')
const bcrypt = require('bcryptjs')
const User = db.User

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        const user = await User.findOne({ where: { email: email } })

        if (!user) return done(null, false)

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) return done(null, user)
        else return done(null, false)
      }
    )
  )
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then(user => {
      done(null, user)
    })
  })
}
