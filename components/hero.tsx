"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import SystemPlayground from "@/components/visuals/system-playground"

const FOCUS = ["full-stack products", "distributed systems", "scalable backends", "AI-powered features", "data pipelines"]

const ease = [0.22, 1, 0.36, 1] as const

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.1, ease },
  }),
}

function RotatingWord() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setIndex((i) => (i + 1) % FOCUS.length), 2600)
    return () => clearInterval(id)
  }, [reduce])

  return (
    <span className="relative inline-grid h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence initial={false}>
        <motion.span
          key={FOCUS[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          className="whitespace-nowrap text-foreground [grid-area:1/1]"
        >
          {FOCUS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-24 md:px-6"
    >
      {/* background: plus grid fading out at the edges, with a faint signal glow */}
      <div className="pointer-events-none absolute inset-0 bg-plus-grid mask-radial-fade" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-signal/10 blur-[120px] dark:bg-signal/[0.08]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-8 inline-flex items-center gap-3 rounded-full border bg-background/60 py-1 pl-1 pr-4 backdrop-blur-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/profile.jpg" alt="Komal Bhavake" className="h-7 w-7 rounded-full object-cover" />
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              Software Engineer
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            initial="hidden"
            animate="show"
            custom={1}
            className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="block text-2xl font-normal tracking-normal text-muted-foreground sm:text-3xl">Hi, I&apos;m</span>
            <span className="mt-2 block">Komal Bhavake</span>
          </motion.h1>

          <motion.p
            variants={rise}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 text-xl text-muted-foreground sm:text-2xl"
          >
            I build <RotatingWord />
          </motion.p>

          <motion.p
            variants={rise}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground"
          >
            5 years of designing, shipping, and tuning production systems across the stack, from the database to
            the interface.
          </motion.p>

          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button size="lg" className="group" onClick={() => scrollTo("projects")}>
              View projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-background/60 backdrop-blur-sm" onClick={() => scrollTo("contact")}>
              Get in touch
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mx-auto w-full max-w-[460px] text-foreground"
        >
          <SystemPlayground />
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground md:flex"
        aria-label="Scroll to About"
      >
        Scroll
        <ArrowDown className="h-3 w-3 motion-safe:animate-bounce" />
      </motion.button>
    </section>
  )
}
