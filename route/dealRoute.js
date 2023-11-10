const route = require("express").Router();

const dealController = require("../controller/dealController");


route.post("/createdeal", dealController.createdeal);
route.post("/getalldeals", dealController.getalldeals);
route.post(`/getdealssbydates/:period`, dealController.getDealsByDates)
route.post(`/getdealssforchart/:year`, dealController.getDealforChart)
route.get("/getsingledeal/:id", dealController.getSingelDeal);

module.exports = route;
