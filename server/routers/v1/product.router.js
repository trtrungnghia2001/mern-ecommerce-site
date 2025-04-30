import express from 'express'
import { authProtectedRouter } from '#server/middlewares/auth.middleware'
import {
  handleResponse,
  handleResponseList,
} from '#server/helpers/responses.helper'
import { StatusCodes } from 'http-status-codes'
import { customProductData } from '#server/utils/product.util'
import { QUERY_PARAMETER } from '#server/constants/query.constant'
import { Types } from 'mongoose'
import productModel from '#server/models/product.model'
import favoriteModel from '#server/models/favorite.model'
import historyModel from '#server/models/history.model'

const app = express.Router()

app.get(`/get-filter`, async function (req, res, next) {
  try {
    const _q = req.query._q || QUERY_PARAMETER._Q

    //
    const _category = req.query._category || ''
    const _brand = req.query._brand || ''
    const _origin = req.query._origin || ''
    const _ratin = req.query._ratin
    const _price_min = req.query._price_min || 0
    const _price_max = req.query._price_max || 0

    const _sort = req.query._sort
    let sort_filter
    if (_sort === 'best-seller') {
      sort_filter = { quantity_sold: -1 }
    } else if (_sort === 'new-item') {
      sort_filter = { createdAt: -1 }
    } else if (_sort === 'low-to-high') {
      sort_filter = { price: 1 }
    } else if (_sort === 'high-to-low') {
      sort_filter = { price: -1 }
    } else {
      sort_filter = { createdAt: -1 }
    }

    const filter = [
      {
        $match: {
          $and: [
            {
              name: {
                $regex: _q,
                $options: 'i',
              },
            },
            {
              categories: {
                $regex: _category,
                $options: 'i',
              },
            },
            {
              brand: {
                $regex: _brand,
                $options: 'i',
              },
            },
            {
              origin: {
                $regex: _origin,
                $options: 'i',
              },
            },
            {
              rating_average: _ratin
                ? {
                    $gte: parseInt(_ratin),
                    $lt: parseInt(_ratin) + 1,
                  }
                : {
                    $gte: 0,
                  },
            },
            {
              price:
                _price_min && _price_max && _price_max > 0
                  ? {
                      $gte: parseInt(_price_min),
                      $lte: parseInt(_price_max),
                    }
                  : {
                      $gte: 0,
                    },
            },
          ],
        },
      },
      {
        $sort: sort_filter,
      },
    ]

    const getDatas = await customProductData({
      req,
      filter,
    })

    return handleResponseList(res, {
      status: StatusCodes.OK,
      message: 'Data fetched successfully',
      results: getDatas.products,
      paginations: {
        page: getDatas._page,
        total_pages: getDatas.total_pages,
        total_rows: getDatas.total_rows,
        limit: getDatas._limit,
        skip: getDatas._skip,
      },
    })
  } catch (error) {
    next(error)
  }
})
app.get(`/get`, async function (req, res, next) {
  try {
    const _q = req.query._q || QUERY_PARAMETER._Q
    const _sort = req.query._sort

    const filter = [
      {
        $match: {
          name: {
            $regex: _q,
            $options: 'i',
          },
        },
      },
      {
        $sort: {
          ...(_sort ? { [_sort]: -1 } : { createdAt: -1 }),
        },
      },
    ]

    const getDatas = await customProductData({
      req,
      filter,
    })

    return handleResponseList(res, {
      status: StatusCodes.OK,
      message: 'Data fetched successfully',
      results: getDatas.products,
      paginations: {
        page: getDatas._page,
        total_pages: getDatas.total_pages,
        total_rows: getDatas.total_rows,
        limit: getDatas._limit,
        skip: getDatas._skip,
      },
    })
  } catch (error) {
    next(error)
  }
})
app.get(`/get-viewed`, async function (req, res, next) {
  try {
    const user = req.query._tracking_id
    const filter = [
      {
        $lookup: {
          from: 'histories',
          localField: '_id',
          foreignField: 'product',
          as: 'histories',
        },
      },
      {
        $match: {
          'histories.user': new Types.ObjectId(user),
        },
      },
      {
        $project: {
          histories: 0,
        },
      },
    ]

    const getDatas = await customProductData({
      req,
      filter,
    })

    return handleResponseList(res, {
      status: StatusCodes.OK,
      message: 'Data fetched successfully',
      results: getDatas.products,
      paginations: {
        page: getDatas._page,
        total_pages: getDatas.total_pages,
        total_rows: getDatas.total_rows,
        limit: getDatas._limit,
        skip: getDatas._skip,
      },
    })
  } catch (error) {
    next(error)
  }
})
app.get(`/get-interested`, async function (req, res, next) {
  try {
    const filter = [
      {
        $sample: {
          size: QUERY_PARAMETER._LIMIT,
        },
      },
    ]

    const getDatas = await customProductData({
      req,
      filter,
    })

    return handleResponseList(res, {
      status: StatusCodes.OK,
      message: 'Data fetched successfully',
      results: getDatas.products,
      paginations: {
        page: getDatas._page,
        total_pages: getDatas.total_pages,
        total_rows: getDatas.total_rows,
        limit: getDatas._limit,
        skip: getDatas._skip,
      },
    })
  } catch (error) {
    next(error)
  }
})
app.get(`/get-flash-sale`, async function (req, res, next) {
  try {
    const filter = [
      {
        $sample: {
          size: QUERY_PARAMETER._LIMIT,
        },
      },
    ]

    const getDatas = await customProductData({
      req,
      filter,
    })

    return handleResponseList(res, {
      status: StatusCodes.OK,
      message: 'Data fetched successfully',
      results: getDatas.products,
      paginations: {
        page: getDatas._page,
        total_pages: getDatas.total_pages,
        total_rows: getDatas.total_rows,
        limit: getDatas._limit,
        skip: getDatas._skip,
      },
    })
  } catch (error) {
    next(error)
  }
})
app.get(`/get/:id`, async function (req, res, next) {
  try {
    const { id } = req.params

    const getDataById = await productModel.findById(id).populate([
      {
        path: 'categories',
      },
      {
        path: 'brand',
      },
    ])

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: 'Data fetched successfully',
      data: getDataById,
    })
  } catch (error) {
    next(error)
  }
})
app.get(`/get/:id/similar`, async function (req, res, next) {
  try {
    const { id } = req.params

    const getData = await productModel.findById(id)

    const filter = [
      {
        $match: {
          $and: [
            {
              _id: {
                $ne: new Types.ObjectId(id),
              },
            },
            {
              $or: [
                {
                  brand: {
                    $in: [getData.brand],
                  },
                },
              ],
            },
          ],
        },
      },
    ]

    const getDatas = await customProductData({
      req,
      filter,
    })

    return handleResponseList(res, {
      status: StatusCodes.OK,
      message: 'Data fetched successfully',
      results: getDatas.products,
      paginations: {
        page: getDatas._page,
        total_pages: getDatas.total_pages,
        total_rows: getDatas.total_rows,
        limit: getDatas._limit,
        skip: getDatas._skip,
      },
    })
  } catch (error) {
    next(error)
  }
})

// =============================== verify ===============================
// favorite
app.post(`/favorite/add`, authProtectedRouter, async function (req, res, next) {
  try {
    const user = req.user
    const body = req.body

    const newData = await favoriteModel
      .create({
        user: user._id,
        product: body.product,
      })
      .then(async (doc) => {
        return favoriteModel.findById(doc._id).populate([
          {
            path: 'product',
          },
        ])
      })

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: 'Favorite added successfully',
      data: newData.product,
    })
  } catch (error) {
    next(error)
  }
})
app.delete(
  `/favorite/remove/:id`,
  authProtectedRouter,
  async function (req, res, next) {
    try {
      const id = req.params.id
      const user = req.user

      const deleteDataById = await favoriteModel.findOneAndDelete(
        {
          user: user._id,
          product: id,
        },
        {
          new: true,
        },
      )

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: 'Favorite removed successfully',
        data: deleteDataById,
      })
    } catch (error) {
      next(error)
    }
  },
)
app.get(`/favorite/get`, authProtectedRouter, async function (req, res, next) {
  try {
    const user = req.user
    const filter = [
      {
        $lookup: {
          from: 'favorites',
          localField: '_id',
          foreignField: 'product',
          as: 'favorites',
        },
      },
      {
        $match: {
          'favorites.user': new Types.ObjectId(user._id),
        },
      },
      {
        $project: {
          favorites: 0,
        },
      },
    ]

    const getDatas = await customProductData({
      req,
      filter,
    })

    return handleResponseList(res, {
      status: StatusCodes.OK,
      message: 'Data fetched successfully',
      results: getDatas.products,
      paginations: {
        page: getDatas._page,
        total_pages: getDatas.total_pages,
        total_rows: getDatas.total_rows,
        limit: getDatas._limit,
        skip: getDatas._skip,
      },
    })
  } catch (error) {
    next(error)
  }
})
// history
app.post(`/history/add`, authProtectedRouter, async function (req, res, next) {
  try {
    const user = req.user
    const body = req.body

    const check = await historyModel.findOne({
      user: user._id,
      product: body.product,
    })

    if (check) {
      await historyModel.findOneAndDelete(
        {
          user: user._id,
          product: body.product,
        },
        {
          new: true,
        },
      )
    }

    const newData = await historyModel
      .create({
        user: user._id,
        product: body.product,
      })
      .then(async (doc) => {
        return historyModel.findById(doc._id).populate([
          {
            path: 'product',
          },
        ])
      })

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: 'History added successfully',
      data: newData.product,
    })
  } catch (error) {
    next(error)
  }
})
app.delete(
  `/history/remove/:id`,
  authProtectedRouter,
  async function (req, res, next) {
    try {
      const id = req.params.id
      const user = req.user

      const deleteDataById = await favoriteModel.findOneAndDelete(
        {
          user: user._id,
          product: id,
        },
        {
          new: true,
        },
      )

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: 'Favorite removed successfully',
        data: deleteDataById,
      })
    } catch (error) {
      next(error)
    }
  },
)
app.get(`/history/get`, authProtectedRouter, async function (req, res, next) {
  try {
    const user = req.user
    const filter = [
      {
        $lookup: {
          from: 'histories',
          localField: '_id',
          foreignField: 'product',
          as: 'histories',
        },
      },
      {
        $match: {
          'histories.user': new Types.ObjectId(user._id),
        },
      },
      {
        $project: {
          histories: 0,
        },
      },
    ]

    const getDatas = await customProductData({
      req,
      filter,
    })

    return handleResponseList(res, {
      status: StatusCodes.OK,
      message: 'Data fetched successfully',
      results: getDatas.products,
      paginations: {
        page: getDatas._page,
        total_pages: getDatas.total_pages,
        total_rows: getDatas.total_rows,
        limit: getDatas._limit,
        skip: getDatas._skip,
      },
    })
  } catch (error) {
    next(error)
  }
})

const productRouter = app

export default productRouter
