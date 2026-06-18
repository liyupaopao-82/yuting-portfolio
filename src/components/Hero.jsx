import { useState } from 'react';
import profile from '../data/profile.js';

function AvatarImage({ content }) {
  const [hasError, setHasError] = useState(false);

  if (!content.avatarImage || hasError) {
    return (
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-slate-950 text-xl font-black text-white">
        {content.initials}
      </div>
    );
  }

  return (
    <img
      className="h-16 w-16 shrink-0 rounded-md object-cover"
      src={content.avatarImage}
      alt={`${content.name} avatar`}
      onError={() => setHasError(true)}
    />
  );
}

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

        <div className="min-w-0 rounded-lg border border-white/10 bg-white/95 p-4 shadow-soft dark:bg-slate-900/95 sm:p-5">
          <div className="relative rounded-md border border-slate-200 bg-[#f8fafc] p-6 dark:border-slate-700 dark:bg-slate-950">
            <div className="mb-8 flex items-center gap-4">
              <AvatarImage content={content} />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{content.labels.portfolioSnapshot}</p>
                <h2 className="break-words text-2xl font-black text-slate-950 dark:text-white">{content.name}</h2>
                <p className="mt-1 break-words text-sm font-semibold text-slate-500 dark:text-slate-400">{content.tagline}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.stats.map((stat, index) => (
                <div key={stat.label} className="rounded-md border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                  <p className={`text-3xl font-black ${index === 0 ? 'text-teal-700' : 'text-amber-600'}`}>{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-md bg-slate-950 p-5 text-white">
              <p className="text-sm text-slate-300">{content.labels.currentFocus}</p>
              <p className="mt-2 text-xl font-bold">{content.focus}</p>
            </div>
            <img className="mt-5 aspect-[4/3] w-full rounded-md border border-slate-200 object-cover" src={content.profileImage} alt={`${content.name} portfolio preview`} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
