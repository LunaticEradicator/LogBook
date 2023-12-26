import Log from "../models/Log.js";
import asyncHandler from "../middleware/AsyncHandler.js";

//? @desc   - Get all callBook details
// @route  - POST/api/log
// @access - public
const getCallBooks = asyncHandler(async (req, res) => {
  // const { callSign } = req.body;
  const callBook = await Log.find({}).sort({ createdAt: -1 });
  if (callBook) {
    res.status(202).json(callBook);
  } else {
    res.status(409).json("Call Book not found");
  }
});

//? @desc   - Create a new callBook
// @route  - POST/api/log
// @access - public
const createCallBook = asyncHandler(async (req, res) => {
  // retrieving data from user
  const {
    callSign,
    userName,
    frequency,
    band,
    reportSent,
    reportReceived,
    date,
    time,
  } = req.body;

  const callSignExist = await Log.findOne({
    callSign: callSign,
    date: date,
    time: time,
  });

  if (callSignExist) {
    res.status(400);
    throw new Error("CallSign already exist at the particular time and date");
  }

  // creating new log data
  const newLog = await Log.create({
    callSign,
    userName,
    frequency,
    band,
    reportSent,
    reportReceived,
    date,
    time,
  });

  // verifying data
  if (newLog) {
    res.status(201).json({
      callSign: newLog.callSign,
      userName: newLog.userName,
      frequency: newLog.frequency,
      band: newLog.band,
      reportSent: newLog.reportSent,
      reportReceived: newLog.reportReceived,
      date: newLog.date,
      time: newLog.time,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Log Data");
  }
});

//? @desc   - DELETE all routes
// @route  - DELETE/api/log/:id
// @access - public
const deleteCallBook = asyncHandler(async (req, res) => {
  const callBook = await Log.findById({ _id: req.params.id });
  if (callBook) {
    await Log.deleteOne({ _id: callBook._id });
    res.status(202).json(callBook);
  } else {
    res.status(404).json("Call Book not found");
  }
  // res.send("DELeted");
});

export { createCallBook, getCallBooks, deleteCallBook };
