"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Travel() {
  const travelImages = [
    {
      src: "/images/img-1.jpg",
      alt: "Diving Adventure",
      activity: "Diving"
    },
    {
      src: "/images/img-2.jpg", 
      alt: "Kayaking Adventure",
      activity: "Kayaking"
    },
    {
      src: "/images/img-3.jpg",
      alt: "Hiking Adventure", 
      activity: "Hiking"
    }
  ]

  return (
    <section id="travel" className="py-20 px-4 md:px-6 lg:px-8 bg-muted/20 scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Adventures & Exploration</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Beyond the digital realm, I find my balance in the great outdoors. From diving into crystal-clear waters 
            to kayaking through serene lakes and conquering mountain peaks, I believe in living life to the fullest 
            and discovering the world's hidden treasures 🌍
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {travelImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold text-sm md:text-base text-center px-2">
                  {image.activity}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-muted-foreground italic">
            "The world is a book and those who do not travel read only one page." - Saint Augustine
          </p>
        </motion.div>
      </div>
    </section>
  )
}
