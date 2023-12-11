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
  const result = await User.isUserExists(userId)

  if (result) {
    const user = await User.updateOne({ userId }, { isDeleted: true })

    return user
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
// const updateUserFromDB = async (userId: string, updatedUserData: TUser) => {
//   const result = await User.updateOne({ userId }, { updatedUserData })

//   return result
// }

const updateUserFromDB = async (userId: string, updatedUserData: TUser) => {
  const user = await User.isUserExists(userId)

  if (!user) {
    throw {
      success: true,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    }
  }

  await User.updateUser(userId, updatedUserData)

  const updatedUser = await User.isUserExists(userId)
  return updatedUser
}
export const userService = {
  createUserDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  getDeleteUserFromDB,
  updateUserFromDB,
}
