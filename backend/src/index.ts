import express, { Request, Response } from "express";
import mongoose, { Schema, Document } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 8000;
const DB = process.env.DATABASE!.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD!
);

// CORS configuration
const allowedOrigins = ["https://dump-vvfi.onrender.com"];
const corsOptions: cors.CorsOptions = {
  origin: (origin: string | undefined, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
mongoose
  .connect(DB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: Error) => console.error("Failed to connect to MongoDB", err));

// Entry model
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

const EntryModel = mongoose.model<Entry>("Entry", entrySchema);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "success", message: "Welcome to Dump API!" });
});

app.get("/entries", async (req: Request, res: Response) => {
  try {
    const entries = await EntryModel.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post("/entries", async (req: Request, res: Response) => {
  try {
    const newEntry = new EntryModel(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
