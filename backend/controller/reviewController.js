import { createReview, listReviews } from "../service/reviewService.js";

// Controller layer: HTTP only — read the request, call the service,
// shape the response. No scoring or DB logic lives here.

// POST /api/reviews — multipart form: file field "resume", text field "jd"
export async function createReviewHandler(req, res) {
  if (!req.file) {
    return res.status(400).json({
      error: "Send the resume as multipart form field 'resume' (PDF).",
    });
  }

  const jdText = (req.body?.jd || "").trim();
  const report = await createReview({
    fileName: req.file.originalname,
    fileSize: req.file.size,
    filePath: req.file.filename,
    jdText,
  });
  res.json(report);
}

// GET /api/reviews — the 20 most recent saved reviews (proof the DB write works)
export async function listReviewsHandler(_req, res) {
  res.json(await listReviews());
}
