'use client'
import React, { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Image from 'next/image'
import { getTokenBalance, registerUser, getUserProfile } from '@/contracts/functions'
import { ProfileIcon } from "./profileIcon"
import { formatEther, parseEther } from 'viem'

const Navbar = () => {
  const [isRegistered, setIsRegistered] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [tokenBalance, setTokenBalance] = useState('0')
  const [userStats, setUserStats] = useState({
    reputation: 0,
    totalBounties: 0,
    totalClaimed: 0,
    totalStaked: 0,
  })
  const { address, isConnected } = useAccount()

  useEffect(() => {
    const fetchUserData = async () => {
      if (isConnected && address) {
        try {
          const profile = await getUserProfile(address)
          console.log(profile[4])
          // Check if profile exists and isRegistered is true
          if (profile && profile[4]) {
            setIsRegistered(true)
            setUserStats({
              reputation: profile[0],
              totalBounties: profile[1],
              totalClaimed: profile[2],
              totalStaked: profile[3]                                                                                                                                                                                                                                                                  ,
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
          setTokenBalance((formatEther(balance)).toString())
        } catch (error) {
          console.error('Error fetching user data:', error)
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
      console.error('Registration failed:', error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Aracnid
          </h1>
        </div>

        {/* Right Section: Connect, Balance, Profile */}
        <div className="flex items-center space-x-6">
          <ConnectButton 
            chainStatus="icon" 
            showBalance={false}
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
          />

          {/* Token Balance Display */}
          {isConnected && (
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <span className="text-sm font-medium">
                {Number(formatEther(tokenBalance)).toFixed(4)} ARCN
              </span>
            </div>
          )}

          {/* Register/Profile Section */}
          {isConnected && (
            <>
              {!isRegistered ? (
                <button
                  onClick={handleRegister}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Register
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <ProfileIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-800">
                      <div className="p-4 space-y-3">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          User Stats
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Reputation</span>
                            <span className="text-sm font-medium">{userStats.reputation}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Total Bounties</span>
                            <span className="text-sm font-medium">{userStats.totalBounties}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Total Claimed</span>
                            <span className="text-sm font-medium">
                              {(userStats.totalClaimed)} 
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Total Staked</span>
                            <span className="text-sm font-medium">
                              {(userStats.totalStaked)} 
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
