"use client"

import { useEffect, useRef } from "react"

export default function WatercoolingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Définir les dimensions du canvas
    canvas.width = 500
    canvas.height = 300

    // Configuration du tuyau
    const tube = {
      points: [
        { x: 50, y: 150 },
        { x: 100, y: 80 },
        { x: 200, y: 50 },
        { x: 300, y: 80 },
        { x: 400, y: 150 },
        { x: 450, y: 220 },
        { x: 350, y: 250 },
        { x: 250, y: 220 },
        { x: 150, y: 250 },
        { x: 50, y: 150 },
      ],
      radius: 15,
    }

    // Particules de liquide
    const particles: {
      position: number
      speed: number
      size: number
      color: string
    }[] = []

    // Créer des particules initiales
    for (let i = 0; i < 100; i++) {
      particles.push({
        position: Math.random(),
        speed: 0.0005 + Math.random() * 0.001,
        size: 3 + Math.random() * 4,
        color: getRandomColor(),
      })
    }

    function getRandomColor() {
      const colors = [
        "rgba(0, 255, 255, 0.8)", // Cyan
        "rgba(80, 200, 255, 0.8)", // Bleu clair
        "rgba(138, 43, 226, 0.7)", // Violet
        "rgba(0, 191, 255, 0.8)", // Bleu ciel
        "rgba(30, 144, 255, 0.7)", // Bleu royal
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Fonction pour dessiner une courbe lisse à travers les points
    function drawSmoothCurve(points: { x: number; y: number }[], radius: number) {
      if (points.length < 2) return

      // Dessiner le tube (contour)
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)

      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2
        const yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }

      // Fermer la courbe pour le dernier segment
      const lastPoint = points[points.length - 1]
      ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, points[0].x, points[0].y)

      ctx.lineWidth = radius * 2
      ctx.strokeStyle = "rgba(20, 20, 30, 0.7)"
      ctx.stroke()

      // Dessiner l'intérieur du tube
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)

      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2
        const yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }

      // Fermer la courbe pour le dernier segment
      ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, points[0].x, points[0].y)

      ctx.lineWidth = radius * 1.8
      ctx.strokeStyle = "rgba(10, 10, 15, 0.5)"
      ctx.stroke()
    }

    // Calculer la position sur la courbe en fonction d'un pourcentage
    function getPositionOnCurve(points: { x: number; y: number }[], t: number) {
      const totalPoints = points.length

      // Assurer que t est entre 0 et 1
      t = t % 1

      // Trouver les deux points entre lesquels nous sommes
      const segmentLength = 1 / totalPoints
      const segmentIndex = Math.floor(t * totalPoints)
      const segmentT = (t - segmentIndex * segmentLength) / segmentLength

      const p1 = points[segmentIndex]
      const p2 = points[(segmentIndex + 1) % totalPoints]

      // Interpolation linéaire entre les deux points
      return {
        x: p1.x + (p2.x - p1.x) * segmentT,
        y: p1.y + (p2.y - p1.y) * segmentT,
      }
    }

    // Mettre à jour et dessiner les particules
    function updateAndDrawParticles() {
      particles.forEach((particle) => {
        // Mettre à jour la position de la particule
        particle.position += particle.speed
        if (particle.position > 1) {
          particle.position = 0
        }

        // Calculer la position sur la courbe
        const pos = getPositionOnCurve(tube.points, particle.position)

        // Dessiner la particule
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Effet de lueur
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, particle.size * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(")", ", 0.3)")
        ctx.fill()
      })
    }

    // Fonction d'animation principale
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fond sombre
      ctx.fillStyle = "rgba(10, 10, 15, 0.95)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dessiner le tuyau
      drawSmoothCurve(tube.points, tube.radius)

      // Mettre à jour et dessiner les particules
      updateAndDrawParticles()

      requestAnimationFrame(animate)
    }

    animate()

    // Nettoyage
    return () => {
      // Rien à nettoyer spécifiquement pour cette animation
    }
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="max-w-full max-h-full object-contain rounded-xl" />
    </div>
  )
}

