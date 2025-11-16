import { useEffect, useState } from 'react'
import { fetchDonationStats } from '../lib/stripe-client'
import type { DonationStats } from '../types/stripe'

export function RecentDonations() {
  const [stats, setStats] = useState<DonationStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDonationStats()
      .then((data) => setStats(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="text-sm text-gray-600">Loading recent donations...</div>
  }

  if (!stats || !stats.recentCharges.length) {
    return null
  }

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">Recent Donations</h3>
      <div className="space-y-2">
        {stats.recentCharges.slice(0, 10).map((charge, i) => (
          <div key={i} className="text-sm">
            <span className="mr-2 text-gray-500">{charge.country}</span>
            <strong>${charge.amount.toFixed(2)}</strong>
            <span className="ml-2 text-gray-600">
              {new Date(charge.created * 1000).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
