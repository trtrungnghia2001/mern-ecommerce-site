import mongoose, { Schema } from 'mongoose'
const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    products: [
      {
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
        origin_price: {
          type: Number,
          required: true,
          default: 0,
        },
        price: {
          type: Number,
          required: true,
          default: 0,
        },
        discount: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    total_cost: {
      type: Number,
      required: true,
    },
    shipping_fee: {
      type: Number,
      required: true,
    },
    direct_discount: {
      type: Number,
      required: true,
    },
    shipping_discount: {
      type: Number,
      required: true,
    },
    total_payment: {
      type: Number,
      required: true,
    },
    total_save: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
      enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
    },
    shippingAddress: {
      type: Schema.Types.Mixed,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

const orderModel = mongoose.models.order || mongoose.model(`order`, schema)

export default orderModel
