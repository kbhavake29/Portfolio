"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

type SkillCategory = {
  name: string
  skills: string[]
}

export default function Skills() {
  // Skills categories with development tools and IDEs
  const skillCategories: SkillCategory[] = [
    {
      name: "Programming Languages",
      skills: ["Python", "TypeScript", "JavaScript", "C/C++", "Java", "Swift", "Kotlin", "Flutter", "SQL", "KQL", "HTML/CSS"],
    },
    {
      name: "Frontend & UI",
      skills: ["React", "Next.js", "Angular", "Flutter", "Tailwind CSS", "Redux", "Vue.js"],
    },
    {
      name: "Backend & APIs",
      skills: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Java Servlets", "Microservices"],
    },
    {
      name: "Databases",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "ElasticSearch", "Vector Databases"],
    },
    {
      name: "Cloud & DevOps",
      skills: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Jenkins", "CI/CD", "Terraform"],
    },
    {
      name: "AI/ML & Data",
      skills: ["OpenAI", "LangChain", "PyTorch", "PySpark", "Apache Kafka", "Databricks", "RAG"],
    },
    {
      name: "Development Tools & IDEs",
      skills: ["Xcode", "Android Studio", "Prometheus", "Grafana", "Git", "Jira", "Jest", "Cypress", "Dapr"],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30 scroll-mt-16">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Skills & Technologies</h2>
          <p className="text-muted-foreground">Technologies I work with to build scalable solutions</p>
        </motion.div>

        <div className="grid gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-3 py-1 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}