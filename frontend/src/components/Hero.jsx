import UploadCard from "./UploadCard.jsx";

export default function Hero({ onFile, analysing }) {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <p className="eyebrow">Resume parser · mock build</p>
        <h1>
          Score your resume.<br />
          See what's missing. <span className="accent">Get shipped.</span>
        </h1>
        <p className="lede">
          Upload a PDF and get an instant read on your resume: one score,
          the skills it shows off, and the skills it's missing.
          Everything runs in your browser — nothing is uploaded anywhere.
        </p>

        <UploadCard onFile={onFile} analysing={analysing} />


        <p className="micro-note">
          Runs on the Express + MongoDB backend — falls back to local scoring if it's offline.
        </p>
      </div>
    </section>
  );
}
