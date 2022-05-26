const express = require('express')
const ProfileController = require('../controllers/ProfileController')
const router = express.Router()

router.get('/', ProfileController.profile)
router.get('/:id/labourer/', ProfileController.labourerList)
router.get('/:id/labourer/book', ProfileController.book)
router.get('/:id/labourer/done', ProfileController.done)
router.get('/:id/labourer/delete', ProfileController.remove)



module.exports = router