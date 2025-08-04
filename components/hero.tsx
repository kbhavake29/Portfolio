"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden text-foreground bg-gradient-to-r from-[#CFEEF2] to-[#DED8E8]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          src="/images/profile.jpg"
          alt="Komal Bhavake"
          className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover mx-auto mb-6 border-4 border-primary shadow-lg"
        />
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Hello, I'm Komal Bhavake, a Software Engineer 👩‍💻
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact Me
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
