import express from 'express'
import { User } from './user.interface'
import { UserModel } from './user.model'

const createUserDB = async (user: User) => {
  const result = await UserModel.create(user)

  return result
}
const getAllUsersFromDB = async () => {
  const result = await UserModel.find()

  return result
}
export const userService = {
  createUserDB,
  getAllUsersFromDB,
}
