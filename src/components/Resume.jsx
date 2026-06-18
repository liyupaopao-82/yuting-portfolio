import profile from '../data/profile.js';

function Resume({ language }) {
  const content = profile[language];

  return (
    <section id="resume" className="scroll-mt-28 bg-white py-16 dark:bg-slate-950 lg:py-20">
      <div className="section-shell">
        <div className="content-card-dark lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-teal-300">{content.sections.resume.kicker}</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">{content.sections.resume.title}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              {content.sections.resume.description}
            </p>
          </div>
          <a
            className="btn-inverse mt-6 w-full sm:w-auto lg:mt-0"
            href={content.resumePath}
            download
          >
            {content.sections.resume.button}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Resume;
