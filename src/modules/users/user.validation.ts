import Joi from 'joi'
const fullNameSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
})

const addressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
})

const orderSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
})

const userSchemaValidation = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: fullNameSchema.required(),
  age: Joi.number().required(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
  address: addressSchema.required(),
  orders: Joi.array().items(orderSchema),
})

export const userValidation = {
  userSchemaValidation,
  orderSchema,
  addressSchema,
  fullNameSchema,
}
