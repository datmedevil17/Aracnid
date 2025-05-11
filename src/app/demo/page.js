'use client'
import React, { useState, useEffect } from 'react'
import { createBounty, getActiveBountyCount, getBountyDetails } from '@/contracts/functions'

const CreateBountyModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requiredStake: '',
    durationInDays: '',
    value: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const result = await createBounty(
        formData.title,
        formData.description,
        BigInt(formData.requiredStake),
        Number(formData.durationInDays),
        BigInt(formData.value)
      )
      setSuccess(true)
      setFormData({
        title: '',
        description: '',
        requiredStake: '',
        durationInDays: '',
        value: ''
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Create New Bounty</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter bounty title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter bounty description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Required Stake (in Wei)</label>
            <input
              type="number"
              name="requiredStake"
              value={formData.requiredStake}
              onChange={handleChange}
              required
              min="0"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter required stake amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duration (in days)</label>
            <input
              type="number"
              name="durationInDays"
              value={formData.durationInDays}
              onChange={handleChange}
              required
              min="1"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter duration in days"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Value (in Wei)</label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
              min="0"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter bounty value"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
              loading 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Creating...' : 'Create Bounty'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-4 bg-green-50 text-green-500 rounded-lg">
            Bounty created successfully!
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 px-4 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  )
}

const BountyCard = ({ bounty }) => {
  const formatDate = (timestamp) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString()
  }

  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition bg-white">
      <h2 className="text-xl font-semibold mb-2">{bounty.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-2">{bounty.description}</p>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Reward:</span>
          <span className="font-medium">{bounty.amount.toString()} Wei</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-500">Required Stake:</span>
          <span className="font-medium">{bounty.requiredStake.toString()} Wei</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-500">Submissions:</span>
          <span className="font-medium">{bounty.submissionCount.toString()}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-500">Expires:</span>
          <span className="font-medium">{formatDate(bounty.expiresAt)}</span>
        </div>
      </div>
    </div>
  )
}

const DemoPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [bounties, setBounties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize] = useState(5)
  const [hasMore, setHasMore] = useState(true)
  const [isFetching, setIsFetching] = useState(false)

  const fetchBounties = async () => {
    try {
      setIsFetching(true)
      const count = await getActiveBountyCount()
      
      // Calculate start and end indices for current page
      const start = currentPage * pageSize
      const end = Math.min(start + pageSize, Number(count))
      
      // If we've reached the end, disable "Load More"
      if (start >= Number(count)) {
        setHasMore(false)
        return
      }

      // Fetch bounties for current page
      const newBounty = await getBountyDetails(start)
      if (newBounty && newBounty.isActive) {
        setBounties(prev => [...prev, { ...newBounty, id: start }])
      }
      
      // Update hasMore flag
      setHasMore(end < Number(count))
    } catch (err) {
      setError(err.message)
    } finally {
      setIsFetching(false)
    }
  }

  const loadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  useEffect(() => {
    fetchBounties()
  }, [currentPage]) // Fetch when page changes

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Active Bounties</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Create New Bounty
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
          Error: {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bounties.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No active bounties found
            </div>
          ) : (
            bounties.map((bounty) => (
              <BountyCard key={bounty.id} bounty={bounty} />
            ))
          )}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            disabled={isFetching}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {isFetching ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      <CreateBountyModal 
        isOpen={showModal} 
        onClose={() => {
          setShowModal(false)
          fetchBounties() // Refresh bounties after creating new one
        }} 
      />
    </div>
  )
}

export default DemoPage
