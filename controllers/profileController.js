const toRupiah = require('../helper/toRupiah')
const { User, Labourer, Profile } = require('../models')

class ProfileController {
   
    static profile(req, res) {

        let {id, msg} = req.query
      
        User.findByPk(id, {include: [Profile, Labourer]})
            .then(user => {
                res.render('profile', { user, Profile, toRupiah, msg })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static labourerList(req, res) {
        let { UserId , sort, role} = req.query

        let option = {
            include: User
        }

        if (sort) {
            option.order = [[sort, 'asc']]
        }

        Labourer.findAll(option)
        .then(labourer => {
            res.render('labourer', {labourer, toRupiah, UserId, role})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static book(req, res) {
        let { UserId, LabourerId, LabourerName } = req.query

        Labourer.update({ UserId: +UserId }, { where: { id: +LabourerId }})
            .then(() => {
                let message = `Mohon tunggu, Mr. ${LabourerName} akan segera menghubungi anda...`
                res.redirect(`/profile?id=${UserId}&msg=${message}`)
            })
            .catch(err => res.send(err))
    }

    static remove(req, res) {
        let { UserId, LabourerId, LabourerName } = req.query

        Labourer.destroy(
            {
                where: { id: +LabourerId }
            }
        )
            .then(() => {
                let message = `Mr. ${LabourerName} already removed from the list`
                res.redirect(`/profile?id=${UserId}&msg=${message}`)
            })
            .catch(err => res.send(err))
    }

    static done(req, res) {
        let { UserId, LabourerId } = req.query

        Labourer.update({ UserId: null },{ where: { id: +LabourerId }})
            .then(() => {
                res.redirect(`/profile?id=${UserId}`)
            })
            .catch(err => res.send(err))
    }
}

module.exports = ProfileController