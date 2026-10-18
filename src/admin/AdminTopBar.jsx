import { Bell, ChevronDown, Menu, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { findNavItem } from './nav';

export default function AdminTopBar({ onOpenMenu }) {
  const { pathname } = useLocation();
  const current = findNavItem(pathname);

  return (
    <header className="sticky top-0 z-30 flex items-center gap-2.5 px-3.5 sm:px-5 h-13 border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-2xs">
      {/* Mobile menu button */}
      <button
        onClick={onOpenMenu}
        aria-label="Open menu"
        className="lg:hidden p-1.5 -ml-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Breadcrumb Title */}
      <div className="min-w-0 flex-1">
        <p className="text-[9px] uppercase tracking-[0.2em] text-blue-700 font-bold leading-none">Parish Console</p>
        <h1 className="font-cinzel text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5">
          {current?.label ?? 'Dashboard'}
        </h1>
      </div>

      {/* Search Input */}
      <div className="hidden md:flex items-center gap-2 h-8 w-52 lg:w-64 px-2.5 rounded-lg bg-slate-50 border border-slate-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 transition-all shadow-inner">
        <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <input
          type="search"
          placeholder="Search parish records…"
          className="w-full bg-transparent outline-none text-[11px] font-medium text-slate-900 placeholder:text-slate-400"
        />
        <kbd className="hidden lg:inline text-[9px] font-mono text-slate-400 bg-slate-200 border border-slate-300 rounded px-1 py-0.5">⌘K</kbd>
      </div>

      {/* Parish Switcher */}
      <button className="hidden sm:flex items-center gap-2 h-8 pl-2 pr-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-all shadow-2xs cursor-pointer">
        <div className="w-4 h-4 rounded-md bg-blue-500/15 border border-blue-400/50 flex items-center justify-center text-[10px] text-blue-800 font-bold">
          †
        </div>
        <span className="text-[11px] font-semibold text-slate-800 max-w-[11rem] truncate">St. Mary&apos;s Cathedral</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {/* Notifications */}
      <button
        aria-label="Notifications"
        className="relative p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
      >
        <Bell className="w-4 h-4" />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.8)]" />
      </button>

      {/* User Badge */}
      <div className="w-7 h-7 shrink-0 rounded-full bg-blue-600/10 border border-blue-400/40 shadow-xs flex items-center justify-center text-blue-800 font-bold text-xs">
        †
      </div>
    </header>
  );
}
