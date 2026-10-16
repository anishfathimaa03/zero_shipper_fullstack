import { useState } from "react";
import { formatSize } from "../skills.js";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export default function UploadCard({ onFile, analysing }) {
  // UI state that only this card cares about stays local to it.
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);
  const [chosenFile, setChosenFile] = useState(null);
  const [jdText, setJdText] = useState("");

  function validate(file) {
    setError(null);

    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setError("That's not a PDF — please upload a .pdf file.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("File is larger than 5 MB.");
      return;
    }

    setChosenFile(`${file.name} (${formatSize(file.size)})`);
    // Validation passed — hand the file up to App, which owns the report.
    onFile(file, jdText);
  }

  return (
    <div
      className={`upload-card${dragOver ? " dragover" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length > 0) validate(e.dataTransfer.files[0]);
      }}
    >
      <div className="upload-icon" aria-hidden="true">📄</div>
      <h2>Drop your resume here</h2>
      <p className="upload-hint">PDF only · max 5 MB</p>

      <label className="jd-label" htmlFor="jdInput">
        Job description (optional)
      </label>
      <textarea
        id="jdInput"
        className="jd-box"
        placeholder="Paste the job description to compare against…"
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
      />

      <label className="upload-button" htmlFor="fileInput">
        {analysing ? "Analysing…" : "Choose a PDF"}
      </label>
      <input
        type="file"
        id="fileInput"
        accept="application/pdf,.pdf"
        hidden
        onChange={(e) => {
          if (e.target.files.length > 0) validate(e.target.files[0]);
        }}
      />

      {chosenFile && <p className="upload-file">✔ {chosenFile}</p>}
      {error && <p className="upload-error" role="alert">{error}</p>}
      {analysing && <p className="upload-hint">Reading your resume…</p>}
    </div>
  );
}
