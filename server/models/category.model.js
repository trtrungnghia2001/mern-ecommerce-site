import mongoose, { Schema } from 'mongoose'
const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    thumbnail: {
      type: String,
    },
    description: {
      type: String,
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

const categoryModel =
  mongoose.models.category || mongoose.model(`category`, schema)

export default categoryModel
