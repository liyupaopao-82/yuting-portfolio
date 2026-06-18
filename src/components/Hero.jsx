import JobMatcher from './JobMatcher.jsx';
import profile from '../data/profile.js';

function Hero({ language }) {
  const content = profile[language];

  return (
    <section id="home" className="scroll-mt-28 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      <div className="section-shell grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <div className="min-w-0">
          <p className="mb-4 inline-flex rounded-md border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-sm font-semibold text-teal-100">
            {content.heroEyebrow}
          </p>
          <h1 className="max-w-3xl break-words text-3xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            {content.heroTitle}
          </h1>
          <p className="mt-4 break-words text-lg font-bold leading-8 text-slate-100 sm:text-xl">{content.role}</p>
          <p className="mt-2 break-words text-sm font-semibold leading-7 text-teal-200 sm:text-base">{content.tagline}</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            {content.heroIntro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="btn-primary" href="#projects">
              {content.buttons.viewProjects}
            </a>
            <a className="btn-ghost-dark" href="#contact">
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
