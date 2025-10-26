"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Dumbbell, Loader2, ChevronRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function OnboardingPage() {
  const router = useRouter()
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    email: user?.email || "",
    phone: "",
    mainGoal: "",
    experienceLevel: "",
    activityLevel: "",
    trainingDays: "",
    injuries: "",
    dietaryRestrictions: "",
  })

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleGeneratePlan = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          ...formData,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error al enviar los datos: ${response.status}`)
      }

      const planData = await response.json()

      // Save form data and mark as completed
      await updateUser({
        hasCompletedInitialForm: true,
      })

      // Store form data and plan response in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(`user_profile_${user?.id}`, JSON.stringify(formData))
        localStorage.setItem(`user_plan_${user?.id}`, JSON.stringify(planData))
      }

      toast({
        title: "¡Perfil completado!",
        description: "Tu plan personalizado ha sido generado exitosamente.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo guardar tu información. Intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const progress = (step / totalSteps) * 100

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <Dumbbell className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Completa Tu Perfil</CardTitle>
          <CardDescription>Ayúdanos a conocerte mejor para crear tu plan personalizado</CardDescription>
          <div className="pt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Paso {step} de {totalSteps}
            </p>
          </div>
        </CardHeader>
        <div>
          <CardContent className="space-y-6">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Información Básica</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Juan"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellidos</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Pérez García"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Edad</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      required
                      min="15"
                      max="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Sexo</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData({ ...formData, gender: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hombre">Hombre</SelectItem>
                        <SelectItem value="Mujer">Mujer</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      required
                      min="30"
                      max="300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Altura (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="170"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      required
                      min="100"
                      max="250"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+34 600 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Fitness Goals */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Objetivos y Actividad</h3>

                <div className="space-y-2">
                  <Label htmlFor="mainGoal">Objetivo Principal</Label>
                  <Select
                    value={formData.mainGoal}
                    onValueChange={(value) => setFormData({ ...formData, mainGoal: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="¿Qué quieres lograr?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gain-muscle">Ganar Músculo</SelectItem>
                      <SelectItem value="lose-fat">Perder Grasa</SelectItem>
                      <SelectItem value="maintain">Mantenerse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Nivel de Experiencia</Label>
                  <Select
                    value={formData.experienceLevel}
                    onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Principiante</SelectItem>
                      <SelectItem value="intermediate">Intermedio</SelectItem>
                      <SelectItem value="advanced">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Nivel de Actividad Diaria</Label>
                  <Select
                    value={formData.activityLevel}
                    onValueChange={(value) => setFormData({ ...formData, activityLevel: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="¿Qué tan activo eres?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentario</SelectItem>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="athlete">Deportista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trainingDays">Días de Entreno por Semana</Label>
                  <Select
                    value={formData.trainingDays}
                    onValueChange={(value) => setFormData({ ...formData, trainingDays: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="¿Cuántos días puedes entrenar?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 días</SelectItem>
                      <SelectItem value="4">4 días</SelectItem>
                      <SelectItem value="5">5 días</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Health Information */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Información de Salud</h3>

                <div className="space-y-2">
                  <Label htmlFor="injuries">Lesiones o Limitaciones Físicas</Label>
                  <Textarea
                    id="injuries"
                    placeholder="Ej: lesión de rodilla, dolor de espalda..."
                    value={formData.injuries}
                    onChange={(e) => setFormData({ ...formData, injuries: e.target.value })}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">Déjalo en blanco si no tienes lesiones</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dietaryRestrictions">Restricciones Alimentarias o Alergias</Label>
                  <Textarea
                    id="dietaryRestrictions"
                    placeholder="Ej: vegetariano, intolerancia a la lactosa, alergias..."
                    value={formData.dietaryRestrictions}
                    onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">Déjalo en blanco si no tienes restricciones</p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Nota:</strong> Esta información es confidencial y solo se usa para personalizar tu plan de
                    entrenamiento y nutrición. Siempre consulta con un médico antes de comenzar cualquier programa de
                    ejercicio.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={handleBack} disabled={isLoading}>
                  Atrás
                </Button>
              )}
              {step < totalSteps ? (
                <Button type="button" onClick={handleNext} className="ml-auto" disabled={isLoading}>
                  Siguiente
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="button" onClick={handleGeneratePlan} className="ml-auto" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generando plan...
                    </>
                  ) : (
                    "Generar Mi Plan"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
