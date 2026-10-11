"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

type SkillCategory = {
  name: string
  skills: string[]
}

export default function Skills() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["Programming", "Development", "DevOps & Testing", "AI/ML"]))
  
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName)
      } else {
        newSet.add(categoryName)
      }
      return newSet
    })
  }

  // Skills categories, matched to resume
  const skillCategories: SkillCategory[] = [
    {
      name: "Programming",
      skills: ["C/C++", "Python", "Rust", "TypeScript", "JavaScript", "SQL", "Swift"],
    },
    {
      name: "Development",
      skills: ["Linux", "GDB", "LLDB", "Bash/Shell Scripting", "Log Analysis", "REST APIs", "GraphQL", "React", "Node.js"],
    },
    {
      name: "DevOps & Testing",
      skills: ["AWS", "GCP", "Docker", "Kubernetes", "Jenkins", "CI/CD", "Grafana", "PostgreSQL", "Redis", "Kafka"],
    },
    {
      name: "AI/ML",
      skills: ["PyTorch", "TensorFlow", "Generative AI", "RAG", "LangChain", "Vector Databases"],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 md:px-6 lg:px-8 bg-muted/30 scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Skills & Technologies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Technologies I work with to build scalable solutions</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => {
            const isExpanded = expandedCategories.has(category.name)
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full flex items-center justify-between text-left mb-3 group"
                >
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-2 py-1 text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}