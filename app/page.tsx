import type { Metadata } from "next"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Travel from "@/components/travel"
import Contact from "@/components/contact"
import ThemeToggle from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "Komal Bhavake - Software Engineer Portfolio",
  description: "Software Engineer specializing in full-stack development, cloud technologies, and AI/ML solutions",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Travel />
      <Contact />
    </main>
  )
}
