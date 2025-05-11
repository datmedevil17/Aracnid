import About from '@/components/About'
import Feature from '@/components/Feature'
import Hero from '@/components/Hero'
import JoinNow from '@/components/JoinNow'
import React from 'react'

const page = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero/>
      <About/>
      <Feature/>
      <JoinNow/>
    </div>
  )
}

export default page
