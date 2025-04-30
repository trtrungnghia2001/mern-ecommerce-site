import express from 'express'
import productRouter from './product.router.js'
import cartRouter from './cart.router.js'
import addressRouter from './address.router.js'
import orderRouter from './order.router.js'
import notificationRouter from './notification.router.js'
import commonRouter from './common.js'

const apiV1Router = express.Router()

apiV1Router.use(`/product`, productRouter)
apiV1Router.use(`/cart`, cartRouter)
apiV1Router.use(`/address`, addressRouter)
apiV1Router.use(`/order`, orderRouter)
apiV1Router.use(`/notification`, notificationRouter)
apiV1Router.use(`/common`, commonRouter)

export default apiV1Router
