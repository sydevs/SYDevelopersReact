import type { DonationStats, FundingCalculation } from '../types/stripe'

export async function fetchDonationStats(): Promise<DonationStats | null> {
  try {
    const response = await fetch('/api/donation-stats')
    if (!response.ok) {
      console.error('Failed to fetch donation stats:', response.statusText)
      return null
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching donation stats:', error)
    return null
  }
}

export function calculateFunding(
  totalExpenses: number,
  stats: DonationStats | null,
): FundingCalculation {
  if (!stats || totalExpenses === 0) {
    return {
      totalExpenses,
      monthlyPercent: 0,
      onetimePercent: 0,
      totalPercent: 0,
    }
  }

  const monthlyPercent = Math.min((stats.monthlyDonations / totalExpenses) * 100, 100)
  const onetimePercent = Math.min(
    (stats.onetimeDonations / totalExpenses) * 100,
    100 - monthlyPercent,
  )

  return {
    totalExpenses,
    monthlyPercent,
    onetimePercent,
    totalPercent: monthlyPercent + onetimePercent,
  }
}

export function formatCurrency(amount: number, currency: string = 'usd'): string {
  const units: Record<string, string> = {
    usd: '$',
    eur: '€',
    gbp: '£',
    inr: '₹',
    rub: '₽',
    cad: 'CA$',
    aud: 'A$',
  }

  return `${units[currency.toLowerCase()] || '$'}${amount.toFixed(2)}`
}
