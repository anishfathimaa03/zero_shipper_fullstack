import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "../uploads");

// Created on boot so a fresh clone works without a manual mkdir.
fs.mkdirSync(uploadsDir, { recursive: true });

// Middleware layer: accepts only PDFs up to 5 MB, stores them in backend/uploads.
const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) =>
      cb(null, `${Date.now()}-${file.originalname.replace(/[^\w.-]/g, "_")}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) =>
    cb(
      null,
      file.mimetype === "application/pdf" ||
        file.originalname.toLowerCase().endsWith(".pdf")
    ),
});

export default upload;
