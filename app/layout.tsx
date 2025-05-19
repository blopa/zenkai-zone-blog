import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import TranslationsProvider from "@/components/i18n/translations-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Zenkai Zone Blog | High-End Action Figure News & Reviews",
    template: "%s | Zenkai Zone Blog",
  },
  description:
    "Your premier source for news, reviews, and insights on high-end action figures including SH Figuarts, Figma, and more.",
  keywords: ["action figures", "SH Figuarts", "Figma", "collectibles", "toy reviews", "action figure news"],
  authors: [{ name: "Zenkai Zone Team" }],
  creator: "Zenkai Zone",
  publisher: "Zenkai Zone",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zenkaizone.com",
    title: "Zenkai Zone Blog | High-End Action Figure News & Reviews",
    description:
      "Your premier source for news, reviews, and insights on high-end action figures including SH Figuarts, Figma, and more.",
    siteName: "Zenkai Zone Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenkai Zone Blog | High-End Action Figure News & Reviews",
    description:
      "Your premier source for news, reviews, and insights on high-end action figures including SH Figuarts, Figma, and more.",
    creator: "@zenkaizone",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TranslationsProvider locale="en-US" namespaces={['translation']}>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </TranslationsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
