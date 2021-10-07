// impor model
const { users, user_biodata } = require('../models')
const passport = require('../lib/passport')

exports.pageLogin = (req, res) => {
  res.send('login page')
}

exports.pageRegister = (req, res) => {
  res.send('register page')
}

exports.registerUser = (req, res, next) => {
  users
    .register(req.body)
    .then((result) => {
      user_biodata.create({
        nama: req.body.nama,
        alamat: req.body.alamat,
        notelp: req.body.notelp,
        id_user: result.id,
      })
      res.json({
        message: 'berhasil memasukkan data',
        data: req.body,
      })
    })
    .catch((err) => next(err))
}

exports.loginUser = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/game',
    failureRedirect: '/login',
    failureFlash: true,
  })
}
