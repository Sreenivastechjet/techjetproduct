const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  createdby: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  changes: [
    {
      field: {
        type: String,
        trim: true,
      },
      newValue: {
        type: String,
        trim: true,
      },
    },
  ],
});

const Lead = new mongoose.Schema(
  {
    leadname: {
      type: String,
      required: true,
      trim: true,
    },
    leadsource: {
      type: String,
      trim: true,
    },
    businessdetails: {
      type: String,
      trim: true,
    },
    businesscategory: {
      type: String,
      trim: true,
    },
    number: {
      type: String,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    technology: {
      type: String,
    },
    website: {
      type: String,
      trim: true,
    },
    modeofcontact: {
      type: String,
      trim: true,
    },
    contacteddate: {
      type: String,
      trim: true,
    },
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    zipcode: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    leadstage: {
      type: String,
      trim: true,
    },
    projectmanager: [
      {
        key: String,
        value: String,
        label: String,
      },
    ],
    leadstatus: [
      {
        fallowUp: {
          type: String,
          trim: true,
        },
        assignTo: {
          type: String,
          trim: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      default: "Not Contacted",
    },
    assignees: [
      {
        key: String,
        value: String,
        label: String,
      },
    ],
    agreement: {
      type: String,
    },
    images: [
      {
        filename: {
          type: String,
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
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    emails: [
      {
        sentby: {
          type: String,
          trim: true,
        },
        content: {
          type: String,
          trim: true,
        },
        subject: {
          type: String,
          trim: true,
        },
        to: {
          type: String,
          trim: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    meetings: [
      {
        organiser: {
          type: String,
          trim: true,
        },
        meetingtype: {
          type: String,
          trim: true,
        },
        subject: {
          type: String,
          trim: true,
        },
        start: {
          type: Date,
          required: true,
        },
        end: {
          type: Date,
          required: true,
        },
        meetlink: {
          type: String,
        },
        participants: [],
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
    history: [HistorySchema],
  },
  {
    collection: "leads",
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", Lead);
