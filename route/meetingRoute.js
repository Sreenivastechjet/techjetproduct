const route = require('express').Router()
const meetingController = require("../controller/meetingController")


route.post('/cratemeeting', meetingController.createMeeting)
route.post('/getallmeetings/:email', meetingController.getAllMeetings)
route.post('/getupcomingmeetings/:email', meetingController.getAllMeetingsFromToday)


module.exports = route