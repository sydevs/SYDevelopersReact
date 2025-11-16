import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
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
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-48" />
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const funding = calculateFunding(totalExpenses, stats)
  const totalPercent = Math.min(100, funding.monthlyPercent + funding.onetimePercent)

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Funding Progress</span>
        <span className="text-muted-foreground">{totalPercent.toFixed(0)}%</span>
      </div>

      {/* Stacked Progress Bar */}
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
        {/* Monthly donations layer (primary color) */}
        <div
          className="absolute h-full bg-primary transition-all"
          style={{ width: `${Math.min(100, funding.monthlyPercent)}%` }}
        />
        {/* One-time donations layer (accent color on top of monthly) */}
        <div
          className="absolute h-full bg-accent transition-all"
          style={{
            left: `${Math.min(100, funding.monthlyPercent)}%`,
            width: `${Math.min(100 - funding.monthlyPercent, funding.onetimePercent)}%`,
          }}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-primary" />
            <span>Monthly: {funding.monthlyPercent.toFixed(0)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-accent" />
            <span>One-time: {funding.onetimePercent.toFixed(0)}%</span>
          </div>
        </div>
        <div className="text-sm">
          <span className="font-semibold text-foreground">
            ${stats.totalDonations.toFixed(2)}
          </span>{' '}
          donated in the last 30 days
        </div>
      </div>
    </div>
  )
}
