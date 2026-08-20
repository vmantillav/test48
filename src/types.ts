export type CaseClassification = 'INCUMPLIDO' | 'EN RIESGO' | 'NORMAL';

export type CaseStatus = 
  | 'Pendiente Documentación' 
  | 'En Revisión' 
  | 'Procesando' 
  | 'Escalado' 
  | 'Resuelto';

export interface CaseOfficer {
  name: string;
  role: string;
  avatar: string;
  initials?: string;
  email?: string;
}

export interface CaseNote {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  timestamp: string;
}

export interface CaseHistoryEvent {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type?: 'created' | 'status_change' | 'escalated' | 'note' | 'review';
}

export interface CaseItem {
  id: string; // e.g. "SERV-2024-089"
  title: string;
  reportedAt: string; // e.g. "10 Oct 2024, 09:15"
  reportedIso: string;
  elapsedHours: number;
  elapsedMinutes: number;
  status: CaseStatus;
  responsible: CaseOfficer;
  classification: CaseClassification;
  description: string;
  serviceType: string;
  notes: CaseNote[];
  history: CaseHistoryEvent[];
  isReviewed?: boolean;
  reviewOutcome?: 'PRIORIZADO' | 'VISUALIZADO' | 'ESCALADO';
}

export interface FilterOptions {
  search: string;
  classification: 'ALL' | CaseClassification;
  status: 'ALL' | CaseStatus;
  responsible: string;
  sortBy: 'elapsed_desc' | 'elapsed_asc' | 'id_asc' | 'id_desc' | 'reported_desc';
}

export type ViewMode = 
  | 'welcome' 
  | 'dashboard' 
  | 'case-detail' 
  | 'review-summary' 
  | 'system-states' 
  | 'reports' 
  | 'settings';
