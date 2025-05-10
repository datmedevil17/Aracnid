'use client'

import React, { useEffect } from 'react'
import gsap from 'gsap'


const About = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    })

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Arcanid
        </p>

        <div className="about-subtext">
          <p>Solve challenges. Stake tokens. Earn ETH.</p>
          <p className="text-gray-500">
            Aracnid is a decentralized bounty platform powered by blockchain. Stake ARCD tokens, submit solutions, and earn ETH rewards in a trustless environment.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="/img/about.jpeg"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default About
