import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export default function Header() {
  return (
      <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-primary hover:text-primary/80">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px] border-r border-primary/20">
                <div className="flex justify-center mb-8 mt-4">
                  <Image
                      src="/images/zenkai-zone-logo.png"
                      alt="Zenkai Zone Logo"
                      width={180}
                      height={60}
                      className="logo-glow"
                  />
                </div>
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="text-lg font-semibold text-primary hover:text-secondary transition-colors">
                    Home
                  </Link>
                  <Link
                      href="/categories/sh-figuarts"
                      className="text-lg font-semibold hover:text-secondary transition-colors"
                  >
                    SH Figuarts
                  </Link>
                  <Link href="/categories/figma" className="text-lg font-semibold hover:text-secondary transition-colors">
                    Figma
                  </Link>
                  <Link href="/categories/mafex" className="text-lg font-semibold hover:text-secondary transition-colors">
                    MAFEX
                  </Link>
                  <Link
                      href="/categories/revoltech"
                      className="text-lg font-semibold hover:text-secondary transition-colors"
                  >
                    Revoltech
                  </Link>
                  <Link href="/about" className="text-lg font-semibold hover:text-secondary transition-colors">
                    About
                  </Link>
                  <Link href="/contact" className="text-lg font-semibold hover:text-secondary transition-colors">
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center">
              <Image
                  src="/images/zenkai-zone-logo.png"
                  alt="Zenkai Zone Logo"
                  width={150}
                  height={50}
                  className="logo-glow"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-secondary">
              Home
            </Link>
            <Link href="/categories/sh-figuarts" className="text-sm font-medium transition-colors hover:text-secondary">
              SH Figuarts
            </Link>
            <Link href="/categories/figma" className="text-sm font-medium transition-colors hover:text-secondary">
              Figma
            </Link>
            <Link href="/categories/mafex" className="text-sm font-medium transition-colors hover:text-secondary">
              MAFEX
            </Link>
            <Link href="/categories/revoltech" className="text-sm font-medium transition-colors hover:text-secondary">
              Revoltech
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-secondary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-secondary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <form className="hidden md:flex relative" action="/search">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                  type="search"
                  name="q"
                  placeholder="Search..."
                  className="w-[200px] pl-8 bg-muted border-primary/20 focus:border-secondary"
              />
            </form>
            <Button variant="ghost" size="icon" className="md:hidden text-primary hover:text-primary/80" asChild>
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>
  )
}
