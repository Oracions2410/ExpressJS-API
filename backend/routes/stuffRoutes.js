const express = require('express')
const router = express.Router()

const stuffCtrl = require('../controllers/stuffCtrl')

const multer = require('../middlewares/multer-config')

router.get('/:id', stuffCtrl.getOneThing)
router.post('/', multer, stuffCtrl.createThing)
router.get('/', stuffCtrl.getAllThings)
router.get('/:id', stuffCtrl.modifyThing)
router.get('/:id', stuffCtrl.deleteThing)


module.exports = router