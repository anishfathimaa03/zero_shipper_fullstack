import ScoreRing from "./ScoreRing.jsx";

function verdict(score) {
  if (score >= 80) return "Strong resume — nearly shipped. 🚀";
  if (score >= 60) return "Decent base — a few gaps to close.";
  return "Early draft — worth a serious pass. 💪";
}

export default function Results({ report }) {
  const { fileName, score, present, missing, saved } = report;

  return (
    <div className="container">
      <h2 className="results-title">
        Report for <span>{fileName}</span>
      </h2>

      {!saved && (
        <p className="result-note">
          Backend not reachable — scored with the local fallback mock (not saved to MongoDB).
        </p>
      )}

      <div className="results-grid">
        <div className="card score-card">
          <h3>Resume score</h3>
          <ScoreRing score={score} />
          <p className="score-verdict">{verdict(score)}</p>
        </div>

        <div className="card">
          <h3>✅ Skills present</h3>
          <p className="card-sub">Detected in your resume</p>
          <ul className="chip-list">
            {present.map((skill) => (
              <li key={skill} className="chip present">{skill}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>⚠️ Skills missing</h3>
          <p className="card-sub">Common for your target roles</p>
          <ul className="chip-list">
            {missing.map((skill) => (
              <li key={skill} className="chip missing">{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
