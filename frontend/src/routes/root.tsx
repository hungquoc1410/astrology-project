import { Menu, Package2 } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Toaster } from '@/components/ui/toaster'

export type LoaderReturnType = { id: number; username: string; createdAt: Date } | { error: string }
export type ContextType = { user: LoaderReturnType }

export default function Root() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Toaster />
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Nathan Tried Coding</span>
          </Link>
          <NavLink
            to="/astrology"
            className={({ isActive }) =>
              isActive
                ? 'text-foreground transition-colors hover:text-foreground'
                : 'text-muted-foreground transition-colors hover:text-foreground'
            }
          >
            Astrology
          </NavLink>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link to="#" className="flex items-center gap-2 text-lg font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Nathan Tried Coding</span>
              </Link>
              <NavLink
                to="/astrology"
                className={({ isActive }) =>
                  isActive
                    ? 'text-foreground transition-colors hover:text-foreground'
                    : 'text-muted-foreground transition-colors hover:text-foreground'
                }
              >
                Astrology
              </NavLink>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <ModeToggle />
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <Outlet />
      </main>
    </div>
  )
}
