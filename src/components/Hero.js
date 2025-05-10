"use client"

import Link from "next/link"
import Spline from "@splinetool/react-spline"
import { useEffect, useRef } from "react"

const Hero = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 50

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        color: i % 2 === 0 ? "#4F46E5" : "#A855F7",
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      })
    }

    function animate() {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })
    }

    animate()

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden py-20 px-6 md:px-16">
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>

      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#080215] to-[#0F0520] z-0">
        {/* Neon glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Grid container */}
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
        {/* Text Content - no box structure */}
        <div className="relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-fadeIn">
            Decentralized Bounties. Real Rewards.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl animate-slideUp">
            Solve challenges. Stake tokens. Earn ETH.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slideUp" style={{ animationDelay: "200ms" }}>
            <Link
              href="/bounties"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8 py-3.5 rounded-xl transition duration-300 text-center shadow-lg shadow-blue-600/20"
            >
              Explore Bounties
            </Link>
            <Link
              href="/create"
              className="bg-transparent border border-white/20 hover:border-white/40 backdrop-blur-sm text-white font-medium px-8 py-3.5 rounded-xl transition duration-300 text-center"
            >
              Create Bounty
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-10 -left-10 w-20 h-20 border border-blue-500/20 rounded-full animate-pulse"></div>
          <div className="absolute -top-5 -right-5 w-10 h-10 border border-purple-500/20 rounded-full animate-pulse"></div>
        </div>

        {/* 3D Spline Component - no box structure */}
        <div
          className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full animate-fadeIn"
          style={{ animationDelay: "300ms" }}
        >
          <Spline scene="https://prod.spline.design/xcm0HBjeloHoMDKu/scene.splinecode" className="w-full h-full" />
        </div>
      </div>
    </section>
  )
}

export default Hero
