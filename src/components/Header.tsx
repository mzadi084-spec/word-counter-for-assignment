import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FileText,
  Menu,
  X,
  BookOpen,
  Languages,
  Layers,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { isStaticPagePath, getStaticPageHref } from '../utils/seo';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Word Counter', path: '/' },
    { name: 'Urdu Counter', path: '/urdu-word-counter', badge: 'اردو' },
    { name: 'Words to Pages', path: '/words-to-pages-converter' },
  ];

  const subTools = [
    { name: 'Character Counter', path: '/character-counter', desc: 'Characters with & without spaces' },
    { name: 'Paragraph Counter', path: '/paragraph-counter', desc: 'Paragraph density & structure' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-lg tracking-tight hover:opacity-90 transition-opacity"
            aria-label="Word Counter for Assignment Homepage"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight text-blue-600 dark:text-blue-400 font-extrabold text-sm sm:text-base">
                Word Counter<span className="text-slate-900 dark:text-white"> for Assignment</span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-normal -mt-0.5">
                For Assignments & Essays
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const linkClassName = `px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive(link.path)
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`;
              const content = (
                <>
                  {link.name}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold">
                      {link.badge}
                    </span>
                  )}
                </>
              );

              return isStaticPagePath(link.path) ? (
                <a key={link.path} href={getStaticPageHref(link.path)} className={linkClassName}>
                  {content}
                </a>
              ) : (
                <Link key={link.path} to={link.path} className={linkClassName}>
                  {content}
                </Link>
              );
            })}

            <a
              href="/blog/"
              className="px-3 py-2 rounded-lg text-sm font-medium transition-colors text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
            >
              Blog
            </a>

            {/* Sub-tools Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onBlur={() => setTimeout(() => setToolsDropdownOpen(false), 200)}
                aria-expanded={toolsDropdownOpen}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  subTools.some((t) => location.pathname === t.path)
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>All Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/10 p-2 z-50">
                  <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Specialized Counters
                  </div>
                  {subTools.map((tool) => {
                    const toolClassName = `block px-3 py-2.5 rounded-xl transition-colors ${
                      location.pathname === tool.path
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                    }`;
                    const content = (
                      <>
                        <div className="text-sm font-semibold">{tool.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{tool.desc}</div>
                      </>
                    );

                    return isStaticPagePath(tool.path) ? (
                      <a
                        key={tool.path}
                        href={getStaticPageHref(tool.path)}
                        onClick={() => setToolsDropdownOpen(false)}
                        className={toolClassName}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link
                        key={tool.path}
                        to={tool.path}
                        onClick={() => setToolsDropdownOpen(false)}
                        className={toolClassName}
                      >
                        {content}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Quick Action / Language Callout */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/urdu-word-counter/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Languages className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>اردو سپورٹ</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const mobileLinkClass = `block px-3 py-2.5 rounded-xl text-base font-medium ${
                isActive(link.path)
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`;
              const content = (
                <div className="flex items-center justify-between">
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold">
                      {link.badge}
                    </span>
                  )}
                </div>
              );

              return isStaticPagePath(link.path) ? (
                <a
                  key={link.path}
                  href={getStaticPageHref(link.path)}
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileLinkClass}
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileLinkClass}
                >
                  {content}
                </Link>
              );
            })}

            <a
              href="/blog/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Blog
            </a>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              More Student Tools
            </div>
            <div className="grid grid-cols-1 gap-1">
              {subTools.map((tool) => {
                const mobileToolClass = `block px-3 py-2 rounded-lg text-sm ${
                  location.pathname === tool.path
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`;

                return isStaticPagePath(tool.path) ? (
                  <a
                    key={tool.path}
                    href={getStaticPageHref(tool.path)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={mobileToolClass}
                  >
                    {tool.name}
                  </a>
                ) : (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={mobileToolClass}
                  >
                    {tool.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
            <a href="/about/" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:underline">
              About
            </a>
            <a href="/contact/" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:underline">
              Contact
            </a>
            <a href="/privacy-policy/" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:underline">
              Privacy Policy
            </a>
            <a href="/terms/" onClick={() => setMobileMenuOpen(false)} className="p-2 hover:underline">
              Terms of Use
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
