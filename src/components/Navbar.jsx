import profile from '../data/profile.js';

const navItems = [
  { label: '首页', href: '#home' },
  { label: '关于我', href: '#about' },
  { label: '经历', href: '#experience' },
  { label: '项目', href: '#projects' },
  { label: '技能', href: '#skills' },
  { label: '简历', href: '#resume' },
  { label: '联系', href: '#contact' },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="section-shell flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
        <a className="min-w-0 text-base font-black text-slate-950 sm:text-lg" href="#home" aria-label="返回首页">
          {profile.name}
        </a>
        <div className="grid w-full grid-cols-4 gap-1 sm:flex sm:flex-wrap sm:justify-start lg:w-auto lg:justify-end">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="min-h-10 rounded-md px-2 py-2 text-center text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-teal-700 sm:px-3 sm:text-sm"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
