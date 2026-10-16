const STEPS = [
  {
    title: "Upload",
    text: "Drop a PDF resume — parsed client-side, nothing leaves your machine.",
  },
  {
    title: "Analyse",
    text: "Skills are matched against a tracked list, then scored 0–100.",
  },
  {
    title: "Fix & ship",
    text: "See the gaps, add the missing skills, watch the score climb.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="container">
        <h2>How it works</h2>
        <ol className="steps">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <span className="step-num">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
