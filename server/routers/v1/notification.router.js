import { QUERY_PARAMETER } from '#server/constants/query.constant'
import { handleResponseList } from '#server/helpers/responses.helper'
import { authProtectedRouter } from '#server/middlewares/auth.middleware'
import notificationModel from '#server/models/notification.model'
import express from 'express'
import { StatusCodes } from 'http-status-codes'

const notificationRouter = express.Router()

notificationRouter.get(
  '/get-me',
  authProtectedRouter,
  async (req, res, next) => {
    try {
      const user = req.user

      const _page = parseInt(req.query._page) || QUERY_PARAMETER._PAGE
      const _limit = parseInt(req.query._limit) || QUERY_PARAMETER._LIMIT
      const _skip = parseInt(req.query._skip) || QUERY_PARAMETER._SKIP

      const filter = {
        user: user._id,
      }

      const datas = await notificationModel
        .find(filter)
        .populate([
          {
            path: 'order',
            populate: {
              path: 'products.product',
            },
          },
        ])
        .limit(_limit)
        .skip((_page - 1) * _limit + _skip)
        .sort({
          createdAt: -1,
        })

      const total_rows = await notificationModel.countDocuments(filter)
      const total_pages = Math.ceil(total_rows / _limit)

      return handleResponseList(res, {
        status: StatusCodes.OK,
        message: 'Notifications fetched successfully',
        results: datas,
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
  },
)

export default notificationRouter
