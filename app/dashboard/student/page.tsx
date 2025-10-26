"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentSidebar } from "@/components/student-sidebar"
import { LogOut, Dumbbell, RefreshCw, FileText, UtensilsCrossed, Target, Activity, Calendar, Menu } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { LayoutDashboard } from "lucide-react" // Import LayoutDashboard

function StudentDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "dashboard"
  const [planData, setPlanData] = useState<any>(null)
  const [clientProfile, setClientProfile] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    // Load plan data and profile from localStorage
    if (typeof window !== "undefined" && user?.id) {
      const savedPlan = localStorage.getItem(`user_plan_${user.id}`)
      if (savedPlan) {
        const parsed = JSON.parse(savedPlan)
        console.log("[v0] Loaded plan data from localStorage:", parsed)
        setPlanData(parsed)
      }

      const savedProfile = localStorage.getItem(`user_profile_${user.id}`)
      if (savedProfile) {
        setClientProfile(JSON.parse(savedProfile))
      }
    }
  }, [user?.id])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const handleUpdatePlan = () => {
    router.push("/onboarding")
  }

  const handleDownloadPDF = (type: "nutrition" | "training") => {
    toast({
      title: "Descargando PDF",
      description: `Tu plan de ${type === "nutrition" ? "nutrición" : "entrenamiento"} se está descargando...`,
    })
    // In production, this would generate and download a real PDF
  }

  // Calculate stats from profile
  const bmi = clientProfile
    ? (Number.parseFloat(clientProfile.weight) / Math.pow(Number.parseFloat(clientProfile.height) / 100, 2)).toFixed(1)
    : "0"

  const dailyCalories =
    planData?.nutrition?.calorias_diarias || planData?.nutrition?.dias?.[0]?.calorias_totales || null

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

  const muscleFrequencyData = planData?.training?.dias
    ? (() => {
        const frequency: Record<string, number> = {}
        planData.training.dias.forEach((dia: any) => {
          const grupo = dia.grupoMuscular
          if (grupo && grupo !== "Descanso") {
            // Extract main muscle groups from the string
            const grupos = grupo.split(/[y,]/).map((g: string) => g.trim())
            grupos.forEach((g: string) => {
              if (g) {
                // Capitalize first letter of each word
                const capitalized = g
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(" ")
                frequency[capitalized] = (frequency[capitalized] || 0) + 1
              }
            })
          }
        })
        return Object.entries(frequency).map(([muscle, frecuencia]) => ({ muscle, frecuencia }))
      })()
    : []

  const weeklyDistributionData = planData?.training?.dias
    ? planData.training.dias.map((dia: any) => ({
        day: dia.dia,
        muscleGroup: dia.grupoMuscular || "Descanso",
      }))
    : []

  return (
    <div className="min-h-screen bg-background flex">
      <StudentSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

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
                  Alumno
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
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Mi Panel</h1>
              <p className="text-muted-foreground">Gestiona tus planes de nutrición y entrenamiento</p>
            </div>
            <Button onClick={handleUpdatePlan} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar Plan
            </Button>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(value) => router.push(`/dashboard/student?tab=${value}`)}
            className="space-y-4"
          >
            <TabsList className="grid w-full max-w-2xl grid-cols-3">
              <TabsTrigger value="dashboard">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="nutrition">
                <UtensilsCrossed className="h-4 w-4 mr-2" />
                Nutrición
              </TabsTrigger>
              <TabsTrigger value="training">
                <Dumbbell className="h-4 w-4 mr-2" />
                Entrenamiento
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-4">
              {clientProfile ? (
                <>
                  {/* Stats Grid */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                        <p className="text-xs text-muted-foreground mt-2">IMC: {bmi}</p>
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
                  {dailyCalories && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Calorías Diarias a Consumir</CardTitle>
                        <CardDescription>Basado en tu plan de nutrición personalizado</CardDescription>
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
                  )}

                  {/* Charts */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Frecuencia Muscular Semanal</CardTitle>
                        <CardDescription>Veces por semana que trabajas cada grupo muscular</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                          <BarChart data={muscleFrequencyData} margin={{ bottom: 60 }}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                              dataKey="muscle"
                              angle={-45}
                              textAnchor="end"
                              height={80}
                              interval={0}
                              tick={{ fontSize: 12 }}
                            />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "6px",
                              }}
                            />
                            <Bar dataKey="frecuencia" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Distribución Semanal</CardTitle>
                        <CardDescription>Días de entrenamiento y grupos musculares trabajados</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {weeklyDistributionData.map((item, index) => (
                            <div
                              key={index}
                              className={`flex items-center justify-between p-3 rounded-lg ${
                                item.muscleGroup === "Descanso"
                                  ? "bg-muted/50"
                                  : "bg-primary/10 border border-primary/20"
                              }`}
                            >
                              <span className="font-medium">{item.day}</span>
                              <span
                                className={`text-sm ${
                                  item.muscleGroup === "Descanso"
                                    ? "text-muted-foreground"
                                    : "text-primary font-semibold"
                                }`}
                              >
                                {item.muscleGroup}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Completa tu perfil para ver tu dashboard personalizado
                      </p>
                      <Button onClick={handleUpdatePlan}>Completar Perfil</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Nutrition Plan Tab */}
            <TabsContent value="nutrition" className="space-y-4">
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>Tu Plan de Nutrición Personalizado</CardTitle>
                    <CardDescription>Diseñado específicamente para tus objetivos</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {planData?.nutrition ? (
                    <div className="space-y-6">
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <h3 className="font-bold text-lg mb-2">{planData.nutrition.nombre_dieta}</h3>
                        <p className="text-sm text-muted-foreground">{planData.nutrition.resumen}</p>
                      </div>

                      {planData.nutrition.dias?.map((dia: any, index: number) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-lg">{dia.dia}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {dia.comidas?.map((comida: any, comidaIndex: number) => (
                              <div key={comidaIndex} className="border-l-2 border-primary pl-4">
                                <h4 className="font-semibold text-primary mb-2">{comida.tipo}</h4>
                                <ul className="space-y-1">
                                  {comida.alimentos?.map((alimento: any, alimentoIndex: number) => (
                                    <li key={alimentoIndex} className="text-sm">
                                      <span className="font-medium">{alimento.nombre}</span>
                                      {alimento.cantidad && (
                                        <span className="text-muted-foreground"> - {alimento.cantidad}</span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Tu plan de nutrición se está generando...</p>
                      <p className="text-sm text-muted-foreground">
                        Esto puede tardar unos momentos. Actualiza la página si no ves tu plan.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Training Plan Tab */}
            <TabsContent value="training" className="space-y-4">
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>Tu Rutina de Entrenamiento Personalizada</CardTitle>
                    <CardDescription>Adaptada a tu nivel y objetivos</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {planData?.training ? (
                    <div className="space-y-6">
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <h3 className="font-bold text-lg mb-2">Resumen de tu Rutina</h3>
                        <p className="text-sm text-muted-foreground">{planData.training.resumen}</p>
                      </div>

                      {planData.training.dias?.map((dia: any, index: number) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center justify-between">
                              <span>{dia.dia}</span>
                              <Badge variant="secondary">{dia.grupoMuscular}</Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {dia.ejercicios?.map((ejercicio: any, ejercicioIndex: number) => (
                                <div
                                  key={ejercicioIndex}
                                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                >
                                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                    {ejercicioIndex + 1}
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold mb-1">{ejercicio.nombre}</h4>
                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                      <span>
                                        <strong>Series:</strong> {ejercicio.series}
                                      </span>
                                      <span>
                                        <strong>Reps:</strong> {ejercicio.repeticiones}
                                      </span>
                                      <span>
                                        <strong>Descanso:</strong> {ejercicio.descanso}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Tu rutina de entrenamiento se está generando...</p>
                      <p className="text-sm text-muted-foreground">
                        Esto puede tardar unos momentos. Actualiza la página si no ves tu rutina.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

export default function StudentDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["student"]} requireInitialForm={true}>
      <StudentDashboard />
    </ProtectedRoute>
  )
}
