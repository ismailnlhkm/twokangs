const express = require('express')
const UserController = require('../controllers/userController')

const router = express.Router()


// home

router.get('/', UserController.home)


// register
router.get('/register', UserController.registerForm)

router.post('/register', UserController.postRegister)

router.get('/generateUsername', UserController.generateName)


// login

router.get('/login', UserController.loginForm)

router.post('/login', UserController.postLogin)

// login admin



// logout

router.get('/logout', UserController.logout)




// middleware
router.use(function (req, res, next) {
  
  if (!req.session.userId) {
    res.redirect(`/login`)
  } else {
    next()
  }
})


// profile

router.use('/profile', require('./profile'))



module.exports = router