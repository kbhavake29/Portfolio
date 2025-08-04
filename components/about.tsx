"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  return (
    <section id="about" className="py-20 px-4 md:px-6 lg:px-8 scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Komal</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-lg mb-4">
                I'm a Software Engineer with expertise in building scalable distributed systems and modern web
                applications. I hold a Master's in Computer Science from Illinois Institute of Technology.
              </p>
              <p className="text-lg">
                My work focuses on full-stack development, cloud architecture, and AI/ML integration, leveraging
                hands-on experience from leading tech companies to create robust and efficient solutions.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
