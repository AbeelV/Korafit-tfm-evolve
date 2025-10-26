"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { mockAuth, type User } from "@/lib/mock-auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  updateUser: (updates: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing auth on mount
    const currentUser = mockAuth.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const user = await mockAuth.login(email, password)
    setUser(user)
  }

  const register = async (email: string, password: string, name: string) => {
    const user = await mockAuth.register(email, password, name)
    setUser(user)
  }

  const logout = async () => {
    await mockAuth.logout()
    setUser(null)
  }

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return
    const updatedUser = await mockAuth.updateUser(user.id, updates)
    setUser(updatedUser)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
