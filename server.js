const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const path = require("path");
const morgan = require("morgan");
const ejs = require('ejs');

const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
const app = express();
const PORT = process.env.PORT || 7000;
const connectDB = require("./db");

const authRoute = require("./route/authRoute");
const leadRoute = require("./route/leadRoute");
const dealRoute = require("./route/dealRoute");
const meetingRoute = require("./route/meetingRoute");
const taskRoute = require("./route/taskRoute");

app.use(cookieParser(process.env.REF_TOKEN_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(`/api/v1/auth`, authRoute);
app.use(`/api/v1/lead`, leadRoute);
app.use(`/api/v1/deal`, dealRoute);
app.use(`/api/v1/event`, meetingRoute);
app.use(`/api/v1/task`, taskRoute);


app.use(
  "/public/Images",
  express.static(path.join(__dirname, "public/Images"))
);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`server is listening on port http://localhost:${PORT}`);
    });
  } catch (err) {
    throw err;
  }
};

start();
