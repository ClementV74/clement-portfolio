"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

interface SkillIconProps {
  skill: {
    name: string
    image: string
    color: string
  }
  delay: number
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default function SkillIcon({ skill, delay, onMouseEnter, onMouseLeave }: SkillIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: delay + 0.3,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smoother animation
      }}
    >
      <motion.div
        className={`relative flex items-center justify-center w-28 h-28 rounded-3xl bg-black/40 backdrop-blur-sm border border-white/10 p-4 mb-4 overflow-hidden`}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 25px rgba(138, 43, 226, 0.25)",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Subtle gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-10`} />

        {/* Subtle animation on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"
          animate={{
            x: isHovered ? ["0%", "100%"] : "0%",
            y: isHovered ? ["0%", "100%"] : "0%",
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />

        {/* Logo image */}
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <div className="relative w-full h-full">
            <Image
              src={skill.image || "/placeholder.svg"}
              alt={`${skill.name} logo`}
              fill
              style={{ objectFit: "contain" }}
              className="drop-shadow-lg"
            />
          </div>
        </motion.div>
      </motion.div>
      <motion.p
        className="text-lg font-medium"
        animate={{
          color: isHovered ? "#a78bfa" : "#ffffff",
        }}
        transition={{ duration: 0.3 }}
      >
        {skill.name}
      </motion.p>
    </motion.div>
  )
}

