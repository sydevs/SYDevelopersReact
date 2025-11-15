import { useData } from 'vike-react/useData'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert'
import { Button } from '../../components/ui/button'
import { DonationStats } from '../../components/DonationStats'
import { ArrowLeftIcon, HeartIcon, BriefcaseIcon, ArrowRightIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
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

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Sahaj Web Projects</h1>
      <p className="mb-4">This page lists a set of connected digital projects created to help promote Sahaja Yoga.</p>
      <p className="mb-6">
        <a href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back
        </a>
      </p>

      {showSuccess && (
        <Alert className="mb-4 border-blue-200 bg-blue-50">
          <CheckCircleIcon className="h-4 w-4 text-blue-600" />
          <AlertTitle>Donation successful</AlertTitle>
          <AlertDescription>Thank you for your contribution!</AlertDescription>
        </Alert>
      )}

      {showCancel && (
        <Alert className="mb-4 border-red-200 bg-red-50">
          <XCircleIcon className="h-4 w-4 text-red-600" />
          <AlertTitle>Donation cancelled</AlertTitle>
          <AlertDescription>Your donation has been cancelled, no money will be charged.</AlertDescription>
        </Alert>
      )}

      <div className="border-t border-red-200 pt-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold text-red-600">Fundraising</h2>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Target</div>
            <div className="text-2xl font-bold">${totalExpenses.toFixed(0)}</div>
            <div className="text-xs text-muted-foreground">Per Month</div>
          </div>
        </div>

        <p className="mb-4">
          A great deal of time is contributed voluntarily to make these projects a reality. However there are also costs to running these services (for images, videos, web addresses, etc). As more seekers and yogis use the site, the costs will also slowly grow.
        </p>

        <div className="my-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="text-center">
            <p className="mb-2 text-sm font-medium">Monthly Donation</p>
            <script async src="https://js.stripe.com/v3/buy-button.js"></script>
            <stripe-buy-button
              buy-button-id="buy_btn_1STkr7K5E1L5TSuqjuFbdUKO"
              publishable-key="pk_live_51HQqi7K5E1L5TSuqteyptETR4hx20IfM3XD1OOjCR9iu9SGDqMMpxW7ahtoDtkSE9GIZ6a8kSOsEluBHiqmR4shl00VTFGdkvi"
            />
          </div>

          <div className="text-muted-foreground">or</div>

          <div className="text-center">
            <p className="mb-2 text-sm font-medium">One-Time Donation</p>
            <script async src="https://js.stripe.com/v3/buy-button.js"></script>
            <stripe-buy-button
              buy-button-id="buy_btn_1STk1QK5E1L5TSuqNdkTV2km"
              publishable-key="pk_live_51HQqi7K5E1L5TSuqteyptETR4hx20IfM3XD1OOjCR9iu9SGDqMMpxW7ahtoDtkSE9GIZ6a8kSOsEluBHiqmR4shl00VTFGdkvi"
            />
          </div>
        </div>

        <p className="mb-4">
          If you are able to contribute some money to the upkeep of these projects, it will be much appreciated. You can learn more about each project in the list below.
        </p>

        <p className="text-sm italic mb-6">
          As always, Sahaja Yoga is completely free of charge. We are collecting donations for this project only to cover the costs of running it. All yogis involved in the project volunteer their time without renumeration.
        </p>

        <DonationStats totalExpenses={totalExpenses} />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 text-sm">Contribute Your Time</h3>
              <p className="text-sm mb-3">
                We also need help making these projects a success. Help us with photography, writing, editing, social media, graphic design, coding, and more.
              </p>
              <a href="/jobs">
                <Button variant="outline" size="sm" className="w-full">
                  <BriefcaseIcon className="h-4 w-4 mr-2" />
                  View Jobs
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 text-sm">Partnership</h3>
              <p className="text-sm mb-3">
                We Meditate is an international project, run by yogis from various countries for the advancement of Sahaja Yoga online. For legal and accounting purposes, we have partnered with <strong>Life Eternal Trust UK</strong>, which was started by Shri Mataji in 1985.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-red-600 border-t pt-6 mb-4">Expenses by Project</h2>
      <div className="space-y-4">
        {projects.map((project) => {
          if (!project.identifier) return null
          const monthlyExpenses = project.expenses.reduce((sum, e) => sum + (e.monthly || 0), 0)

          return (
            <Card key={project.id}>
              <CardHeader className="flex flex-row items-center gap-4 pb-3">
                <img src={project.icon[0]?.url} alt={project.name} className="h-12 w-12 rounded" />
                <div className="flex-1">
                  <CardTitle>{project.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {monthlyExpenses > 0 ? (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="expenses" className="border-none">
                      <AccordionTrigger className="hover:no-underline">
                        <span className="text-sm">
                          Project Expenses: <strong>${monthlyExpenses.toFixed(0)}</strong> / month
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <table className="w-full text-sm">
                          <tbody>
                            {project.expenses
                              .filter((e) => e.monthly > 0)
                              .map((expense, i) => (
                                <tr key={i} className="border-b last:border-0">
                                  <td className="py-2">
                                    <div className="font-medium">{expense.name}</div>
                                    <div className="text-xs text-muted-foreground">{expense.description}</div>
                                  </td>
                                  <td className="py-2 text-right">
                                    {expense.type === 'Monthly' ? (
                                      <div>
                                        <div>${expense.monthly.toFixed(2)}</div>
                                        <div className="text-xs text-muted-foreground">/ month</div>
                                      </div>
                                    ) : (
                                      <div>
                                        <div>${expense.yearly.toFixed(2)}</div>
                                        <div className="text-xs text-muted-foreground">/ year</div>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <p className="text-sm">Project Expenses: $0</p>
                )}

                <div className="mt-3">
                  <a href={`/${project.identifier}`}>
                    <Button variant="outline" size="sm">
                      Learn More
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="border-t mt-8 pt-6">
        <h3 className="text-lg font-semibold mb-2">Other Sahaj Web Projects</h3>
        <p className="mb-4 text-sm">
          Above are the projects currently managed in connection with sydevelopers.com. You can find a complete list of high quality digital Sahaj projects on the resources website.
        </p>
        <a href="http://www.sahajaresources.com/digital" target="_blank" rel="noopener noreferrer">
          <Button variant="default">
            All web projects
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </Button>
        </a>
      </div>
    </div>
  )
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': {
        'buy-button-id': string
        'publishable-key': string
      }
    }
  }
}
