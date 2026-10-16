import { useEffect, useState } from "react";

export default function ScoreRing({ score }) {
  // Animate 0 → score with a requestAnimationFrame loop.
  // useEffect runs the imperative animation; the cleanup cancels it
  // if the score changes (or the component unmounts) mid-animation.
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    let raf;

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setShown(Math.round(score * eased));
      if (t < 1) raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  return (
    <div
      className="score-ring"
      role="img"
      aria-label={`Resume score: ${score} out of 100`}
      style={{ "--pct": shown }}
    >
      <div className="score-ring-hole">
        <span className="score-number">{shown}</span>
        <span className="score-of">/ 100</span>
      </div>
    </div>
  );
}
