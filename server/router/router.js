const {Router} = require('express')
const {checkAccount} = require('../controller/controller')

const router = Router()

router.post('/api', checkAccount)

module.exports = router