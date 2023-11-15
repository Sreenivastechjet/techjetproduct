const route = require('express').Router()
const authController = require('../controller/authController')
const auth = require('../middleware/auth')
const upload = require('../middleware/images')
// const adminAuth = require('../middleware/adminAuth')


route.post(`/register`, authController.register)
route.post(`/login`, authController.login)
route.post(`/forgetpassword`, authController.forgetpassword)
route.get(`/reset-password/:id/:token`, authController.resetbymail)
route.post(`/reset-password/:id/:token`, authController.resetpassbyejs)
route.post(`/getallemplist`, authController.getAllemplist)
route.post(`/empminifiedlist`, authController.empminifiedlist)
route.get(`/logout`, authController.logout)
route.get(`/refreshToken`, authController.refreshToken)
route.get(`/userinfo`, auth, authController.getUserInfo)
route.patch(`/resetPassword`, authController.resetPassword)
route.put(`/updateProfile/:id`, authController.EmpUpdate)
route.get(`/getempbyid/:id`, authController.getempdetails)
route.patch(`/pictute/upload/:id`, upload.single('file'), authController.uploadProfileImg)


//MyToDO
route.post("/:id/addtodo", authController.addTodo)
route.post("/:id/getalltodo",authController.getalltodo)
route.put('/:id/update/:todoId', authController.updatetodo);
route.delete('/:id/delete/:todoId', authController.deletetodo);



module.exports = route