import profile from '../data/profile.js';

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="section-shell flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {profile.name}. All rights reserved.</p>
        <a className="font-semibold text-slate-700 transition hover:text-teal-700" href="#home">
          返回顶部
        </a>
      </div>
    </footer>
  );
}

export default Footer;
