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

const favoriteModel =
  mongoose.models.favorite || mongoose.model(`favorite`, schema)

export default favoriteModel
