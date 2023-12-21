import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import callBookRoute from "./routes/callBookRoute.js";
import connectDatabase from "./config/db.js";
import { notFoundURL, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
connectDatabase();

const app = express();
const port = process.env.port || 8080;
const __dirname = path.resolve();

app.use(cors());
// bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/log", callBookRoute);

// app.get("/", (req, res) => {
//   res.send("....API....");
// });

if (process.env.NODE_ENV === "production") {
  // set static folder for frontend build
  app.use(express.static(path.join(__dirname, "/CallBook/dist")));
  // any routes that is not api will be redirected to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "CallBook", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("... Calling Api ..");
  });
}

app.use(notFoundURL);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Listening To Port");
});
