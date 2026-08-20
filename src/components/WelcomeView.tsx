import React from 'react';
import { ViewMode } from '../types';

interface WelcomeViewProps {
  onEnterDashboard: () => void;
  onNavigate: (view: ViewMode) => void;
  pendingCount: number;
  atRiskCount: number;
  breachedCount: number;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onEnterDashboard,
  pendingCount,
  atRiskCount,
  breachedCount
}) => {
  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center p-6 md:p-12 overflow-hidden">
      {/* Background Graphic Effect */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAnw8ZZbpVH5bVAaTXc70c51WTcm-uooDgWFgwjpuIxlH4hZPCYQren0M3RSll5q4SSTBe9Wwiq7vkT67nNn8nCqG4fpjKdMdlDP3_PX2hGhwPZydGj2g4BdwmIpvdwKSaEkmjxq7LVCL_auWDQZs0wHMDaEEX7dEMt2AuQ6oQ84EE9ms2dh64Sl2bZtZy1j2aJw3eLRN2Tpsr8Z9IWs-KUubi2qxtHQUPIa6-LG5abAT5nWlkUTGsMOg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Main Focus Card */}
      <div className="relative z-10 max-w-2xl w-full bg-white border border-[#c5c6cf] rounded-2xl p-8 md:p-12 shadow-xl flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-300">
        {/* Animated Timer Icon Container */}
        <div className="w-20 h-20 bg-[#d8e2ff] rounded-2xl flex items-center justify-center border border-[#b6c6ef] shadow-sm">
          <span
            className="material-symbols-outlined text-4xl text-[#031635] animate-pulse"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            timer
          </span>
        </div>

        {/* Title & Hierarchy */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#031635] tracking-tight">
            Prioridad 48
          </h2>
          <p className="text-lg md:text-xl font-semibold text-[#44474e] mt-2 max-w-lg">
            Casos pendientes ordenados por tiempo transcurrido.
          </p>
          <p className="text-sm text-[#75777f] max-w-md mx-auto mt-2">
            Optimización del reporte de consumo a facturación y cumplimiento estricto de SLAs.
          </p>
        </div>

        {/* Quick Highlights / Stats pills */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-md pt-2">
          <div className="bg-[#f2f4f6] border border-[#e0e3e5] rounded-lg p-3 text-center">
            <span className="block text-xs font-bold text-[#75777f] uppercase">Total</span>
            <span className="text-xl font-extrabold text-[#031635] font-data-mono">{pendingCount}</span>
          </div>
          <div className="bg-[#ffdcc6]/40 border border-[#ffb786] rounded-lg p-3 text-center">
            <span className="block text-xs font-bold text-[#e57300] uppercase">En Riesgo</span>
            <span className="text-xl font-extrabold text-[#e57300] font-data-mono">{atRiskCount}</span>
          </div>
          <div className="bg-[#ffdad6]/60 border border-[#ffb3ac] rounded-lg p-3 text-center">
            <span className="block text-xs font-bold text-[#ba1a1a] uppercase">Incumplidos</span>
            <span className="text-xl font-extrabold text-[#ba1a1a] font-data-mono">{breachedCount}</span>
          </div>
        </div>

        {/* Main Entry Button */}
        <div className="pt-4 w-full flex justify-center">
          <button
            onClick={onEnterDashboard}
            className="w-full sm:w-auto bg-[#031635] hover:bg-[#1a2b4b] active:scale-[0.98] text-white px-8 py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-150 shadow-md flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>Ver casos pendientes</span>
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
