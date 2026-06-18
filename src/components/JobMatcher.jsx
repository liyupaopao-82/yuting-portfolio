import { useMemo, useState } from 'react';

const sampleJd = `We are looking for a Data Analyst / AI Product Operations intern to support user growth, sales funnel analysis, dashboard building, and AI product iteration. The role requires SQL, Python, Excel, BI dashboard experience, user segmentation, task tracking, cross-functional communication, and the ability to translate business scenarios into actionable insights. Experience with machine learning, computer vision, or data visualization projects is a plus.`;

const dimensionLabels = {
  roleFit: '岗位方向匹配',
  experienceFit: '工作经历匹配',
  skillFit: '技能能力匹配',
  projectFit: '项目经历匹配',
};

function normalizeScore(score) {
  const value = Number(score);

  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(value)));
}

function normalizeResult(payload) {
  const matrix = payload?.matchMatrix || payload?.matrix || {};

  return {
    overallLevel: payload?.overallLevel || '待评估',
    overallScore: normalizeScore(payload?.overallScore),
    matchMatrix: {
      roleFit: {
        label: matrix.roleFit?.label || dimensionLabels.roleFit,
        score: normalizeScore(matrix.roleFit?.score),
        reason: matrix.roleFit?.reason || '暂无说明',
      },
      experienceFit: {
        label: matrix.experienceFit?.label || dimensionLabels.experienceFit,
        score: normalizeScore(matrix.experienceFit?.score),
        reason: matrix.experienceFit?.reason || '暂无说明',
      },
      skillFit: {
        label: matrix.skillFit?.label || dimensionLabels.skillFit,
        score: normalizeScore(matrix.skillFit?.score),
        reason: matrix.skillFit?.reason || '暂无说明',
      },
      projectFit: {
        label: matrix.projectFit?.label || dimensionLabels.projectFit,
        score: normalizeScore(matrix.projectFit?.score),
        reason: matrix.projectFit?.reason || '暂无说明',
      },
    },
    highlights: Array.isArray(payload?.highlights) ? payload.highlights.slice(0, 3) : [],
    gaps: Array.isArray(payload?.gaps) ? payload.gaps.slice(0, 2) : [],
    summary: payload?.summary || '暂无总结说明。',
  };
}

function MatrixRow({ item }) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-black text-slate-950 dark:text-white">{item.label}</p>
        <p className="text-sm font-black text-teal-700 dark:text-teal-300">{item.score}</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div className="h-full rounded-full bg-teal-600 transition-all" style={{ width: `${item.score}%` }} />
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.reason}</p>
    </div>
  );
}

function JobMatcher() {
  const [jd, setJd] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const matrixItems = useMemo(() => {
    if (!result) {
      return [];
    }

    return ['roleFit', 'experienceFit', 'skillFit', 'projectFit'].map((key) => result.matchMatrix[key]);
  }, [result]);

  const handleSubmit = async () => {
    const input = jd.trim();

    if (!input) {
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

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
  };

  return (
    <div className="content-card border-white/20 bg-white/95 shadow-soft dark:border-slate-700 dark:bg-slate-900/95">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="section-kicker">AI Job Match Analyzer</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">AI 岗位匹配器</h2>
        </div>
        <span className="rounded-md bg-teal-50 px-3 py-2 text-xs font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-300">
          JD 输入 → AI 分析 → 结果卡片
        </span>
      </div>

      <textarea
        className="mt-5 min-h-40 w-full resize-y rounded-md border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-950"
        maxLength={6000}
        placeholder="粘贴岗位 JD，AI 将基于我的简历、实习和项目经历生成匹配分析。"
        value={jd}
        onChange={(event) => setJd(event.target.value)}
      />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button className="btn-secondary" type="button" onClick={() => setJd(sampleJd)}>
          填充示例 JD
        </button>
        <button className="btn-secondary" type="button" onClick={handleClear}>
          清空
        </button>
        <button
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60 sm:ml-auto"
          type="button"
          disabled={!jd.trim() || isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? 'AI 正在分析岗位匹配度...' : '开始匹配'}
        </button>
      </div>

      {error ? (
        <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">综合匹配等级</p>
              <p className="mt-2 text-2xl font-black text-slate-950 dark:text-white">{result.overallLevel}</p>
            </div>
            <div className="rounded-md bg-slate-50 p-4 dark:bg-slate-800">
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">综合评分</p>
              <p className="mt-2 text-2xl font-black text-teal-700 dark:text-teal-300">{result.overallScore} / 100</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-black text-slate-950 dark:text-white">匹配矩阵</h3>
            <div className="mt-4 grid gap-3">
              {matrixItems.map((item) => (
                <MatrixRow key={item.label} item={item} />
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-black text-slate-950 dark:text-white">匹配亮点</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {result.highlights.map((item) => (
                  <li key={item} className="border-l-2 border-teal-200 pl-3 dark:border-teal-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-950 dark:text-white">可补强点</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {result.gaps.map((item) => (
                  <li key={item} className="border-l-2 border-amber-200 pl-3 dark:border-amber-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-black text-slate-950 dark:text-white">总结说明</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{result.summary}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default JobMatcher;
