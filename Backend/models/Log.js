import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    callSign: {
      type: String,
      required: true,
      lowerCase: true,
    },
    userName: {
      type: String,
    },
    frequency: {
      type: String,
      required: true,
    },
    band: {
      type: Number,
      required: true,
    },
    reportSent: {
      type: String,
      required: true,
    },
    reportReceived: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Log = mongoose.model("log", logSchema);

export default Log;
