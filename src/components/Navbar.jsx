import { Link } from 'react-router-dom';
import profile from '../data/profile.js';

function Navbar({ language, onLanguageChange, theme, onThemeToggle }) {
  const content = profile[language];
  const themeLabel = theme === 'dark' ? 'Light Mode' : 'Dark Mode';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <nav className="section-shell flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
        <Link className="min-w-0 text-base font-black text-slate-950 dark:text-white sm:text-lg" to="/#home" aria-label="返回首页">
          {content.name}
        </Link>
        <div className="flex flex-col gap-2 lg:items-end">
          <div className="flex flex-wrap gap-2">
            <div className="flex rounded-md border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-900">
              {profile.languageOptions.map((option) => (
                <button
                  key={option.value}
                  className={`min-h-9 rounded px-3 text-xs font-bold transition ${
                    language === option.value
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                      : 'text-slate-600 hover:bg-white hover:text-teal-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-teal-300'
                  }`}
                  type="button"
                  aria-pressed={language === option.value}
                  onClick={() => onLanguageChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <button
              className="min-h-10 rounded-md border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-700 transition hover:bg-white hover:text-teal-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-teal-300"
              type="button"
              aria-label={`Switch to ${themeLabel}`}
              onClick={onThemeToggle}
            >
              {themeLabel}
            </button>
          </div>
          <div className="grid w-full grid-cols-4 gap-1 sm:flex sm:flex-wrap sm:justify-start lg:w-auto lg:justify-end">
            {content.navItems.map((item) => (
              <Link
                key={item.href}
                className="min-h-10 rounded-md px-2 py-2 text-center text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-teal-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-teal-300 sm:px-3 sm:text-sm"
                to={`/${item.href}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
