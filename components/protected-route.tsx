"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ("trainer" | "student")[]
  requireInitialForm?: boolean
}

export function ProtectedRoute({ children, allowedRoles, requireInitialForm = false }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      // Not authenticated
      if (!user) {
        router.push("/login")
        return
      }

      // Check role permissions
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push("/dashboard")
        return
      }

      // Check if initial form is required but not completed
      if (requireInitialForm && !user.hasCompletedInitialForm) {
        router.push("/onboarding")
        return
      }

      // Redirect to onboarding if form not completed
      if (!user.hasCompletedInitialForm && !window.location.pathname.includes("/onboarding")) {
        router.push("/onboarding")
      }
    }
  }, [user, isLoading, router, allowedRoles, requireInitialForm])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
