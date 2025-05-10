"use client"
import { useState, useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import Link from "next/link"
import { getTokenBalance, registerUser, getUserProfile } from "@/contracts/functions"
import { ProfileIcon } from "./profileIcon"
import { formatEther } from "viem"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isRegistered, setIsRegistered] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [tokenBalance, setTokenBalance] = useState("0")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userStats, setUserStats] = useState({
    reputation: 0,
    totalBounties: 0,
    totalClaimed: 0,
    totalStaked: 0,
  })
  const { address, isConnected } = useAccount()

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      if (isConnected && address) {
        try {
          const profile = await getUserProfile(address)
          // Check if profile exists and isRegistered is true
          if (profile && profile[4]) {
            setIsRegistered(true)
            setUserStats({
              reputation: profile[0],
              totalBounties: profile[1],
              totalClaimed: profile[2],
              totalStaked: profile[3],
            })
          } else {
            setIsRegistered(false)
            // Reset stats if user is not registered
            setUserStats({
              reputation: 0,
              totalBounties: 0,
              totalClaimed: 0,
              totalStaked: 0,
            })
          }
          const balance = await getTokenBalance(address)
          setTokenBalance(formatEther(balance).toString())
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }
    }

    fetchUserData()
  }, [isConnected, address])

  const handleRegister = async () => {
    try {
      await registerUser()
      setIsRegistered(true)
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(".profile-dropdown")) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showDropdown])

  return (
    <nav
      className={`sticky top-0 z-50 w-full px-6 py-3 transition-all duration-300 ${scrolled ? "backdrop-blur-md bg-black/70 border-b border-white/10" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Aracnid
          </Link>
        </div>

        

        {/* Right Section: Connect, Balance, Profile */}
        <div className="flex items-center space-x-4">

          {/* Navigation Links - Desktop - moved to the right */}
          <div className="hidden md:flex items-center space-x-6 mr-4">
            <Link href="/explore" className="text-gray-300 hover:text-white transition-colors relative group">
              Explore Bounties
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/create" className="text-gray-300 hover:text-white transition-colors relative group">
              Create Bounty
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          {/* Token Balance Display */}
          {isConnected && (
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span className="text-sm font-medium text-white">{Number.parseFloat(tokenBalance).toFixed(4)} ARCN</span>
            </div>
          )}

          <ConnectButton
            chainStatus="icon"
            showBalance={false}
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />

          {/* Register/Profile Section */}
          {isConnected && (
            <>
              {!isRegistered ? (
                <button
                  onClick={handleRegister}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:opacity-90 transition-all hover:shadow-[0_0_10px_rgba(79,70,229,0.5)] border border-white/10"
                >
                  Register
                </button>
              ) : (
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors border border-white/10"
                    aria-expanded={showDropdown}
                    aria-haspopup="true"
                  >
                    <ProfileIcon className="w-6 h-6 text-gray-300" />
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-64 backdrop-blur-md bg-black/80 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.3)] ring-1 ring-white/10 border border-white/5 animate-fadeIn">
                      <div className="p-4 space-y-3">
                        <div className="text-sm font-semibold text-white border-b border-white/10 pb-2">User Stats</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Reputation</span>
                            <span className="text-sm font-medium text-white">{userStats.reputation}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Total Bounties</span>
                            <span className="text-sm font-medium text-white">{userStats.totalBounties}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Total Claimed</span>
                            <span className="text-sm font-medium text-white">{userStats.totalClaimed}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Total Staked</span>
                            <span className="text-sm font-medium text-white">{userStats.totalStaked}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-md bg-black/80 border-b border-white/10 animate-slideDown">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="/bounties"
              className="block py-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Bounties
            </Link>
            <Link
              href="/create"
              className="block py-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Bounty
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
