import { Request, Response } from 'express'
import { userService } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body

    const result = await userService.createUserDB(userData)

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getAllUsersFromDB = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB()

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getSingleUserFromDB = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await userService.getSingleUserFromDB(userId)

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}
export const userController = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
}
