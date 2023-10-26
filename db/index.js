const mongoose = require('mongoose')
const assert = require('assert')

const connectDB = (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },).then((res) => {
        console.log("Database connected");
    }).catch(error => {
        console.log(error);
    });
}

module.exports = connectDB