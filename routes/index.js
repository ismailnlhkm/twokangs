const express = require('express')
const UserController = require('../controllers/userController')

const router = express.Router()


// home

router.get('/', UserController.home)

router.get('/register', UserController.registerForm)
router.post('/register', UserController.postRegister)
router.get('/register/admin', UserController.registerFormAdmin)
router.post('/register/admin', UserController.postRegisterAdmin)

router.get('/generateUsername', UserController.generateName)

router.get('/login', UserController.loginForm)
router.post('/login', UserController.postLogin)

router.get('/logout', UserController.logout)

router.use(function (req, res, next) {
  
  if (!req.session.userId) {
    res.redirect(`/login`)
  } else {
    next()
  }
})

router.use('/profile', require('./profile'))

module.exports = router