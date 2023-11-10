const mongoose = require("mongoose");

const Task = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    task: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
    },
    status:{
        type:String
    },
    owner: {
      type: String,
    },
    // assigne: [{ type: String }],
    assignees: [
      {
        key: String,
        value: String,
        label: String,
      },
    ],
  },
  {
    collection: "tasks",
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", Task);
