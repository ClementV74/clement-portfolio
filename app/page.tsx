"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Menu, X, ChevronDown } from "lucide-react"
import SkillIcon from "@/components/skill-icon"
import ProjectCard from "@/components/project-card"
import AnimatedBackground from "@/components/animated-background"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [activeSection, setActiveSection] = useState("accueil")
  const [menuOpen, setMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    setMenuOpen(false)

    // Smooth scroll to section
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const skills = [
    {
      name: "C#",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png",
      color: "from-purple-600 to-blue-500",
    },
    {
      name: "C++",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png",
      color: "from-blue-600 to-blue-400",
    },
    {
      name: "Python",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png",
      color: "from-blue-500 to-yellow-500",
    },
    {
      name: "HTML",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
      color: "from-orange-600 to-orange-400",
    },
    {
      name: "CSS",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png",
      color: "from-blue-500 to-blue-300",
    },
    {
      name: "JavaScript",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png",
      color: "from-yellow-500 to-yellow-300",
    },
    {
      name: "Swift",
      image: "https://img.icons8.com/?size=512&id=24465&format=png",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "SQL",
      image: "https://www.mysql.com/common/logos/logo-mysql-170x115.png",
      color: "from-blue-600 to-blue-400",
    },
    {
      name: "PHP",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/2560px-PHP-logo.svg.png",
      color: "from-indigo-600 to-indigo-400",
    },
  ]

  const projects = [
    {
      title: "Mini frigo connecté",
      description:
        "Système intelligent de gestion alimentaire intégrant reconnaissance d'objets et assistant IA pour optimiser la conservation et réduire le gaspillage.",
      image: "/placeholder.svg?height=300&width=500",
      github: "https://github.com/ClementV74/Crios-Le-Mini-Frigo-IA",
      color: "from-blue-600 to-cyan-400",
      tags: ["IoT", "IA", "Computer Vision"],
    },
    {
      title: "Agenda",
      description:
        "Application de planification avancée offrant synchronisation multi-appareils, notifications intelligentes et visualisation optimisée des événements.",
      image: "/placeholder.svg?height=300&width=500",
      github: "https://github.com/ClementV74/Agenda",
      color: "from-purple-600 to-pink-400",
      tags: ["Web", "Mobile", "UX/UI"],
    },
    {
      title: "Borne de recharge",
      description:
        "Interface de monitoring pour bornes de recharge solaires permettant l'analyse en temps réel et l'optimisation des ressources énergétiques.",
      image: "/placeholder.svg?height=300&width=500",
      github: "https://github.com/ClementV74/solar-dashboard--1-",
      color: "from-green-600 to-emerald-400",
      tags: ["Énergie", "Dashboard", "IoT"],
    },
    {
      title: "Smart display",
      description:
        "Plateforme d'administration pour écrans connectés facilitant la gestion de contenu, l'analyse de données et le déploiement à distance.",
      image: "/placeholder.svg?height=300&width=500",
      github: "https://github.com/ClementV74/admin",
      color: "from-orange-600 to-amber-400",
      tags: ["Admin", "Dashboard", "Analytics"],
    },
  ]

  const navItems = [
    { id: "accueil", label: "Accueil" },
    { id: "competences", label: "Compétences" },
    { id: "projets", label: "Projets" },
  ]

  const cursorVariants = {
    default: {
      width: 32,
      height: 32,
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "rgba(255, 255, 255, 0)",
      mixBlendMode: "difference" as const,
      border: "2px solid rgba(255, 255, 255, 0.8)",
      borderRadius: "50%",
    },
    button: {
      width: 80,
      height: 80,
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      backgroundColor: "rgba(138, 43, 226, 0.15)",
      mixBlendMode: "normal" as const,
      border: "2px solid rgba(138, 43, 226, 0.4)",
      borderRadius: "50%",
    },
    text: {
      width: 150,
      height: 40,
      x: mousePosition.x - 75,
      y: mousePosition.y - 20,
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      mixBlendMode: "difference" as const,
      borderRadius: "20px",
    },
  }

  // Animation variants for page sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smoother animation
      },
    },
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden" ref={mainRef}>
      {/* Advanced animated background */}
      <AnimatedBackground />

      {/* Custom cursor */}
      <motion.div
        className="fixed rounded-full pointer-events-none z-50"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 250,
          mass: 0.4,
        }}
      />

      {/* Fixed header with navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Clément
          </motion.div>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleSectionChange(item.id)}
                    className={`text-lg font-medium transition-all duration-500 hover:text-purple-400 relative ${
                      activeSection === item.id ? "text-purple-400" : "text-white/70"
                    }`}
                    onMouseEnter={() => setCursorVariant("button")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-purple-400 rounded-full"
                        layoutId="activeSection"
                        transition={{
                          type: "spring",
                          stiffness: 250,
                          damping: 25,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white rounded-full"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile navigation menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/90 backdrop-blur-lg md:hidden pt-20"
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="container mx-auto px-4">
              <ul className="flex flex-col space-y-6 py-8">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 * index,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  >
                    <button
                      onClick={() => handleSectionChange(item.id)}
                      className={`text-2xl font-medium w-full text-left py-3 px-4 rounded-2xl transition-all duration-300 ${
                        activeSection === item.id
                          ? "text-purple-400 bg-purple-900/20 border-purple-500/30"
                          : "text-white/70 hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="relative z-10 pt-20">
        {/* Hero section */}
        <section id="accueil" className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 py-20">
          <motion.div initial="hidden" animate="visible" variants={sectionVariants} className="text-center max-w-4xl">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1,
                type: "spring",
                bounce: 0.3,
                ease: "easeOut",
              }}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Clément
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-14 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Étudiant passionné d'informatique
            </motion.p>
            <motion.div
              className="flex flex-col md:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            >
              <Button
                onClick={() => handleSectionChange("competences")}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-7 rounded-full text-lg shadow-lg shadow-purple-900/30 transition-all duration-500 hover:shadow-purple-700/40 hover:scale-105"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                Mes compétences
              </Button>
              <Button
                onClick={() => handleSectionChange("projets")}
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-7 rounded-full text-lg transition-all duration-500 hover:scale-105"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                Voir mes projets
              </Button>
            </motion.div>

            <motion.div
              className="mt-24 animate-bounce"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <button
                onClick={() => handleSectionChange("competences")}
                className="text-white/50 hover:text-white/80 transition-colors duration-300 p-2 rounded-full hover:bg-white/5"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <ChevronDown size={32} />
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Skills section */}
        <section id="competences" className="min-h-screen flex flex-col items-center justify-center px-4 py-32">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Mes <span className="text-purple-400">Compétences</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 mb-16 max-w-2xl text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Expertise technique dans divers langages de programmation pour développer des solutions innovantes et
            performantes
          </motion.p>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            {skills.map((skill, index) => (
              <SkillIcon
                key={skill.name}
                skill={skill}
                delay={index * 0.1}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              />
            ))}
          </motion.div>
        </section>

        {/* Projects section */}
        <section id="projets" className="min-h-screen flex flex-col items-center justify-center px-4 py-32">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Mes <span className="text-purple-400">Projets</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 mb-16 max-w-2xl text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Découvrez mes réalisations alliant innovation technique et expérience utilisateur intuitive
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              />
            ))}
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2 md:mb-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onMouseEnter={() => setCursorVariant("text")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Clément
            </motion.div>

            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <a
                href="https://github.com/ClementV74"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-300 p-1 rounded-full hover:bg-white/5"
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            className="mt-2 text-center text-xs text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            onMouseEnter={() => setCursorVariant("text")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <p>© {new Date().getFullYear()} Clément. Tous droits réservés.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

