import type { EventContext } from '@cloudflare/workers-types'
import Stripe from 'stripe'

export interface Env {
  STRIPE_SECRET_KEY: string
}

export const onRequest = async (context: EventContext<Env, string, Record<string, unknown>>) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  // Handle CORS preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers })
  }

  try {
    const stripe = new Stripe(context.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
    })

    // Fetch balance transactions from last 30 days
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60
    const transactions = await stripe.balanceTransactions.list({
      created: { gte: thirtyDaysAgo },
      type: 'charge',
      limit: 1000,
    })

    // Fetch recent charges for display
    const charges = await stripe.charges.list({
      limit: 10,
    })

    // Calculate monthly vs one-time
    let monthlyDonations = 0
    let onetimeDonations = 0

    transactions.data.forEach((t) => {
      const amount = t.net / 100
      if (t.description?.toLowerCase().includes('subscription')) {
        monthlyDonations += amount
      } else {
        onetimeDonations += amount
      }
    })

    // Format recent charges
    const recentCharges = charges.data.map((c) => ({
      amount: c.amount / 100,
      currency: c.currency,
      country: c.billing_details?.address?.country || 'unknown',
      created: c.created,
    }))

    const data = {
      monthlyDonations,
      onetimeDonations,
      totalDonations: monthlyDonations + onetimeDonations,
      recentCharges,
    }

    return new Response(JSON.stringify(data), { headers })
  } catch (error) {
    console.error('Stripe API Error:', error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers,
      },
    )
  }
}
