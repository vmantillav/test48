import React from 'react';
import { CaseItem } from '../types';

interface CaseDetailViewProps {
  caseData: CaseItem;
  onBack: () => void;
  onOpenAddNote: () => void;
  onOpenEscalate: () => void;
  onChangeStatus: (newStatus: CaseItem['status']) => void;
  onToggleReviewed: () => void;
}

export const CaseDetailView: React.FC<CaseDetailViewProps> = ({
  caseData,
  onBack,
  onOpenAddNote,
  onOpenEscalate,
  onChangeStatus,
  onToggleReviewed
}) => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Back link & Title */}
      <div className="flex flex-col items-start gap-2">
        <button
          onClick={onBack}
          className="inline-flex items-center text-xs font-semibold text-[#75777f] hover:text-[#031635] transition-colors group cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm mr-1 group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          <span>Volver a la lista</span>
        </button>
        <div className="flex flex-wrap items-center justify-between gap-4 w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e] tracking-tight">
            Detalle de Caso: {caseData.id}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#75777f] font-medium">Servicio:</span>
            <span className="text-xs font-bold text-[#031635] bg-[#f2f4f6] px-2.5 py-1 rounded border border-[#e0e3e5]">
              {caseData.serviceType}
            </span>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Urgency SLA Banner */}
          <div
            className={`p-6 rounded-xl shadow-sm border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              caseData.classification === 'INCUMPLIDO'
                ? 'bg-[#ba1a1a] text-white border-[#ba1a1a]'
                : caseData.classification === 'EN RIESGO'
                ? 'bg-[#ffdcc6] text-[#311300] border-[#ffb786]'
                : 'bg-[#f2f4f6] text-[#191c1e] border-[#c5c6cf]'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className="material-symbols-outlined text-3xl">
                {caseData.classification === 'INCUMPLIDO'
                  ? 'warning'
                  : caseData.classification === 'EN RIESGO'
                  ? 'notification_important'
                  : 'check_circle'}
              </span>
              <div>
                <h2 className="text-lg font-bold">
                  Estado de Prioridad: {caseData.classification}
                </h2>
                <p className="text-xs opacity-90">
                  {caseData.classification === 'INCUMPLIDO'
                    ? 'El caso ha excedido el SLA definido de 48 horas.'
                    : caseData.classification === 'EN RIESGO'
                    ? 'El caso está en la ventana crítica de 36 a 48 horas.'
                    : 'El caso se encuentra dentro del tiempo estándar de procesamiento.'}
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-[11px] uppercase tracking-wider font-bold opacity-80 mb-0.5">
                Tiempo Transcurrido
              </div>
              <div className="text-2xl font-bold font-data-mono">
                {caseData.elapsedHours}h {caseData.elapsedMinutes}m
              </div>
            </div>
          </div>

          {/* Key Information Panel */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c5c6cf] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#e0e3e5] pb-3">
              <h3 className="text-lg font-bold text-[#031635]">Información del Caso</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#75777f]">Cambiar Estado:</span>
                <select
                  value={caseData.status}
                  onChange={(e) => onChangeStatus(e.target.value as CaseItem['status'])}
                  className="text-xs font-semibold bg-[#f2f4f6] border border-[#c5c6cf] rounded-lg px-2 py-1 text-[#031635]"
                >
                  <option value="Pendiente Documentación">Pendiente Documentación</option>
                  <option value="En Revisión">En Revisión</option>
                  <option value="Procesando">Procesando</option>
                  <option value="Escalado">Escalado</option>
                  <option value="Resuelto">Resuelto</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold uppercase text-[#75777f] tracking-wider">
                  Fecha/Hora de Reporte
                </span>
                <span className="text-sm font-semibold text-[#191c1e]">
                  {caseData.reportedAt}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold uppercase text-[#75777f] tracking-wider">
                  Estado Actual
                </span>
                <span className="inline-flex items-center w-fit px-3 py-1 bg-[#f2f4f6] text-[#191c1e] rounded-full text-xs font-medium border border-[#c5c6cf]">
                  <span className="w-1.5 h-1.5 bg-[#492000] rounded-full mr-2" />
                  {caseData.status}
                </span>
              </div>

              {/* Responsible Officer Card */}
              <div className="flex flex-col gap-1 md:col-span-2 pt-3 border-t border-[#e0e3e5]">
                <span className="text-[11px] font-bold uppercase text-[#75777f] tracking-wider mb-2">
                  Responsable del Seguimiento
                </span>
                <div className="flex items-center gap-3 p-3 bg-[#f7f9fb] rounded-lg border border-[#e0e3e5]">
                  {caseData.responsible.avatar ? (
                    <img
                      className="w-11 h-11 rounded-full object-cover shadow-sm border border-[#c5c6cf]"
                      src={caseData.responsible.avatar}
                      alt={caseData.responsible.name}
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#031635] text-white flex items-center justify-center font-bold text-sm">
                      {caseData.responsible.initials || 'RP'}
                    </div>
                  )}
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-bold text-[#191c1e] truncate">
                      {caseData.responsible.name}
                    </span>
                    <span className="text-xs text-[#75777f] truncate">
                      {caseData.responsible.role}
                    </span>
                  </div>
                  <a
                    href={`mailto:${caseData.responsible.email || 'soporte@empresa.com'}`}
                    className="inline-flex items-center justify-center p-2 border border-[#c5c6cf] text-[#44474e] hover:bg-white hover:text-[#031635] rounded-lg transition-colors cursor-pointer"
                    title={`Contactar a ${caseData.responsible.name}`}
                  >
                    <span className="material-symbols-outlined text-lg">mail</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c5c6cf]">
            <h3 className="text-lg font-bold text-[#031635] mb-3">Descripción del Problema</h3>
            <p className="text-sm text-[#191c1e]/85 leading-relaxed bg-[#f7f9fb] p-4 rounded-lg border border-[#e0e3e5]">
              {caseData.description}
            </p>
          </div>

          {/* Notes & Progress History */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c5c6cf]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#031635] flex items-center gap-2">
                <span className="material-symbols-outlined text-base">history_edu</span>
                <span>Bitácora de Notas y Avances</span>
              </h3>
              <button
                onClick={onOpenAddNote}
                className="text-xs font-bold text-[#031635] bg-[#f2f4f6] hover:bg-[#e0e3e5] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Agregar Nota</span>
              </button>
            </div>

            {caseData.notes.length === 0 ? (
              <p className="text-xs text-[#75777f] italic py-2">
                No hay notas de avance registradas para este caso aún.
              </p>
            ) : (
              <div className="space-y-3">
                {caseData.notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3.5 bg-[#f7f9fb] rounded-lg border border-[#e0e3e5] flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#031635]">{note.author}</span>
                      <span className="text-[#75777f] font-data-mono">{note.timestamp}</span>
                    </div>
                    <p className="text-xs text-[#191c1e] mt-1">{note.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar / Actions Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c5c6cf] sticky top-20">
            <div className="flex items-center gap-2 mb-4 border-b border-[#e0e3e5] pb-3">
              <span className="material-symbols-outlined text-[#031635]">assistant_direction</span>
              <h3 className="text-lg font-bold text-[#031635]">Próximos Pasos</h3>
            </div>

            <p className="text-xs text-[#44474e] mb-4 leading-relaxed">
              {caseData.classification === 'INCUMPLIDO' ? (
                <>
                  Dado que el caso está en estado <strong>INCUMPLIDO</strong> (&gt;48h), se requiere
                  intervención manual inmediata para escalar el requerimiento a supervisión gerencial.
                </>
              ) : (
                <>
                  Seguimiento activo de resolución preventiva antes de alcanzar el umbral de las 48 horas.
                </>
              )}
            </p>

            {/* Offline Protocol Warning Note */}
            <div className="p-3.5 bg-[#ffdcc6]/60 text-[#311300] rounded-lg border border-[#ffb786] mb-5">
              <div className="flex gap-2.5 items-start">
                <span className="material-symbols-outlined text-lg mt-0.5 text-[#e57300]">info</span>
                <p className="text-xs leading-snug">
                  <strong>Nota:</strong> La gestión y negociación del atraso con el cliente o proveedor
                  debe realizarse <strong>fuera de esta herramienta</strong> a través de los canales
                  corporativos oficiales.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={onOpenEscalate}
                className="w-full bg-[#031635] hover:bg-[#1a2b4b] active:scale-[0.98] text-white py-2.5 px-4 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">escalator_warning</span>
                <span>Escalar a Supervisión</span>
              </button>

              <button
                onClick={onOpenAddNote}
                className="w-full bg-white hover:bg-[#f2f4f6] text-[#191c1e] border border-[#c5c6cf] py-2.5 px-4 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">edit_note</span>
                <span>Añadir Nota de Avance</span>
              </button>

              <button
                onClick={onToggleReviewed}
                className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 border cursor-pointer ${
                  caseData.isReviewed
                    ? 'bg-[#f2f4f6] text-[#75777f] border-[#c5c6cf]'
                    : 'bg-[#da3433]/10 text-[#ba1a1a] border-[#ffb3ac] hover:bg-[#da3433]/20'
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {caseData.isReviewed ? 'check_circle' : 'playlist_add_check'}
                </span>
                <span>
                  {caseData.isReviewed
                    ? 'Revisado en Sesión Actual'
                    : 'Marcar para Sesión de Revisión'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
