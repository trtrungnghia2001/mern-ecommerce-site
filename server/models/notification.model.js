import mongoose, { Schema } from 'mongoose'
const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'order',
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

const notificationModel =
  mongoose.models.notification || mongoose.model(`notification`, schema)

export default notificationModel
