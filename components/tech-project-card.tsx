"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface TechProjectProps {
  project: {
    title: string
    description: string
    image: string
    color: string
    tags: string[]
    specialAnimation: boolean
  }
  index: number
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default function TechProjectCard({ project, index, onMouseEnter, onMouseLeave }: TechProjectProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl bg-black/40 backdrop-blur-sm border border-white/10 h-[400px] group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        delay: 0.2 + index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smoother animation
      }}
      whileHover={{
        y: -8,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-15 transition-opacity duration-700`}
      />

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? `0 0 0 1px rgba(255,255,255,0.2), 0 0 30px 5px rgba(139, 92, 246, 0.2)`
            : `0 0 0 1px rgba(255,255,255,0.05)`,
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      {/* Pas d'animation de watercooling - supprimée comme demandé */}

      {/* Content */}
      <div className="relative z-10 p-7 flex flex-col h-full">
        <div className="mb-4 flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="bg-black/30 text-white/80 border-white/10 text-xs rounded-full px-3"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-300 transition-colors duration-500">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-700">
          {project.description}
        </p>

        {/* Espace pour pousser le contenu vers le haut */}
        <div className="mt-auto"></div>

        {/* Subtle animated highlight */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"
            initial={{ x: "-100%", y: "-100%" }}
            animate={{ x: "100%", y: "100%" }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "linear" }}
          />
        )}
      </div>
    </motion.div>
  )
}

