import express from 'express'
import { authProtectedRouter } from '#server/middlewares/auth.middleware'
import categoryModel from '#server/models/category.model'
import {
  handleResponse,
  handleResponseList,
} from '#server/helpers/responses.helper'
import { StatusCodes } from 'http-status-codes'
import cartModel from '#server/models/cart.model'
import { QUERY_PARAMETER } from '#server/constants/query.constant'
import { Types } from 'mongoose'

const app = express.Router()

app.post(`/add`, authProtectedRouter, async function (req, res, next) {
  try {
    const user = req.user
    const body = req.body

    const check = await cartModel.findOne({
      user: user._id,
      product: body.product,
    })
    if (check) {
      const updateData = await cartModel
        .findOneAndUpdate(
          {
            user: user._id,
            product: body.product,
          },
          {
            $inc: {
              quantity: body.quantity,
            },
          },
        )
        .then(async (doc) => {
          return await cartModel.findById(doc._id).populate([
            {
              path: 'product',
            },
          ])
        })

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: 'Product added to cart successfully',
        data: updateData,
      })
    }

    const newData = await cartModel
      .create({
        ...body,
        user: user._id,
      })
      .then(async (doc) => {
        return await cartModel.findById(doc._id).populate([
          {
            path: 'product',
          },
        ])
      })

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: 'Product added to cart successfully',
      data: newData,
    })
  } catch (error) {
    next(error)
  }
})
app.put(`/update/:id`, authProtectedRouter, async function (req, res, next) {
  try {
    const id = req.params.id
    const body = req.body

    const updateData = await cartModel
      .findByIdAndUpdate(id, {
        ...body,
      })
      .then(async (doc) => {
        return await cartModel.findById(doc._id).populate([
          {
            path: 'product',
          },
        ])
      })

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: 'Product updated in cart successfully',
      data: updateData,
    })
  } catch (error) {
    next(error)
  }
})
app.delete(`/remove/:id`, authProtectedRouter, async function (req, res, next) {
  try {
    const user = req.user
    const id = req.params.id

    const deleteData = await cartModel.findByIdAndDelete(id, {
      new: true,
    })

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: 'Product removed from cart successfully',
      data: deleteData,
    })
  } catch (error) {
    next(error)
  }
})
app.post(
  `/remove/select`,
  authProtectedRouter,
  async function (req, res, next) {
    try {
      const user = req.user
      const body = req.body

      const deleteData = await cartModel.deleteMany({
        _id: { $in: body.ids },
        user: user._id,
      })

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: 'Products removed from cart successfully',
        data: body.ids,
      })
    } catch (error) {
      next(error)
    }
  },
)
app.get(`/get`, authProtectedRouter, async function (req, res, next) {
  try {
    const _page = parseInt(req.query._page) || QUERY_PARAMETER._PAGE
    const _limit = parseInt(req.query._limit) || QUERY_PARAMETER._LIMIT
    const _skip = parseInt(req.query._skip) || QUERY_PARAMETER._SKIP

    const user = req.user

    const filter = {
      user: user._id,
    }

    const getDatas = await cartModel
      .find(filter)
      .populate([
        {
          path: 'product',
        },
      ])
      .skip((_page - 1) * _limit + _skip)
      .limit(_limit)
      .sort({ createdAt: -1 })

    const total_rows = await cartModel.countDocuments(filter)
    const total_pages = Math.ceil(total_rows / _limit)

    const total_quantity =
      (
        await cartModel.aggregate([
          {
            $match: {
              user: {
                $eq: new Types.ObjectId(user._id),
              },
            },
          },
          {
            $group: {
              _id: null,
              total_quantity: {
                $sum: '$quantity',
              },
            },
          },
        ])
      )?.[0]?.total_quantity || 0

    return handleResponseList(res, {
      status: StatusCodes.OK,
      message: 'Cart fetched successfully',
      results: getDatas,
      paginations: {
        page: _page,
        total_pages,
        total_rows,
        limit: _limit,
        skip: _skip,
      },
      helper: {
        total_quantity,
      },
    })
  } catch (error) {
    next(error)
  }
})

const cartRouter = app

export default cartRouter
