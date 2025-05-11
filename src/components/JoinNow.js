"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { useState } from "react"

export default function JoinNow() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative w-full px-6 py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#080215] to-[#0F0520] z-0">
        {/* Animated glow effects */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px]"></div>

        {/* Grid lines */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTU5IDFIMXY1OGg1OFYxeiIgZmlsbD0iIzIwMjAzMCIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Image with enhanced effects */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
        >
          <div className="relative group">
            {/* Main image */}
            <motion.div
              className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_25px_rgba(79,70,229,0.2)]"
              animate={{
                boxShadow: isHovered ? "0 0 30px rgba(124, 58, 237, 0.5)" : "0 0 25px rgba(79, 70, 229, 0.2)",
              }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 mix-blend-overlay"></div>
              <img
                src="https://i.pinimg.com/736x/9e/23/db/9e23dbbabdc98b20f11220855881709c.jpg"
                alt="Join the Hunt"
                className="w-full max-w-[500px] h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-blue-500/30 rounded-full"></div>
            <div className="absolute -top-4 -right-4 w-16 h-16 border border-purple-500/30 rounded-full"></div>

            {/* Animated particle */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-blue-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Right Animated Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 backdrop-blur-md bg-black/30 p-8 md:p-10 rounded-2xl border border-white/10 shadow-lg"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Join the Resistance
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-lg leading-relaxed mb-8 text-gray-300"
          >
            The Aracnid Network isn't just about bounties — it's a movement. Compete with the sharpest minds, earn ETH,
            and build your reputation on the blockchain. Opportunities don't last forever. Get in now.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/explore"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-6 py-3.5 rounded-xl shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              <span>Explore Bounties</span>
              <motion.span className="inline-block" animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.3 }}>
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-transparent border border-white/20 hover:border-white/40 backdrop-blur-sm text-white font-medium px-6 py-3.5 rounded-xl transition duration-300"
            >
              <span>Discord Server</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
