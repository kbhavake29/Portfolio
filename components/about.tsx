"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
                I'm a software engineer who loves building things and then making them better. Over the last five
                years I've worked across the whole stack, from system design and backend architecture to the
                interfaces people actually use, and I care most about the whole journey from idea to shipped.
              </p>
              <p className="text-lg mb-4">
                Lately I've been spending most of my time on the AI side, mainly inference and retrieval. A lot of
                it is unglamorous. You profile a slow request, find out the bottleneck was retrieval and not the
                model, fix it, and go looking for the next one. I enjoy that part more than I probably should.
              </p>
              <p className="text-lg mb-6">
                I did my Master's in Computer Science at Illinois Tech. Outside of work, I'm usually building
                something small to try out an idea I read about that week.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Inference Engineering",
                  "RAG Pipelines",
                  "Data Ingestion",
                  "System Design",
                  "Distributed Systems",
                  "Full-Stack Development",
                ].map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
