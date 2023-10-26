const route = require('express').Router()
const meetingController = require("../controller/meetingController")


route.post('/cratemeeting', meetingController.createMeeting)
route.post('/getallmeetings', meetingController.getAllMeetings)


module.exports = route