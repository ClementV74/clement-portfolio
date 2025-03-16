"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProjectProps {
  project: {
    title: string
    description: string
    image: string
    github: string
    color: string
    tags: string[]
  }
  index: number
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default function ProjectCard({ project, index, onMouseEnter, onMouseLeave }: ProjectProps) {
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

        <div className="mt-auto flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 transition-all duration-500 rounded-full"
            onClick={() => window.open(project.github, "_blank")}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>

          <motion.div
            className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center cursor-pointer shadow-lg shadow-purple-900/20"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 20px rgba(138, 43, 226, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            onClick={() => window.open(project.github, "_blank")}
          >
            <ArrowUpRight className="w-5 h-5 text-white" />
          </motion.div>
        </div>

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

