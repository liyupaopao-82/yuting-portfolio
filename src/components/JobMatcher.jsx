import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

const sampleJd = `We are looking for a Data Analyst / AI Product Operations intern to support user growth, sales funnel analysis, dashboard building, and AI product iteration. The role requires SQL, Python, Excel, BI dashboard experience, user segmentation, task tracking, cross-functional communication, and the ability to translate business scenarios into actionable insights. Experience with machine learning, computer vision, or data visualization projects is a plus.`;

const dimensionLabels = {
  roleFit: '岗位方向匹配',
  experienceFit: '工作经历匹配',
  skillFit: '技能能力匹配',
  projectFit: '项目经历匹配',
  education: '教育背景匹配',
  experience: '经历背景匹配',
  skills: '硬技能匹配',
  softSkills: '软技能与工作方式匹配',
};

const matrixOrder = ['education', 'experience', 'skills', 'softSkills'];

function normalizeScore(score) {
  const value = Number(score);

  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(value)));
}

function normalizeMatrix(payload) {
  const matrix = payload?.matrix;

  if (Array.isArray(matrix)) {
    return matrixOrder.map((id) => {
      const item = matrix.find((entry) => entry?.id === id) || {};

      return {
        id,
        label: item.label || dimensionLabels[id],
        score: normalizeScore(item.score),
        reason: item.reason || '暂无说明',
      };
    });
  }

  const legacyMatrix = payload?.matchMatrix || {};
  const legacyMap = {
    education: legacyMatrix.education || legacyMatrix.roleFit,
    experience: legacyMatrix.experience || legacyMatrix.experienceFit,
    skills: legacyMatrix.skills || legacyMatrix.skillFit,
    softSkills: legacyMatrix.softSkills || legacyMatrix.projectFit,
  };

  return matrixOrder.map((id) => ({
    id,
    label: legacyMap[id]?.label || dimensionLabels[id],
    score: normalizeScore(legacyMap[id]?.score),
    reason: legacyMap[id]?.reason || '暂无说明',
  }));
}

function normalizeHighlights(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.slice(0, 3).map((item) => {
    if (typeof item === 'string') {
      return {
        jdRequirement: '匹配要点',
        resumeEvidence: item,
      };
    }

    return {
      jdRequirement: item?.jdRequirement || '匹配要点',
      resumeEvidence: item?.resumeEvidence || item?.evidence || '暂无说明',
    };
  });
}

function normalizeGaps(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.slice(0, 2).map((item) => {
    if (typeof item === 'string') {
      return {
        jdRequirement: '可补强点',
        candidateStatus: item,
      };
    }

    return {
      jdRequirement: item?.jdRequirement || '可补强点',
      candidateStatus: item?.candidateStatus || item?.status || item?.gap || '暂无说明',
    };
  });
}

function normalizeResult(payload) {
  const matrix = normalizeMatrix(payload);

  return {
    overallLevel: payload?.overallLevel || '待评估',
    overallScore: normalizeScore(payload?.overallScore),
    matrix,
    highlights: normalizeHighlights(payload?.highlights),
    gaps: normalizeGaps(payload?.gaps),
    summary: payload?.summary || '暂无总结说明。',
  };
}

function MatrixBar({ item, compact = false }) {
  return (
    <div className={compact ? 'grid gap-2' : 'grid gap-3'}>
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 break-words text-xs font-black text-slate-700 dark:text-slate-200">{item.label}</p>
        <p className="shrink-0 text-right text-xs font-black text-slate-900 dark:text-white">{item.score}</p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div className="h-full rounded-full bg-sky-500" style={{ width: `${item.score}%` }} />
      </div>
      {!compact ? <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">{item.reason}</p> : null}
    </div>
  );
}

function EmptyResultState() {
  return (
    <div className="flex h-full min-h-[14rem] flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white/70 p-6 text-center dark:border-slate-700 dark:bg-slate-900/70">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-lg font-black text-teal-700 dark:bg-teal-950 dark:text-teal-300">
        AI
      </div>
      <p className="mt-4 text-sm font-black text-slate-900 dark:text-white">等待岗位 JD</p>
      <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500 dark:text-slate-400">
        生成结果后，这里会显示一张概览卡。点击概览卡可查看完整匹配详情。
      </p>
    </div>
  );
}

function ResultOverview({ result, matrixItems, onOpen }) {
  return (
    <button
      className="group h-full w-full rounded-xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-soft dark:bg-slate-950 dark:ring-slate-700"
      type="button"
      onClick={onOpen}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase text-teal-700 dark:text-teal-300">Match Overview</p>
          <h3 className="mt-1 text-xl font-black text-slate-950 dark:text-white">{result.overallLevel}</h3>
          <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{result.summary}</p>
        </div>
        <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full bg-rose-50 text-rose-700 ring-8 ring-rose-100 dark:bg-rose-950 dark:text-rose-200 dark:ring-rose-900">
          <span className="text-2xl font-black">{result.overallScore}</span>
          <span className="text-[10px] font-bold">/100</span>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {matrixItems.map((item) => (
          <MatrixBar key={item.label} item={item} compact />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">点击查看完整分析</p>
      </div>
    </button>
  );
}

function ResultDetailModal({ result, matrixItems, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal((
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 px-4 py-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-slate-100 p-4 shadow-2xl dark:bg-slate-900 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-black text-slate-950 dark:text-white">综合等级</h3>
            <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-black text-rose-700 dark:bg-rose-950 dark:text-rose-200">
              {result.overallLevel}
            </span>
          </div>
          <p className="text-xs font-black uppercase text-slate-500 dark:text-slate-400">AI Job Match Analyzer</p>
        </div>

        <div className="mt-5 grid min-h-0 flex-1 gap-4 overflow-y-auto pr-1">
          <div className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-700 lg:p-6">
            <div className="grid gap-6 lg:grid-cols-[14rem_1fr] lg:items-center">
              <div className="flex justify-center lg:justify-start">
                <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-rose-50 text-rose-700 shadow-soft ring-8 ring-rose-100 dark:bg-rose-950 dark:text-rose-200 dark:ring-rose-900">
                  <span className="text-sm font-bold">综合分</span>
                  <span className="text-4xl font-black">{result.overallScore}</span>
                  <span className="text-xs font-bold">/100</span>
                </div>
              </div>
              <div className="min-w-0">
                <h4 className="text-2xl font-black text-sky-600 dark:text-sky-300">匹配矩阵</h4>
                <div className="mt-4 grid gap-4">
                  {matrixItems.map((item) => (
                    <div key={item.label} className="grid gap-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="min-w-0 break-words text-sm font-black text-slate-800 dark:text-slate-100">{item.label}</p>
                        <p className="shrink-0 text-right text-sm font-black text-slate-900 dark:text-white">{item.score}</p>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                        <div className="h-full rounded-full bg-sky-500" style={{ width: `${item.score}%` }} />
                      </div>
                      <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">{item.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-700">
              <h4 className="text-lg font-black text-sky-600 dark:text-sky-300">匹配亮点</h4>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {result.highlights.map((item, index) => (
                  <li key={`${item.jdRequirement}-${index}`} className="border-l-2 border-teal-300 pl-3 dark:border-teal-700">
                    <p className="font-black text-slate-800 dark:text-slate-100">{item.jdRequirement}</p>
                    <p className="mt-1">{item.resumeEvidence}</p>
                  </li>
                ))}
              </ul>

              {result.gaps.length ? (
                <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <h5 className="text-sm font-black text-amber-700 dark:text-amber-300">可补强点</h5>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {result.gaps.map((item, index) => (
                      <li key={`${item.jdRequirement}-${index}`}>
                        <p className="font-black text-slate-800 dark:text-slate-100">{item.jdRequirement}</p>
                        <p className="mt-1">{item.candidateStatus}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-700">
              <h4 className="text-lg font-black text-sky-600 dark:text-sky-300">总结</h4>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{result.summary}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex shrink-0 justify-end">
          <button
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-teal-700 dark:bg-white dark:text-slate-950 dark:hover:bg-teal-100"
            type="button"
            onClick={onClose}
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  ), document.body);
}

function JobMatcher() {
  const [jd, setJd] = useState('');
  const [result, setResult] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const matrixItems = useMemo(() => {
    if (!result) {
      return [];
    }

    return result.matrix;
  }, [result]);

  const handleSubmit = async () => {
    const input = jd.trim();

    if (!input) {
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);
    setIsDetailOpen(false);

    try {
      const response = await fetch('/api/job-match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jd: input }),
      });

      const text = await response.text();
      let payload;

      try {
        payload = JSON.parse(text);
      } catch {
        throw new Error('AI 返回结果解析失败，请稍后重试。');
      }

      if (!response.ok) {
        throw new Error(payload?.message || '岗位匹配分析失败，请稍后重试。');
      }

      setResult(normalizeResult(payload.result || payload));
    } catch (requestError) {
      setError(requestError.message || '岗位匹配分析失败，请稍后重试。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setJd('');
    setResult(null);
    setError('');
    setIsDetailOpen(false);
  };

  return (
    <div className="flex h-auto min-w-0 flex-col gap-3 rounded-2xl border border-slate-200 bg-white/75 p-3 shadow-soft backdrop-blur dark:border-slate-700 dark:bg-slate-950/70 sm:p-4 lg:h-[34rem] lg:max-h-[34rem]">
      <div className="shrink-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase text-teal-700 dark:text-teal-300">AI Job Match Analyzer</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">AI 岗位匹配器</h2>
          </div>
          <span className="w-fit rounded-full bg-blue-600 px-3 py-2 text-xs font-bold text-white">
            JD 输入 → AI 分析 → 结果卡片
          </span>
        </div>

        <textarea
          className="mt-4 h-20 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-950 lg:h-16"
          maxLength={6000}
          placeholder="粘贴岗位 JD，AI 将基于我的简历、实习和项目经历生成匹配分析。"
          value={jd}
          onChange={(event) => setJd(event.target.value)}
        />

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-[auto_auto_1fr]">
          <button className="btn-secondary px-4 py-2 text-xs" type="button" onClick={() => setJd(sampleJd)}>
            填充示例 JD
          </button>
          <button className="btn-secondary px-4 py-2 text-xs" type="button" onClick={handleClear}>
            清空
          </button>
          <button
            className="btn-primary col-span-2 px-4 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-1 sm:justify-self-end"
            type="button"
            disabled={!jd.trim() || isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? 'AI 正在分析...' : '开始匹配'}
          </button>
        </div>

        {error ? (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-semibold leading-5 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        ) : null}
      </div>

      <div className="min-h-[16rem] flex-1 overflow-hidden rounded-xl border border-slate-200 bg-slate-100/90 p-3 shadow-inner dark:border-slate-700 dark:bg-slate-900/90 lg:min-h-0">
        {isLoading ? (
          <div className="flex h-full items-center justify-center rounded-lg bg-white/75 text-center dark:bg-slate-950/60">
            <div>
              <div className="mx-auto h-10 w-10 animate-pulse rounded-full bg-teal-500/20 ring-8 ring-teal-500/10" />
              <p className="mt-4 text-sm font-black text-slate-900 dark:text-white">AI 正在分析岗位匹配度...</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">请稍等，概览卡会显示在当前区域。</p>
            </div>
          </div>
        ) : null}

        {!isLoading && !result ? <EmptyResultState /> : null}

        {!isLoading && result ? (
          <ResultOverview result={result} matrixItems={matrixItems} onOpen={() => setIsDetailOpen(true)} />
        ) : null}
      </div>

      {isDetailOpen && result ? (
        <ResultDetailModal result={result} matrixItems={matrixItems} onClose={() => setIsDetailOpen(false)} />
      ) : null}
    </div>
  );
}

export default JobMatcher;
