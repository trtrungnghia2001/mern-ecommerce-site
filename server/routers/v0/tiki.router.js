import { handleResponseList } from '#server/helpers/responses.helper'
import productModel from '#server/models/product.model'
import { customProduct } from '#server/services/tiki.api'
import express from 'express'
import { StatusCodes } from 'http-status-codes'

const tikiRouter = express.Router()

tikiRouter.post(`/import-product`, async function (req, res, next) {
  try {
    // const body = req.body
    const products = await customProduct()
    const importDatas = await productModel.insertMany(products)
    return handleResponseList(res, {
      status: StatusCodes.CREATED,
      message: 'Data imported successfully',
      results: importDatas,
    })
  } catch (error) {
    next(error)
  }
})

export default tikiRouter
