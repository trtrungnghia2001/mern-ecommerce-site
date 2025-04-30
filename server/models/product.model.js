import mongoose, { Schema } from 'mongoose'
const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    original_price: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    discount_rate: {
      type: Number,
      default: 0,
    },
    review_count: {
      type: Number,
      default: 0,
    },
    rating_average: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    origin: {
      type: String,
    },
    categories: {
      type: Schema.Types.Mixed,
    },
    brand: {
      type: Schema.Types.Mixed,
    },
    highlight: {
      type: Schema.Types.Mixed,
    },
    quantity_sold: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

const productModel =
  mongoose.models.product || mongoose.model(`product`, schema)

export default productModel
