import { QUERY_PARAMETER } from '#server/constants/query.constant'
import {
  handleResponse,
  handleResponseList,
} from '#server/helpers/responses.helper'
import { authProtectedRouter } from '#server/middlewares/auth.middleware'
import addressModel from '#server/models/address.model'
import expresss from 'express'
import { StatusCodes } from 'http-status-codes'

const app = expresss.Router()

app.post(`/create`, authProtectedRouter, async (req, res, next) => {
  try {
    const body = req.body
    const user = req.user

    if (body.isDefault) {
      await addressModel.updateMany(
        { user: user._id },
        { $set: { isDefault: false } },
      )
    }
    const newAddress = await addressModel.create({
      ...body,
      user: user._id,
    })
    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: 'Address created successfully',
      data: newAddress,
    })
  } catch (error) {
    next(error)
  }
})
app.put(`/update/:id`, authProtectedRouter, async (req, res, next) => {
  try {
    const id = req.params.id
    const body = req.body
    const user = req.user

    if (body.isDefault) {
      await addressModel.updateMany(
        { user: user._id, _id: { $ne: id } },
        { $set: { isDefault: false } },
      )
    }
    const updatedAddress = await addressModel.findByIdAndUpdate(id, body, {
      new: true,
    })
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: 'Address updated successfully',
      data: updatedAddress,
    })
  } catch (error) {
    next(error)
  }
})
app.delete(`/delete/:id`, authProtectedRouter, async (req, res, next) => {
  try {
    const id = req.params.id
    const deletedAddress = await addressModel.findByIdAndDelete(id, {
      new: true,
    })
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: 'Address deleted successfully',
      data: deletedAddress,
    })
  } catch (error) {
    next(error)
  }
})
app.get(`/get-me`, authProtectedRouter, async (req, res, next) => {
  try {
    const user = req.user

    const _page = parseInt(req.query._page) || QUERY_PARAMETER._PAGE
    const _limit = parseInt(req.query._limit) || QUERY_PARAMETER._LIMIT
    const _skip = parseInt(req.query._skip) || QUERY_PARAMETER._SKIP

    const filter = {
      user: user._id,
    }

    const addresses = await addressModel
      .find(filter)
      .limit(_limit)
      .skip((_page - 1) * _limit + _skip)
      .sort({
        createdAt: -1,
      })

    const total_rows = await addressModel.countDocuments(filter)
    const total_pages = Math.ceil(total_rows / _limit)

    return handleResponseList(res, {
      status: StatusCodes.OK,
      message: 'Addresses fetched successfully',
      results: addresses,
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
app.get(`/get/:id`, authProtectedRouter, async (req, res, next) => {
  try {
    const id = req.params.id
    const address = await addressModel.findById(id)
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: 'Address fetched successfully',
      data: address,
    })
  } catch (error) {
    next(error)
  }
})
app.get(`/get-default-address`, authProtectedRouter, async (req, res, next) => {
  try {
    const user = req.user

    const filter = {
      user: user._id,
      isDefault: true,
    }

    const address = await addressModel.findOne(filter)

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: 'Default address fetched successfully',
      data: address,
    })
  } catch (error) {
    next(error)
  }
})

const addressRouter = app

export default addressRouter
