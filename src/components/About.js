"use client"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      // Create a smoother animation with better configuration
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "top center", // Start earlier for a more gradual effect
          end: "+=600", // Longer scroll distance for smoother animation
          scrub: true, // Use true for smoother scrubbing (or try 0.5 for medium smoothness)
          pin: true,
          pinSpacing: true,
          markers: false, // Set to true for debugging
          anticipatePin: 1, // Helps with smoother pin initialization
        },
      })

      // Remove any existing inline styles that might interfere
      gsap.set(".mask-clip-path", {
        clearProps: "all",
        width: "50vw",
        height: "50vh",
        borderRadius: "9999px", // Full rounded to start
      })

      // Create a multi-step animation for smoother progression
      clipAnimation
        .to(".mask-clip-path", {
          width: "60vw",
          height: "60vh",
          borderRadius: "8rem",
          ease: "power1.inOut",
          duration: 0.2,
        })
        .to(".mask-clip-path", {
          width: "70vw",
          height: "70vh",
          borderRadius: "5rem",
          ease: "power1.inOut",
          duration: 0.2,
        })
        .to(".mask-clip-path", {
          width: "80vw",
          height: "80vh",
          borderRadius: "3rem",
          ease: "power1.inOut",
          duration: 0.2,
        })
        .to(".mask-clip-path", {
          width: "85vw",
          height: "85vh",
          borderRadius: "2rem",
          ease: "power1.inOut",
          duration: 0.2,
        })

      // Force a refresh to ensure proper initialization
      ScrollTrigger.refresh()
    },
    { scope: containerRef },
  )

  return (
    <div id="about" ref={containerRef} className="w-screen overflow-hidden">
      {/* Header Section */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5 px-4">
        <h2 className="font-SDGlitch text-sm uppercase md:text-[30px]">Welcome to Arcanid</h2>

        <div className="special-font font-zentry font-extrabold mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem]">
          S<b>o</b>lve challenges. St<b>a</b>ke tokens. E<b>a</b>rn ETH.
        </div>

        <div className="about-subtext mx-auto px-6 py-12 text-center text-sm font-genral text-gray-400 max-w-2xl">
          <p>
            Arcanid is a decentralized bounty platform powered by blockchain. Stake ARCD tokens, submit solutions, and
            earn ETH rewards in a trustless environment.
          </p>
        </div>
      </div>

      {/* Scroll Animation Section */}
      <div className="h-dvh w-screen flex items-center justify-center" id="clip">
        <div
          className="mask-clip-path about-image rounded-full overflow-hidden relative"
          style={{ width: "50vw", height: "50vh" }} // Set initial size in style to avoid flicker
        >
          <img
            src="https://i.pinimg.com/736x/8b/41/7d/8b417d728565fe8017f81c2964220f38.jpg"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default About
