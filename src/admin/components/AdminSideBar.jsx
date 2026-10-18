import { NavLink } from 'react-router-dom';
import { ADMIN_NAV } from '../nav';

function NavItem({ item, collapsed, onNavigate }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        `group relative flex items-center gap-2.5 rounded-lg py-2 pr-2.5 text-xs transition-all ${
          collapsed ? 'lg:justify-center lg:px-0' : 'pl-3'
        } ${
          isActive
            ? 'bg-blue-50 text-blue-900 font-semibold border border-blue-200 shadow-2xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent font-medium'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full bg-blue-600 transition-all duration-300 ${
              isActive ? 'h-4 opacity-100 shadow-[0_0_6px_rgba(37,99,235,0.6)]' : 'h-0 opacity-0'
            }`}
          />
          <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-blue-700' : 'text-slate-400 group-hover:text-slate-700'}`} />
          <span className={`truncate tracking-normal ${collapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function AdminSideBar({ open, onClose, collapsed, onToggleCollapse }) {
  return (
    <>
      {/* Mobile Drawer Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[230px] flex flex-col border-r border-slate-200 bg-white/95 backdrop-blur-xl transition-[width,transform] duration-300 ease-out shadow-sm
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          ${collapsed ? 'lg:w-[68px]' : 'lg:w-[230px]'}`}
      >
        {/* Brand Header */}
        <div className={`flex items-center gap-2.5 px-3.5 py-3 border-b border-slate-200/80 ${collapsed ? 'lg:justify-center lg:px-0' : ''}`}>
          <div className="w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-500/30 flex items-center justify-center shadow-sm text-white font-bold text-sm">
            †
          </div>
          <div className={`min-w-0 ${collapsed ? 'lg:hidden' : ''}`}>
            <p className="font-malayalam text-sm font-bold text-slate-900 leading-tight">നേർച്ചപ്പെട്ടി</p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-blue-700 font-semibold leading-tight mt-0.5">Parish Console</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-3.5">
          {ADMIN_NAV.map(({ group, items }) => (
            <div key={group}>
              <p
                className={`px-2.5 mb-1.5 text-[9.5px] font-bold uppercase tracking-[0.16em] text-slate-400 ${
                  collapsed ? 'lg:hidden' : ''
                }`}
              >
                {group}
              </p>
              <div className="space-y-0.5">
                {items.map((item) => (
                  <NavItem
                    key={item.to}
                    item={item}
                    collapsed={collapsed}
                    onNavigate={onClose}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse Toggle Footer */}
        <div className="p-2 border-t border-slate-200 hidden lg:block">
          <button
            onClick={onToggleCollapse}
            aria-label="Toggle sidebar collapse"
            className="w-full py-1.5 px-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-[11px] font-medium flex items-center justify-center transition-colors cursor-pointer"
          >
            {collapsed ? '→' : '← Collapse'}
          </button>
        </div>
      </aside>
    </>
  );
}
