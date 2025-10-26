"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Dumbbell, Menu, ArrowLeft, Trash2, Mail, Phone, Calendar, Target, Activity } from "lucide-react"
import { mockAuth, type User } from "@/lib/mock-auth"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin-sidebar"
import { useToast } from "@/hooks/use-toast"
import { ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"

function ClientDetailPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [client, setClient] = useState<User | null>(null)
  const [clientProfile, setClientProfile] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    loadClientData()
  }, [params.id])

  const loadClientData = () => {
    const allUsers = mockAuth.getUsers()
    const foundClient = allUsers.find((u) => u.id === params.id)
    setClient(foundClient || null)

    // Load client profile data from localStorage
    if (typeof window !== "undefined" && params.id) {
      const savedProfile = localStorage.getItem(`user_profile_${params.id}`)
      if (savedProfile) {
        setClientProfile(JSON.parse(savedProfile))
      } else {
        // Mock profile data for demo
        setClientProfile({
          firstName: foundClient?.name.split(" ")[0] || "Usuario",
          lastName: foundClient?.name.split(" ").slice(1).join(" ") || "Demo",
          weight: "75",
          height: "175",
          email: foundClient?.email || "",
          phone: "+34 600 000 000",
          mainGoal: "gain-muscle",
          experienceLevel: "intermediate",
          activityLevel: "active",
          trainingDays: "4",
          injuries: "Ninguna",
          dietaryRestrictions: "Ninguna",
        })
      }
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const handleDeleteClient = () => {
    if (!client) return
    const allUsers = mockAuth.getUsers()
    const updatedUsers = allUsers.filter((u) => u.id !== client.id)
    mockAuth.saveUsers(updatedUsers)
    toast({
      title: "Cliente eliminado",
      description: "El cliente ha sido eliminado exitosamente.",
    })
    router.push("/dashboard/admin/clients")
  }

  if (!client || !clientProfile) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  }

  // Calculate BMI
  const bmi = (
    Number.parseFloat(clientProfile.weight) / Math.pow(Number.parseFloat(clientProfile.height) / 100, 2)
  ).toFixed(1)

  // Mock calorie calculation
  const dailyCalories =
    clientProfile.mainGoal === "gain-muscle" ? 2800 : clientProfile.mainGoal === "lose-fat" ? 2000 : 2400

  // Mock muscle frequency data
  const muscleFrequencyData = [
    { muscle: "Pecho", frecuencia: 2 },
    { muscle: "Espalda", frecuencia: 2 },
    { muscle: "Piernas", frecuencia: 2 },
    { muscle: "Tríceps", frecuencia: 1.5 },
    { muscle: "Bíceps", frecuencia: 1.5 },
    { muscle: "Hombros", frecuencia: 2 },
    { muscle: "Abdominales", frecuencia: 3 },
    { muscle: "Full Body", frecuencia: 1 },
  ]

  const weeklyDistributionData = [
    { name: "Pecho", value: 2 },
    { name: "Espalda", value: 2 },
    { name: "Piernas", value: 2 },
    { name: "Tríceps", value: 1.5 },
    { name: "Bíceps", value: 1.5 },
    { name: "Hombros", value: 2 },
    { name: "Abdominales", value: 3 },
    { name: "Full Body", value: 1 },
  ]

  const goalLabels: Record<string, string> = {
    "gain-muscle": "Ganar Músculo",
    "lose-fat": "Perder Grasa",
    maintain: "Mantenerse",
  }

  const levelLabels: Record<string, string> = {
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Dumbbell className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">KoraFit</span>
                <Badge variant="secondary" className="ml-2">
                  Administrador
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">Hola, {user?.name}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="container py-8">
          <div className="mb-6 flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push("/dashboard/admin/clients")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Clientes
            </Button>
            <Button variant="destructive" onClick={handleDeleteClient}>
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar Cliente
            </Button>
          </div>

          {/* Client Header */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                  {client.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{client.name}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {client.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {clientProfile.phone}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Objetivo</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{goalLabels[clientProfile.mainGoal]}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Peso Actual</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientProfile.weight} kg</div>
                <p className="text-xs text-muted-foreground">IMC: {bmi}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nivel</CardTitle>
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{levelLabels[clientProfile.experienceLevel]}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Días de Entreno</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientProfile.trainingDays} días/semana</div>
              </CardContent>
            </Card>
          </div>

          {/* Calorie Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Calorías Diarias a Consumir</CardTitle>
              <CardDescription>Basado en su objetivo y nivel de actividad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{dailyCalories} kcal</div>
              <p className="text-sm text-muted-foreground mt-2">
                Nivel de actividad:{" "}
                {clientProfile.activityLevel === "sedentary"
                  ? "Sedentario"
                  : clientProfile.activityLevel === "active"
                    ? "Activo"
                    : "Deportista"}
              </p>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-1 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribución Semanal Muscular</CardTitle>
                <CardDescription>Frecuencia de entrenamiento por grupo muscular</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={weeklyDistributionData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="name" className="text-xs" />
                    <PolarRadiusAxis angle={90} domain={[0, 3]} className="text-xs" />
                    <Radar
                      name="Frecuencia"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.6}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Información Adicional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Altura</p>
                  <p className="text-muted-foreground">{clientProfile.height} cm</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Lesiones o Limitaciones</p>
                  <p className="text-muted-foreground">{clientProfile.injuries || "Ninguna"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Restricciones Alimentarias</p>
                  <p className="text-muted-foreground">{clientProfile.dietaryRestrictions || "Ninguna"}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Datos del Formulario</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Nombre Completo</p>
                  <p className="text-muted-foreground">
                    {clientProfile.firstName} {clientProfile.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Email</p>
                  <p className="text-muted-foreground">{clientProfile.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Teléfono</p>
                  <p className="text-muted-foreground">{clientProfile.phone}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function ClientDetailPageWrapper() {
  return (
    <ProtectedRoute allowedRoles={["trainer"]}>
      <ClientDetailPage />
    </ProtectedRoute>
  )
}
