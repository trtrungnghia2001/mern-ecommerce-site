import express from 'express'
import authRouter from './auth.router.js'
import passportRouter from './passport.router.js'
import apiV1Router from './v1/index.js'
import tikiRouter from './v0/tiki.router.js'

const router = express.Router()

router.use('/tiki', tikiRouter)
router.use('/auth', authRouter)
router.use('/passport', passportRouter)
router.use('/v1', apiV1Router)

export default router
