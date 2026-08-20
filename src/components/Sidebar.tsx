import React from 'react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onNewCase: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onNewCase,
  isOpenMobile,
  onCloseMobile
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'review-summary', label: 'Sesión / Casos', icon: 'assignment' },
    { id: 'system-states', label: 'Estados Sistema', icon: 'sync' },
    { id: 'reports', label: 'Reportes', icon: 'assessment' },
    { id: 'settings', label: 'Configuración', icon: 'settings' }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`w-[260px] h-screen fixed left-0 top-0 bg-[#031635] text-[#d8e2ff] border-r border-[#1a2b4b] flex flex-col py-6 px-4 z-50 transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Logo & Title */}
        <div
          onClick={() => {
            onNavigate('welcome');
            if (onCloseMobile) onCloseMobile();
          }}
          className="mb-6 px-3 flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1a2b4b] border border-[#364768]/50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[#d8e2ff] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              admin_panel_settings
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight leading-tight flex items-center gap-1.5">
              Prioridad 48
            </h1>
            <p className="text-xs text-[#8293b8] font-medium">Management Console</p>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => {
            onNewCase();
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full bg-[#da3433] hover:bg-[#b6171e] active:scale-[0.98] text-white font-semibold text-sm rounded-lg py-2.5 px-3 mb-6 transition-all duration-150 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
            add
          </span>
          <span>Nuevo Caso</span>
        </button>

        {/* Nav Links */}
        <nav className="flex-1 flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive =
              (item.id === 'dashboard' && (currentView === 'dashboard' || currentView === 'case-detail')) ||
              currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id as ViewMode);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#da3433] text-white font-semibold shadow-sm scale-[0.98]'
                    : 'text-[#8293b8] hover:bg-[#1a2b4b] hover:text-white'
                }`}
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom User Profile Section */}
        <div className="mt-auto pt-4 border-t border-[#1a2b4b] flex items-center gap-3 px-2">
          <img
            className="w-9 h-9 rounded-full object-cover border border-[#364768]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAO4hW2R-tgXq9_53XpomLhYGsR8PmYRguoGkwxjk52UvlbO8-_5aK9rrqcV5WGpa1phrLHcRoZvW1nAax2TH_btQaI8oiZi8YERs9jPZgku7Sua7I0eu1DRmSApwOqbBcAd902Gnvsx2so6hI9HT-898WWG2l7KY1iVDvxdC0XrLvkziyxoLeM_LzInB6APcWzIA7OMp6w_a1oE8iELdhrFZkRu_A09-yeZQQr8oSEy_Tq_YmkZPKaw"
            alt="Admin User Avatar"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Admin User</p>
            <p className="text-xs text-[#8293b8] truncate">ingenieriati@quirurgicos.co</p>
          </div>
        </div>
      </aside>
    </>
  );
};
