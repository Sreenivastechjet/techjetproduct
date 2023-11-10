const mongoose = require("mongoose");

const Auth = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    employeeId: {
      type: String,
      unique: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
    },
    empstatus: {
      type: Number,
      default: 1,
    },
    image: {
      type: String,
    },
    subscribed: {
      type: Boolean,
    },
    mytodo: [
      {
        title: {
          type: String,
        },
        date: {
          type: String,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    meetings: [],
    mytasks: [],
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = mongoose.model("Auth", Auth);
