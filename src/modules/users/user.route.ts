import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

//route will call  user controller
router.post('create-user', userController.createUser)

export const userRoutes = router
