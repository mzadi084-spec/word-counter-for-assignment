import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ALL_TOOLS_REGISTRY } from '../data/toolsRegistry';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    const clean = path.replace(/\/+$/, '');
    return location.pathname.replace(/\/+$/, '') === clean;
  };

  const renderToolLink = (
    tool: (typeof ALL_TOOLS_REGISTRY)[number],
    className: string,
    onClick?: () => void
  ) => {
    if (tool.isStandaloneStatic) {
      return (
        <a key={tool.id} href={tool.path} className={className} onClick={onClick}>
          {tool.name}
        </a>
      );
    }
    return (
      <Link key={tool.id} to={tool.path} className={className} onClick={onClick}>
        {tool.name}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single-line Brand Wordmark */}
          <Link
            to="/"
            className="text-base sm:text-lg font-extrabold tracking-tight text-zinc-950 hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
            aria-label="Word Counter for Assignment Home"
          >
            Word Counter for Assignment
          </Link>

          {/* Zone 2: Concise single-line Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium" aria-label="Main Navigation">
            <Link
              to="/"
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                isActive('/')
                  ? 'border-zinc-950 text-zinc-950 font-semibold'
                  : 'border-transparent text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Word Counter
            </Link>

            <a
              href="/urdu-word-counter/"
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                isActive('/urdu-word-counter')
                  ? 'border-zinc-950 text-zinc-950 font-semibold'
                  : 'border-transparent text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Urdu Counter
            </a>

            <a
              href="/words-to-pages-converter/"
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                isActive('/words-to-pages-converter')
                  ? 'border-zinc-950 text-zinc-950 font-semibold'
                  : 'border-transparent text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Words to Pages
            </a>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setToolsDropdownOpen((prev) => !prev)}
                aria-expanded={toolsDropdownOpen}
                className="inline-flex items-center gap-1 whitespace-nowrap shrink-0 text-zinc-600 hover:text-zinc-950 transition-colors py-1 cursor-pointer"
              >
                <span>All Tools</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    toolsDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-[540px] rounded-xl bg-white border border-zinc-200 shadow-lg p-4 z-50 grid grid-cols-2 gap-1.5">
                  {ALL_TOOLS_REGISTRY.map((tool) =>
                    renderToolLink(
                      tool,
                      `block px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive(tool.path)
                          ? 'bg-zinc-950 text-white font-semibold'
                          : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950'
                      }`,
                      () => setToolsDropdownOpen(false)
                    )
                  )}
                </div>
              )}
            </div>

            <a
              href="/blog/"
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                isActive('/blog')
                  ? 'border-zinc-950 text-zinc-950 font-semibold'
                  : 'border-transparent text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Blog
            </a>
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="hidden md:flex items-center shrink-0">
            <Link
              to="/pdf-word-counter/"
              className="px-4 py-2 rounded-lg bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0"
            >
              PDF Counter
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg border border-zinc-200 text-zinc-950 hover:bg-zinc-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-5 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              All Writing Tools
            </p>
            <div className="grid grid-cols-1 gap-1">
              {ALL_TOOLS_REGISTRY.map((tool) =>
                renderToolLink(
                  tool,
                  `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(tool.path)
                      ? 'bg-zinc-950 text-white'
                      : 'text-zinc-800 hover:bg-zinc-100'
                  }`,
                  () => setMobileMenuOpen(false)
                )
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-200 grid grid-cols-2 gap-2 text-sm text-zinc-700">
            <a href="/blog/" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 hover:underline">
              Blog Guides
            </a>
            <a href="/about/" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 hover:underline">
              About Us
            </a>
            <a href="/contact/" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 hover:underline">
              Contact
            </a>
            <a href="/privacy-policy/" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 hover:underline">
              Privacy Policy
            </a>
            <a href="/terms/" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 hover:underline">
              Terms
            </a>
            <Link to="/disclaimer/" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 hover:underline">
              Disclaimer
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
