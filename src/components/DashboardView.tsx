import React, { useState, useMemo } from 'react';
import { CaseItem, FilterOptions, CaseClassification } from '../types';

interface DashboardViewProps {
  cases: CaseItem[];
  onSelectCase: (caseId: string) => void;
  onOpenFilter: () => void;
  onExport: () => void;
  onStartReviewSession: () => void;
  filterOptions: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  cases,
  onSelectCase,
  onOpenFilter,
  onExport,
  onStartReviewSession,
  filterOptions,
  onFilterChange
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Compute metrics
  const totalCount = cases.length;
  const atRiskCount = cases.filter((c) => c.classification === 'EN RIESGO').length;
  const breachedCount = cases.filter((c) => c.classification === 'INCUMPLIDO').length;

  // Filter & Sort
  const filteredCases = useMemo(() => {
    return cases
      .filter((c) => {
        // Search
        if (filterOptions.search) {
          const q = filterOptions.search.toLowerCase();
          const matchId = c.id.toLowerCase().includes(q);
          const matchTitle = c.title.toLowerCase().includes(q);
          const matchResp = c.responsible.name.toLowerCase().includes(q);
          const matchStatus = c.status.toLowerCase().includes(q);
          if (!matchId && !matchTitle && !matchResp && !matchStatus) return false;
        }

        // Classification
        if (filterOptions.classification !== 'ALL' && c.classification !== filterOptions.classification) {
          return false;
        }

        // Status
        if (filterOptions.status !== 'ALL' && c.status !== filterOptions.status) {
          return false;
        }

        // Responsible
        if (filterOptions.responsible && c.responsible.name !== filterOptions.responsible) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filterOptions.sortBy === 'elapsed_desc') {
          const totalA = a.elapsedHours * 60 + a.elapsedMinutes;
          const totalB = b.elapsedHours * 60 + b.elapsedMinutes;
          return totalB - totalA;
        }
        if (filterOptions.sortBy === 'elapsed_asc') {
          const totalA = a.elapsedHours * 60 + a.elapsedMinutes;
          const totalB = b.elapsedHours * 60 + b.elapsedMinutes;
          return totalA - totalB;
        }
        if (filterOptions.sortBy === 'id_asc') {
          return a.id.localeCompare(b.id);
        }
        if (filterOptions.sortBy === 'id_desc') {
          return b.id.localeCompare(a.id);
        }
        return 0;
      });
  }, [cases, filterOptions]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredCases.length / itemsPerPage));
  const displayedCases = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCases.slice(start, start + itemsPerPage);
  }, [filteredCases, currentPage]);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191c1e] tracking-tight">
            Tablero de Control
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-[#75777f] mt-1 font-medium">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span>Última actualización: Hoy, 14:32:05</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onStartReviewSession}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#031635] text-white rounded-lg text-xs font-semibold hover:bg-[#1a2b4b] transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">play_circle</span>
            <span>Iniciar Sesión de Revisión</span>
          </button>
          <button
            onClick={onOpenFilter}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#c5c6cf] rounded-lg text-xs font-semibold text-[#191c1e] hover:bg-[#f2f4f6] transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">filter_list</span>
            <span>Filtrar</span>
            {filterOptions.classification !== 'ALL' && (
              <span className="w-2 h-2 rounded-full bg-[#da3433]" />
            )}
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#c5c6cf] rounded-lg text-xs font-semibold text-[#191c1e] hover:bg-[#f2f4f6] transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* KPI Cards (Bento Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Total Pendientes */}
        <div
          onClick={() => onFilterChange({ classification: 'ALL' })}
          className={`bg-white border rounded-xl p-5 flex flex-col gap-2 shadow-sm relative overflow-hidden group cursor-pointer transition-all ${
            filterOptions.classification === 'ALL'
              ? 'border-[#031635] ring-2 ring-[#031635]/10'
              : 'border-[#c5c6cf] hover:border-[#031635]'
          }`}
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#031635]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
          <div className="flex justify-between items-start relative z-10">
            <span className="text-[11px] font-bold text-[#75777f] uppercase tracking-wider">
              Total Pendientes
            </span>
            <span className="material-symbols-outlined text-[#031635] bg-[#031635]/10 p-1.5 rounded-full text-lg">
              stacked_inbox
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-auto relative z-10">
            <span className="text-3xl font-extrabold text-[#191c1e] font-data-mono">
              {totalCount}
            </span>
            <span className="text-xs text-[#75777f]">Casos activos</span>
          </div>
        </div>

        {/* Card 2: En Riesgo (36-48h) */}
        <div
          onClick={() =>
            onFilterChange({
              classification: filterOptions.classification === 'EN RIESGO' ? 'ALL' : 'EN RIESGO'
            })
          }
          className={`bg-white border rounded-xl p-5 flex flex-col gap-2 shadow-sm relative overflow-hidden group cursor-pointer transition-all ${
            filterOptions.classification === 'EN RIESGO'
              ? 'border-[#e57300] ring-2 ring-[#e57300]/20'
              : 'border-[#e0e3e5] hover:border-[#e57300]'
          }`}
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#e57300]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
          <div className="flex justify-between items-start relative z-10">
            <span className="text-[11px] font-bold text-[#e57300] uppercase tracking-wider">
              En Riesgo (36-48h)
            </span>
            <span className="material-symbols-outlined text-[#e57300] bg-[#ffdcc6] p-1.5 rounded-full text-lg">
              warning
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-auto relative z-10">
            <span className="text-3xl font-extrabold text-[#e57300] font-data-mono">
              {atRiskCount}
            </span>
            <span className="text-xs text-[#75777f] flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-[#e57300]">trending_up</span>
              +5 hoy
            </span>
          </div>
        </div>

        {/* Card 3: Incumplidos (>48h) */}
        <div
          onClick={() =>
            onFilterChange({
              classification: filterOptions.classification === 'INCUMPLIDO' ? 'ALL' : 'INCUMPLIDO'
            })
          }
          className={`bg-[#ffdad6]/40 border rounded-xl p-5 flex flex-col gap-2 shadow-sm relative overflow-hidden group cursor-pointer transition-all ${
            filterOptions.classification === 'INCUMPLIDO'
              ? 'border-[#ba1a1a] ring-2 ring-[#ba1a1a]/20'
              : 'border-[#ffb3ac] hover:border-[#ba1a1a]'
          }`}
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#ba1a1a]/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
          <div className="flex justify-between items-start relative z-10">
            <span className="text-[11px] font-bold text-[#93000a] uppercase tracking-wider">
              Incumplidos (&gt;48h)
            </span>
            <span className="material-symbols-outlined text-[#ba1a1a] bg-[#ffdad6] p-1.5 rounded-full text-lg">
              error
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-auto relative z-10">
            <span className="text-3xl font-extrabold text-[#93000a] font-bold font-data-mono">
              {breachedCount}
            </span>
            <span className="text-xs text-[#93000a]/80">Requieren atención inmediata</span>
          </div>
        </div>
      </div>

      {/* Main Data Table Card */}
      <div className="bg-white border border-[#c5c6cf] rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Table Header Bar */}
        <div className="px-5 py-3.5 border-b border-[#e0e3e5] bg-[#f7f9fb] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[#191c1e] text-base">Casos Críticos</h3>
            <span className="bg-[#e0e3e5] text-[#44474e] text-xs font-bold px-2 py-0.5 rounded-full">
              {filteredCases.length}
            </span>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-[#75777f]">Ordenado por:</span>
            <select
              value={filterOptions.sortBy}
              onChange={(e) =>
                onFilterChange({ sortBy: e.target.value as FilterOptions['sortBy'] })
              }
              className="bg-white border border-[#c5c6cf] rounded-lg text-xs py-1.5 pl-2.5 pr-8 focus:ring-1 focus:ring-[#031635] focus:border-[#031635] text-[#191c1e] font-medium"
            >
              <option value="elapsed_desc">Tiempo Transcurrido (Mayor a Menor)</option>
              <option value="elapsed_asc">Tiempo Transcurrido (Menor a Mayor)</option>
              <option value="id_asc">ID Servicio (Ascendente)</option>
              <option value="id_desc">ID Servicio (Descendente)</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-[#f2f4f6] border-b border-[#e0e3e5] text-[11px] font-bold text-[#75777f] uppercase tracking-wider">
                <th className="px-5 py-3 font-semibold">ID Servicio</th>
                <th className="px-5 py-3 font-semibold">Reporte Consumo</th>
                <th className="px-5 py-3 font-semibold">Tiempo Transcurrido</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3 font-semibold">Responsable</th>
                <th className="px-5 py-3 font-semibold text-right">Clasificación 48h</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e3e5] text-xs text-[#191c1e]">
              {displayedCases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-[#75777f]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-4xl text-[#c5c6cf]">
                        search_off
                      </span>
                      <p className="font-semibold text-sm">No se encontraron casos con los filtros aplicados</p>
                      <button
                        onClick={() =>
                          onFilterChange({
                            search: '',
                            classification: 'ALL',
                            status: 'ALL',
                            responsible: ''
                          })
                        }
                        className="text-xs text-[#031635] font-bold underline mt-1"
                      >
                        Restablecer filtros
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                displayedCases.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      onClick={() => onSelectCase(item.id)}
                      className="hover:bg-[#f7f9fb] transition-colors group cursor-pointer"
                    >
                      {/* ID Servicio */}
                      <td className="px-5 py-3.5 font-data-mono font-bold text-[#031635] group-hover:text-[#da3433] transition-colors">
                        <span className="underline decoration-[#c5c6cf] underline-offset-2">
                          {item.id}
                        </span>
                      </td>

                      {/* Reporte Consumo */}
                      <td className="px-5 py-3.5 text-[#44474e]">{item.reportedAt}</td>

                      {/* Tiempo Transcurrido */}
                      <td className="px-5 py-3.5">
                        <div
                          className={`flex items-center gap-1.5 font-data-mono font-bold px-2 py-1 rounded inline-flex text-xs ${
                            item.classification === 'INCUMPLIDO'
                              ? 'text-[#ba1a1a] bg-[#ba1a1a]/10'
                              : item.classification === 'EN RIESGO'
                              ? 'text-[#e57300] bg-[#e57300]/10'
                              : 'text-[#44474e] bg-[#f2f4f6]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">timer</span>
                          <span>
                            {item.elapsedHours}h {item.elapsedMinutes}m
                          </span>
                        </div>
                      </td>

                      {/* Estado */}
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 bg-[#f2f4f6] text-[#191c1e] px-2.5 py-1 rounded border border-[#e0e3e5] font-medium">
                          {item.status === 'Procesando' ? (
                            <span className="material-symbols-outlined text-xs text-[#031635] animate-spin">
                              autorenew
                            </span>
                          ) : (
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.classification === 'INCUMPLIDO'
                                  ? 'bg-[#ba1a1a]'
                                  : item.classification === 'EN RIESGO'
                                  ? 'bg-[#e57300] animate-pulse'
                                  : 'bg-[#75777f]'
                              }`}
                            />
                          )}
                          <span>{item.status}</span>
                        </span>
                      </td>

                      {/* Responsable */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          {item.responsible.avatar ? (
                            <img
                              src={item.responsible.avatar}
                              alt={item.responsible.name}
                              className="w-6 h-6 rounded-full border border-[#c5c6cf] object-cover"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-[#1a2b4b] text-white flex items-center justify-center font-bold text-[10px]">
                              {item.responsible.initials || item.responsible.name.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                          <span className="text-[#191c1e] font-medium">{item.responsible.name}</span>
                        </div>
                      </td>

                      {/* Clasificación 48h */}
                      <td className="px-5 py-3.5 text-right">
                        {item.classification === 'INCUMPLIDO' && (
                          <span className="inline-block bg-[#ba1a1a] text-white font-bold text-[10px] tracking-wider px-2 py-0.5 rounded shadow-sm uppercase">
                            INCUMPLIDO
                          </span>
                        )}
                        {item.classification === 'EN RIESGO' && (
                          <span className="inline-block bg-[#ffdcc6] text-[#723600] border border-[#ffb786] font-bold text-[10px] tracking-wider px-2 py-0.5 rounded uppercase">
                            EN RIESGO
                          </span>
                        )}
                        {item.classification === 'NORMAL' && (
                          <span className="inline-block bg-[#e0e3e5] text-[#44474e] border border-[#c5c6cf] font-bold text-[10px] tracking-wider px-2 py-0.5 rounded uppercase">
                            NORMAL
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="px-5 py-3 border-t border-[#e0e3e5] bg-white flex items-center justify-between">
          <span className="text-xs text-[#75777f]">
            Mostrando {displayedCases.length} de {filteredCases.length} casos
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded text-[#75777f] hover:bg-[#f2f4f6] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded text-xs font-semibold flex items-center justify-center cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-[#031635] text-white'
                    : 'text-[#191c1e] hover:bg-[#f2f4f6]'
                }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded text-[#75777f] hover:bg-[#f2f4f6] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
