const route = require('express').Router()
const meetingController = require("../controller/taskController")


route.post('/createtask', meetingController.createtask)
route.post('/getalltasks/:assigneeValue', meetingController.getalltasks)
route.patch('/updatetask/:id/:status', meetingController.taskstatus)


module.exports = route