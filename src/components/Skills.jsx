import skills from '../data/skills.js';

function Skills() {
  return (
    <section id="skills" className="scroll-mt-28 py-16 lg:py-20">
      <div className="section-shell">
        <div className="mb-8">
          <p className="section-kicker">Skills</p>
          <h2 className="section-title">技能栈</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <article key={group.title} className="content-card">
              <h3 className="break-words text-lg font-black">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {group.items.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
