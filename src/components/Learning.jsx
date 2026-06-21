import learning from '../data/learning.js';

const sectionCopy = {
  en: {
    kicker: 'Exploration',
    title: 'Exploration & Learning',
    intro:
      'Self-directed learning outcomes across AI product thinking, data analysis, visualization, and AI-assisted workflows.',
  },
  zh: {
    kicker: 'Exploration',
    title: '探索与学习',
    intro: '展示我在 AI 产品、数据产品、业务分析和计算机视觉方向的自学沉淀与实践复盘。',
  },
};

function Learning({ language }) {
  const content = sectionCopy[language];
  const items = learning[language];

  return (
    <section id="learning" className="scroll-mt-28 bg-white py-16 dark:bg-slate-950 lg:py-20">
      <div className="section-shell">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <p className="section-kicker">{content.kicker}</p>
            <h2 className="section-title">{content.title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">{content.intro}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.title} className="content-card transition hover:border-teal-300 hover:shadow-soft">
              <p className="mb-4 inline-flex max-w-full break-words rounded-md bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                {item.category}
              </p>
              <h3 className="break-words text-lg font-black leading-7 text-slate-950 dark:text-white sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.outcomes.map((outcome) => (
                  <span key={outcome} className="skill-tag">
                    {outcome}
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

export default Learning;
