import "dotenv/config";
import express from "express";
import cors from "cors";
import reviewsRouter from "./routes/reviews.js";
import { connectDB } from "./config/db.js";

const app = express();
app.use(cors());
app.use("/api/reviews", reviewsRouter);

const PORT = process.env.PORT || 4000;

// connectDB never throws — if Mongo is down the API still starts,
// and /api/reviews keeps working (reports just aren't saved).
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
});
