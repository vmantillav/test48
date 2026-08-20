import React, { useState } from 'react';
import { CaseItem } from '../types';

interface ReviewSummaryViewProps {
  reviewedCases: CaseItem[];
  onBackToDashboard: () => void;
  onSelectCase: (caseId: string) => void;
}

export const ReviewSummaryView: React.FC<ReviewSummaryViewProps> = ({
  reviewedCases,
  onBackToDashboard,
  onSelectCase
}) => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(id);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Success Banner matching Image 1 */}
      <div className="bg-white border border-[#c5c6cf] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-[#d8e2ff]/40 to-transparent pointer-events-none" />

        <div className="flex items-start md:items-center gap-5 relative z-10">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#d8e2ff] text-[#031635] flex items-center justify-center shrink-0 border border-[#b6c6ef]">
            <span
              className="material-symbols-outlined text-3xl md:text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              task_alt
            </span>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#031635] tracking-tight">
              Sesión de Revisión Finalizada
            </h2>
            <p className="text-sm text-[#44474e] mt-1">
              Has completado la revisión prioritaria. {reviewedCases.length} casos críticos procesados.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10">
          <button
            onClick={onBackToDashboard}
            className="px-5 py-2.5 rounded-lg border-2 border-[#031635] text-[#031635] text-xs font-bold uppercase tracking-wider hover:bg-[#031635] hover:text-white transition-colors text-center cursor-pointer"
          >
            Volver al Tablero
          </button>
          <button
            onClick={onBackToDashboard}
            className="px-5 py-2.5 rounded-lg bg-[#031635] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1a2b4b] transition-colors text-center shadow-sm cursor-pointer"
          >
            Finalizar Sesión
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Reviewed Cases Cards */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-[#e0e3e5] pb-3">
            <h3 className="text-lg font-bold text-[#031635] flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">history</span>
              <span>Resumen de Casos Tratados</span>
            </h3>
            <span className="text-xs font-semibold text-[#75777f]">
              {reviewedCases.length} Casos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviewedCases.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectCase(item.id)}
                className="bg-white border border-[#c5c6cf] rounded-xl p-5 hover:shadow-md hover:border-[#031635] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-data-mono font-bold text-[#031635] text-sm">
                      {item.id}
                    </span>
                    {item.classification === 'INCUMPLIDO' ? (
                      <span className="bg-[#ffdad6] text-[#93000a] text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                        PRIORIZADO
                      </span>
                    ) : (
                      <span className="bg-[#f2f4f6] text-[#44474e] border border-[#c5c6cf] text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                        VISUALIZADO
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#191c1e] mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#44474e] mb-4 line-clamp-2">
                    {item.notes[0]?.text || item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#75777f] pt-3 border-t border-[#e0e3e5]">
                  <span className="material-symbols-outlined text-sm">person</span>
                  <span>Asignado: {item.responsible.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Out-of-platform Next Steps (Image 1) */}
        <div className="lg:col-span-1 bg-[#f2f4f6] rounded-2xl p-6 border border-[#c5c6cf] self-start sticky top-20">
          <h3 className="text-base font-bold text-[#031635] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#da3433]">warning</span>
            <span>Próximos Pasos fuera de la plataforma</span>
          </h3>

          <ul className="flex flex-col gap-3">
            {/* Step 1 */}
            <li
              className={`p-3.5 rounded-xl border transition-all ${
                completedTasks['call']
                  ? 'bg-white/50 border-[#c5c6cf] opacity-60'
                  : 'bg-white border-[#c5c6cf] shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTask('call')}
                  className="w-8 h-8 rounded-lg bg-[#031635] text-white flex items-center justify-center shrink-0 hover:opacity-90 cursor-pointer"
                  title="Marcar completado"
                >
                  <span className="material-symbols-outlined text-sm">
                    {completedTasks['call'] ? 'check' : 'call'}
                  </span>
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-xs font-bold text-[#031635] ${
                        completedTasks['call'] ? 'line-through text-[#75777f]' : ''
                      }`}
                    >
                      Contactar a J. Martinez
                    </p>
                    <button
                      onClick={() =>
                        copyToClipboard('Confirmación de escalado de caso crítico SERV-2024-089', 'call')
                      }
                      className="text-[10px] text-[#75777f] hover:text-[#031635] font-semibold"
                    >
                      {copySuccess === 'call' ? '¡Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <p className="text-[11px] text-[#75777f] mt-0.5">
                    Para confirmar escalado de SERV-2024-089
                  </p>
                </div>
              </div>
            </li>

            {/* Step 2 */}
            <li
              className={`p-3.5 rounded-xl border transition-all ${
                completedTasks['slack']
                  ? 'bg-white/50 border-[#c5c6cf] opacity-60'
                  : 'bg-white border-[#c5c6cf] shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTask('slack')}
                  className="w-8 h-8 rounded-lg bg-[#e0e3e5] text-[#191c1e] flex items-center justify-center shrink-0 hover:opacity-90 cursor-pointer"
                  title="Marcar completado"
                >
                  <span className="material-symbols-outlined text-sm">
                    {completedTasks['slack'] ? 'check' : 'mail'}
                  </span>
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-xs font-bold text-[#031635] ${
                        completedTasks['slack'] ? 'line-through text-[#75777f]' : ''
                      }`}
                    >
                      Actualizar Slack de Operaciones
                    </p>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          '🚨 Actualización Prioridad 48: Revisión completada. Casos críticos escalados al equipo DBA.',
                          'slack'
                        )
                      }
                      className="text-[10px] text-[#75777f] hover:text-[#031635] font-semibold"
                    >
                      {copySuccess === 'slack' ? '¡Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <p className="text-[11px] text-[#75777f] mt-0.5">
                    Resumen ejecutivo del estado de APIs
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
