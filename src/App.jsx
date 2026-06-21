import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Contact from './components/Contact.jsx';
import Education from './components/Education.jsx';
import Experience from './components/Experience.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Learning from './components/Learning.jsx';
import Navbar from './components/Navbar.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';
import ProofViewer from './components/ProofViewer.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const scrollTimer = window.setTimeout(() => {
      if (!location.hash) {
        window.scrollTo({ top: 0, left: 0 });
        return;
      }

      const targetId = decodeURIComponent(location.hash.slice(1));
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ block: 'start' });
      }
    }, 0);

    return () => {
      window.clearTimeout(scrollTimer);
    };
  }, [location.pathname, location.hash]);

  return null;
}

function HomePage({ language }) {
  return (
    <>
      <Hero language={language} />
      <Education language={language} />
      <Experience language={language} />
      <Projects language={language} />
      <Skills language={language} />
      <Learning language={language} />
      <Contact language={language} />
    </>
  );
}

function App() {
  const language = 'zh';
  const [hasManualTheme, setHasManualTheme] = useState(() => localStorage.getItem('theme') !== null);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (hasManualTheme) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (event) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [hasManualTheme]);

  const handleThemeToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', nextTheme);
    setHasManualTheme(true);
    setTheme(nextTheme);
  };

  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <Navbar language={language} theme={theme} onThemeToggle={handleThemeToggle} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage language={language} />} />
            <Route path="/projects/:projectId" element={<ProjectDetail language={language} />} />
            <Route path="/proof/:proofId" element={<ProofViewer language={language} />} />
            <Route path="*" element={<HomePage language={language} />} />
          </Routes>
        </main>
        <Footer language={language} />
      </div>
    </BrowserRouter>
  );
}

export default App;
