import mongoose, { Schema } from 'mongoose'
const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
)

const cartModel = mongoose.models.cart || mongoose.model(`cart`, schema)

export default cartModel
