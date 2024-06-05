import mongoose, { Schema, Document } from "mongoose";
import express = require("express");
import cors = require("cors");
import dotenv = require("dotenv");

const app = express();
const allowedOrigins = ["https://dump-vvfi.onrender.com"];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Allow credentials if needed
  })
);

dotenv.config({ path: "./config.env" });
const port = process.env.PORT;
const DB = (process.env.DATABASE as string).replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD as string
);
app.use(cors());
app.use(express.json());

mongoose
  .connect(DB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

interface Entry extends Document {
  title: string;
  content: string;
  date: Date;
}

const entrySchema: Schema<Entry> = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Entry = mongoose.model<Entry>("Entry", entrySchema);
app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Welcome to Dump API!" });
});
app.get("/entries", async (req, res) => {
  const entries = await Entry.find();
  res.json(entries);
});

app.post("/entries", async (req, res) => {
  const newEntry = new Entry(req.body);
  await newEntry.save();
  res.status(201).json(newEntry);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
