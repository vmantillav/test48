import React, { useState } from 'react';

interface SystemStatesViewProps {
  onGoToDashboard: () => void;
  onGoToHistory: () => void;
}

export const SystemStatesView: React.FC<SystemStatesViewProps> = ({
  onGoToDashboard,
  onGoToHistory
}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retrySuccess, setRetrySuccess] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setRetrySuccess(false);
    setTimeout(() => {
      setIsRetrying(false);
      setRetrySuccess(true);
      setTimeout(() => setRetrySuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header matching Image 7 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-4 border-b border-[#e0e3e5]">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#031635]">
            System States Preview
          </h2>
          <p className="text-xs md:text-sm text-[#75777f] mt-1">
            Demostración de estados de interfaz para recuperación de datos y resiliencia.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#75777f] bg-[#f2f4f6] px-3 py-1.5 rounded-full border border-[#e0e3e5]">
          <span className="material-symbols-outlined text-sm">schedule</span>
          <span className="font-data-mono">Actualizado hoy a las 14:32</span>
        </div>
      </div>

      {/* Grid of States */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Loading State */}
        <div className="bg-white border border-[#c5c6cf] rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[320px]">
          <div className="w-full max-w-[260px] flex flex-col items-center text-center">
            <div className="loader-bar mb-6" />
            <span className="material-symbols-outlined text-[#031635] mb-4 animate-spin text-3xl">
              sync
            </span>
            <h3 className="text-lg font-bold text-[#031635] mb-1">Cargando datos</h3>
            <p className="text-xs text-[#75777f]">Cargando casos pendientes de la cola...</p>
          </div>
        </div>

        {/* 2. Error State */}
        <div className="bg-white border border-[#c5c6cf] rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ba1a1a]" />
          <div className="w-full max-w-[340px] flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#ffdad6] flex items-center justify-center mb-4 border border-[#ffb3ac]">
              <span className="material-symbols-outlined text-[#ba1a1a] text-3xl">error</span>
            </div>
            <h3 className="text-lg font-bold text-[#031635] mb-1">Conexión fallida</h3>
            <p className="text-xs text-[#44474e] mb-6 leading-relaxed">
              Error al cargar la información. Por favor, verifique su conexión o intente nuevamente.
            </p>
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="bg-[#031635] hover:bg-[#1a2b4b] active:scale-[0.98] text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-75"
            >
              <span
                className={`material-symbols-outlined text-base ${
                  isRetrying ? 'animate-spin' : ''
                }`}
              >
                refresh
              </span>
              <span>{isRetrying ? 'Reintentando...' : retrySuccess ? '¡Reconectado con éxito!' : 'Reintentar'}</span>
            </button>
          </div>
        </div>

        {/* 3. Empty State (Spans 2 columns on lg) */}
        <div className="bg-white border border-[#c5c6cf] rounded-2xl p-8 lg:p-12 shadow-sm flex flex-col items-center justify-center min-h-[420px] lg:col-span-2">
          <div className="flex flex-col items-center text-center max-w-md mx-auto">
            {/* Minimalist illustration container matching mockup */}
            <div className="w-72 h-48 mb-6 relative bg-[#f2f4f6] rounded-2xl overflow-hidden flex items-center justify-center border border-[#e0e3e5]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyBmySjhhVUx7IqqjNFHhzxYctMFA06H-k5o_vBV5nHJhlUG6_5J6XXk9dY3MTd2H6p9C32W_-vVUbkbMpEceTgQAC-klrfz8tYsY1w4It6pyYfMUbTMaAJOAiUyAuRF_moUVHyyEvf4kNpgwqLB0IVU3DpqXKVeTqkuE4XXr626EGIgdhd05x0n28RJaRAFISszP_PoV-nZItwvwiKFPwcRQBxH3U3g-a10ZpMitsZ2-v83r36RafIg"
                alt="Bandeja Vacía"
                className="w-full h-full object-cover mix-blend-multiply opacity-90"
              />
            </div>
            <h3 className="text-xl font-bold text-[#031635] mb-2">Bandeja Vacía</h3>
            <p className="text-sm text-[#44474e] mb-6">
              No hay casos pendientes para revisar. Todo al día con los reportes de consumo.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onGoToDashboard}
                className="border border-[#c5c6cf] text-[#031635] text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-[#f2f4f6] transition-colors cursor-pointer"
              >
                Ver tablero
              </button>
              <button
                onClick={onGoToHistory}
                className="bg-[#031635] text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1a2b4b] transition-colors cursor-pointer"
              >
                Ver historial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
