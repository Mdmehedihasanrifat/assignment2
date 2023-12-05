import express from 'express'
import { User } from './users/user.interface'
import { UserModel } from './users/user.model'

const createUserDB = async (user: User) => {
  const result = await UserModel.create(user)

  return result
}

export const userService = {
  createUserDB,
}
