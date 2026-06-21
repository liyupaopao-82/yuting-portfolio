import JobMatcher from './JobMatcher.jsx';
import profile from '../data/profile.js';

function Hero({ language }) {
  const content = profile[language];

  return (
    <section id="home" className="scroll-mt-28 bg-gradient-to-br from-white via-slate-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950">
      <div className="section-shell grid gap-10 py-14 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-20">
        <div className="min-w-0">
          <p className="mb-4 inline-flex rounded-md border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 dark:border-teal-300/30 dark:bg-teal-300/10 dark:text-teal-100">
            {content.heroEyebrow}
          </p>
          <h1 className="max-w-3xl break-words text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            {content.heroTitle}
          </h1>
          <p className="mt-4 break-words text-lg font-bold leading-8 text-slate-900 dark:text-slate-100 sm:text-xl">{content.role}</p>
          <p className="mt-2 break-words text-sm font-semibold leading-7 text-teal-700 dark:text-teal-200 sm:text-base">{content.tagline}</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            {content.heroIntro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="btn-primary" href={content.resumePath} download>
              {content.buttons.downloadResume}
            </a>
            <a className="btn-secondary dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/15" href="#contact">
              {content.buttons.contactMe}
            </a>
          </div>
        </div>

        <JobMatcher />
      </div>
    </section>
  );
}

export default Hero;
