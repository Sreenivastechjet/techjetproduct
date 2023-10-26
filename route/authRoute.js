const route = require('express').Router()
const authController = require('../controller/authController')
const auth = require('../middleware/auth')
// const adminAuth = require('../middleware/adminAuth')


route.post(`/register`, authController.register)
route.post(`/login`, authController.login)
route.get(`/logout`, authController.logout)
route.get(`/refreshToken`, authController.refreshToken)
route.get(`/userinfo`, auth, authController.getUserInfo)
route.patch(`/resetPassword`, authController.resetPassword)
route.patch(`/updateProfile/:id`, authController.profileUpdate)


// route.patch(`/saveOrder`,authMiddleware, authController.saveOrder)
// route.post(`/allUsers`, auth, adminAuth, authController.getAllUsers)



module.exports = route