import Link from "next/link"
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t border-primary/20 bg-background relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 retro-grid opacity-20"></div>

      <div className="container flex flex-col gap-8 py-8 md:py-12 relative z-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-primary neon-text">Categories</h3>
            <Link href="/categories/sh-figuarts" className="text-sm text-muted-foreground hover:text-secondary">
              SH Figuarts
            </Link>
            <Link href="/categories/figma" className="text-sm text-muted-foreground hover:text-secondary">
              Figma
            </Link>
            <Link href="/categories/mafex" className="text-sm text-muted-foreground hover:text-secondary">
              MAFEX
            </Link>
            <Link href="/categories/revoltech" className="text-sm text-muted-foreground hover:text-secondary">
              Revoltech
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-primary neon-text">Site Info</h3>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-secondary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-secondary">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-secondary">
              Cookie Policy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-secondary">
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-primary neon-text">Follow Us</h3>
            <div className="flex gap-4">
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-secondary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-secondary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-secondary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://youtube.com" className="text-muted-foreground hover:text-secondary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Zenkai Zone Blog. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Made with passion for collectors worldwide</p>
        </div>
      </div>
    </footer>
  )
}
