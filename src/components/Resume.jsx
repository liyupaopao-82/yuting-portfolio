import profile from '../data/profile.js';

function Resume() {
  return (
    <section id="resume" className="scroll-mt-28 bg-white py-16 lg:py-20">
      <div className="section-shell">
        <div className="content-card-dark lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-teal-300">Resume</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">简历下载</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              Download a concise resume covering data analysis, AI product work, operations experience, and technical projects.
            </p>
          </div>
          <a
            className="btn-inverse mt-6 w-full sm:w-auto lg:mt-0"
            href={profile.resumePath}
            download
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}

export default Resume;
