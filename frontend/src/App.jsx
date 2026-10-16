import { useEffect, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Results from "./components/Results.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import SkillsTracked from "./components/SkillsTracked.jsx";
import Footer from "./components/Footer.jsx";
import { analyse } from "./skills.js";

export default function App() {
  const [report, setReport] = useState(null);
  const [analysing, setAnalysing] = useState(false);
  const resultsRef = useRef(null);

  // When a new report arrives, scroll it into view.
  useEffect(() => {
    if (report && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [report]);

  async function handleFile(file, jdText) {
    setAnalysing(true);
    setReport(null);

    try {
      // Multipart body — Vite proxies /api to the Express backend in dev.
      const body = new FormData();
      body.append("resume", file);
      body.append("jd", jdText);

      const res = await fetch("/api/reviews", { method: "POST", body });
      if (!res.ok) throw new Error(`API responded ${res.status}`);

      const data = await res.json();
      setReport({
        fileName: data.fileName,
        score: data.score,
        present: data.presentSkills,
        missing: data.missingSkills,
        saved: data.saved,
      });
    } catch {
      // Backend offline → same deterministic scoring, purely local.
      setReport({ fileName: file.name, saved: false, ...analyse(file, jdText) });
    } finally {
      setAnalysing(false);
    }
  }

  return (
    <>
      <Header />
      <main id="top">
        <Hero onFile={handleFile} analysing={analysing} />

        {report && (
          <section className="results" ref={resultsRef} aria-live="polite">
            <Results report={report} />
          </section>
        )}

        <HowItWorks />
        <SkillsTracked />
      </main>
      <Footer />
    </>
  );
}
