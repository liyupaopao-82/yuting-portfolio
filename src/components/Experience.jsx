import experiences from '../data/experiences.js';

function Experience() {
  return (
    <section id="experience" className="scroll-mt-28 py-16 lg:py-20">
      <div className="section-shell">
        <div className="mb-8">
          <p className="section-kicker">Experience</p>
          <h2 className="section-title">实习经历</h2>
        </div>
        <div className="grid gap-5">
          {experiences.map((item) => (
            <article key={`${item.role}-${item.company}`} className="content-card">
              <p className="text-sm font-bold text-teal-700">{item.period}</p>
              <h3 className="mt-3 break-words text-xl font-black">{item.role}</h3>
              <p className="mt-1 break-words text-sm font-semibold text-slate-500">{item.company}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="break-words border-l-2 border-teal-200 pl-4">
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
