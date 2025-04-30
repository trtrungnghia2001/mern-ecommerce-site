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
  },
  {
    timestamps: true,
  },
)

const historyModel =
  mongoose.models.history || mongoose.model(`history`, schema)

export default historyModel
