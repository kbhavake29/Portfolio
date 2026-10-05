import type { Metadata } from "next"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Nav from "@/components/nav"
import SectionDivider from "@/components/visuals/section-divider"

export const metadata: Metadata = {
  title: "Komal Bhavake - Software Engineer Portfolio",
  description: "Software Engineer specializing in full-stack development, cloud technologies, and AI/ML solutions",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Experience />
      <Skills />
      <Projects />
      <SectionDivider />
      <Contact />
    </main>
  )
}
