/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewMode, CaseItem, FilterOptions } from './types';
import { INITIAL_CASES } from './data/mockCases';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { WelcomeView } from './components/WelcomeView';
import { DashboardView } from './components/DashboardView';
import { CaseDetailView } from './components/CaseDetailView';
import { ReviewSummaryView } from './components/ReviewSummaryView';
import { SystemStatesView } from './components/SystemStatesView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import {
  NewCaseModal,
  AddNoteModal,
  EscalateModal,
  FilterModal,
  NotificationDrawer
} from './components/ActionModals';

const STORAGE_KEY = 'prioridad48_cases_v1';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<ViewMode>('welcome');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('SERV-2024-089');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Modals state
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Cases state
  const [cases, setCases] = useState<CaseItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CASES;
  });

  // Save to local storage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
    } catch {
      // ignore
    }
  }, [cases]);

  // Filtering state
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    search: '',
    classification: 'ALL',
    status: 'ALL',
    responsible: '',
    sortBy: 'elapsed_desc'
  });

  // Selected case
  const currentCase = cases.find((c) => c.id === selectedCaseId) || cases[0] || INITIAL_CASES[0];

  // Cases reviewed in the current session
  const reviewedCases = cases.filter((c) => c.isReviewed);

  // Handle case selection
  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentView('case-detail');
  };

  // Add new case
  const handleCreateCase = (newCaseData: Partial<CaseItem>) => {
    const nextIndex = cases.length + 90;
    const generatedId = `SERV-2024-${nextIndex.toString().padStart(3, '0')}`;

    const newCase: CaseItem = {
      id: generatedId,
      title: newCaseData.title || 'Incidencia de Servicio',
      reportedAt: newCaseData.reportedAt || 'Hoy, 12:00',
      reportedIso: new Date().toISOString(),
      elapsedHours: newCaseData.elapsedHours ?? 1,
      elapsedMinutes: newCaseData.elapsedMinutes ?? 0,
      status: newCaseData.status || 'En Revisión',
      responsible: newCaseData.responsible || {
        name: 'Laura Gómez',
        role: 'Especialista de Soporte N2',
        avatar: ''
      },
      classification: newCaseData.classification || 'NORMAL',
      description: newCaseData.description || 'Reporte de incidente técnico en proceso de verificación.',
      serviceType: newCaseData.serviceType || 'Infraestructura & Datos',
      notes: [],
      history: [
        {
          id: `h_${Date.now()}`,
          action: 'Caso creado en el sistema',
          user: 'Admin User',
          timestamp: 'Hoy, 12:00'
        }
      ]
    };

    setCases((prev) => [newCase, ...prev]);
    setSelectedCaseId(newCase.id);
    setCurrentView('case-detail');
  };

  // Add note to current case
  const handleAddNote = (text: string) => {
    const nowStr = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) +
      ', ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    setCases((prev) =>
      prev.map((c) => {
        if (c.id === currentCase.id) {
          return {
            ...c,
            notes: [
              ...c.notes,
              {
                id: `note_${Date.now()}`,
                author: 'Admin User',
                text,
                timestamp: nowStr
              }
            ]
          };
        }
        return c;
      })
    );
  };

  // Escalate case
  const handleEscalate = (reason: string, supervisor: string) => {
    const nowStr = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) +
      ', ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    setCases((prev) =>
      prev.map((c) => {
        if (c.id === currentCase.id) {
          return {
            ...c,
            status: 'Escalado',
            notes: [
              ...c.notes,
              {
                id: `note_${Date.now()}`,
                author: 'Admin User (Escalación)',
                text: `ESCALADO a ${supervisor}. Motivo: ${reason}`,
                timestamp: nowStr
              }
            ],
            history: [
              ...c.history,
              {
                id: `hist_${Date.now()}`,
                action: `Escalado a ${supervisor}`,
                user: 'Admin User',
                timestamp: nowStr
              }
            ]
          };
        }
        return c;
      })
    );
  };

  // Change status
  const handleChangeStatus = (newStatus: CaseItem['status']) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === currentCase.id) {
          return { ...c, status: newStatus };
        }
        return c;
      })
    );
  };

  // Toggle reviewed
  const handleToggleReviewed = () => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === currentCase.id) {
          return { ...c, isReviewed: !c.isReviewed, reviewOutcome: 'PRIORIZADO' };
        }
        return c;
      })
    );
  };

  // Quick refresh
  const handleRefresh = () => {
    // slight jitter simulation or re-sort
    setCases((prev) => [...prev]);
  };

  // Export CSV
  const handleExport = () => {
    const headers = 'ID,Titulo,Reporte,HorasTranscurridas,Estado,Responsable,Clasificacion\n';
    const rows = cases
      .map(
        (c) =>
          `"${c.id}","${c.title}","${c.reportedAt}",${c.elapsedHours},"${c.status}","${c.responsible.name}","${c.classification}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Prioridad48_Casos_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen flex antialiased">
      {/* Side Navigation Bar */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onNewCase={() => setIsNewCaseModalOpen(true)}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-[260px] min-h-screen min-w-0">
        {/* Top Header */}
        <TopHeader
          searchQuery={filterOptions.search}
          onSearchChange={(q) => setFilterOptions((prev) => ({ ...prev, search: q }))}
          onRefresh={handleRefresh}
          onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
          unreadCount={cases.filter((c) => c.classification === 'INCUMPLIDO').length}
          onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
        />

        {/* View Routing */}
        <main className="flex-1 overflow-y-auto">
          {currentView === 'welcome' && (
            <WelcomeView
              onEnterDashboard={() => setCurrentView('dashboard')}
              onNavigate={(v) => setCurrentView(v)}
              pendingCount={cases.length}
              atRiskCount={cases.filter((c) => c.classification === 'EN RIESGO').length}
              breachedCount={cases.filter((c) => c.classification === 'INCUMPLIDO').length}
            />
          )}

          {currentView === 'dashboard' && (
            <DashboardView
              cases={cases}
              onSelectCase={handleSelectCase}
              onOpenFilter={() => setIsFilterModalOpen(true)}
              onExport={handleExport}
              onStartReviewSession={() => setCurrentView('review-summary')}
              filterOptions={filterOptions}
              onFilterChange={(newFilters) =>
                setFilterOptions((prev) => ({ ...prev, ...newFilters }))
              }
            />
          )}

          {currentView === 'case-detail' && currentCase && (
            <CaseDetailView
              caseData={currentCase}
              onBack={() => setCurrentView('dashboard')}
              onOpenAddNote={() => setIsAddNoteModalOpen(true)}
              onOpenEscalate={() => setIsEscalateModalOpen(true)}
              onChangeStatus={handleChangeStatus}
              onToggleReviewed={handleToggleReviewed}
            />
          )}

          {currentView === 'review-summary' && (
            <ReviewSummaryView
              reviewedCases={reviewedCases.length > 0 ? reviewedCases : cases.slice(0, 3)}
              onBackToDashboard={() => setCurrentView('dashboard')}
              onSelectCase={handleSelectCase}
            />
          )}

          {currentView === 'system-states' && (
            <SystemStatesView
              onGoToDashboard={() => setCurrentView('dashboard')}
              onGoToHistory={() => setCurrentView('reports')}
            />
          )}

          {currentView === 'reports' && <ReportsView cases={cases} />}

          {currentView === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Global Modals */}
      <NewCaseModal
        isOpen={isNewCaseModalOpen}
        onClose={() => setIsNewCaseModalOpen(false)}
        onSubmit={handleCreateCase}
      />

      <AddNoteModal
        isOpen={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
        caseId={currentCase?.id || ''}
        onAddNote={handleAddNote}
      />

      <EscalateModal
        isOpen={isEscalateModalOpen}
        onClose={() => setIsEscalateModalOpen(false)}
        caseId={currentCase?.id || ''}
        onEscalate={handleEscalate}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filterOptions}
        onApplyFilters={(f) => setFilterOptions(f)}
        onResetFilters={() =>
          setFilterOptions({
            search: '',
            classification: 'ALL',
            status: 'ALL',
            responsible: '',
            sortBy: 'elapsed_desc'
          })
        }
      />

      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        cases={cases}
        onSelectCase={handleSelectCase}
      />
    </div>
  );
}
