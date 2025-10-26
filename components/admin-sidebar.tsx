"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, ChevronLeft, ChevronRight, Dumbbell } from "lucide-react"

interface AdminSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Clientes",
      href: "/dashboard/admin/clients",
      icon: Users,
    },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-background border-r transition-all duration-300 lg:sticky lg:top-0",
          isOpen ? "w-64" : "w-0 lg:w-16",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            {isOpen && (
              <div className="flex items-center gap-2">
                <Dumbbell className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">KoraFit</span>
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={onToggle} className="hidden lg:flex">
              {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn("w-full justify-start", !isOpen && "lg:justify-center lg:px-2")}
                  >
                    <Icon className={cn("h-5 w-5", isOpen && "mr-2")} />
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
