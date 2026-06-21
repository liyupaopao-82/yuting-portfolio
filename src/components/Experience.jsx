import { useEffect, useState } from 'react';
import experiences from '../data/experiences.js';
import profile from '../data/profile.js';

const cardTones = [
  'from-sky-100 to-white dark:from-sky-950 dark:to-slate-950',
  'from-teal-100 to-white dark:from-teal-950 dark:to-slate-950',
  'from-amber-100 to-white dark:from-amber-950 dark:to-slate-950',
  'from-violet-100 to-white dark:from-violet-950 dark:to-slate-950',
];

function ExperienceDetailModal({ experience, language, onClose }) {
  const labels = {
    responsibilities: language === 'zh' ? '核心职责' : 'Core Responsibilities',
    responsibilitiesEn: 'Core Responsibilities',
    results: language === 'zh' ? '核心成果' : 'Core Results',
    resultsEn: 'Core Results',
    close: language === 'zh' ? '关闭' : 'Close',
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-slate-100 p-4 shadow-2xl dark:bg-slate-900 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="rounded-2xl border border-white bg-white/80 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-950/80">
          <p className="text-xs font-black uppercase text-teal-700 dark:text-teal-300">{experience.period}</p>
          <div className="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="min-w-0">
              <h3 className="break-words text-2xl font-black text-slate-950 dark:text-white sm:text-3xl">{experience.role}</h3>
              <p className="mt-2 break-words text-sm font-bold text-slate-500 dark:text-slate-400">
                {experience.company} · {experience.location}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {experience.tools.map((tool) => (
                <span key={tool} className="tech-tag">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 dark:text-slate-300">{experience.description}</p>
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-2xl font-black text-slate-950 dark:text-white">{labels.responsibilities}</h3>
          <p className="text-xs font-black uppercase text-slate-500 dark:text-slate-400">{labels.responsibilitiesEn}</p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {experience.responsibilities.map((item, index) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-700"
            >
              <div className={`bg-gradient-to-br ${cardTones[index % cardTones.length]} p-4`}>
                <h4 className="text-lg font-black text-slate-950 dark:text-white">{item.title}</h4>
                <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">{item.subtitle}</p>
              </div>
              <ul className="space-y-3 p-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-700">
          <div className="text-center">
            <h3 className="text-2xl font-black text-slate-950 dark:text-white">{labels.results}</h3>
            <p className="text-xs font-black uppercase text-slate-500 dark:text-slate-400">{labels.resultsEn}</p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {experience.results.map((result) => (
              <article key={result.title} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                <h4 className="text-base font-black text-slate-950 dark:text-white">{result.title}</h4>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{result.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-teal-700 dark:bg-white dark:text-slate-950 dark:hover:bg-teal-100" type="button" onClick={onClose}>
            {labels.close}
          </button>
        </div>
      </div>
    </div>
  );
}

function Experience({ language }) {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const content = profile[language];
  const items = experiences[language];
  const detailLabel = language === 'zh' ? '查看详情' : 'View Details';

  return (
    <section id="experience" className="scroll-mt-28 py-16 lg:py-20">
      <div className="section-shell">
        <div className="mb-8">
          <p className="section-kicker">{content.sections.experience.kicker}</p>
          <h2 className="section-title">{content.sections.experience.title}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <button
              key={item.id}
              className="content-card group block text-left transition hover:border-teal-300 hover:shadow-soft"
              type="button"
              onClick={() => setSelectedExperience(item)}
            >
              <p className="mb-4 inline-flex max-w-full break-words rounded-md bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                {item.tag}
              </p>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.period}</p>
              <h3 className="mt-3 break-words text-lg font-black leading-7 text-slate-950 dark:text-white sm:text-xl">{item.role}</h3>
              <p className="mt-1 break-words text-sm font-semibold text-slate-500 dark:text-slate-400">{item.company}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tools.slice(0, 4).map((tool) => (
                  <span key={tool} className="tech-tag">
                    {tool}
                  </span>
                ))}
              </div>
              <span className="mt-6 inline-flex text-sm font-black text-slate-950 transition group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-300">
                {detailLabel} ↗
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedExperience ? (
        <ExperienceDetailModal experience={selectedExperience} language={language} onClose={() => setSelectedExperience(null)} />
      ) : null}
    </section>
  );
}

export default Experience;
