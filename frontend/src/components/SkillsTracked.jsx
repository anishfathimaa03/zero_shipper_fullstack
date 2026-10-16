import { TRACKED_SKILLS } from "../skills.js";

export default function SkillsTracked() {
  return (
    <section className="skills-tracked" id="skills">
      <div className="container">
        <h2>Skills we track</h2>
        <ul className="chip-list tracked">
          {TRACKED_SKILLS.map((skill) => (
            <li key={skill} className="chip tracked">{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
