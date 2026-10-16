import { Router } from "express";
import upload from "../middleware/upload.js";
import {
  createReviewHandler,
  listReviewsHandler,
} from "../controller/reviewController.js";

// Routing layer: URL + method + middleware → controller. Nothing else.

const router = Router();

router.post("/", upload.single("resume"), createReviewHandler);
router.get("/", listReviewsHandler);

// Multer/parse errors → 400 JSON instead of an HTML stack trace
router.use((err, _req, res, _next) => {
  res.status(400).json({ error: err.message || "Upload failed" });
});

export default router;
