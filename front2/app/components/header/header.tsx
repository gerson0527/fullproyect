// Compare this snippet from sidebar.tsx:
import { Menu, Search, UserCheck, Settings, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/sidebar/sidebar"
import { NotificationsPanel, type Notification } from "@/components/notifications-panel/notifications-panel"
import { ThemeToggle } from "@/components/theme-toggle/theme-toggle"


interface HeaderProps {
  activeSection: string
  onSectionChange: (section: string) => void
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onRemoveNotification: (id: string) => void
}

export function Header({
  activeSection,
  onSectionChange,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onRemoveNotification,
}: HeaderProps) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar clientes, créditos..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <NotificationsPanel
          notifications={notifications}
          onMarkAsRead={onMarkAsRead}
          onMarkAllAsRead={onMarkAllAsRead}
          onRemoveNotification={onRemoveNotification}
        />
      </div>
    </header>
  )
}

