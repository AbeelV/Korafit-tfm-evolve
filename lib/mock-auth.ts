// Mock authentication system using localStorage

export interface User {
  id: string
  email: string
  name: string
  role: "trainer" | "student"
  createdAt: string
  hasCompletedInitialForm?: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Mock users database
const MOCK_USERS: User[] = [
  {
    id: "trainer-1",
    email: "entrenador@korfit.com",
    name: "Carlos Martínez",
    role: "trainer",
    createdAt: new Date().toISOString(),
    hasCompletedInitialForm: true,
  },
  {
    id: "student-1",
    email: "maria@example.com",
    name: "María García",
    role: "student",
    createdAt: new Date().toISOString(),
    hasCompletedInitialForm: true,
  },
  {
    id: "student-2",
    email: "juan@example.com",
    name: "Juan Pérez",
    role: "student",
    createdAt: new Date().toISOString(),
    hasCompletedInitialForm: true,
  },
  {
    id: "student-3",
    email: "ana@example.com",
    name: "Ana López",
    role: "student",
    createdAt: new Date().toISOString(),
    hasCompletedInitialForm: true,
  },
  {
    id: "student-4",
    email: "pedro@example.com",
    name: "Pedro Sánchez",
    role: "student",
    createdAt: new Date().toISOString(),
    hasCompletedInitialForm: true,
  },
  {
    id: "student-5",
    email: "laura@example.com",
    name: "Laura Fernández",
    role: "student",
    createdAt: new Date().toISOString(),
    hasCompletedInitialForm: true,
  },
  {
    id: "student-6",
    email: "carlos@example.com",
    name: "Carlos Ruiz",
    role: "student",
    createdAt: new Date().toISOString(),
    hasCompletedInitialForm: true,
  },
  {
    id: "student-7",
    email: "sofia@example.com",
    name: "Sofía Torres",
    role: "student",
    createdAt: new Date().toISOString(),
    hasCompletedInitialForm: true,
  },
  {
    id: "student-8",
    email: "diego@example.com",
    name: "Diego Morales",
    role: "student",
    createdAt: new Date().toISOString(),
    hasCompletedInitialForm: true,
  },
  {
    id: "student-9",
    email: "lucia@example.com",
    name: "Lucía Ramírez",
    role: "student",
    createdAt: new Date().toISOString(),
    hasCompletedInitialForm: true,
  },
  {
    id: "student-10",
    email: "miguel@example.com",
    name: "Miguel Jiménez",
    role: "student",
    createdAt: new Date().toISOString(),
    hasCompletedInitialForm: true,
  },
]

const AUTH_STORAGE_KEY = "korafit_auth"
const USERS_STORAGE_KEY = "korafit_users"

// Initialize mock users in localStorage
if (typeof window !== "undefined") {
  const existingUsers = localStorage.getItem(USERS_STORAGE_KEY)
  if (!existingUsers) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(MOCK_USERS))
  }
}

export const mockAuth = {
  // Get all users from localStorage
  getUsers(): User[] {
    if (typeof window === "undefined") return MOCK_USERS
    const users = localStorage.getItem(USERS_STORAGE_KEY)
    return users ? JSON.parse(users) : MOCK_USERS
  },

  // Save users to localStorage
  saveUsers(users: User[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
  },

  // Login
  async login(email: string, password: string): Promise<User> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const users = this.getUsers()
    const user = users.find((u) => u.email === email)

    if (!user) {
      throw new Error("Usuario no encontrado")
    }

    // Mock password check (in real app, this would be secure)
    // For demo, any password works

    // Save auth state
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    }

    return user
  },

  // Register
  async register(email: string, password: string, name: string): Promise<User> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const users = this.getUsers()

    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      throw new Error("El email ya está registrado")
    }

    // Create new user (always as student)
    const newUser: User = {
      id: `student-${Date.now()}`,
      email,
      name,
      role: "student",
      createdAt: new Date().toISOString(),
      hasCompletedInitialForm: false, // New users need to complete form
    }

    // Add to users list
    users.push(newUser)
    this.saveUsers(users)

    // Save auth state
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser))
    }

    return newUser
  },

  // Logout
  async logout(): Promise<void> {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  },

  // Get current user
  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const authData = localStorage.getItem(AUTH_STORAGE_KEY)
    return authData ? JSON.parse(authData) : null
  },

  // Update user
  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const users = this.getUsers()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      throw new Error("Usuario no encontrado")
    }

    users[userIndex] = { ...users[userIndex], ...updates }
    this.saveUsers(users)

    // Update current auth state if it's the current user
    const currentUser = this.getCurrentUser()
    if (currentUser?.id === userId) {
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users[userIndex]))
      }
    }

    return users[userIndex]
  },
}
