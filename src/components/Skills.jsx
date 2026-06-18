import profile from '../data/profile.js';
import skills from '../data/skills.js';

function Skills({ language }) {
  const content = profile[language];
  const items = skills[language];

  return (
    <section id="skills" className="scroll-mt-28 py-16 lg:py-20">
      <div className="section-shell">
        <div className="mb-8">
          <p className="section-kicker">{content.sections.skills.kicker}</p>
          <h2 className="section-title">{content.sections.skills.title}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((group) => (
            <article key={group.title} className="content-card">
              <h3 className="break-words text-lg font-black text-slate-950 dark:text-white">{group.title}</h3>
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
