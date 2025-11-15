import { useEffect, useState } from 'react'
import { fetchDonationStats, calculateFunding } from '../lib/stripe-client'
import type { DonationStats } from '../types/stripe'

interface Props {
  totalExpenses: number
}

export function DonationStats({ totalExpenses }: Props) {
  const [stats, setStats] = useState<DonationStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDonationStats()
      .then((data) => setStats(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading donation stats...</div>
  }

  if (!stats) {
    return null
  }

  const funding = calculateFunding(totalExpenses, stats)

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="relative h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-red-500 transition-all"
            style={{ width: `${funding.monthlyPercent}%` }}
          />
        </div>
        <div className="relative h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-orange-400 transition-all"
            style={{ width: `${funding.onetimePercent}%` }}
          />
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        ${stats.totalDonations.toFixed(2)} donated in the last 30 days
      </p>
    </div>
  )
}
