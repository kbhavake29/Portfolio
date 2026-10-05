"use client"

import { motion } from "framer-motion"
import IsoCube from "@/components/visuals/iso-cube"

const FOCUS = [
  "Full-Stack Development",
  "Inference Engineering",
  "Distributed Systems",
  "Cloud Architecture",
  "Data Pipelines",
  "AI Systems",
]

const ease = [0.22, 1, 0.36, 1] as const

// Corner brackets, like crop marks on a technical drawing.
function CropMarks() {
  const mark = "absolute h-4 w-4 border-foreground/40"
  return (
    <>
      <span className={`${mark} -left-2 -top-2 border-l border-t`} />
      <span className={`${mark} -right-2 -top-2 border-r border-t`} />
      <span className={`${mark} -bottom-2 -left-2 border-b border-l`} />
      <span className={`${mark} -bottom-2 -right-2 border-b border-r`} />
    </>
  )
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 px-4 py-24 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-signal">01 / About</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">A bit about me</h2>
        </motion.div>

        <div className="relative grid gap-10 rounded-2xl border bg-card/60 p-6 backdrop-blur-sm sm:p-8 md:grid-cols-[240px_1fr] md:gap-12 lg:p-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative mx-auto w-64 md:mx-0 md:w-full"
          >
            <div className="relative">
              <CropMarks />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile.jpg"
                alt="Komal Bhavake"
                className="aspect-[4/5] w-full rounded-sm object-cover grayscale-[20%]"
              />
            </div>
            <div className="mt-4 flex flex-col gap-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <span>Komal Bhavake</span>
              <span>MS CS · Illinois Tech</span>
            </div>
            <IsoCube
              size={44}
              className="absolute -right-5 -top-7 hidden text-foreground motion-safe:animate-[float-slow_6s_ease-in-out_infinite] md:block"
            />
          </motion.div>

          <div className="flex flex-col">
            <div className="-mt-1.5 space-y-5 text-lg md:text-justify leading-relaxed text-muted-foreground">
              {[
                <>
                  I'm a software engineer who likes building things and then making them better. Over the
                  years I've worked across the stack, from system design to the interfaces people use. I like owning a
                  feature end to end, from the first sketch to seeing it hold up in production.
                </>,
                <>
                  Lately I've been drawn to AI systems: finding where they're slow, figuring out why, and fixing
                  it. Outside work I'm usually building something small to test an idea I read about that week.
                </>,
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease }}
                  viewport={{ once: true, margin: "-80px" }}
                  className={i === 0 ? "text-foreground" : undefined}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ staggerChildren: 0.05, delayChildren: 0.4 }}
              className="mt-8 flex flex-wrap gap-2 border-t pt-6 md:mt-auto"
            >
              {FOCUS.map((item) => (
                <motion.li
                  key={item}
                  variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                  className="rounded-full border px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-signal/60 hover:text-foreground"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  )
}
