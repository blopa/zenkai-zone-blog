import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Zenkai Zone Blog",
  description: "Learn about Zenkai Zone Blog, your premier source for high-end action figure news and reviews.",
}

export default function AboutPage() {
  return (
    <div className="container py-8 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">About Zenkai Zone Blog</h1>
        <p className="text-xl text-muted-foreground max-w-[800px]">
          Your premier source for high-end action figure news, reviews, and insights.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-muted-foreground">
            Zenkai Zone Blog was founded in 2020 by a group of passionate action figure collectors who wanted to create
            a dedicated space for high-end collectible coverage. What started as a small hobby blog has grown into a
            comprehensive resource for collectors worldwide.
          </p>
          <p className="text-muted-foreground">
            We specialize in premium action figure lines including SH Figuarts, Figma, MAFEX, Revoltech, and more. Our
            team is committed to providing in-depth reviews, timely news, and insightful analysis of the latest releases
            in the collectible figure world.
          </p>
        </div>
        <div className="relative aspect-square md:aspect-[4/3]">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Figure Focus Team"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-3xl font-bold">Our Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <Image src="/placeholder.svg?height=128&width=128" alt="John Collector" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold">John Collector</h3>
              <p className="text-sm text-muted-foreground">Founder & Editor-in-Chief</p>
            </div>
            <p className="text-sm text-muted-foreground">
              John has been collecting action figures for over 15 years, specializing in Marvel and Dragon Ball figures.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <Image src="/placeholder.svg?height=128&width=128" alt="Sarah Reviewer" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Sarah Reviewer</h3>
              <p className="text-sm text-muted-foreground">Senior Editor</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Sarah focuses on anime figures and has an extensive collection of Figma and SH Figuarts releases.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <Image src="/placeholder.svg?height=128&width=128" alt="Mike Collector" fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Mike Collector</h3>
              <p className="text-sm text-muted-foreground">Photography & Reviews</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Mike handles product photography and specializes in DC Comics and Star Wars figure reviews.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Our Mission</h2>
        <p className="text-muted-foreground">
          At Figure Focus, our mission is to provide collectors with honest, detailed, and timely information about
          high-end action figures. We believe in:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>Thorough, unbiased reviews that highlight both strengths and weaknesses</li>
          <li>Timely news coverage of announcements and releases</li>
          <li>Building a community of collectors who share our passion</li>
          <li>Helping collectors make informed purchasing decisions</li>
          <li>Celebrating the artistry and craftsmanship of premium action figures</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Contact Us</h2>
        <p className="text-muted-foreground">
          Have questions, suggestions, or want to collaborate? We'd love to hear from you! Visit our{" "}
          <a href="/contact" className="text-primary hover:underline">
            Contact page
          </a>{" "}
          to get in touch with our team.
        </p>
      </div>
    </div>
  )
}
