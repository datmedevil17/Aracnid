"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Clock, Zap, Shield } from "lucide-react"

const dummyBounties = [
  {
    id: 1,
    title: "Fix security bug in smart contract",
    description: "Identify and patch the reentrancy vulnerability.",
    amount: 1.5,
    requiredStake: 50,
    expiresAt: Date.now() + 86400000,
  },
  {
    id: 2,
    title: "Frontend UI Polish",
    description: "Improve responsiveness and animations.",
    amount: 0.8,
    requiredStake: 20,
    expiresAt: Date.now() + 604800000,
  },
  {
    id: 3,
    title: "Optimize Gas Usage",
    description: "Reduce transaction costs by optimizing contract code.",
    amount: 2.2,
    requiredStake: 75,
    expiresAt: Date.now() + 1209600000,
  },
  {
    id: 4,
    title: "Implement Zero-Knowledge Proof",
    description: "Add privacy features using ZK-SNARKs.",
    amount: 3.5,
    requiredStake: 100,
    expiresAt: Date.now() + 2592000000,
  },
  {
    id: 5,
    title: "Create Documentation",
    description: "Write comprehensive docs for the protocol.",
    amount: 0.5,
    requiredStake: 15,
    expiresAt: Date.now() + 432000000,
  },
  // Add more dummy bounties as needed
]

const page = () => {
  const [bounties, setBounties] = useState([])
  const router = useRouter()

  useEffect(() => {
    // Replace this with smart contract call
    setBounties(dummyBounties)
  }, [])

  // Card container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Card item animation variants
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  // Neon glow animation for title
  const titleVariants = {
    animate: {
      textShadow: [
        "0 0 5px #4f46e5, 0 0 10px #4f46e5, 0 0 15px #4f46e5, 0 0 20px #4f46e5",
        "0 0 5px #a855f7, 0 0 10px #a855f7, 0 0 15px #a855f7, 0 0 20px #a855f7",
        "0 0 5px #4f46e5, 0 0 10px #4f46e5, 0 0 15px #4f46e5, 0 0 20px #4f46e5",
      ],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white py-10 px-6 relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] bg-center opacity-10 z-0"></div>

      {/* Animated glitch lines */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-cyan-400 w-full opacity-30"
            style={{ top: `${Math.random() * 100}%` }}
            animate={{
              scaleX: [0, 1, 0],
              x: ["-100%", "100%"],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10">
        <motion.h1
          className="text-5xl font-bold  bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-2 text-center"
          initial="animate"
          animate="animate"
          variants={titleVariants}
        >
          ACTIVE BOUNTIES
        </motion.h1>

        <motion.p
          className="text-center text-cyan-300 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Hack the system. Claim your reward. Join the revolution.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {bounties.map((bounty) => (
            <motion.div
              key={bounty.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(139, 92, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-black bg-opacity-30 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-lg transition duration-300 overflow-hidden group"
            >
              {/* Glassmorphism effect with animated gradient border */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(45deg, rgba(79, 70, 229, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
                }}
              />

              {/* Animated corner accent */}
              <div className="absolute -top-1 -right-1 w-16 h-16 overflow-hidden">
                <div className="absolute transform rotate-45 bg-gradient-to-r from-blue-500 to-purple-600 text-xs text-white font-bold py-1 right-[-35px] top-[15px] w-[120px] text-center">
                  NEW
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-3">
                {bounty.title}
              </h2>

              <p className="text-gray-300 mb-5 text-sm">{bounty.description}</p>

              <div className="space-y-3 mb-5">
                <div className="flex items-center text-sm">
                  <Zap className="w-4 h-4 mr-2 text-emerald-400" />
                  <span className="text-gray-400">Reward: </span>
                  <span className="ml-auto text-emerald-300 font-mono font-bold">{bounty.amount} ETH</span>
                </div>

                <div className="flex items-center text-sm">
                  <Shield className="w-4 h-4 mr-2 text-pink-400" />
                  <span className="text-gray-400">Stake Required: </span>
                  <span className="ml-auto text-pink-300 font-mono font-bold">{bounty.requiredStake} ARCD</span>
                </div>

                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-gray-400">Expires: </span>
                  <span className="ml-auto text-blue-300 font-mono">
                    {new Date(bounty.expiresAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <motion.button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 rounded-xl text-sm font-bold hover:opacity-90 relative overflow-hidden group"
                onClick={() => router.push(`/bounty/${bounty.id}`)}
                whileHover={{
                  scale: 1.02,
                }}
              >
                {/* Button hover effect */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  View Bounty
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default page
