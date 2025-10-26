"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, ChevronLeft, ChevronRight, Dumbbell } from "lucide-react"

interface TrainerSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function TrainerSidebar({ isOpen, onToggle }: TrainerSidebarProps) {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "dashboard"

  const sidebarItems = [
    {
      title: "Dashboard",
      value: "dashboard",
      icon: LayoutDashboard,
      href: "/dashboard/trainer?tab=dashboard",
    },
    {
      title: "Clientes",
      value: "clients",
      icon: Users,
      href: "/dashboard/trainer?tab=clients",
    },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full border-r bg-background transition-all duration-300 lg:static lg:z-auto",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-16",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo and toggle */}
          <div className="flex h-16 items-center justify-between border-b px-4">
            {isOpen && (
              <div className="flex items-center gap-2">
                <Dumbbell className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">KoraFit</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className={cn(!isOpen && "mx-auto", "flex-shrink-0")}
            >
              {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.value
              return (
                <Link key={item.value} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn("w-full", isOpen ? "justify-start" : "justify-center px-2")}
                  >
                    <Icon className={cn("h-5 w-5", isOpen && "mr-3")} />
                    {isOpen && <span>{item.title}</span>}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
