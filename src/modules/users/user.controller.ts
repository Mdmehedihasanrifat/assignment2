import { Request, Response } from 'express'
import { userService } from './user.service'
import userValidationSchema from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    //joi validation

    const { user: userData } = req.body

    // joi validate data
    const { error } = userValidationSchema.validate(userData)
    const result = await userService.createUserDB(userData)

    if (error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error: error.details,
      })
    }
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
    res.status(404).json(err)
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
    res.status(404).json(err)
  }
}
export const userController = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
}
