import productModel from '#server/models/product.model'
import { QUERY_PARAMETER } from '#server/constants/query.constant'
import { Types } from 'mongoose'

export async function customProductData({ req, filter }) {
  const _page = parseInt(req.query._page) || QUERY_PARAMETER._PAGE
  const _limit = parseInt(req.query._limit) || QUERY_PARAMETER._LIMIT
  const _skip = parseInt(req.query._skip) || QUERY_PARAMETER._SKIP
  const _tracking_id = req.query._tracking_id

  const products = await productModel.aggregate([
    ...filter,
    // check favorite
    {
      $lookup: {
        from: 'favorites',
        localField: '_id',
        foreignField: 'product',
        as: 'isFavorite',
        pipeline: [
          {
            $match: {
              user: new Types.ObjectId(_tracking_id),
            },
          },
        ],
      },
    },
    {
      $addFields: {
        isFavorite: { $gt: [{ $size: '$isFavorite' }, 0] },
      },
    },
    {
      $skip: (_page - 1) * _limit + _skip,
    },
    {
      $limit: _limit,
    },
  ])

  const total_rows = (
    await productModel.aggregate([
      ...filter,
      {
        $count: 'count',
      },
    ])
  )?.[0]?.count

  const total_pages = Math.ceil(total_rows / _limit)

  return { products, total_rows, total_pages, _page, _limit, _skip }
}
