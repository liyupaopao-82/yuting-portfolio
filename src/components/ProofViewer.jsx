import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import education from '../data/education.js';

function ProofViewer({ language }) {
  const { proofId } = useParams();
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const content = education[language] || education.zh;
  const proof = content.summary.find((item) => item.id === proofId);

  const backToEducation = () => {
    navigate('/#education', { replace: true });
  };

  if (!proof) {
    return (
      <section className="min-h-[70vh] bg-white py-16 dark:bg-slate-950">
        <div className="section-shell">
          <div className="content-card text-center">
            <h1 className="text-2xl font-black text-slate-950 dark:text-white">未找到证明材料</h1>
            <Link className="btn-primary mt-6" to="/#education" replace>
              返回教育背景
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] bg-white py-10 dark:bg-slate-950 lg:py-14">
      <div className="section-shell">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="section-kicker">Proof</p>
            <h1 className="section-title">{proof.label}证明</h1>
          </div>
          <button className="btn-secondary w-full sm:w-auto" type="button" onClick={backToEducation}>
            返回上一页
          </button>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          {!hasError ? (
            <img
              className="mx-auto max-h-[72vh] w-full rounded-2xl border border-slate-200 bg-white object-contain dark:border-slate-700 dark:bg-slate-950"
              src={proof.image}
              alt={`${proof.label}证明`}
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="flex min-h-[20rem] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-950">
              <p className="text-lg font-black text-slate-950 dark:text-white">证明图片暂未上传</p>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
                请将图片放到 <span className="font-bold">public/images</span> 目录，并确保文件路径为：
                <span className="mt-2 block break-words font-bold text-teal-700 dark:text-teal-300">{proof.image}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProofViewer;
