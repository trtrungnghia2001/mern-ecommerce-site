import { QUERY_PARAMETER } from '#server/constants/query.constant'
import {
  handleResponse,
  handleResponseList,
} from '#server/helpers/responses.helper'
import { authProtectedRouter } from '#server/middlewares/auth.middleware'
import notificationModel from '#server/models/notification.model'
import orderModel from '#server/models/order.model'
import express from 'express'

import { StatusCodes } from 'http-status-codes'

const orderRouter = express.Router()

orderRouter.post('/create', authProtectedRouter, async (req, res, next) => {
  try {
    const user = req.user
    const body = req.body

    const newData = await orderModel
      .create({
        ...body,
        user: user._id,
      })
      .then(async (doc) => {
        return await orderModel.findById(doc._id).populate({
          path: 'products.product',
        })
      })

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: 'Order created successfully',
      data: newData,
    })
  } catch (error) {
    next(error)
  }
})
// orderRouter.delete(
//   `/canceled/:id`,
//   authProtectedRouter,
//   async (req, res, next) => {
//     try {
//       const id = req.params.id

//       const updatedOrder = await orderModel.findByIdAndUpdate(
//         id,
//         {
//           status: 'canceled',
//         },
//         { new: true },
//       )
//       return handleResponse(res, {
//         status: StatusCodes.OK,
//         message: 'Order canceled successfully',
//         data: updatedOrder,
//       })
//     } catch (error) {
//       next(error)
//     }
//   },
// )

orderRouter.get(`/get-me`, authProtectedRouter, async (req, res, next) => {
  try {
    const _page = parseInt(req.query._page) || QUERY_PARAMETER._PAGE
    const _limit = parseInt(req.query._limit) || QUERY_PARAMETER._LIMIT
    const _skip = parseInt(req.query._skip) || QUERY_PARAMETER._SKIP

    const _status = req.query._status

    const user = req.user

    const filter = {
      user: user._id,
      ...(_status && { status: _status }),
    }

    const orders = await orderModel
      .find(filter)
      .populate({
        path: 'products.product',
      })
      .limit(_limit)
      .skip((_page - 1) * _limit + _skip)
      .sort({
        createdAt: -1,
      })

    const total_rows = await orderModel.countDocuments(filter)
    const total_pages = Math.ceil(total_rows / _limit)

    return handleResponseList(res, {
      status: StatusCodes.OK,
      message: 'Orders fetched successfully',
      results: orders,
      paginations: {
        page: _page,
        total_pages: total_pages,
        total_rows: total_rows,
        limit: _limit,
        skip: _skip,
      },
    })
  } catch (error) {
    next(error)
  }
})

orderRouter.get(`/get/:id`, authProtectedRouter, async (req, res, next) => {
  try {
    const id = req.params.id
    const order = await orderModel.findById(id).populate({
      path: 'products.product',
    })
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: 'Order fetched successfully',
      data: order,
    })
  } catch (error) {
    next(error)
  }
})

orderRouter.put(`/update/:id`, authProtectedRouter, async (req, res, next) => {
  try {
    const id = req.params.id
    const body = req.body

    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      {
        status: body.status,
      },
      { new: true },
    )

    if (body.status === 'delivered') {
      await notificationModel.create({
        user: updatedOrder.user,
        title: 'Order delivered',
        message: `Your order with ID ${
          updatedOrder._id
        } has been delivered on ${new Date().toLocaleString()}`,
        order: updatedOrder._id,
      })
    }

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: 'Order status updated successfully',
      data: updatedOrder,
    })
  } catch (error) {
    next(error)
  }
})

export default orderRouter
