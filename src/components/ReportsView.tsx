import React from 'react';
import { CaseItem } from '../types';

interface ReportsViewProps {
  cases: CaseItem[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ cases }) => {
  const total = cases.length;
  const breached = cases.filter((c) => c.classification === 'INCUMPLIDO').length;
  const atRisk = cases.filter((c) => c.classification === 'EN RIESGO').length;
  const normal = cases.filter((c) => c.classification === 'NORMAL').length;

  const complianceRate = total > 0 ? Math.round(((total - breached) / total) * 100) : 100;
  const avgElapsedHours = total > 0 
    ? Math.round(cases.reduce((sum, c) => sum + c.elapsedHours, 0) / total) 
    : 0;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-[#e0e3e5] pb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#031635]">
          Métricas y Cumplimiento SLA 48h
        </h2>
        <p className="text-xs md:text-sm text-[#75777f] mt-1">
          Análisis de tiempos de respuesta y rendimiento operacional del Command Center.
        </p>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#c5c6cf] shadow-sm">
          <span className="text-[11px] font-bold uppercase text-[#75777f]">Tasa de Cumplimiento</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-[#031635] font-data-mono">{complianceRate}%</span>
            <span className="text-xs text-[#031635] font-semibold">Meta &gt; 95%</span>
          </div>
          <div className="w-full bg-[#e0e3e5] h-2 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full ${complianceRate >= 90 ? 'bg-[#031635]' : 'bg-[#da3433]'}`}
              style={{ width: `${complianceRate}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#c5c6cf] shadow-sm">
          <span className="text-[11px] font-bold uppercase text-[#75777f]">Tiempo Promedio Transcurrido</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-[#031635] font-data-mono">{avgElapsedHours}h</span>
            <span className="text-xs text-[#75777f]">Umbral: 48h</span>
          </div>
          <p className="text-[11px] text-[#75777f] mt-2">Monitoreo continuo de consumo a facturación</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#c5c6cf] shadow-sm">
          <span className="text-[11px] font-bold uppercase text-[#e57300]">En Ventana de Riesgo (36-48h)</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-[#e57300] font-data-mono">{atRisk}</span>
            <span className="text-xs text-[#75777f]">casos</span>
          </div>
          <p className="text-[11px] text-[#e57300] mt-2">Requieren acción preventiva</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#c5c6cf] shadow-sm">
          <span className="text-[11px] font-bold uppercase text-[#ba1a1a]">Casos Incumplidos (&gt;48h)</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-[#ba1a1a] font-data-mono">{breached}</span>
            <span className="text-xs text-[#ba1a1a]">críticos</span>
          </div>
          <p className="text-[11px] text-[#ba1a1a] mt-2">Escalados a nivel gerencial</p>
        </div>
      </div>

      {/* Breakdown by Classification */}
      <div className="bg-white p-6 rounded-xl border border-[#c5c6cf] shadow-sm">
        <h3 className="text-base font-bold text-[#031635] mb-4">
          Distribución de Casos por Clasificación SLA
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-[#191c1e]">Normal (&lt; 36 horas)</span>
              <span className="font-data-mono">{normal} ({total > 0 ? Math.round((normal / total) * 100) : 0}%)</span>
            </div>
            <div className="w-full bg-[#f2f4f6] h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#031635] h-full rounded-full"
                style={{ width: `${total > 0 ? (normal / total) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-[#e57300]">En Riesgo (36 a 48 horas)</span>
              <span className="font-data-mono text-[#e57300]">{atRisk} ({total > 0 ? Math.round((atRisk / total) * 100) : 0}%)</span>
            </div>
            <div className="w-full bg-[#f2f4f6] h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#e57300] h-full rounded-full"
                style={{ width: `${total > 0 ? (atRisk / total) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-[#ba1a1a]">Incumplidos (&gt; 48 horas)</span>
              <span className="font-data-mono text-[#ba1a1a]">{breached} ({total > 0 ? Math.round((breached / total) * 100) : 0}%)</span>
            </div>
            <div className="w-full bg-[#f2f4f6] h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#ba1a1a] h-full rounded-full"
                style={{ width: `${total > 0 ? (breached / total) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
