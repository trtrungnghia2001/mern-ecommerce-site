import express from 'express'
import { handleResponse } from '#server/helpers/responses.helper'
import { StatusCodes } from 'http-status-codes'
import productModel from '#server/models/product.model'

const commonRouter = express.Router()

// commonRouter.get(`/category`)
commonRouter.get(`/brand/get`, async (req, res, next) => {
  try {
    const brands = await productModel.distinct(`brand`)
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: 'Brands fetched successfully',
      data: brands,
    })
  } catch (error) {
    next(error)
  }
})
commonRouter.get(`/origin/get`, async (req, res, next) => {
  try {
    const origins = await productModel.distinct(`origin`)
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: 'Origins fetched successfully',
      data: origins,
    })
  } catch (error) {
    next(error)
  }
})
commonRouter.get(`/category/get`, async (req, res, next) => {
  try {
    const origins = await productModel.distinct(`categories`)
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: 'Origins fetched successfully',
      data: origins,
    })
  } catch (error) {
    next(error)
  }
})

export default commonRouter
