import profile from '../data/profile.js';

function About({ language }) {
  const content = profile[language];

  return (
    <section id="about" className="scroll-mt-28 bg-white py-16 dark:bg-slate-950 lg:py-20">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="section-kicker">{content.sections.about.kicker}</p>
          <h2 className="section-title">{content.sections.about.title}</h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">
          {content.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
