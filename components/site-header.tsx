"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, Search, X } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { useLang, tr } from "@/components/lang-context"

export function SiteHeader() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { lang, setLang } = useLang()

  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = useMemo(
    () => [
      { label: tr("nav.home", lang),    href: "/" },
      { label: tr("nav.players", lang), href: "/players" },
      { label: tr("nav.teams", lang),   href: "/team" },
    ],
    [lang]
  )

  function isActive(href: string) {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/icon.png" alt="KBOstats logo" width={32} height={32} className="rounded-md" />
          <span className="text-lg font-bold tracking-tight text-foreground">
            KBO<span className="font-mono text-primary">stats</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-4/5 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        {/* Search bar */}
        <div className="flex flex-1 justify-center px-1">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={tr("search.placeholder", lang)}
              className="h-8 w-full rounded-md border border-border bg-secondary py-0 pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Settings menu */}
        <div className="relative flex shrink-0 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="sr-only">{tr("ui.menu", lang)}</span>
          </Button>

          {menuOpen && (
            <div className="absolute top-10 right-0 w-64 rounded-lg border border-border bg-card p-3 shadow-xl">
              {/* Mobile nav links */}
              <div className="mb-3 md:hidden">
                <p className="mb-2 text-xs font-medium text-muted-foreground">{tr("ui.menu", lang)}</p>
                <div className="grid grid-cols-3 gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded-md px-2 py-1.5 text-center text-xs ${
                        isActive(item.href) ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Theme toggle */}
              <div className="mb-3">
                <p className="mb-2 text-xs font-medium text-muted-foreground">{tr("ui.theme", lang)}</p>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => setTheme("light")}
                    className={`rounded-md px-2 py-1.5 text-xs ${
                      theme === "light" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {tr("ui.light", lang)}
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`rounded-md px-2 py-1.5 text-xs ${
                      theme === "dark" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {tr("ui.dark", lang)}
                  </button>
                </div>
              </div>

              {/* Language toggle */}
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">{tr("ui.language", lang)}</p>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => setLang("ko")}
                    className={`rounded-md px-2 py-1.5 text-xs ${
                      lang === "ko" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    한국어
                  </button>
                  <button
                    onClick={() => setLang("en")}
                    className={`rounded-md px-2 py-1.5 text-xs ${
                      lang === "en" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
