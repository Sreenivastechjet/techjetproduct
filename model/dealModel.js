const mongoose = require("mongoose");

const Deal = new mongoose.Schema(
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
    projectName: {
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
    state: {
      type: String,
    },
    zipcode: {
      type: String,
      trim: true,
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
    history: [
      {
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
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
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
    uploadBy: {
      type: String,
      trim: true,
    },
    emails: [
      {
        sentby: {
          type: String,
          trim: true,
          required: true,
        },
        content: {
          type: String,
          trim: true,
          required: true,
        },
        subject:{
          type:String,
          trim : true
        },
        to:{
          type: String,
          trim:true
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
          required: true,
        },
        meetingtype: {
          type: String,
          trim: true,
          required: true,
        },
        subject:{
          type:String,
          trim : true
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
        participants:[],
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  

  {
    collection: "deals",
    timestamps: true,
  }
);

module.exports = mongoose.model("Deal", Deal);
