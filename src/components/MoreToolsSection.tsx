import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ALL_TOOLS_REGISTRY } from '../data/toolsRegistry';

interface MoreToolsSectionProps {
  currentPath?: string;
}

export const MoreToolsSection: React.FC<MoreToolsSectionProps> = ({ currentPath = '' }) => {
  const cleanCurrent = currentPath.replace(/\/+$/, '') || '/';
  const filteredTools = ALL_TOOLS_REGISTRY.filter((t) => {
    const cleanTool = t.path.replace(/\/+$/, '') || '/';
    return cleanTool !== cleanCurrent;
  });

  return (
    <section aria-label="All Available Tools" className="mt-16 pt-12 border-t border-zinc-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Academic Tool Suite
          </p>
          <h2 className="text-2xl font-bold text-zinc-950 mt-1 tracking-tight">
            All Free Academic Writing &amp; Counting Tools
          </h2>
        </div>
        <p className="text-xs text-zinc-600 max-w-sm">
          Free browser-based utilities for students, educators, and writers. No signups required.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => {
          const cardClassName =
            'group p-5 rounded-xl bg-white border border-zinc-200 hover:border-zinc-950 transition-colors flex flex-col justify-between';

          const content = (
            <>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                  {tool.category}
                </p>
                <h3 className="text-base font-bold text-zinc-950 group-hover:underline">
                  {tool.name}
                </h3>
                <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center text-xs font-semibold text-zinc-950 gap-1">
                <span>Open tool</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </>
          );

          return tool.isStandaloneStatic ? (
            <a key={tool.id} href={tool.path} className={cardClassName}>
              {content}
            </a>
          ) : (
            <Link key={tool.id} to={tool.path} className={cardClassName}>
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
};
