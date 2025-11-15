export interface DonationStats {
  monthlyDonations: number
  onetimeDonations: number
  totalDonations: number
  recentCharges: RecentCharge[]
}

export interface RecentCharge {
  amount: number
  currency: string
  country: string
  created: number
}

export interface FundingCalculation {
  totalExpenses: number
  monthlyPercent: number
  onetimePercent: number
  totalPercent: number
}
