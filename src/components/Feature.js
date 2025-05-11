"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const cards = [
  {
    id: 1,
    title: "Smart Contracts",
    description: "Secure and transparent blockchain-based agreements",
    image: "https://pixelplex.io/wp-content/uploads/2023/08/smart-contract-use-cases-main-1600.jpg",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: 2,
    title: "Token Staking",
    description: "Earn rewards by staking your ARCN tokens",
    image: "https://pixelplex.io/wp-content/uploads/2022/12/what-is-nft-staking.jpg",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: 3,
    title: "Bounty Creation",
    description: "Create challenges and reward innovative solutions",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ_3txYNdca-aLwOC_ZIU2RFmV8DsVOEzt4BKwuUP4po2GM26Eo-dg_8KAYhCYnbwcNUQ&usqp=CAU",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 4,
    title: "Solution Verification",
    description: "Transparent verification of submitted solutions",
    image: "https://cdn.corporatefinanceinstitute.com/assets/data-validation.jpeg",
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: 5,
    title: "Reputation System",
    description: "Build your reputation through successful contributions",
    image: "https://www.paybito.com/wp-content/uploads/2022/02/reputation-systems-exchange-paybito.png",
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    id: 6,
    title: "Decentralized Governance",
    description: "Community-driven decision making and protocol updates",
    image: "https://media.licdn.com/dms/image/v2/D4D10AQHYvnCBzs276A/image-shrink_800/image-shrink_800/0/1713458977244?e=2147483647&v=beta&t=Rs8MFY0yRXFgQGpbrmnwtTaag7LE7e3DRG9CKlq5uvc",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 7,
    title: "Cross-chain Integration",
    description: "Seamless interaction with multiple blockchain networks",
    image: "https://cimg.co/wp-content/uploads/2024/08/09165803/1723222682-1723222664647_processed.jpg",
    color: "from-violet-500 to-purple-600",
  },
]

const Feature = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef(null)
  const containerRef = useRef(null)

  // Handle autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
      }, 3000)
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
  }

  // Update the getCardStyle function to create more space between cards
  // and reduce overlapping

  const getCardStyle = (index) => {
    const diff = (index - currentIndex + cards.length) % cards.length
    // Normalize diff to be between -3 and 3
    const normalizedDiff = diff > cards.length / 2 ? diff - cards.length : diff

    // Calculate z-index - center card has highest z-index
    const zIndex = 10 - Math.abs(normalizedDiff)

    // Calculate position and rotation
    let x = 0
    let scale = 1
    let opacity = 1
    let rotateY = 0

    if (normalizedDiff === 0) {
      // Center card
      x = 0
      scale = 1
      opacity = 1
      rotateY = 0
    } else if (normalizedDiff > 0) {
      // Cards to the right
      x = normalizedDiff * 120 // Increased from 60 to 120
      scale = 1 - normalizedDiff * 0.15
      opacity = 1 - normalizedDiff * 0.2
      rotateY = -normalizedDiff * 8 // Reduced from 10 to 8
    } else {
      // Cards to the left
      x = normalizedDiff * 120 // Increased from 60 to 120
      scale = 1 - Math.abs(normalizedDiff) * 0.15
      opacity = 1 - Math.abs(normalizedDiff) * 0.2
      rotateY = -normalizedDiff * 8 // Reduced from 10 to 8
    }

    // Hide cards that are too far from center - reduced from 3 to 2
    if (Math.abs(normalizedDiff) > 2) {
      opacity = 0
    }

    return {
      zIndex,
      x,
      scale,
      opacity,
      rotateY,
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#080215] to-[#0F0520] z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Platform Features
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover the powerful features that make Aracnid the leading decentralized bounty platform
          </p>
        </div>

        {/* Carousel container */}
        <div
          ref={containerRef}
          className="relative h-[500px] md:h-[550px] perspective-1000 mx-auto w-full max-w-5xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {cards.map((card, index) => {
              const { zIndex, x, scale, opacity, rotateY } = getCardStyle(index)
              return (
                <motion.div
                  key={card.id}
                  className="absolute w-[300px] sm:w-[320px] h-[420px] cursor-pointer"
                  initial={false}
                  animate={{
                    x,
                    scale,
                    opacity,
                    rotateY: `${rotateY}deg`,
                    zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  onClick={() => setCurrentIndex(index)}
                  style={{ zIndex }}
                >
                  <motion.div
                    className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                    animate={{
                      opacity,
                      backdropFilter: `blur(16px)`,
                      WebkitBackdropFilter: `blur(16px)`,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <div className="relative h-3/5 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-80`}></div>
                      <img
                        src={card.image || "/placeholder.svg"}
                        alt={card.title}
                        className="w-full h-full object-cover mix-blend-overlay"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                    <div className="p-6 h-2/5">
                      <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-300">{card.description}</p>
                    </div>
                  </motion.div>
                </motion.div>

              )
            })}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full border border-white/10 hover:bg-black/70 transition-all"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full border border-white/10 hover:bg-black/70 transition-all"
            aria-label="Next card"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${currentIndex === index
                    ? "bg-gradient-to-r from-blue-400 to-purple-500 w-6"
                    : "bg-white/30 hover:bg-white/50"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feature
