"use client";

import Link from "next/link";
import { useTranslation } from 'react-i18next';
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export default function Header() {
  const { t } = useTranslation();
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
                    {t('nav.home')}
                  </Link>
                  <Link
                      href="/categories/sh-figuarts"
                      className="text-lg font-semibold hover:text-secondary transition-colors"
                  >
                    {t('nav.shFiguarts')}
                  </Link>
                  <Link href="/categories/figma" className="text-lg font-semibold hover:text-secondary transition-colors">
                    {t('nav.figma')}
                  </Link>
                  <Link href="/categories/mafex" className="text-lg font-semibold hover:text-secondary transition-colors">
                    {t('nav.mafex')}
                  </Link>
                  <Link
                      href="/categories/revoltech"
                      className="text-lg font-semibold hover:text-secondary transition-colors"
                  >
                    {t('nav.revoltech')}
                  </Link>
                  <Link href="/about" className="text-lg font-semibold hover:text-secondary transition-colors">
                    {t('nav.about')}
                  </Link>
                  <Link href="/contact" className="text-lg font-semibold hover:text-secondary transition-colors">
                    {t('nav.contact')}
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
              {t('nav.home')}
            </Link>
            <Link href="/categories/sh-figuarts" className="text-sm font-medium transition-colors hover:text-secondary">
              {t('nav.shFiguarts')}
            </Link>
            <Link href="/categories/figma" className="text-sm font-medium transition-colors hover:text-secondary">
              {t('nav.figma')}
            </Link>
            <Link href="/categories/mafex" className="text-sm font-medium transition-colors hover:text-secondary">
              {t('nav.mafex')}
            </Link>
            <Link href="/categories/revoltech" className="text-sm font-medium transition-colors hover:text-secondary">
              {t('nav.revoltech')}
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-secondary">
              {t('nav.about')}
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-secondary">
              {t('nav.contact')}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <form className="hidden md:flex relative" action="/search">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                  type="search"
                  name="q"
                  placeholder={t('search.placeholder')}
                  className="w-[200px] pl-8 bg-muted border-primary/20 focus:border-secondary"
              />
            </form>
            <Button variant="ghost" size="icon" className="md:hidden text-primary hover:text-primary/80" asChild>
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">{t('search.title')}</span>
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>
  )
}
