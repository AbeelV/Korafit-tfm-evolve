"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Shield, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="size-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 bg-gradient-to-br from-primary/10 to-background">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Shield className="size-8" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                🔒 Política de Privacidad y Protección de Datos (GDPR)
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                En KoraFit AI nos tomamos muy en serio la protección de tus datos personales
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="w-full py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {/* Section 1 */}
              <Card>
                <CardContent className="p-6 md:p-8 space-y-4">
                  <h2 className="text-2xl font-bold">1. Identidad del responsable</h2>
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    <p>
                      <strong>Responsable del tratamiento:</strong> KoraFit AI
                    </p>
                    <p>
                      <strong>Correo de contacto:</strong> info@korafit.com
                    </p>
                    <p>
                      <strong>Finalidad del servicio:</strong> ofrecer a los usuarios planes de entrenamiento y
                      nutrición personalizados generados mediante inteligencia artificial y facilitar a los gimnasios la
                      gestión de sus socios.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2 */}
              <Card>
                <CardContent className="p-6 md:p-8 space-y-4">
                  <h2 className="text-2xl font-bold">2. Información que recopilamos</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    En KoraFit AI solo solicitamos los datos estrictamente necesarios para ofrecer nuestros servicios de
                    forma personalizada y segura.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Al registrarte o rellenar el formulario inicial, podemos recopilar:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Nombre y apellidos</li>
                    <li>Edad y sexo</li>
                    <li>Peso y altura</li>
                    <li>Nivel de experiencia y objetivo deportivo</li>
                    <li>Nivel de actividad física</li>
                    <li>Alergias o restricciones alimentarias (opcional)</li>
                    <li>Correo electrónico y teléfono de contacto</li>
                    <li>Datos técnicos de acceso (IP, navegador, etc., con fines estadísticos y de seguridad)</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Section 3 */}
              <Card>
                <CardContent className="p-6 md:p-8 space-y-4">
                  <h2 className="text-2xl font-bold">3. Finalidad del tratamiento</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Los datos se utilizan exclusivamente para los siguientes fines:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      Generar planes personalizados de entrenamiento y nutrición basados en la información proporcionada
                      por el usuario.
                    </li>
                    <li>Permitir el acceso y gestión de dichos planes dentro del panel del usuario.</li>
                    <li>
                      Ofrecer al gimnasio (cliente B2B) las herramientas necesarias para gestionar socios, métricas y
                      automatizaciones.
                    </li>
                    <li>Mantener la comunicación con el usuario ante incidencias, errores o solicitudes de soporte.</li>
                    <li>Analizar el uso del sistema con el objetivo de mejorar el servicio y su experiencia.</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">
                    No se realizan perfiles comerciales ni cesiones de datos a terceros sin consentimiento expreso.
                  </p>
                </CardContent>
              </Card>

              {/* Section 4 */}
              <Card>
                <CardContent className="p-6 md:p-8 space-y-4">
                  <h2 className="text-2xl font-bold">4. Base legal para el tratamiento</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    El tratamiento de los datos personales se realiza con base en:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>
                      El consentimiento del usuario, otorgado de manera libre, específica e informada al aceptar esta
                      política.
                    </li>
                    <li>
                      La ejecución de un contrato o relación comercial, en el caso de los gimnasios que contratan el
                      servicio.
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">
                    El usuario puede retirar su consentimiento en cualquier momento, sin que ello afecte a la legalidad
                    del tratamiento previo.
                  </p>
                </CardContent>
              </Card>

              {/* Section 5 */}
              <Card>
                <CardContent className="p-6 md:p-8 space-y-4">
                  <h2 className="text-2xl font-bold">5. Conservación de los datos</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Los datos se conservarán mientras el usuario mantenga su cuenta activa o hasta que solicite su
                    eliminación.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Una vez cancelada la cuenta, la información será bloqueada y eliminada de forma segura tras el plazo
                    legal establecido.
                  </p>
                </CardContent>
              </Card>

              {/* Section 6 */}
              <Card>
                <CardContent className="p-6 md:p-8 space-y-4">
                  <h2 className="text-2xl font-bold">6. Cesión de datos a terceros</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    No se comparten ni se venden datos personales a terceros.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Solo se podrán comunicar a proveedores tecnológicos imprescindibles para el funcionamiento del
                    servicio (por ejemplo, Supabase, n8n o Vercel), todos ellos con políticas de protección de datos
                    adecuadas al GDPR.
                  </p>
                </CardContent>
              </Card>

              {/* Section 7 */}
              <Card>
                <CardContent className="p-6 md:p-8 space-y-4">
                  <h2 className="text-2xl font-bold">7. Derechos del usuario</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    El usuario puede ejercer en cualquier momento sus derechos de:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Acceso a sus datos personales.</li>
                    <li>Rectificación o actualización de los datos.</li>
                    <li>Supresión ("derecho al olvido").</li>
                    <li>Limitación del tratamiento.</li>
                    <li>Portabilidad de los datos.</li>
                    <li>Oposición al tratamiento.</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">
                    Para ejercer estos derechos, puede contactar a:
                  </p>
                  <div className="flex items-center gap-2 text-primary">
                    <Mail className="size-4" />
                    <a href="mailto:info@korafit.com" className="font-medium hover:underline">
                      info@korafit.com
                    </a>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Adjuntando una copia de su documento de identidad y la solicitud correspondiente.
                  </p>
                </CardContent>
              </Card>

              {/* Section 8 */}
              <Card>
                <CardContent className="p-6 md:p-8 space-y-4">
                  <h2 className="text-2xl font-bold">8. Seguridad de los datos</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    KoraFit AI implementa medidas técnicas y organizativas para proteger la información personal frente
                    a accesos no autorizados, pérdida o alteración.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Los datos se almacenan de forma cifrada en Supabase, con acceso restringido y registro de actividad.
                  </p>
                </CardContent>
              </Card>

              {/* Section 9 */}
              <Card>
                <CardContent className="p-6 md:p-8 space-y-4">
                  <h2 className="text-2xl font-bold">9. Consentimiento informado</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Antes de usar el servicio, el usuario deberá marcar una casilla de consentimiento que indique:
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                    <p className="italic">
                      "He leído y acepto la Política de Privacidad y autorizo el uso de mis datos personales para la
                      generación de planes personalizados y la gestión de mi cuenta en KoraFit AI."
                    </p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Sin este consentimiento, el sistema no procesará ni almacenará información del usuario.
                  </p>
                </CardContent>
              </Card>

              {/* Section 10 */}
              <Card>
                <CardContent className="p-6 md:p-8 space-y-4">
                  <h2 className="text-2xl font-bold">10. Modificaciones de la política</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    KoraFit AI podrá actualizar esta política para adaptarla a cambios legales o técnicos.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Las modificaciones se notificarán al usuario antes de entrar en vigor.
                  </p>
                </CardContent>
              </Card>

              {/* Section 11 */}
              <Card>
                <CardContent className="p-6 md:p-8 space-y-4">
                  <h2 className="text-2xl font-bold">11. Contacto</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Si tienes dudas o deseas más información sobre el tratamiento de tus datos personales, puedes
                    escribirnos a:
                  </p>
                  <div className="flex items-center gap-2 text-primary">
                    <Mail className="size-5" />
                    <a href="mailto:info@korafit.com" className="text-lg font-medium hover:underline">
                      info@korafit.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Back to Home Button */}
              <div className="flex justify-center pt-8">
                <Link href="/">
                  <Button size="lg" className="rounded-full">
                    <ArrowLeft className="mr-2 size-4" />
                    Volver al inicio
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
