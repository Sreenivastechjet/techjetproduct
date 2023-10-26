const mongoose = require("mongoose");

const Deal = new mongoose.Schema(
  {
    number: {
      type: String,
      trim: true,
      unique: true,
    },
    stage: {
      type: String,
      trim: true,
    },
    technology: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    businessname: {
      type: String,
      trim: true,
    },
    amount: {
      type: String,
      trim: true,
    },
    advance: {
      type: String,
      trim: true,
    },
    balance: {
      type: String,
      trim: true,
    },
    projectname: {
      type: String,
      trim: true,
    },
    deadline: {
      type: String,
      trim: true,
    },
    dealclosedby: {
      type: String,
    },
    paymentstage: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
    },
    history: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
        },
        changes: [
          {
            field: {
              type: String,
              required: true,
              trim: true,
            },
            newValue: {
              type: String,
              trim: true,
            },
            createdby: {
              type: String,
              trim: true,
            },
          },
        ],
      },
    ],
    images: [
      {
        filename: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    notes: [
      {
        note: {
          type: String,
          trim: true,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    emails: [
      {
        message: {
          type: String,
          trim: true,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    uploadBy: {
      type: String,
      trim: true,
    },
  },

  {
    collection: "deals",
    timestamps: true,
  }
);

module.exports = mongoose.model("Deal", Deal);
