"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function DemoBanner() {
  return (
    <Alert className="mb-6 border-primary/50 bg-primary/5">
      <Info className="h-4 w-4 text-primary" />
      <AlertDescription className="text-sm">
        <strong>Modo Demo:</strong> Esta es una aplicación de demostración. Los datos se almacenan localmente en tu
        navegador. Usa <strong>entrenador@korfit.com</strong> para acceder como entrenador o{" "}
        <strong>maria@example.com</strong> como alumno (cualquier contraseña funciona).
      </AlertDescription>
    </Alert>
  )
}
