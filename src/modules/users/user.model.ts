import { Schema, model } from 'mongoose'
import { TAddress, TFullName, TOrder, TUser, UserModel } from './user.interface'
import config from '../../app/config'
import bcrypt from 'bcrypt'

const FullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
})

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
})

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: FullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: { type: addressSchema, required: true },
  orders: { type: [orderSchema] },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

//middleware

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  )
  next()
})
userSchema.post('save', function () {})

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// static check user exists or not
userSchema.statics.isUserExists = async function (id: string) {
  const existUser = await this.findOne({ userId: id })

  return existUser
}

userSchema.statics.updateUser = async function (
  userId: string,
  updatedUserData: Partial<TUser>
) {
  // Find the user by userId
  const user = await this.findOne({ userId })

  if (!user) {
    return null
  }

  if (updatedUserData) {
    user.set(updatedUserData)
  }

  await user.save()

  return user
}
export const User = model<TUser, UserModel>('User', userSchema)
