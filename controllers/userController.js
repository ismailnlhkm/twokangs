const { User, Labourer, Profile } = require('../models')
const bcrypt = require('bcryptjs');
const UsernameGenerator = require('username-generator');

class UserController {

    static home(req, res) {
        res.render('home')
    }

    static registerForm(req, res) {

        let { error } = req.query
        let data = ""
        res.render('register-form', { error, data })
    }

    static generateName(req, res) {
        const username1 = UsernameGenerator.generateUsername();
        // res.redirect(`register-form?username1=${username1}`)
        let data = username1
        let { error } = req.query
        res.render('register-form', { error, data })
    }

    static postRegister(req, res) {

        let { name, username, password, phone, gender, role } = req.body
        //{"name":"Andi","username":"Andi12","password":"Password123","phone":"081388238","gender":"Male","role":"User"}
        User.create({ username, password, role })
            .then(user => {
                return User.findAll(
                    {
                        order: [['id', 'DESC']]
                    },
                    {
                        where: {
                            username: user.username
                        }
                    }

                )
            })
            .then(user => {
                let UserId = +user[0].id
                Profile.create({ name, phone, gender, UserId })
            })
            .then(user => {
                res.redirect('/login')
            })
            .catch(err => {
                let error = ""
                if (err.name === "SequelizeValidationError") {
                    error = err.errors[0].message
                }
                return res.redirect(`/register?error=${error}`)
            })

        // error = 'Please enter valid Username / Password'
        //             return res.redirect(`/login?error=${error}`)
    }


    static loginForm(req, res) {
        let { error } = req.query
        res.render('login-form', { error })
    }

    static postLogin(req, res) {
        // {"username":"Andi12","password":"Password123"}
        let { username, password } = req.body
        // res.send(req.body)

        User.findOne({ where: { username } })
            .then(user => {

                // console.log(user)
                if (user) {
                    const isPasswordTrue = bcrypt.compareSync(password, user.password)

                    if (isPasswordTrue) {

                        req.session.userId = user.id

                        let id = +user.id
                        return res.redirect(`/profile?id=${id}`)

                    } else {
                        let error = 'Please enter valid Username / Password'
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    let error = 'Please enter valid Username / Password'
                    return res.redirect(`/login?error=${error}`)
                }


            })
            .catch(err => res.send(err))
    }

    static logout(req, res) {
        req.session.destroy(function (err) {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/login')
            }



        })
    }

    static admin(req, res) {
        Labourer.findAll()
            .then(labourer => {
                res.render('admin', { labourer })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = UserController