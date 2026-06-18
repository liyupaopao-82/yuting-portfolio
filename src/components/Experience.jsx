import experiences from '../data/experiences.js';
import profile from '../data/profile.js';

function Experience({ language }) {
  const content = profile[language];
  const items = experiences[language];

  return (
    <section id="experience" className="scroll-mt-28 py-16 lg:py-20">
      <div className="section-shell">
        <div className="mb-8">
          <p className="section-kicker">{content.sections.experience.kicker}</p>
          <h2 className="section-title">{content.sections.experience.title}</h2>
        </div>
        <div className="grid gap-5">
          {items.map((item) => (
            <article key={`${item.role}-${item.company}`} className="content-card">
              <p className="text-sm font-bold text-teal-700 dark:text-teal-300">{item.period}</p>
              <h3 className="mt-3 break-words text-xl font-black text-slate-950 dark:text-white">{item.role}</h3>
              <p className="mt-1 break-words text-sm font-semibold text-slate-500 dark:text-slate-400">{item.company}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="break-words border-l-2 border-teal-200 pl-4 dark:border-teal-700">
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
