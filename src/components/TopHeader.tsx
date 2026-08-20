import React, { useState } from 'react';
import { ViewMode } from '../types';

interface TopHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onRefresh: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
  onToggleMobileMenu: () => void;
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onRefresh,
  onOpenNotifications,
  unreadCount = 3,
  onToggleMobileMenu,
  currentView,
  onNavigate
}) => {
  const [currentTime] = useState<string>(() => {
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  });

  return (
    <header className="h-16 bg-white border-b border-[#e0e3e5] px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shrink-0">
      {/* Left: Mobile Menu & Search Input */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-lg text-[#44474e] hover:bg-[#f2f4f6]"
          aria-label="Abrir menú"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        <div className="relative w-full max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#75777f] text-lg">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar ID Servicio, Responsable..."
            className="w-full pl-9 pr-4 py-1.5 bg-[#f2f4f6] border border-[#e0e3e5] rounded-full text-xs md:text-sm text-[#191c1e] placeholder-[#75777f] focus:outline-none focus:ring-2 focus:ring-[#031635] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#75777f] hover:text-[#191c1e]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Center Nav tabs on desktop */}
      <div className="hidden lg:flex items-center gap-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`text-xs font-semibold uppercase tracking-wider py-1 transition-colors cursor-pointer ${
            currentView === 'dashboard' || currentView === 'case-detail'
              ? 'text-[#031635] border-b-2 border-[#031635]'
              : 'text-[#75777f] hover:text-[#031635]'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onNavigate('reports')}
          className={`text-xs font-semibold uppercase tracking-wider py-1 transition-colors cursor-pointer ${
            currentView === 'reports'
              ? 'text-[#031635] border-b-2 border-[#031635]'
              : 'text-[#75777f] hover:text-[#031635]'
          }`}
        >
          Métricas
        </button>
        <button
          onClick={() => onNavigate('review-summary')}
          className={`text-xs font-semibold uppercase tracking-wider py-1 transition-colors cursor-pointer ${
            currentView === 'review-summary'
              ? 'text-[#031635] border-b-2 border-[#031635]'
              : 'text-[#75777f] hover:text-[#031635]'
          }`}
        >
          Sesión de Revisión
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Timestamp */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#44474e] font-data-mono bg-[#f2f4f6] px-2.5 py-1 rounded-md border border-[#e0e3e5]">
          <span className="material-symbols-outlined text-sm text-[#75777f]">schedule</span>
          <span>{currentTime}</span>
        </div>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          title="Actualizar datos"
          className="p-2 rounded-full text-[#031635] hover:bg-[#f2f4f6] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">refresh</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={onOpenNotifications}
            title="Alertas SLA"
            className="p-2 rounded-full text-[#031635] hover:bg-[#f2f4f6] transition-colors relative cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#da3433] rounded-full animate-ping" />
            )}
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#da3433] rounded-full" />
            )}
          </button>
        </div>

        {/* Help / Guide */}
        <button
          onClick={() => onNavigate('system-states')}
          title="Estados de Conexión y Diagnóstico"
          className="p-2 rounded-full text-[#031635] hover:bg-[#f2f4f6] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">help</span>
        </button>

        {/* Profile Avatar */}
        <div
          onClick={() => onNavigate('settings')}
          className="w-8 h-8 rounded-full overflow-hidden border border-[#c5c6cf] cursor-pointer ml-1 hover:ring-2 hover:ring-[#031635] transition-all shrink-0"
          title="Configuración de Usuario"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFfFcqZKfFPxhT6bftdGHTofLnEZMxWyv1Eu6dogL67OmfKlSWXtxfRgImjDuN4ZxuzIUcbhGv_hrGBfKRZ0iVKA0eaBjpze98EErLBt2vutdXV2MWTzOgQ2X_cB2tspJG_tfEonxEuqA-cNyhq79-Yi7Exzk7k6jPGi5q9XMgoYPMgg9No2p7beUbhMv4J9f0e6BdobCIN9uPfD3eq2WwVfi5xbo5zjbmuQoaLkFFzhkv4EuX4Xksdg"
            alt="Admin Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
