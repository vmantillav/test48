import React, { useState } from 'react';
import { CaseItem, FilterOptions, CaseClassification, CaseStatus } from '../types';

// ================= NEW CASE MODAL =================
interface NewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newCase: Partial<CaseItem>) => void;
}

export const NewCaseModal: React.FC<NewCaseModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [serviceType, setServiceType] = useState('Infraestructura & Datos');
  const [responsibleName, setResponsibleName] = useState('Laura Gómez');
  const [responsibleRole, setResponsibleRole] = useState('Especialista de Soporte N2');
  const [elapsedHours, setElapsedHours] = useState(1);
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let classification: CaseClassification = 'NORMAL';
    if (elapsedHours > 48) {
      classification = 'INCUMPLIDO';
    } else if (elapsedHours >= 36) {
      classification = 'EN RIESGO';
    }

    const now = new Date();
    const reportedAt = now.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ', ' + now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    const avatarUrl = responsibleName === 'Laura Gómez' 
      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdYOue1vWLx-0G_HWoErH7RO2WYfa3CjguHgH7ySjTDqv1oiqrVI6qJelMWLsgakMgvjGz3_CmVDf17F9HjuDfenT_zRerNuRVPTHufpPlSDb0oOLbuJH0uhf3l4T89XcHUheSmIRWnx7Zrm3lW9v2HO3w66PWTO-KlHMmuG-I8ECqTmf33o6bUB0BppUFes6GqTQTUezbTNlEr2VlgDYA_KdRk214ZQa6aP2J9vKvZmBkpU_d42w6mg'
      : responsibleName === 'Roberto Silva'
      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgLg4WzYzNZ92qDJm-k9tgnhYCmj4MCMPmnrc8rJCx5PY5lPdX8ZBKLI5odcwY8PIV3fa8CpbVIKP9Ur-xaNBtN3zY1ue6RKgmF87i9JSXOanWHy_EYptLXOd3fkykxybINNCI4L7oSuRJmgESPB6gAyVuNxNDwtGjyRZgdYLRkGWFTXItV2YkTMwcT0E6sd0mfmkZz8Vh6X7kSLUN4Qy97aoCefj85v4hAJ-s3rV_GvR1lL_m-3vhzQ'
      : '';

    onSubmit({
      title,
      serviceType,
      elapsedHours: Number(elapsedHours),
      elapsedMinutes: 0,
      status: 'En Revisión',
      classification,
      description,
      reportedAt,
      responsible: {
        name: responsibleName,
        role: responsibleRole,
        avatar: avatarUrl,
        initials: responsibleName.split(' ').map((n) => n[0]).join('')
      }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#c5c6cf] space-y-4 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b border-[#e0e3e5] pb-3">
          <h3 className="text-lg font-bold text-[#031635] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#da3433]">add_circle</span>
            <span>Registrar Nuevo Caso Prioritario</span>
          </h3>
          <button onClick={onClose} className="text-[#75777f] hover:text-[#191c1e] text-lg font-bold">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase text-[#75777f] mb-1">Título del Caso *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Interrupción en Validación de Identidad"
              className="w-full px-3 py-2 border border-[#c5c6cf] rounded-lg text-sm focus:ring-2 focus:ring-[#031635]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-[#75777f] mb-1">Tipo de Servicio</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3 py-2 border border-[#c5c6cf] rounded-lg font-medium"
              >
                <option value="Infraestructura & Datos">Infraestructura & Datos</option>
                <option value="Pasarela Transaccional">Pasarela Transaccional</option>
                <option value="Facturación & Compliance">Facturación & Compliance</option>
                <option value="Operaciones">Operaciones</option>
                <option value="Tarificación">Tarificación</option>
              </select>
            </div>

            <div>
              <label className="block font-bold uppercase text-[#75777f] mb-1">Horas Transcurridas</label>
              <input
                type="number"
                min="0"
                max="200"
                value={elapsedHours}
                onChange={(e) => setElapsedHours(Number(e.target.value))}
                className="w-full px-3 py-2 border border-[#c5c6cf] rounded-lg font-data-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase text-[#75777f] mb-1">Responsable Asignado</label>
              <select
                value={responsibleName}
                onChange={(e) => {
                  setResponsibleName(e.target.value);
                  if (e.target.value === 'Laura Gómez') setResponsibleRole('Especialista de Soporte N2');
                  else if (e.target.value === 'Carlos Méndez') setResponsibleRole('Líder Técnico Fintech');
                  else if (e.target.value === 'Roberto Silva') setResponsibleRole('Especialista en Facturación');
                }}
                className="w-full px-3 py-2 border border-[#c5c6cf] rounded-lg font-medium"
              >
                <option value="Laura Gómez">Laura Gómez</option>
                <option value="Carlos Méndez">Carlos Méndez</option>
                <option value="Roberto Silva">Roberto Silva</option>
                <option value="Ana Pérez">Ana Pérez</option>
                <option value="María Ruiz">María Ruiz</option>
              </select>
            </div>

            <div>
              <label className="block font-bold uppercase text-[#75777f] mb-1">Rol</label>
              <input
                type="text"
                value={responsibleRole}
                onChange={(e) => setResponsibleRole(e.target.value)}
                className="w-full px-3 py-2 border border-[#c5c6cf] rounded-lg bg-[#f2f4f6]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase text-[#75777f] mb-1">Descripción del Problema</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalle técnico de la falla reportada..."
              className="w-full px-3 py-2 border border-[#c5c6cf] rounded-lg"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#e0e3e5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#c5c6cf] rounded-lg text-[#44474e] font-semibold hover:bg-[#f2f4f6]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#da3433] hover:bg-[#b6171e] text-white rounded-lg font-bold shadow-sm"
            >
              Crear Caso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ================= ADD NOTE MODAL =================
interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
  onAddNote: (noteText: string) => void;
}

export const AddNoteModal: React.FC<AddNoteModalProps> = ({
  isOpen,
  onClose,
  caseId,
  onAddNote
}) => {
  const [noteText, setNoteText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onAddNote(noteText);
    setNoteText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c5c6cf] space-y-4">
        <div className="flex items-center justify-between border-b border-[#e0e3e5] pb-3">
          <h3 className="text-base font-bold text-[#031635] flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-[#031635]">edit_note</span>
            <span>Añadir Nota de Avance ({caseId})</span>
          </h3>
          <button onClick={onClose} className="text-[#75777f] hover:text-[#191c1e] text-lg font-bold">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-[#75777f] mb-1">
              Registro del Avance / Bitácora
            </label>
            <textarea
              required
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Escriba las acciones tomadas, hallazgos de logs o acuerdos con proveedores..."
              className="w-full px-3 py-2 border border-[#c5c6cf] rounded-lg text-xs focus:ring-2 focus:ring-[#031635]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#e0e3e5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#c5c6cf] rounded-lg text-xs font-semibold text-[#44474e] hover:bg-[#f2f4f6]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#031635] text-white rounded-lg text-xs font-bold hover:bg-[#1a2b4b]"
            >
              Guardar Nota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ================= ESCALATE MODAL =================
interface EscalateModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
  onEscalate: (reason: string, supervisor: string) => void;
}

export const EscalateModal: React.FC<EscalateModalProps> = ({
  isOpen,
  onClose,
  caseId,
  onEscalate
}) => {
  const [reason, setReason] = useState('Incumplimiento de SLA 48h sin respuesta de proveedor');
  const [supervisor, setSupervisor] = useState('Gerencia de Operaciones & DBA Nivel 3');

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onEscalate(reason, supervisor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c5c6cf] space-y-4">
        <div className="flex items-center justify-between border-b border-[#e0e3e5] pb-3">
          <h3 className="text-base font-bold text-[#ba1a1a] flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">escalator_warning</span>
            <span>Escalar Caso {caseId}</span>
          </h3>
          <button onClick={onClose} className="text-[#75777f] hover:text-[#191c1e] text-lg font-bold">
            ✕
          </button>
        </div>

        <form onSubmit={handleConfirm} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase text-[#75777f] mb-1">Destino del Escalado</label>
            <select
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
              className="w-full px-3 py-2 border border-[#c5c6cf] rounded-lg font-semibold"
            >
              <option value="Gerencia de Operaciones & DBA Nivel 3">Gerencia de Operaciones & DBA Nivel 3</option>
              <option value="Comité de Crisis de Infraestructura">Comité de Crisis de Infraestructura</option>
              <option value="Dirección TI & Seguridad">Dirección TI & Seguridad</option>
            </select>
          </div>

          <div>
            <label className="block font-bold uppercase text-[#75777f] mb-1">Motivo del Escalado</label>
            <textarea
              rows={3}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-[#c5c6cf] rounded-lg"
            />
          </div>

          <div className="p-3 bg-[#ffdad6]/60 rounded-lg text-[#93000a] text-[11px] leading-snug">
            Esta acción registrará un evento de alta severidad en la bitácora y disparará la notificación oficial correspondiente.
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#e0e3e5]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#c5c6cf] rounded-lg font-semibold text-[#44474e]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#ba1a1a] text-white rounded-lg font-bold hover:bg-[#93000a]"
            >
              Confirmar Escalado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ================= FILTER MODAL =================
interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onApplyFilters: (newFilters: FilterOptions) => void;
  onResetFilters: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters
}) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    onResetFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c5c6cf] space-y-4">
        <div className="flex items-center justify-between border-b border-[#e0e3e5] pb-3">
          <h3 className="text-base font-bold text-[#031635] flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            <span>Filtrar Casos Críticos</span>
          </h3>
          <button onClick={onClose} className="text-[#75777f] hover:text-[#191c1e] text-lg font-bold">
            ✕
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase text-[#75777f] mb-1">Clasificación 48h</label>
            <select
              value={localFilters.classification}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  classification: e.target.value as FilterOptions['classification']
                }))
              }
              className="w-full px-3 py-2 border border-[#c5c6cf] rounded-lg font-medium"
            >
              <option value="ALL">Todas las clasificaciones</option>
              <option value="INCUMPLIDO">INCUMPLIDO (&gt;48h)</option>
              <option value="EN RIESGO">EN RIESGO (36-48h)</option>
              <option value="NORMAL">NORMAL (&lt;36h)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold uppercase text-[#75777f] mb-1">Estado de Atención</label>
            <select
              value={localFilters.status}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  status: e.target.value as FilterOptions['status']
                }))
              }
              className="w-full px-3 py-2 border border-[#c5c6cf] rounded-lg font-medium"
            >
              <option value="ALL">Todos los estados</option>
              <option value="Pendiente Documentación">Pendiente Documentación</option>
              <option value="En Revisión">En Revisión</option>
              <option value="Procesando">Procesando</option>
              <option value="Escalado">Escalado</option>
              <option value="Resuelto">Resuelto</option>
            </select>
          </div>

          <div>
            <label className="block font-bold uppercase text-[#75777f] mb-1">Responsable</label>
            <select
              value={localFilters.responsible}
              onChange={(e) =>
                setLocalFilters((prev) => ({ ...prev, responsible: e.target.value }))
              }
              className="w-full px-3 py-2 border border-[#c5c6cf] rounded-lg font-medium"
            >
              <option value="">Todos los responsables</option>
              <option value="Laura Gómez">Laura Gómez</option>
              <option value="Carlos Méndez">Carlos Méndez</option>
              <option value="Roberto Silva">Roberto Silva</option>
              <option value="Ana Pérez">Ana Pérez</option>
              <option value="María Ruiz">María Ruiz</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#e0e3e5]">
            <button
              onClick={handleReset}
              className="text-xs text-[#da3433] font-semibold underline"
            >
              Limpiar Filtros
            </button>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-[#c5c6cf] rounded-lg font-semibold text-[#44474e]"
              >
                Cancelar
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-2 bg-[#031635] text-white rounded-lg font-bold hover:bg-[#1a2b4b]"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================= NOTIFICATIONS DRAWER =================
interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cases: CaseItem[];
  onSelectCase: (caseId: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  cases,
  onSelectCase
}) => {
  if (!isOpen) return null;

  const urgentCases = cases.filter((c) => c.classification !== 'NORMAL');

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs">
      <div className="bg-white w-full max-w-sm h-full shadow-2xl border-l border-[#c5c6cf] flex flex-col p-5 animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between border-b border-[#e0e3e5] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#da3433]">notifications_active</span>
            <h3 className="text-base font-bold text-[#031635]">Alertas de SLA 48h</h3>
          </div>
          <button onClick={onClose} className="text-[#75777f] hover:text-[#191c1e] text-lg font-bold">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {urgentCases.length === 0 ? (
            <p className="text-xs text-[#75777f] text-center py-8">
              No hay alertas críticas en este momento.
            </p>
          ) : (
            urgentCases.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectCase(item.id);
                  onClose();
                }}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all hover:shadow-md ${
                  item.classification === 'INCUMPLIDO'
                    ? 'bg-[#ffdad6]/40 border-[#ffb3ac]'
                    : 'bg-[#ffdcc6]/40 border-[#ffb786]'
                }`}
              >
                <div className="flex justify-between items-start font-data-mono font-bold mb-1">
                  <span className="text-[#031635]">{item.id}</span>
                  <span
                    className={
                      item.classification === 'INCUMPLIDO' ? 'text-[#ba1a1a]' : 'text-[#e57300]'
                    }
                  >
                    {item.elapsedHours}h {item.elapsedMinutes}m
                  </span>
                </div>
                <p className="font-semibold text-[#191c1e] mb-1 line-clamp-1">{item.title}</p>
                <p className="text-[11px] text-[#75777f]">Resp: {item.responsible.name}</p>
              </div>
            ))
          )}
        </div>

        <div className="pt-3 border-t border-[#e0e3e5]">
          <button
            onClick={onClose}
            className="w-full py-2 bg-[#f2f4f6] text-[#031635] rounded-lg text-xs font-bold hover:bg-[#e0e3e5]"
          >
            Cerrar Alertas
          </button>
        </div>
      </div>
    </div>
  );
};
