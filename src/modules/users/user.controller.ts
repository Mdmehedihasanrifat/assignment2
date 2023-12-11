import { Request, Response } from 'express'
import { userService } from './user.service'
import userValidationSchema from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    //joi validation

    const userData = req.body

    // joi validate data

    // console.log(userData)

    const { error } = userValidationSchema.validate(userData)
    const result = await userService.createUserDB(userData)

    if (error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error: error.details,
      })
    }

    //Add projection
    const Userprojection = {
      username: result.username,
      fullName: {
        firstName: result.fullName.firstName,
        lastName: result.fullName.lastName,
      },
      age: result.age,
      email: result.email,
      address: result.address,
    }
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: Userprojection,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'Failed to created User!',
      data: err,
    })
  }
}

const getAllUsersFromDB = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB()
    //Add projection

    const Userprojection = result.map((user) => ({
      username: user.username,
      fullName: {
        firstName: user.fullName.firstName,
        lastName: user.fullName.lastName,
      },
      age: user.age,
      email: user.email,
      address: user.address,
    }))

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: Userprojection,
    })
  } catch (err) {
    res.status(404).json(err)
  }
}

const getSingleUserFromDB = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const result = await userService.getSingleUserFromDB(userId as string)
    //Add projection
    const Userprojection = {
      username: result.username,
      fullName: {
        firstName: result.fullName.firstName,
        lastName: result.fullName.lastName,
      },
      age: result.age,
      email: result.email,
      address: result.address,
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: Userprojection,
    })
  } catch (err) {
    res.status(404).json(err)
  }
}

const getDeleteUserFromDB = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await userService.getDeleteUserFromDB(userId)

    res.status(200).json({
      success: true,
      message: 'Delete successfully!',
      data: result,
    })
  } catch (err) {
    res.status(404).json(err)
  }
}
// update user From db
const updateUserFromDb = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const updatedUserData = req.body
    // const { error: validationError } =
    //   userValidationSchema.validate(updatedUserData)

    // if (validationError) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Validation error',
    //     error: validationError.details,
    //   })
    // }

    const result = await userService.updateUserFromDB(userId, updatedUserData)

    if (result) {
      const Userprojection = {
        username: result.username,
        fullName: {
          firstName: result.fullName.firstName,
          lastName: result.fullName.lastName,
        },
        age: result.age,
        email: result.email,
        address: result.address,
      }

      res.status(200).json({
        success: true,
        message: 'User Updated Successfully',
        data: Userprojection,
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    })
  }
}

export const userController = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  getDeleteUserFromDB,
  updateUserFromDb,
}
