// Mock data for appointments, packages, and sessions

export interface Package {
  id: string
  name: string
  sessions: number
  price: number
  description: string
}

export interface Appointment {
  id: string
  studentId: string
  studentName: string
  date: string
  time: string
  status: "scheduled" | "completed" | "cancelled"
  type: "training" | "consultation"
}

export interface SessionHistory {
  id: string
  studentId: string
  studentName: string
  date: string
  type: string
  notes: string
}

export interface StudentPackage {
  studentId: string
  packageId: string
  sessionsRemaining: number
  totalSessions: number
  purchaseDate: string
}

export const PACKAGES: Package[] = [
  {
    id: "basic",
    name: "Básico",
    sessions: 5,
    price: 99,
    description: "Perfecto para comenzar tu transformación",
  },
  {
    id: "standard",
    name: "Estándar",
    sessions: 10,
    price: 179,
    description: "Ideal para resultados consistentes",
  },
  {
    id: "premium",
    name: "Premium",
    sessions: 20,
    price: 329,
    description: "Máximo compromiso, máximos resultados",
  },
]

// Initialize mock data in localStorage
export function initializeMockData() {
  if (typeof window === "undefined") return

  // Initialize appointments
  const existingAppointments = localStorage.getItem("korfit_appointments")
  if (!existingAppointments) {
    const mockAppointments: Appointment[] = [
      {
        id: "apt-1",
        studentId: "student-1",
        studentName: "María García",
        date: "2025-01-25",
        time: "10:00",
        status: "scheduled",
        type: "training",
      },
      {
        id: "apt-2",
        studentId: "student-2",
        studentName: "Juan Pérez",
        date: "2025-01-25",
        time: "11:00",
        status: "scheduled",
        type: "training",
      },
      {
        id: "apt-3",
        studentId: "student-3",
        studentName: "Ana López",
        date: "2025-01-26",
        time: "09:00",
        status: "scheduled",
        type: "consultation",
      },
      {
        id: "apt-4",
        studentId: "student-4",
        studentName: "Pedro Sánchez",
        date: "2025-01-26",
        time: "14:00",
        status: "scheduled",
        type: "training",
      },
      {
        id: "apt-5",
        studentId: "student-5",
        studentName: "Laura Fernández",
        date: "2025-01-27",
        time: "10:00",
        status: "scheduled",
        type: "training",
      },
      {
        id: "apt-6",
        studentId: "student-6",
        studentName: "Carlos Ruiz",
        date: "2025-01-27",
        time: "15:00",
        status: "scheduled",
        type: "training",
      },
      {
        id: "apt-7",
        studentId: "student-7",
        studentName: "Sofía Torres",
        date: "2025-01-28",
        time: "11:00",
        status: "scheduled",
        type: "consultation",
      },
      {
        id: "apt-8",
        studentId: "student-8",
        studentName: "Diego Morales",
        date: "2025-01-28",
        time: "16:00",
        status: "scheduled",
        type: "training",
      },
    ]
    localStorage.setItem("korfit_appointments", JSON.stringify(mockAppointments))
  }

  // Initialize session history
  const existingHistory = localStorage.getItem("korfit_session_history")
  if (!existingHistory) {
    const mockHistory: SessionHistory[] = [
      {
        id: "hist-1",
        studentId: "student-1",
        studentName: "María García",
        date: "2025-01-15",
        type: "Entrenamiento de Fuerza",
        notes: "Excelente progreso en sentadillas",
      },
      {
        id: "hist-2",
        studentId: "student-2",
        studentName: "Juan Pérez",
        date: "2025-01-16",
        type: "Cardio y Resistencia",
        notes: "Mejoró tiempo en carrera",
      },
      {
        id: "hist-3",
        studentId: "student-1",
        studentName: "María García",
        date: "2025-01-18",
        type: "Entrenamiento de Fuerza",
        notes: "Aumentó peso en press de banca",
      },
      {
        id: "hist-4",
        studentId: "student-3",
        studentName: "Ana López",
        date: "2025-01-19",
        type: "Consulta Nutricional",
        notes: "Ajuste de macros para pérdida de peso",
      },
      {
        id: "hist-5",
        studentId: "student-4",
        studentName: "Pedro Sánchez",
        date: "2025-01-20",
        type: "Entrenamiento Funcional",
        notes: "Trabajó movilidad y flexibilidad",
      },
      {
        id: "hist-6",
        studentId: "student-5",
        studentName: "Laura Fernández",
        date: "2025-01-20",
        type: "Entrenamiento de Fuerza",
        notes: "Primera sesión, evaluación inicial completada",
      },
      {
        id: "hist-7",
        studentId: "student-6",
        studentName: "Carlos Ruiz",
        date: "2025-01-21",
        type: "Cardio HIIT",
        notes: "Excelente resistencia cardiovascular",
      },
      {
        id: "hist-8",
        studentId: "student-7",
        studentName: "Sofía Torres",
        date: "2025-01-21",
        type: "Yoga y Flexibilidad",
        notes: "Mejoró rango de movimiento",
      },
      {
        id: "hist-9",
        studentId: "student-8",
        studentName: "Diego Morales",
        date: "2025-01-22",
        type: "Entrenamiento de Fuerza",
        notes: "Técnica perfecta en peso muerto",
      },
      {
        id: "hist-10",
        studentId: "student-9",
        studentName: "Lucía Ramírez",
        date: "2025-01-22",
        type: "Consulta Nutricional",
        notes: "Plan de alimentación para ganancia muscular",
      },
    ]
    localStorage.setItem("korfit_session_history", JSON.stringify(mockHistory))
  }

  // Initialize student packages
  const existingPackages = localStorage.getItem("korfit_student_packages")
  if (!existingPackages) {
    const mockStudentPackages: StudentPackage[] = [
      {
        studentId: "student-1",
        packageId: "standard",
        sessionsRemaining: 7,
        totalSessions: 10,
        purchaseDate: "2025-01-01",
      },
      {
        studentId: "student-2",
        packageId: "basic",
        sessionsRemaining: 3,
        totalSessions: 5,
        purchaseDate: "2025-01-05",
      },
      {
        studentId: "student-3",
        packageId: "premium",
        sessionsRemaining: 18,
        totalSessions: 20,
        purchaseDate: "2024-12-20",
      },
      {
        studentId: "student-4",
        packageId: "standard",
        sessionsRemaining: 9,
        totalSessions: 10,
        purchaseDate: "2025-01-10",
      },
      {
        studentId: "student-5",
        packageId: "basic",
        sessionsRemaining: 4,
        totalSessions: 5,
        purchaseDate: "2025-01-12",
      },
      {
        studentId: "student-6",
        packageId: "standard",
        sessionsRemaining: 8,
        totalSessions: 10,
        purchaseDate: "2025-01-08",
      },
      {
        studentId: "student-7",
        packageId: "premium",
        sessionsRemaining: 15,
        totalSessions: 20,
        purchaseDate: "2025-01-03",
      },
      {
        studentId: "student-8",
        packageId: "basic",
        sessionsRemaining: 2,
        totalSessions: 5,
        purchaseDate: "2025-01-15",
      },
      {
        studentId: "student-9",
        packageId: "standard",
        sessionsRemaining: 10,
        totalSessions: 10,
        purchaseDate: "2025-01-18",
      },
      {
        studentId: "student-10",
        packageId: "premium",
        sessionsRemaining: 20,
        totalSessions: 20,
        purchaseDate: "2025-01-20",
      },
    ]
    localStorage.setItem("korfit_student_packages", JSON.stringify(mockStudentPackages))
  }
}

// Helper functions to get data
export function getAppointments(): Appointment[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("korfit_appointments")
  return data ? JSON.parse(data) : []
}

export function getSessionHistory(): SessionHistory[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("korfit_session_history")
  return data ? JSON.parse(data) : []
}

export function getStudentPackages(): StudentPackage[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("korfit_student_packages")
  return data ? JSON.parse(data) : []
}

export function saveAppointments(appointments: Appointment[]) {
  if (typeof window === "undefined") return
  localStorage.setItem("korfit_appointments", JSON.stringify(appointments))
}

export function saveSessionHistory(history: SessionHistory[]) {
  if (typeof window === "undefined") return
  localStorage.setItem("korfit_session_history", JSON.stringify(history))
}

export function saveStudentPackages(packages: StudentPackage[]) {
  if (typeof window === "undefined") return
  localStorage.setItem("korfit_student_packages", JSON.stringify(packages))
}
