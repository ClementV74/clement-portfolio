"use client"

import { useEffect, useRef } from "react"

interface AnimatedBackgroundProps {
  className?: string
}

export default function AnimatedBackground({ className }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create gradient points with more dynamic movement
    const gradientPoints = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 300 + 200,
      xVelocity: (Math.random() - 0.5) * 0.08, // Vitesse très réduite
      yVelocity: (Math.random() - 0.5) * 0.08, // Vitesse très réduite
      hue: Math.random() * 60 + 240, // Purple to blue hues
      size: Math.random() * 0.3 + 0.8,
      pulseSpeed: Math.random() * 0.005 + 0.002, // Pulsation beaucoup plus lente
      pulseDirection: 1,
    }))

    // Animation loop
    let animationFrameId: number
    let time = 0

    const render = () => {
      time += 0.005 // Valeur réduite pour ralentir toute l'animation

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fill background
      ctx.fillStyle = "#0a0a0f"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw gradient points
      gradientPoints.forEach((point) => {
        // Move point with minimal wave-like motion
        point.x += point.xVelocity + Math.sin(time) * 0.05
        point.y += point.yVelocity + Math.cos(time * 0.8) * 0.05

        // Pulse size
        point.size += point.pulseDirection * point.pulseSpeed
        if (point.size > 1.2) point.pulseDirection = -1
        if (point.size < 0.8) point.pulseDirection = 1

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.xVelocity *= -1
        if (point.y < 0 || point.y > canvas.height) point.yVelocity *= -1

        // Create gradient
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius * point.size)

        gradient.addColorStop(0, `hsla(${point.hue}, 80%, 60%, 0.08)`) // Opacité réduite
        gradient.addColorStop(1, `hsla(${point.hue}, 80%, 60%, 0)`)

        // Draw gradient
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      // Continue animation loop
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
    </div>
  )
}

