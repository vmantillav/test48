import { CaseItem } from '../types';

export const INITIAL_CASES: CaseItem[] = [
  {
    id: 'SERV-2024-089',
    title: 'Interrupción Core de Base de Datos',
    reportedAt: '10 Oct 2024, 09:15',
    reportedIso: '2024-10-10T09:15:00',
    elapsedHours: 52,
    elapsedMinutes: 15,
    status: 'Pendiente Documentación',
    classification: 'INCUMPLIDO',
    serviceType: 'Infraestructura & Datos',
    responsible: {
      name: 'Laura Gómez',
      role: 'Especialista de Soporte N2',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdYOue1vWLx-0G_HWoErH7RO2WYfa3CjguHgH7ySjTDqv1oiqrVI6qJelMWLsgakMgvjGz3_CmVDf17F9HjuDfenT_zRerNuRVPTHufpPlSDb0oOLbuJH0uhf3l4T89XcHUheSmIRWnx7Zrm3lW9v2HO3w66PWTO-KlHMmuG-I8ECqTmf33o6bUB0BppUFes6GqTQTUezbTNlEr2VlgDYA_KdRk214ZQa6aP2J9vKvZmBkpU_d42w6mg',
      email: 'laura.gomez@empresa.com'
    },
    description: 'Cliente reporta interrupción intermitente en el servicio de validación de identidad desde la actualización del portal. Se requiere revisión urgente de los logs transaccionales y confirmación del proveedor externo de servicios biométricos. La documentación solicitada al cliente (capturas de error) aún no ha sido recibida en sistema.',
    notes: [
      {
        id: 'n1',
        author: 'Laura Gómez',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdYOue1vWLx-0G_HWoErH7RO2WYfa3CjguHgH7ySjTDqv1oiqrVI6qJelMWLsgakMgvjGz3_CmVDf17F9HjuDfenT_zRerNuRVPTHufpPlSDb0oOLbuJH0uhf3l4T89XcHUheSmIRWnx7Zrm3lW9v2HO3w66PWTO-KlHMmuG-I8ECqTmf33o6bUB0BppUFes6GqTQTUezbTNlEr2VlgDYA_KdRk214ZQa6aP2J9vKvZmBkpU_d42w6mg',
        text: 'Revisión de logs indica fallo en replicación. Escalado a equipo DBA Nivel 3.',
        timestamp: '11 Oct 2024, 11:30'
      }
    ],
    history: [
      { id: 'h1', action: 'Caso reportado en cola de prioridad', user: 'Sistema Automático', timestamp: '10 Oct 2024, 09:15' },
      { id: 'h2', action: 'Asignado a Laura Gómez', user: 'Admin User', timestamp: '10 Oct 2024, 10:00' },
      { id: 'h3', action: 'Alerta de Incumplimiento SLA 48h superada', user: 'Motor SLA', timestamp: '12 Oct 2024, 09:15' }
    ],
    isReviewed: true,
    reviewOutcome: 'PRIORIZADO'
  },
  {
    id: 'SERV-2024-092',
    title: 'Degradación de API de Pagos',
    reportedAt: '10 Oct 2024, 23:30',
    reportedIso: '2024-10-10T23:30:00',
    elapsedHours: 38,
    elapsedMinutes: 10,
    status: 'En Revisión',
    classification: 'EN RIESGO',
    serviceType: 'Pasarela Transaccional',
    responsible: {
      name: 'Carlos Méndez',
      role: 'Líder Técnico Fintech',
      avatar: '',
      initials: 'CM',
      email: 'carlos.mendez@empresa.com'
    },
    description: 'Latencia detectada en endpoints de terceros. Monitorización activa del porcentaje de timeouts en la pasarela de recaudo y validación con el banco adquirente.',
    notes: [
      {
        id: 'n2',
        author: 'Carlos Méndez',
        text: 'Se ejecutó failover temporal sobre el cluster secundario.',
        timestamp: '11 Oct 2024, 18:40'
      }
    ],
    history: [
      { id: 'h4', action: 'Alerta preventiva emitida (36h)', user: 'Motor SLA', timestamp: '12 Oct 2024, 11:30' }
    ],
    isReviewed: true,
    reviewOutcome: 'VISUALIZADO'
  },
  {
    id: 'SERV-2024-095',
    title: 'Fallo en Gateway de Facturación Electrónica',
    reportedAt: '11 Oct 2024, 01:20',
    reportedIso: '2024-10-11T01:20:00',
    elapsedHours: 36,
    elapsedMinutes: 20,
    status: 'En Revisión',
    classification: 'EN RIESGO',
    serviceType: 'Facturación & Compliance',
    responsible: {
      name: 'Roberto Silva',
      role: 'Especialista en Facturación',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgLg4WzYzNZ92qDJm-k9tgnhYCmj4MCMPmnrc8rJCx5PY5lPdX8ZBKLI5odcwY8PIV3fa8CpbVIKP9Ur-xaNBtN3zY1ue6RKgmF87i9JSXOanWHy_EYptLXOd3fkykxybINNCI4L7oSuRJmgESPB6gAyVuNxNDwtGjyRZgdYLRkGWFTXItV2YkTMwcT0E6sd0mfmkZz8Vh6X7kSLUN4Qy97aoCefj85v4hAJ-s3rV_GvR1lL_m-3vhzQ',
      email: 'roberto.silva@empresa.com'
    },
    description: 'Emisión de facturas por consumo presenta retrasos en la firma digital con el ente regulador tributario. Se realizan reintentos cada 15 minutos.',
    notes: [],
    history: [
      { id: 'h5', action: 'Ingreso de reporte desde ERP', user: 'ERP Connector', timestamp: '11 Oct 2024, 01:20' }
    ]
  },
  {
    id: 'SERV-2024-102',
    title: 'Retraso en Conciliación de Consumos',
    reportedAt: '12 Oct 2024, 08:45',
    reportedIso: '2024-10-12T08:45:00',
    elapsedHours: 12,
    elapsedMinutes: 45,
    status: 'Procesando',
    classification: 'NORMAL',
    serviceType: 'Operaciones',
    responsible: {
      name: 'Ana Pérez',
      role: 'Analista de Operaciones',
      avatar: '',
      initials: 'AP',
      email: 'ana.perez@empresa.com'
    },
    description: 'Lote de consumo no reflejado en el reporte previo a facturación. Archivo CSV en validación de formato.',
    notes: [],
    history: []
  },
  {
    id: 'SERV-2024-105',
    title: 'Inconsistencia en Tarifas Transaccionales',
    reportedAt: '12 Oct 2024, 11:10',
    reportedIso: '2024-10-12T11:10:00',
    elapsedHours: 10,
    elapsedMinutes: 20,
    status: 'Procesando',
    classification: 'NORMAL',
    serviceType: 'Tarificación',
    responsible: {
      name: 'María Ruiz',
      role: 'Oficial de Cuentas',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmeSsGzw19SodVIoKB5PF-rPUXANNNjxoFIwT2SnwabMGvitaMqtIf86ckIXLqL7X3oE5WvsMMI99WRD9QGtrDJ9MaJyOwNfVBdZP2ncD5lyQYvPNFjs77chjhew8_l56IwhKJE682bGO5aTEr2wnwMC-DbrU30IiuXDCgSacCnzjx23y3ixcG9nSjNNqGAQ3-soj3ggR2VP-DSH7lUKxRPzaITOmnk1NZRTQjBEVGaG79WVy3LTk9fw',
      email: 'maria.ruiz@empresa.com'
    },
    description: 'Diferencia en centavos en el cálculo de consumo volumétrico del periodo anterior. En verificación con contabilidad.',
    notes: [],
    history: []
  },
  {
    id: 'SERV-2024-108',
    title: 'Timeout en Servicio de Auditoría Médica',
    reportedAt: '09 Oct 2024, 14:00',
    reportedIso: '2024-10-09T14:00:00',
    elapsedHours: 58,
    elapsedMinutes: 40,
    status: 'Pendiente Documentación',
    classification: 'INCUMPLIDO',
    serviceType: 'Auditoría Clínica',
    responsible: {
      name: 'Laura Gómez',
      role: 'Especialista de Soporte N2',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdYOue1vWLx-0G_HWoErH7RO2WYfa3CjguHgH7ySjTDqv1oiqrVI6qJelMWLsgakMgvjGz3_CmVDf17F9HjuDfenT_zRerNuRVPTHufpPlSDb0oOLbuJH0uhf3l4T89XcHUheSmIRWnx7Zrm3lW9v2HO3w66PWTO-KlHMmuG-I8ECqTmf33o6bUB0BppUFes6GqTQTUezbTNlEr2VlgDYA_KdRk214ZQa6aP2J9vKvZmBkpU_d42w6mg',
      email: 'laura.gomez@empresa.com'
    },
    description: 'El servicio de auditoría de paquetes quirúrgicos excede los 30s de tiempo de respuesta.',
    notes: [],
    history: []
  }
];
