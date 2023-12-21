import express from "express";
import {
  getCallBooks,
  createCallBook,
  deleteCallBook,
} from "../controllers/callBookController.js";

const router = express.Router();

router.get("/", getCallBooks);
router.post("/", createCallBook);
router.delete("/:id", deleteCallBook);

export default router;
