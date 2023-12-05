import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

//route will call  user controller
router.post('/create-user', userController.createUser)
router.post('/:userId', userController.getSingleUserFromDB)
router.post('/', userController.getAllUsersFromDB)

export const userRoutes = router
