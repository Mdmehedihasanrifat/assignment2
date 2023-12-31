import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

//route will call  user controller
router.post('/', userController.createUser)
router.get('/:userId', userController.getSingleUserFromDB)
router.put('/:userId', userController.updateUserFromDb)
router.delete('/:userId', userController.getDeleteUserFromDB)
router.get('/', userController.getAllUsersFromDB)

export const userRoutes = router
