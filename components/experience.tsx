"use client"

import { motion } from "framer-motion"
import { CalendarDays, MapPin } from "lucide-react"

type Experience = {
  company: string
  position: string
  period: string
  location: string
  logo: string
}

export default function Experience() {
  const experiences: Experience[] = [
    {
      company: "Johnson Controls",
      position: "Software Engineering Intern",
      period: "May 2024 - Present",
      location: "Milwaukee, WI",
      logo: "/images/johnson-controls-logo.jpeg",
    },
    {
      company: "IBM (Kyndryl)",
      position: "Software Engineer",
      period: "Aug 2019 - June 2022",
      location: "Remote",
      logo: "/images/ibm-logo.png",
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 md:px-6 lg:px-8 scroll-mt-16">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Work Experience</h2>
          <p className="text-muted-foreground">My professional journey in software engineering</p>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline line */}
              {index !== experiences.length - 1 && <div className="absolute left-6 top-7 w-px h-full bg-border"></div>}

              <div className="flex gap-6">
                {/* Company logo */}
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center mt-1">
                  <img
                    src={exp.logo || "/placeholder.svg"}
                    alt={`${exp.company} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-semibold">{exp.position}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="w-4 h-4" />
                      {exp.period}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <h4 className="text-lg font-medium text-primary">{exp.company}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
