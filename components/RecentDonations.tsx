import { useEffect, useState } from 'react'
import { fetchDonationStats } from '../lib/stripe-client'
import type { DonationStats } from '../types/stripe'
import { getCountryFlagEmoji } from 'country-flag-emoji'

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
        {stats.recentCharges.slice(0, 10).map((charge, i) => {
          const flag = charge.country ? getCountryFlagEmoji(charge.country) : null
          return (
            <div key={i} className="text-sm">
              {flag && <span className="mr-2">{flag.emoji}</span>}
              <strong>${(charge.amount / 100).toFixed(2)}</strong>
              <span className="ml-2 text-gray-600">
                {new Date(charge.created * 1000).toLocaleDateString()}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
