"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { TrainerSidebar } from "@/components/trainer-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Users, FileText, LogOut, Dumbbell, Menu, Search, Eye, Trash2 } from "lucide-react"
import { mockAuth, type User } from "@/lib/mock-auth"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

function TrainerDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "dashboard"
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [students, setStudents] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const allUsers = mockAuth.getUsers()
    const studentUsers = allUsers.filter((u) => u.role === "student")
    setStudents(studentUsers)
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const handleDeleteStudent = (studentId: string) => {
    const allUsers = mockAuth.getUsers()
    const updatedUsers = allUsers.filter((u) => u.id !== studentId)
    mockAuth.saveUsers(updatedUsers)
    loadData()
    toast({
      title: "Cliente eliminado",
      description: "El cliente ha sido eliminado exitosamente.",
    })
  }

  const handleViewClient = (student: User) => {
    // Load client profile data
    const profileData = localStorage.getItem(`user_profile_${student.id}`)
    const planData = localStorage.getItem(`user_plan_${student.id}`)

    setSelectedClient({
      ...student,
      profile: profileData ? JSON.parse(profileData) : null,
      plan: planData ? JSON.parse(planData) : null,
    })
    setIsClientDialogOpen(true)
  }

  // Calculate metrics
  const totalClients = students.length
  const totalPlans =
    students.filter((s) => {
      const planData = localStorage.getItem(`user_plan_${s.id}`)
      return planData !== null
    }).length * 2 // 2 plans per form (nutrition + training)

  // Get recent clients (last 5)
  const recentClients = students.slice(-5).reverse()

  // Calculate goal distribution
  const goalDistribution = students.reduce((acc: any, student) => {
    const profileData = localStorage.getItem(`user_profile_${student.id}`)
    if (profileData) {
      const profile = JSON.parse(profileData)
      const goal = profile.mainGoal || profile.objetivo
      if (goal) {
        const goalLabel =
          goal === "gain-muscle" || goal === "Ganar músculo"
            ? "Ganar Músculo"
            : goal === "lose-fat" || goal === "Perder grasa"
              ? "Perder Grasa"
              : "Mantenerse"
        acc[goalLabel] = (acc[goalLabel] || 0) + 1
      }
    }
    return acc
  }, {})

  const goalData = Object.entries(goalDistribution).map(([name, value]) => ({ name, value }))

  // Calculate experience distribution
  const experienceDistribution = students.reduce((acc: any, student) => {
    const profileData = localStorage.getItem(`user_profile_${student.id}`)
    if (profileData) {
      const profile = JSON.parse(profileData)
      const level = profile.experienceLevel || profile.experiencia
      if (level) {
        const levelLabel =
          level === "beginner" || level === "Principiante"
            ? "Principiante"
            : level === "intermediate" || level === "Intermedio"
              ? "Intermedio"
              : "Avanzado"
        acc[levelLabel] = (acc[levelLabel] || 0) + 1
      }
    }
    return acc
  }, {})

  const experienceData = Object.entries(experienceDistribution).map(([name, value]) => ({ name, value }))

  // Filter clients based on search
  const filteredClients = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const COLORS = ["hsl(var(--primary))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"]

  const goalLabels: Record<string, string> = {
    "gain-muscle": "Ganar Músculo",
    "lose-fat": "Perder Grasa",
    maintain: "Mantenerse",
    "Ganar músculo": "Ganar Músculo",
    "Perder grasa": "Perder Grasa",
    Mantenerse: "Mantenerse",
  }

  const levelLabels: Record<string, string> = {
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
    Principiante: "Principiante",
    Intermedio: "Intermedio",
    Avanzado: "Avanzado",
  }

  return (
    <div className="min-h-screen bg-background flex">
      <TrainerSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

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
                  Entrenador
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
          <Tabs value={activeTab} className="space-y-4">
            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-4">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Panel de Entrenador</h1>
                <p className="text-muted-foreground">Gestiona tus clientes y planes</p>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalClients}</div>
                    <p className="text-xs text-muted-foreground">Clientes registrados</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Planes Generados</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalPlans}</div>
                    <p className="text-xs text-muted-foreground">Planes de nutrición y entrenamiento</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Distribución por Objetivo</CardTitle>
                    <CardDescription>Objetivos de los clientes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={goalData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {goalData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Distribución por Experiencia</CardTitle>
                    <CardDescription>Nivel de experiencia de los clientes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={experienceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {experienceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Clients */}
              <Card>
                <CardHeader>
                  <CardTitle>Últimos Clientes Registrados</CardTitle>
                  <CardDescription>Los 5 clientes más recientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentClients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>{client.email}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Clients Tab */}
            <TabsContent value="clients" className="space-y-4">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Gestión de Clientes</h1>
                <p className="text-muted-foreground">Lista completa de todos tus clientes</p>
              </div>

              {/* Search */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre o email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Clients Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Lista de Clientes</CardTitle>
                  <CardDescription>Total: {filteredClients.length} clientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>{client.email}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleViewClient(client)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Detalles
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteStudent(client.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Client Details Dialog */}
      <Dialog open={isClientDialogOpen} onOpenChange={setIsClientDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del Cliente</DialogTitle>
            <DialogDescription>Información completa del cliente</DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nombre</p>
                  <p className="text-lg font-semibold">{selectedClient.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-lg">{selectedClient.email}</p>
                </div>
              </div>

              {selectedClient.profile && (
                <>
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-4">Información Personal</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Edad</p>
                        <p className="font-medium">
                          {selectedClient.profile.age || selectedClient.profile.edad || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Sexo</p>
                        <p className="font-medium">
                          {selectedClient.profile.gender || selectedClient.profile.sexo || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Peso</p>
                        <p className="font-medium">{selectedClient.profile.weight || selectedClient.profile.peso} kg</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Altura</p>
                        <p className="font-medium">
                          {selectedClient.profile.height || selectedClient.profile.altura} cm
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Teléfono</p>
                        <p className="font-medium">
                          {selectedClient.profile.phone || selectedClient.profile.telefono || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-4">Objetivos y Nivel</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Objetivo Principal</p>
                        <p className="font-medium">
                          {goalLabels[selectedClient.profile.mainGoal || selectedClient.profile.objetivo] || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Nivel de Experiencia</p>
                        <p className="font-medium">
                          {levelLabels[selectedClient.profile.experienceLevel || selectedClient.profile.experiencia] ||
                            "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Nivel de Actividad</p>
                        <p className="font-medium">
                          {selectedClient.profile.activityLevel || selectedClient.profile.nivelActividad || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Días de Entrenamiento</p>
                        <p className="font-medium">
                          {selectedClient.profile.trainingDays || selectedClient.profile.diasEntreno} días/semana
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-4">Restricciones y Lesiones</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Lesiones</p>
                        <p className="font-medium">
                          {selectedClient.profile.injuries || selectedClient.profile.lesiones || "Ninguna"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Restricciones Dietéticas</p>
                        <p className="font-medium">
                          {selectedClient.profile.dietaryRestrictions ||
                            selectedClient.profile.restricciones ||
                            "Ninguna"}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {selectedClient.plan && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Estado del Plan</h3>
                  <Badge variant="secondary">Plan Generado</Badge>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function TrainerDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["trainer"]}>
      <TrainerDashboard />
    </ProtectedRoute>
  )
}
