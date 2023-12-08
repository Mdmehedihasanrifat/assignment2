import { TUser } from './user.interface'
import { User } from './user.model'

const createUserDB = async (userData: TUser) => {
  // const result = await UserModel.create(user)

  const user = new User(userData)

  //built in instance method
  const result = user.save()

  return result
}
const getAllUsersFromDB = async () => {
  const result = await User.find()

  return result
}

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.isUserExists(userId)

  if (result) {
    return result
  } else {
    throw {
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    }
  }
}
const getDeleteUserFromDB = async (userId: string) => {
  const result = await User.updateOne({ userId }, { isDeleted: true })

  return result
}
export const userService = {
  createUserDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  getDeleteUserFromDB,
}
