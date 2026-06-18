import { Link } from 'react-router-dom';
import profile from '../data/profile.js';

function Footer({ language }) {
  const content = profile[language];

  return (
    <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
      <div className="section-shell flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {content.name}. All rights reserved.</p>
        <Link className="font-semibold text-slate-700 transition hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-300" to="/#home">
          {content.buttons.backToTop}
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
