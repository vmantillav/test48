import React, { useState } from 'react';

export const SettingsView: React.FC = () => {
  const [slaLimitHours, setSlaLimitHours] = useState('48');
  const [warningThresholdHours, setWarningThresholdHours] = useState('36');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="border-b border-[#e0e3e5] pb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#031635]">Configuración de Gestión</h2>
        <p className="text-xs md:text-sm text-[#75777f] mt-1">
          Parámetros operacionales del sistema de Prioridad 48 y reglas de notificación.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-[#c5c6cf] shadow-sm space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#031635] border-b border-[#e0e3e5] pb-2">
            Umbrales de SLA
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#191c1e] uppercase tracking-wider mb-1">
                Límite SLA Crítico (Horas)
              </label>
              <input
                type="number"
                value={slaLimitHours}
                onChange={(e) => setSlaLimitHours(e.target.value)}
                className="w-full px-3 py-2 border border-[#c5c6cf] rounded-lg text-sm font-data-mono font-bold text-[#031635] focus:outline-none focus:ring-2 focus:ring-[#031635]"
              />
              <p className="text-[11px] text-[#75777f] mt-1">
                Casos que excedan este tiempo serán clasificados como INCUMPLIDOS.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#191c1e] uppercase tracking-wider mb-1">
                Umbral Preventivo de Alerta (Horas)
              </label>
              <input
                type="number"
                value={warningThresholdHours}
                onChange={(e) => setWarningThresholdHours(e.target.value)}
                className="w-full px-3 py-2 border border-[#c5c6cf] rounded-lg text-sm font-data-mono font-bold text-[#e57300] focus:outline-none focus:ring-2 focus:ring-[#031635]"
              />
              <p className="text-[11px] text-[#75777f] mt-1">
                Casos que superen este valor entran en estado EN RIESGO.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#e0e3e5]">
          <h3 className="text-base font-bold text-[#031635] border-b border-[#e0e3e5] pb-2">
            Canales de Notificación Fuera de Plataforma
          </h3>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-[#031635] rounded focus:ring-[#031635]"
              />
              <span className="text-xs text-[#191c1e] font-semibold">
                Alertas por Correo Electrónico al superar las 36 horas
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={slackAlerts}
                onChange={(e) => setSlackAlerts(e.target.checked)}
                className="w-4 h-4 text-[#031635] rounded focus:ring-[#031635]"
              />
              <span className="text-xs text-[#191c1e] font-semibold">
                Webhook de Slack al canal #operaciones-prioridad-48
              </span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#e0e3e5]">
          {saved ? (
            <span className="text-xs text-[#031635] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              ¡Configuración guardada correctamente!
            </span>
          ) : (
            <span />
          )}

          <button
            type="submit"
            className="bg-[#031635] hover:bg-[#1a2b4b] text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};
