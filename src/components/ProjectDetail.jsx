import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, Navigate, useParams } from 'react-router-dom';
import profile from '../data/profile.js';
import projects from '../data/projects.js';

function DetailImage({ project, placeholder }) {
  const [hasError, setHasError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  if (!project.image || hasError) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-100 px-6 text-center dark:border-slate-700 dark:bg-slate-800">
        <span className="break-words text-sm font-bold text-slate-400 dark:text-slate-500">{placeholder}</span>
      </div>
    );
  }

  return (
    <>
      <button
        className="group relative block w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 text-left transition hover:border-teal-300 hover:shadow-soft dark:border-slate-700 dark:bg-slate-800"
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`放大查看 ${project.title} 图片`}
      >
        <img
          className="aspect-video w-full object-cover"
          src={project.image}
          alt={`${project.title} preview`}
          onError={() => setHasError(true)}
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-black text-white opacity-0 shadow-soft transition group-hover:opacity-100">
          点击放大
        </span>
      </button>

      {isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="w-full max-w-6xl rounded-2xl bg-white p-4 shadow-2xl dark:bg-slate-900 sm:p-5"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="break-words text-lg font-black text-slate-950 dark:text-white">{project.title}</h3>
                  <button
                    className="rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-teal-700 dark:bg-white dark:text-slate-950"
                    type="button"
                    onClick={() => setIsOpen(false)}
                  >
                    关闭
                  </button>
                </div>
                <div className="max-h-[78vh] overflow-auto rounded-xl bg-slate-100 dark:bg-slate-950">
                  <img
                    className="mx-auto max-h-[78vh] w-auto max-w-full object-contain"
                    src={project.image}
                    alt={`${project.title} enlarged preview`}
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
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

function ResultVideo({ src, poster, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const videoRef = useRef(null);

  if (!src) {
    return null;
  }

  useEffect(() => {
    if (!isOpen || hasVideoError || !videoRef.current) {
      return;
    }

    videoRef.current.play().catch(() => {
      // Some browsers may still block autoplay with sound; controls remain visible.
    });
  }, [isOpen, hasVideoError]);

  return (
    <>
      <button
        className="group mt-5 block w-full max-w-xs overflow-hidden rounded-lg border border-slate-200 bg-slate-100 text-left transition hover:border-teal-300 hover:shadow-soft dark:border-slate-700 dark:bg-slate-800"
        type="button"
        onClick={() => {
          setHasVideoError(false);
          setIsOpen(true);
        }}
      >
        <div className="relative aspect-video bg-slate-200 dark:bg-slate-800">
          <img className="h-full w-full object-cover" src={poster} alt={`${title} 封面`} />
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/25 transition group-hover:bg-slate-950/35">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-lg font-black text-teal-700 shadow-soft">
              ▶
            </span>
          </div>
        </div>
        <div className="p-3">
          <p className="text-sm font-black text-slate-950 dark:text-white">项目运行视频</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">点击放大播放</p>
        </div>
      </button>

      {isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="w-full max-w-5xl rounded-2xl bg-white p-4 shadow-2xl dark:bg-slate-900 sm:p-5"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="text-lg font-black text-slate-950 dark:text-white">{title}</h3>
                  <button
                    className="rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-teal-700 dark:bg-white dark:text-slate-950"
                    type="button"
                    onClick={() => setIsOpen(false)}
                  >
                    关闭
                  </button>
                </div>

                {!hasVideoError ? (
                  <video
                    ref={videoRef}
                    className="aspect-video w-full rounded-xl bg-black"
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    poster={poster}
                    title={title}
                    onLoadedMetadata={() => setHasVideoError(false)}
                    onError={() => setHasVideoError(true)}
                  >
                    <source src={src} type="video/mp4" />
                    您的浏览器不支持视频播放。
                  </video>
                ) : (
                  <div className="flex aspect-video w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-950">
                    <p className="text-lg font-black text-slate-950 dark:text-white">视频暂时无法播放</p>
                    <p className="mt-3 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
                      文件已经配置为
                      <span className="mx-1 font-bold text-teal-700 dark:text-teal-300">public/videos/license-plate-demo.mp4</span>
                      。如果仍然看到这个提示，通常是当前 mp4 编码浏览器不兼容，请转为 H.264 / AVC 编码后重新替换。
                    </p>
                    <a
                      className="mt-5 inline-flex rounded-md bg-teal-600 px-4 py-2 text-sm font-black text-white transition hover:bg-teal-700"
                      href={src}
                      target="_blank"
                      rel="noreferrer"
                    >
                      新窗口打开视频
                    </a>
                  </div>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function ResultPdf({ src, poster, title, cardTitle = '项目成果 PDF', cardDescription = '点击预览，可在弹窗中下载' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPosterError, setHasPosterError] = useState(false);

  if (!src) {
    return null;
  }

  return (
    <>
      <button
        className="group mt-5 block w-full max-w-xs overflow-hidden rounded-lg border border-slate-200 bg-white text-left transition hover:border-teal-300 hover:shadow-soft dark:border-slate-700 dark:bg-slate-800"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-900">
          {poster && !hasPosterError ? (
            <img
              className="h-full w-full object-cover"
              src={poster}
              alt={`${title} 缩略图`}
              onError={() => setHasPosterError(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center px-5 text-center">
              <span className="text-4xl font-black text-teal-700 dark:text-teal-300">PDF</span>
              <span className="mt-2 text-xs font-bold text-slate-500 dark:text-slate-400">项目成果文档</span>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 transition group-hover:bg-slate-950/35">
            <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-black text-teal-700 shadow-soft">点击预览</span>
          </div>
        </div>
        <div className="p-3">
          <p className="text-sm font-black text-slate-950 dark:text-white">{cardTitle}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{cardDescription}</p>
        </div>
      </button>

      {isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="flex max-h-[92vh] w-full max-w-6xl flex-col rounded-2xl bg-white p-4 shadow-2xl dark:bg-slate-900 sm:p-5"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-black text-slate-950 dark:text-white">{title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <a
                      className="rounded-md bg-teal-600 px-4 py-2 text-sm font-black text-white transition hover:bg-teal-700"
                      href={src}
                      download
                    >
                      下载 PDF
                    </a>
                    <a
                      className="rounded-md border border-slate-300 px-4 py-2 text-sm font-black text-slate-700 transition hover:border-teal-300 hover:text-teal-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-teal-500 dark:hover:text-teal-300"
                      href={src}
                      target="_blank"
                      rel="noreferrer"
                    >
                      新窗口打开
                    </a>
                    <button
                      className="rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-teal-700 dark:bg-white dark:text-slate-950"
                      type="button"
                      onClick={() => setIsOpen(false)}
                    >
                      关闭
                    </button>
                  </div>
                </div>

                <div className="min-h-[60vh] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-950">
                  <iframe className="h-[72vh] w-full" src={`${src}#toolbar=1&navpanes=0`} title={title} />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
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
            <ResultVideo
              src={project.resultVideo}
              poster={project.resultVideoPoster || project.image}
              title={`${project.title} 项目运行视频`}
            />
            <ResultPdf
              src={project.resultPdf}
              poster={project.resultPdfPoster}
              title={`${project.title} 项目成果 PDF`}
              cardTitle={project.resultPdfTitle}
              cardDescription={project.resultPdfDescription}
            />
          </DetailBlock>
        </div>
      </div>
    </article>
  );
}

export default ProjectDetail;
