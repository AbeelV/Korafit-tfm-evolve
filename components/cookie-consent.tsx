"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie } from "lucide-react"
import Link from "next/link"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowConsent(true)
    }, 1000)
  }, [])

  const handleAccept = () => {
    setShowConsent(false)
  }

  const handleReject = () => {
    setShowConsent(false)
  }

  return (
    <AnimatePresence>
      {showConsent && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Cookie consent popup */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:max-w-md z-50"
          >
            <Card className="border-2 border-primary/20 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Cookie className="size-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">Política de Cookies</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Utilizamos cookies para mejorar tu experiencia en nuestra plataforma, analizar el uso del servicio
                      y personalizar el contenido. Al hacer clic en "Aceptar", aceptas el uso de cookies según nuestra{" "}
                      <Link href="/privacy" className="text-primary hover:underline font-medium">
                        Política de Privacidad
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleAccept} className="flex-1 rounded-full" size="lg">
                    Aceptar Cookies
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    className="flex-1 rounded-full bg-transparent"
                    size="lg"
                  >
                    Rechazar
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Puedes cambiar tus preferencias en cualquier momento desde la configuración.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
