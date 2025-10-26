"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Check,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  Dumbbell,
  Users,
  Calendar,
  TrendingUp,
  Star,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"
import { CookieConsent } from "@/components/cookie-consent"

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "¡Mensaje enviado!",
      description: "Nos pondremos en contacto contigo pronto.",
    })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const faqItems = [
    {
      question: "¿Qué es KoraFit AI?",
      answer:
        "KoraFit AI es una plataforma que permite a los gimnasios ofrecer a sus socios planes de entrenamiento y nutrición totalmente personalizados generados automáticamente con inteligencia artificial, sin necesidad de intervención manual.",
    },
    {
      question: "¿Cómo funciona?",
      answer:
        "Cada nuevo socio completa un formulario sencillo con sus datos (edad, peso, objetivo, nivel, etc.). KoraFit AI procesa esa información y genera al instante un plan de entrenamiento y una dieta adaptados al perfil del usuario, que podrá ver desde su panel personal.",
    },
    {
      question: "¿Puedo actualizar mi plan cuando quiera?",
      answer:
        "Sí. El usuario puede volver a completar el formulario en cualquier momento para actualizar su información (por ejemplo, si ha bajado de peso o cambia su objetivo) y el sistema generará nuevos planes personalizados al instante.",
    },
    {
      question: "¿Qué ventajas ofrece a los gimnasios?",
      answer:
        "KoraFit AI permite a los gimnasios automatizar la creación de planes personalizados, gestionar fácilmente a todos sus socios, visualizar métricas e informes y ofrecer una experiencia profesional sin aumentar la carga de trabajo del equipo.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <Dumbbell className="size-8 text-primary" />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">KoraFit</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link
              href="#servicios"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Servicios
            </Link>
            <Link
              href="#paquetes"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Paquetes
            </Link>
            <Link
              href="#testimonios"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Testimonios
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Preguntas Frecuentes
            </Link>
            <Link
              href="#contacto"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contacto
            </Link>
          </nav>
          <div className="hidden md:flex gap-4 items-center">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
              <span className="sr-only">Cambiar tema</span>
            </Button>
            <Link href="/login">
              <Button variant="ghost">Iniciar Sesión</Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-full">
                Comenzar
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">Menú</span>
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
          >
            <div className="container py-4 flex flex-col gap-4">
              <Link href="#servicios" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Servicios
              </Link>
              <Link href="#paquetes" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Paquetes
              </Link>
              <Link href="#testimonios" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Testimonios
              </Link>
              <Link href="#faq" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Preguntas Frecuentes
              </Link>
              <Link href="#contacto" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Contacto
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Link href="/login">
                  <Button variant="ghost" className="w-full">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full rounded-full">Comenzar</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white text-balance">
                Planes Personalizados para los Nuevos Miembros de Tu Gimnasio
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                Crea dietas y rutinas automáticas y personalizadas para cada nuevo usuario que se apunta a tu gimnasio.
                Aumenta la retención y satisfacción de tus clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="rounded-full h-12 px-8 text-base">
                    Comenzar Ahora
                    <ChevronRight className="ml-2 size-4" />
                  </Button>
                </Link>
                <Link href="#paquetes">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full h-12 px-8 text-base bg-white/10 border-white text-white hover:bg-white/20"
                  >
                    Ver Paquetes
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-primary" />
                  <span>Planes personalizados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-primary" />
                  <span>Seguimiento continuo</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Nuestros Servicios</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg leading-relaxed">
                Herramientas profesionales para gestionar y personalizar la experiencia de tus nuevos miembros
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                {
                  title: "Dietas Personalizadas",
                  description: "Planes nutricionales automáticos adaptados a cada nuevo miembro de tu gimnasio.",
                  icon: <TrendingUp className="size-6" />,
                },
                {
                  title: "Rutinas de Entrenamiento",
                  description: "Ejercicios diseñados según el nivel y objetivos de cada usuario.",
                  icon: <Dumbbell className="size-6" />,
                },
                {
                  title: "Gestión Centralizada",
                  description: "Panel de control para gestionar todos tus clientes desde un solo lugar.",
                  icon: <Calendar className="size-6" />,
                },
                {
                  title: "Automatización Completa",
                  description: "Genera planes personalizados automáticamente para cada nuevo registro.",
                  icon: <Users className="size-6" />,
                },
              ].map((service, i) => (
                <motion.div key={i} variants={item}>
                  <Card className="h-full border-border/40 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Packages Section */}
        <section id="paquetes" className="w-full py-20 md:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Planes de Suscripción</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg leading-relaxed">
                Elige el plan que mejor se adapte al tamaño de tu gimnasio
              </p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
              {[
                {
                  name: "PLAN START",
                  price: "49€",
                  period: "/mes",
                  description: "Ideal para pequeños gimnasios o centros con menos de 50 clientes",
                  features: [
                    "Hasta 50 socios activos",
                    "100 planes al mes",
                    "Cada plan extra: +0,50€",
                    "Panel de administración completo",
                    "Soporte por email",
                  ],
                },
                {
                  name: "PLAN PRO",
                  price: "99€",
                  period: "/mes",
                  description: "Perfecto para gimnasios medianos o franquicias en crecimiento",
                  features: [
                    "Hasta 150 socios activos",
                    "300 planes al mes",
                    "Cada plan extra: +0,45€",
                    "Panel de administración completo",
                    "Soporte prioritario",
                    "Reportes avanzados",
                  ],
                  popular: true,
                },
                {
                  name: "PLAN MAX",
                  price: "199€",
                  period: "/mes",
                  description: "Ideal para cadenas de gimnasios con muchos usuarios",
                  features: [
                    "Hasta 500 socios activos",
                    "1.000 planes al mes",
                    "Cada plan extra: +0,40€",
                    "Panel de administración completo",
                    "Soporte prioritario 24/7",
                    "Reportes avanzados",
                    "Gestor de cuenta dedicado",
                  ],
                },
              ].map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card
                    className={`relative overflow-hidden h-full ${
                      plan.popular ? "border-primary shadow-lg ring-2 ring-primary/20" : "border-border/40"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                        Más Recomendado
                      </div>
                    )}
                    <CardContent className="p-6 flex flex-col h-full">
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                      <div className="flex items-baseline mt-4 mb-2">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground ml-1">{plan.period}</span>
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{plan.description}</p>
                      <ul className="space-y-3 mb-6 flex-grow">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-start">
                            <Check className="mr-2 size-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href="/register">
                        <Button className="w-full rounded-full" variant={plan.popular ? "default" : "outline"}>
                          Seleccionar Plan
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonios" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Lo Que Dicen Nuestros Gimnasios</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg leading-relaxed">
                Historias reales de transformación y éxito
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {[
                {
                  quote:
                    "En 3 meses perdí 12kg siguiendo el plan de KoraFit. Los entrenadores son increíbles y siempre están disponibles para ayudar.",
                  author: "María González",
                  role: "Perdió 12kg en 3 meses",
                  rating: 5,
                },
                {
                  quote:
                    "Nunca pensé que podría ganar músculo de forma tan efectiva. El plan personalizado hizo toda la diferencia.",
                  author: "Carlos Ruiz",
                  role: "Ganó 8kg de músculo",
                  rating: 5,
                },
                {
                  quote:
                    "La app es súper fácil de usar y el seguimiento continuo me mantiene motivada. ¡Totalmente recomendado!",
                  author: "Laura Martínez",
                  role: "Mantiene su peso ideal",
                  rating: 5,
                },
                {
                  quote:
                    "Como principiante, estaba perdido en el gimnasio. KoraFit me dio la estructura y confianza que necesitaba.",
                  author: "Javier López",
                  role: "De principiante a intermedio",
                  rating: 5,
                },
                {
                  quote:
                    "Los planes nutricionales son realistas y deliciosos. No siento que esté a dieta, solo comiendo mejor.",
                  author: "Ana Fernández",
                  role: "Mejoró sus hábitos alimenticios",
                  rating: 5,
                },
                {
                  quote:
                    "Después de una lesión, necesitaba un plan adaptado. El equipo de KoraFit fue muy profesional y cuidadoso.",
                  author: "Miguel Sánchez",
                  role: "Recuperación post-lesión",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Card className="h-full border-border/40 hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex mb-4">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, j) => (
                            <Star key={j} className="size-4 text-primary fill-primary" />
                          ))}
                      </div>
                      <p className="text-base mb-6 flex-grow leading-relaxed">{testimonial.quote}</p>
                      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/40">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Preguntas Frecuentes</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg leading-relaxed">
                Resuelve tus dudas sobre KoraFit AI
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-border/40 hover:shadow-md transition-shadow">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full p-6 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                      <ChevronDown
                        className={`size-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                          openFaqIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaqIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border/40"
                      >
                        <CardContent className="p-6 text-muted-foreground leading-relaxed">{faq.answer}</CardContent>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contacto" className="w-full py-20 md:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Contáctanos</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg leading-relaxed">
                ¿Tienes preguntas? Estamos aquí para ayudarte
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">Envíanos un Mensaje</h3>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <Input placeholder="Nombre completo" required />
                      </div>
                      <div>
                        <Input type="email" placeholder="Email" required />
                      </div>
                      <div>
                        <Input type="tel" placeholder="Teléfono" />
                      </div>
                      <div>
                        <Textarea placeholder="Mensaje" rows={5} required />
                      </div>
                      <Button type="submit" className="w-full rounded-full">
                        Enviar Mensaje
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <Mail className="size-5" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Email</h4>
                        <p className="text-muted-foreground">info@korafit.com</p>
                        <p className="text-muted-foreground">abeelwrk@gmail.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <Phone className="size-5" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Teléfono</h4>
                        <p className="text-muted-foreground">+34 900 123 456</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <MapPin className="size-5" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Ubicación</h4>
                        <p className="text-muted-foreground">Barcelona, España</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <h4 className="font-bold mb-2">Horario de Atención</h4>
                    <p className="text-sm">Lunes a Viernes: 8:00 - 20:00</p>
                    <p className="text-sm">Fines de semana: Cerrado</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
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
                  <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                    Dietas Personalizadas
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                    Rutinas de Entrenamiento
                  </a>
                </li>
                <li>
                  <a href="#testimonios" className="text-muted-foreground hover:text-foreground transition-colors">
                    Seguimiento Continuo
                  </a>
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
                  <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    Preguntas Frecuentes
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contacto
                  </a>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                    Política de Cookies
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

      {/* Cookie Consent Popup */}
      <CookieConsent />
    </div>
  )
}
