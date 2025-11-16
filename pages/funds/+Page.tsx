import { useData } from 'vike-react/useData'
import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { DonationStats } from '../../components/DonationStats'
import { RecentDonations } from '../../components/RecentDonations'
import { CheckCircle2, XCircle, Briefcase, ExternalLink } from 'lucide-react'
import type { Data } from './+data'

export default function Page() {
  const { projects, totalExpenses } = useData<Data>()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showCancel, setShowCancel] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    if (params.get('callback') === 'success') setShowSuccess(true)
    if (params.get('callback') === 'cancel') setShowCancel(true)
  }, [])

  const handleDonation = (type: 'monthly' | 'onetime') => {
    const donationLinks = {
      monthly: 'https://donate.stripe.com/14A14ogjdfoI6zjfut33W03',
      onetime: 'https://donate.stripe.com/eVqdRa9UP90kaPzeqp33W02',
    }
    window.open(donationLinks[type], '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {/* Hero Section */}
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src="/images/logo.webp" alt="Sahaj Web Projects Logo" />
        </Avatar>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Sahaj Web Funding</h1>
          <p className="text-muted-foreground">Donate to fund projects that spread Sahaja Yoga</p>
        </div>
      </div>

      {/* Success/Cancel Alerts */}
      {showSuccess && (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Donation successful</AlertTitle>
          <AlertDescription>
            Thank you for your contribution! Your support helps us spread Sahaja Yoga.
          </AlertDescription>
        </Alert>
      )}

      {showCancel && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Donation cancelled</AlertTitle>
          <AlertDescription>
            Your donation has been cancelled, no money will be charged.
          </AlertDescription>
        </Alert>
      )}

      {/* Fundraising Context */}
      <div className="prose prose-sm max-w-none space-y-4">
        <p className="text-muted-foreground">
          A great deal of time is contributed voluntarily to make these projects a reality. However,
          there are also costs to running these services (for images, videos, web addresses, etc).
          As more seekers and yogis use the site, the costs will also slowly grow.
        </p>

        <p className="text-muted-foreground">
          As always, Sahaja Yoga is completely free of charge. We are collecting donations for this
          project only to cover the costs of running it. All yogis involved in the project volunteer
          their time without renumeration.
        </p>
      </div>

      {/* Funding Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">${totalExpenses.toFixed(0)}</span>
            <span className="text-lg text-muted-foreground">/ month</span>
          </CardTitle>
          <CardDescription>Monthly operating costs for all projects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <DonationStats totalExpenses={totalExpenses} />

          {/* Donation CTA */}
          <Popover>
            <PopoverTrigger asChild>
              <Button size="lg" className="w-full text-lg h-12">
                Make a Donation
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="font-semibold">Choose Donation Type</h3>
                <div className="space-y-2">
                  <Button
                    onClick={() => handleDonation('monthly')}
                    variant="default"
                    className="w-full justify-start"
                  >
                    Monthly Donation
                  </Button>
                  <Button
                    onClick={() => handleDonation('onetime')}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    One-Time Donation
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row items-start gap-4">
        {/* Recent Donations */}
        <div className="basis-1/2 w-full">
          <RecentDonations />
        </div>

        {/* Volunteer CTA */}
        <Alert className="basis-1/2">
          <Briefcase className="h-4 w-4" />
          <AlertTitle>Contribute Your Time</AlertTitle>
          <AlertDescription className="mt-2 flex flex-col gap-3">
            <p>
              We also need help making these projects a success. Help us with photography, writing,
              editing, social media, graphic design, coding, and more.
            </p>
            <Button asChild variant="outline" className="w-fit">
              <a href="/jobs">View Available Positions</a>
            </Button>
          </AlertDescription>
        </Alert>
      </div>

      <Separator />

      {/* Expenses by Project */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Expenses by Project</h2>

        <Accordion type="multiple" className="space-y-4">
          {projects.map((project) => {
            if (!project.identifier) return null
            const monthlyExpenses = project.expenses.reduce((sum, e) => sum + (e.monthly || 0), 0)

            if (monthlyExpenses === 0) return null

            return (
              <AccordionItem key={project.id} value={project.id} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span className="font-semibold">{project.name}</span>
                    <span className="text-muted-foreground">
                      ${monthlyExpenses.toFixed(2)} / month
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4">
                    <Table>
                      <TableBody>
                        {project.expenses
                          .filter((e) => e.monthly > 0)
                          .map((expense, i) => (
                            <TableRow key={i}>
                              <TableCell className="py-2">
                                <div>
                                  <div className="text-sm font-medium">{expense.name}</div>
                                  {expense.description && (
                                    <div className="text-xs text-muted-foreground">
                                      {expense.description}
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-right py-2">
                                {expense.type === 'Monthly' ? (
                                  <div>
                                    <div className="text-sm font-semibold">
                                      ${expense.monthly.toFixed(2)}
                                    </div>
                                    <div className="text-xs text-muted-foreground">/ month</div>
                                  </div>
                                ) : (
                                  <div>
                                    <div className="text-sm font-semibold">
                                      ${expense.yearly.toFixed(2)}
                                    </div>
                                    <div className="text-xs text-muted-foreground">/ year</div>
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>

      {/* Other Projects CTA */}
      <Alert>
        <ExternalLink className="h-4 w-4" />
        <AlertTitle>Other Sahaj Web Projects</AlertTitle>
        <AlertDescription className="mt-2 flex flex-col gap-3">
          <p>
            Above are the projects currently managed in connection with sydevelopers.com. You can
            find a complete list of high quality digital Sahaj projects on the resources website.
          </p>
          <Button asChild variant="outline" className="w-fit">
            <a
              href="http://www.sahajaresources.com/digital"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Web Projects
            </a>
          </Button>
        </AlertDescription>
      </Alert>
    </>
  )
}
