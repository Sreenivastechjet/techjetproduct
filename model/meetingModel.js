const mongoose = require("mongoose");

const Meeting = new mongoose.Schema(
  {
    organiser: {
      type: String,
      required: true,
    },
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
    participents: [
      {
        key: String,
        value: String,
        label: String,
      },
    ],
  },
  {
    collection: "meetings",
    timestamps: true,
  }
);

module.exports = mongoose.model("Meeting", Meeting);
