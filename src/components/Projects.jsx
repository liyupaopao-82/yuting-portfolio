import { useState } from 'react';
import projects from '../data/projects.js';

function ProjectImage({ project }) {
  const [hasError, setHasError] = useState(false);

  if (!project.image || hasError) {
    return (
      <div className="mb-5 flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
        <span className="break-words text-sm font-bold text-slate-400">Project image placeholder</span>
      </div>
    );
  }

  return (
    <img
      className="mb-5 aspect-video w-full rounded-md border border-slate-200 object-cover"
      src={project.image}
      alt={`${project.title} preview`}
      onError={() => setHasError(true)}
    />
  );
}

function Projects() {
  return (
    <section id="projects" className="scroll-mt-28 bg-white py-16 lg:py-20">
      <div className="section-shell">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <p className="section-kicker">Projects</p>
            <h2 className="section-title">项目作品</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Selected projects across business operations, AI applications, computer vision, and data visualization.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="content-card transition hover:border-teal-300 hover:shadow-soft">
              <ProjectImage project={project} />
              <p className="mb-4 inline-flex max-w-full break-words rounded-md bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                {project.tag}
              </p>
              <h3 className="break-words text-lg font-black leading-7 sm:text-xl">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
              <p className="mt-5 text-xs font-bold uppercase text-slate-400">Tech Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
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

export default Projects;
