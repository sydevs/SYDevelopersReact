import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchDonationStats } from '../lib/stripe-client'
import type { DonationStats } from '../types/stripe'

function getRelativeTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp * 1000 // Convert to milliseconds
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)

  if (months > 0) {
    return months === 1 ? '1 month ago' : `${months} months ago`
  }
  if (weeks > 0) {
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
  }
  if (days > 0) {
    return days === 1 ? '1 day ago' : `${days} days ago`
  }
  if (hours > 0) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`
  }
  if (minutes > 0) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`
  }
  return 'Just now'
}

export function RecentDonations() {
  const [stats, setStats] = useState<DonationStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDonationStats()
      .then((data) => setStats(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!stats || !stats.recentCharges.length) {
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Recent Donations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {stats.recentCharges.slice(0, 5).map((charge, i) => (
              <TableRow key={i} className="border-0">
                <TableCell className="py-1.5 px-2 text-xs font-medium">{charge.country}</TableCell>
                <TableCell className="py-1.5 px-2 text-xs text-right">
                  ${charge.amount.toFixed(2)}
                </TableCell>
                <TableCell className="py-1.5 px-2 text-xs text-right text-muted-foreground">
                  {getRelativeTime(charge.created)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
