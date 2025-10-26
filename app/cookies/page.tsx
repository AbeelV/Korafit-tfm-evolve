import Link from "next/link"
import { ArrowLeft, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function CookiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <Dumbbell className="size-8 text-primary" />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">KoraFit</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 size-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-12 md:py-20 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Política de Cookies de KoraFit</h1>
            <p className="text-muted-foreground text-lg">Última actualización: Octubre de 2025</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 md:p-8 space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  En KoraFit, utilizamos cookies y tecnologías similares para garantizar el correcto funcionamiento de
                  nuestra plataforma, mejorar la experiencia del usuario y analizar el uso del servicio. Queremos
                  informarte de forma transparente sobre qué son las cookies, qué tipos utilizamos y cómo puedes
                  gestionarlas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 md:p-8 space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span>🔍</span> ¿Qué son las cookies?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet o
                  móvil) cuando visitas un sitio web. Sirven para recordar tus preferencias, facilitar la navegación y,
                  en algunos casos, recopilar información estadística o de personalización.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 md:p-8 space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span>⚙️</span> Tipos de cookies que utilizamos
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">1. Cookies necesarias (obligatorias)</h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      Estas cookies son esenciales para que la web funcione correctamente. Permiten iniciar sesión,
                      mantener tu sesión activa o recordar configuraciones básicas del sistema. No pueden desactivarse
                      desde nuestros sistemas.
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="font-medium mb-2">Ejemplos:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Cookies de autenticación de usuario</li>
                        <li>Cookies de seguridad</li>
                        <li>Cookies de sesión</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">2. Cookies de rendimiento y analíticas</h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      Nos ayudan a entender cómo los usuarios interactúan con la plataforma, qué secciones se visitan
                      más y si se producen errores. La información recogida se usa de forma agregada y anónima.
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="font-medium mb-2">Ejemplos:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Google Analytics o herramientas similares de análisis de tráfico</li>
                        <li>
                          Métricas internas del panel de KoraFit (uso del SaaS, frecuencia de regeneración de planes,
                          etc.)
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">3. Cookies de personalización</h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      Permiten que la plataforma recuerde tus preferencias, como el modo oscuro, el idioma (español) o
                      el tipo de contenido que prefieres ver.
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="font-medium mb-2">Ejemplos:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Preferencia de tema claro/oscuro</li>
                        <li>Configuración del idioma</li>
                        <li>Preferencias de visualización de rutinas o dietas</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">4. Cookies de marketing (solo si aplican)</h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      En caso de campañas publicitarias o remarketing (por ejemplo, con Meta o Google Ads), se pueden
                      usar cookies para mostrar anuncios relevantes. Estas cookies solo se activarán si das tu
                      consentimiento explícito.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 md:p-8 space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span>🧭</span> ¿Cómo puedes gestionar o eliminar las cookies?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Puedes configurar o desactivar las cookies desde tu navegador en cualquier momento. Aquí te dejamos
                  enlaces a las guías de los navegadores más comunes:
                </p>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Safari (Apple)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Microsoft Edge
                    </a>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                  Ten en cuenta que si desactivas ciertas cookies, la experiencia en la plataforma puede verse afectada
                  (por ejemplo, no podrás mantener la sesión iniciada).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 md:p-8 space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span>🧾</span> Consentimiento
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al acceder por primera vez a nuestra web o aplicación, te mostramos un aviso de cookies con opciones
                  de "Aceptar todas" o "Rechazar". Tu consentimiento se guarda durante 12 meses o hasta que lo revocas
                  manualmente.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Puedes modificar tus preferencias en cualquier momento desde el enlace "Configuración de cookies"
                  disponible al pie de la página.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 md:p-8 space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span>🛡️</span> Responsable del tratamiento
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>KoraFit</strong>
                  <br />
                  Correo de contacto:{" "}
                  <a href="mailto:info@korafit.com" className="text-primary hover:underline">
                    info@korafit.com
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 md:p-8 space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span>📬</span> Más información
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Puedes consultar nuestra{" "}
                  <Link href="/privacy" className="text-primary hover:underline font-medium">
                    Política de Privacidad
                  </Link>{" "}
                  para conocer cómo tratamos los datos personales recogidos a través de las cookies u otros medios.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Link href="/">
              <Button size="lg" className="rounded-full">
                <ArrowLeft className="mr-2 size-4" />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
        <div className="container flex flex-col gap-4 px-4 py-8 md:px-6">
          <div className="flex flex-col gap-2 sm:flex-row justify-center items-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} KoraFit. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
