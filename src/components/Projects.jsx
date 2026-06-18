import { useState } from 'react';
import { Link } from 'react-router-dom';
import profile from '../data/profile.js';
import projects from '../data/projects.js';

function ProjectImage({ project, placeholder }) {
  const [hasError, setHasError] = useState(false);

  if (!project.image || hasError) {
    return (
      <div className="mb-5 flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 px-6 text-center dark:border-slate-700 dark:bg-slate-800">
        <span className="break-words text-sm font-bold text-slate-400 dark:text-slate-500">{placeholder}</span>
      </div>
    );
  }

  return (
    <img
      className="mb-5 aspect-video w-full rounded-md border border-slate-200 object-cover dark:border-slate-700"
      src={project.image}
      alt={`${project.title} preview`}
      onError={() => setHasError(true)}
    />
  );
}

function Projects({ language }) {
  const content = profile[language];
  const items = projects[language];

  return (
    <section id="projects" className="scroll-mt-28 bg-white py-16 dark:bg-slate-950 lg:py-20">
      <div className="section-shell">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <p className="section-kicker">{content.sections.projects.kicker}</p>
            <h2 className="section-title">{content.sections.projects.title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            {content.sections.projects.intro}
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((project) => (
            <Link key={project.id} className="content-card block transition hover:border-teal-300 hover:shadow-soft" to={`/projects/${project.id}`}>
              <ProjectImage project={project} placeholder={content.labels.imagePlaceholder} />
              <p className="mb-4 inline-flex max-w-full break-words rounded-md bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                {project.tag}
              </p>
              <h3 className="break-words text-lg font-black leading-7 text-slate-950 dark:text-white sm:text-xl">{project.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.description}</p>
              <p className="mt-5 text-xs font-bold uppercase text-slate-400">{content.labels.techStack}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
