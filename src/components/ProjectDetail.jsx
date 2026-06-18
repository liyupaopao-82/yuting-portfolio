import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import profile from '../data/profile.js';
import projects from '../data/projects.js';

function DetailImage({ project, placeholder }) {
  const [hasError, setHasError] = useState(false);

  if (!project.image || hasError) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-100 px-6 text-center dark:border-slate-700 dark:bg-slate-800">
        <span className="break-words text-sm font-bold text-slate-400 dark:text-slate-500">{placeholder}</span>
      </div>
    );
  }

  return (
    <img
      className="aspect-video w-full rounded-lg border border-slate-200 object-cover dark:border-slate-700"
      src={project.image}
      alt={`${project.title} preview`}
      onError={() => setHasError(true)}
    />
  );
}

function DetailBlock({ title, children }) {
  return (
    <section className="content-card">
      <h2 className="text-xl font-black text-slate-950 dark:text-white">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{children}</div>
    </section>
  );
}

function ProjectDetail({ language }) {
  const { projectId } = useParams();
  const content = profile[language];
  const labels = content.sections.projectDetail;
  const project = projects[language].find((item) => item.id === projectId);

  if (!project) {
    return <Navigate to="/#projects" replace />;
  }

  return (
    <article className="bg-slate-50 py-12 dark:bg-slate-950 lg:py-16">
      <div className="section-shell">
        <Link className="btn-secondary" to="/#projects">
          {labels.back}
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="min-w-0">
            <p className="mb-4 inline-flex max-w-full break-words rounded-md bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-300">
              {project.tag}
            </p>
            <h1 className="break-words text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <DetailImage project={project} placeholder={content.labels.imagePlaceholder} />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <DetailBlock title={labels.background}>
            <p>{project.background}</p>
          </DetailBlock>
          <DetailBlock title={labels.problem}>
            <p>{project.problem}</p>
          </DetailBlock>
          <DetailBlock title={labels.solution}>
            <p>{project.solution}</p>
          </DetailBlock>
          <DetailBlock title={labels.result}>
            <p>{project.result}</p>
          </DetailBlock>
          <DetailBlock title={labels.techStack}>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </DetailBlock>
          <DetailBlock title={labels.contribution}>
            <ul className="space-y-3">
              {project.contribution.map((item) => (
                <li key={item} className="break-words border-l-2 border-teal-200 pl-4 dark:border-teal-700">
                  {item}
                </li>
              ))}
            </ul>
          </DetailBlock>
        </div>
      </div>
    </article>
  );
}

export default ProjectDetail;
