"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github } from "lucide-react" // Removed ExternalLink as it's no longer needed

type Repository = {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string // Keep homepage in type for data consistency, but it won't be rendered
  topics: string[]
  language: string
}

export default function Projects() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration - in a real app, this would come from GitHub API
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      setRepos([
        {
          id: 1,
          name: "Smart Home Management System",
          description:
            "A scalable, full-stack e-commerce platform employing Java microservices with REST API, ElasticSearch with OpenAI embeddings for real-time semantic search, optimized to handle 10k+ concurrent users.",
          html_url: "https://github.com/kbhavake29/smart-home-system",
          homepage: "https://smart-home-demo.vercel.app",
          topics: ["react", "typescript", "java", "mysql", "mongodb", "elasticsearch", "openai"],
          language: "TypeScript",
        },
        {
          id: 2,
          name: "RoadSense AI - Mobile Road Condition Detection",
          description:
            "Cross-platform mobile application using Flutter with Python microservices and AWS that detects road conditions through inertial sensor data with real-time ML classification.",
          html_url: "https://github.com/kbhavake29/roadsense-ai",
          homepage: "https://roadsense-ai-demo.vercel.app",
          topics: ["flutter", "python", "aws", "machine-learning", "mobile-development", "iot"],
          language: "Python",
        },
        {
          id: 3,
          name: "Smart Expense Management System",
          description:
            "AI-powered expense tracking application with receipt scanning, automatic categorization, and budget analytics. Features real-time spending insights and integration with banking APIs.",
          html_url: "https://github.com/kbhavake29/smart-expense-manager",
          homepage: "https://expense-manager-demo.vercel.app",
          topics: ["react", "nodejs", "mongodb", "ai", "ocr", "analytics", "fintech"],
          language: "TypeScript",
        },
        {
          id: 4,
          name: "Smart Travel System",
          description:
            "Comprehensive travel planning platform with AI-powered itinerary generation, real-time weather integration, booking management, and collaborative trip planning features.",
          html_url: "https://github.com/kbhavake29/smart-travel-system",
          homepage: "https://travel-system-demo.vercel.app",
          topics: ["nextjs", "typescript", "postgresql", "ai", "maps", "weather-api", "travel"],
          language: "TypeScript",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <section id="projects" className="py-20 px-4 md:px-6 lg:px-8 scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent full-stack development projects
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <span>{repo.name}</span>
                      <Badge variant="outline">{repo.language}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-4">{repo.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    {" "}
                    {/* Adjusted to flex-end for single button */}
                    <Button variant="outline" size="sm" asChild>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Source
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
