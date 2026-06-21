import { useState } from 'react';
import { Link } from 'react-router-dom';
import education from '../data/education.js';

function SchoolLogo({ school }) {
  const [hasError, setHasError] = useState(false);

  if (!school.logo || hasError) {
    return (
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-dashed border-slate-300 bg-slate-50 text-center text-xs font-black text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500">
        LOGO
      </div>
    );
  }

  return (
    <img
      className="h-24 w-24 shrink-0 rounded-full object-contain"
      src={school.logo}
      alt={school.logoAlt}
      onError={() => setHasError(true)}
    />
  );
}

function Education({ language }) {
  const content = education[language] || education.zh;

  return (
    <section id="education" className="scroll-mt-28 bg-white py-16 dark:bg-slate-950 lg:py-20">
      <div className="section-shell">
        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-sky-50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:p-8">
          <div className="mb-8">
            <div className="mb-4 h-1 w-12 rounded-full bg-sky-500" />
            <p className="section-kicker">{content.kicker}</p>
            <h2 className="section-title">{content.title}</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {content.schools.map((school) => (
              <article
                key={`${school.school}-${school.period}`}
                className="flex min-w-0 flex-col gap-5 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/90 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400">学校：{school.school}</p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
                    学院：{school.college}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
                    专业：{school.major}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
                    时间：{school.period}
                  </p>
                </div>
                <SchoolLogo school={school} />
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-4 rounded-2xl border border-sky-100 bg-sky-50/70 p-5 dark:border-slate-700 dark:bg-slate-900 md:grid-cols-3">
            {content.summary.map((item) => (
              <Link
                key={item.id}
                className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-soft dark:border-slate-700 dark:bg-slate-950 dark:hover:border-sky-500"
                to={item.href}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl" aria-hidden="true">
                    {item.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-900 dark:text-white">{item.label}</p>
                    <p className="mt-2 break-words text-sm leading-6 text-slate-600 dark:text-slate-300">{item.value}</p>
                    <p className="mt-3 text-xs font-black text-sky-600 transition group-hover:text-teal-700 dark:text-sky-300 dark:group-hover:text-teal-300">
                      {item.proofLabel} ↗
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
