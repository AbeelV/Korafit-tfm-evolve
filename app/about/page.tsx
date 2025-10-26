"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Dumbbell, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <Dumbbell className="size-8 text-primary" />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">KoraFit</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
              <span className="sr-only">Cambiar tema</span>
            </Button>
            <Link href="/">
              <Button variant="ghost">Volver</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                Sobre KoraFit
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                Conoce la historia detrás de la plataforma que está transformando la experiencia de los gimnasios
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Nuestra Misión</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  En KoraFit creemos que la tecnología debe ayudar a las personas a alcanzar su mejor versión, no
                  complicarles la vida.
                </p>
                <p>
                  Por eso creamos una herramienta que permite a los gimnasios ofrecer planes de entrenamiento y
                  nutrición personalizados con inteligencia artificial, de forma totalmente automática y profesional.
                </p>
                <p>
                  Nuestro objetivo es que cada nuevo socio reciba un plan hecho a su medida desde el primer día, sin
                  esperas ni formularios eternos, y que el gimnasio pueda ofrecer una experiencia de valor sin invertir
                  tiempo extra.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Origin Story Section */}
        <section className="w-full py-20 md:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Cómo Nació la Idea</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>Todo comenzó con una pregunta sencilla:</p>
                <blockquote className="border-l-4 border-primary pl-6 italic text-base md:text-lg">
                  "¿Por qué los gimnasios no ofrecen planes realmente personalizados desde el primer día, para que los
                  clientes sepan qué hacer y no lo dejen por frustración?"
                </blockquote>
                <p>
                  Tras años de ver cómo los nuevos socios perdían motivación por no tener una guía clara, decidimos
                  crear una solución que combinara IA + automatización + experiencia humana.
                </p>
                <p>
                  Así nació KoraFit, un sistema que genera automáticamente rutinas y dietas adaptadas al perfil de cada
                  usuario, y las envía al panel del cliente.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What Drives Us Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Lo Que Nos Mueve</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>Nos impulsa una idea: hacer que la personalización sea escalable.</p>
                <p>
                  Creemos que cada gimnasio debería poder ofrecer una atención de primer nivel sin necesitar un equipo
                  técnico o de nutricionistas detrás.
                </p>
                <p>
                  Con KoraFit, los gimnasios pueden fidelizar a sus socios, mejorar su experiencia y ahorrar horas de
                  trabajo cada semana.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="w-full py-20 md:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Qué Hacemos</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Nuestra plataforma permite a los centros deportivos:
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  "Generar rutinas y dietas personalizadas para cada nuevo socio.",
                  "Entregar los planes en menos de 1 minuto en el área privada del usuario.",
                  "Un Dashboard con sus objetivos y tablas para guiarlos por su distribución semanal de entrenamiento.",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card className="border-border/40">
                      <CardContent className="p-6">
                        <p className="text-base leading-relaxed">{item}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mt-8 mb-8">
                Mientras tanto, los usuarios disfrutan de:
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  "Un panel personal con su plan actual.",
                  "Un panel de administrador para los entrenadores.",
                  "La opción de actualizar sus datos y recibir una nueva rutina o dieta adaptada.",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card className="border-border/40">
                      <CardContent className="p-6">
                        <p className="text-base leading-relaxed">{item}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">Nuestra Visión</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Queremos ser el asistente inteligente de confianza de los gimnasios del futuro, ayudándoles a ofrecer
                  experiencias personalizadas a escala.
                </p>
                <p>
                  Imaginamos un mundo donde cada gimnasio, sin importar su tamaño, pueda competir con las grandes
                  cadenas ofreciendo atención personalizada desde el primer día.
                </p>
                <p>
                  Un mundo donde la tecnología y la experiencia humana trabajan juntas para transformar vidas a través
                  del fitness y la salud.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-6 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
                ¿Listo Para Transformar Tu Gimnasio?
              </h2>
              <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl leading-relaxed">
                Únete a los gimnasios que ya están ofreciendo planes personalizados automáticos con KoraFit
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full h-12 px-8 text-base bg-white text-primary hover:bg-white/90"
                  >
                    Comenzar Ahora
                    <ChevronRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Dumbbell className="size-6 text-primary" />
                <span>KoraFit</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tu compañero perfecto para ofrecer planes personalizados a los nuevos miembros de tu gimnasio.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Servicios</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                    Dietas Personalizadas
                  </Link>
                </li>
                <li>
                  <Link href="/#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                    Rutinas de Entrenamiento
                  </Link>
                </li>
                <li>
                  <Link href="/#testimonios" className="text-muted-foreground hover:text-foreground transition-colors">
                    Seguimiento Continuo
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/#testimonios" className="text-muted-foreground hover:text-foreground transition-colors">
                    Testimonios
                  </Link>
                </li>
                <li>
                  <Link href="/#contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-center items-center border-t border-border/40 pt-8">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} KoraFit. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
