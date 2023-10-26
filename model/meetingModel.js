const mongoose = require("mongoose");

const Meeting = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    allDay: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
    location: [],
    people:[],
  },
  {
    collection: "meetings",
    timestamps: true,
  }
);

module.exports = mongoose.model("Meeting", Meeting);
