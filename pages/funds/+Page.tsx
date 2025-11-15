import { useData } from 'vike-react/useData'
import { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert'
import { Button } from '../../components/ui/button'
import { DonationStats } from '../../components/DonationStats'
import { RecentDonations } from '../../components/RecentDonations'
import { BriefcaseIcon, ArrowRightIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
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
      <h1 className="mb-2 text-3xl font-bold">Sahaj Web Projects</h1>
      <p className="mb-8">
        This page lists a set of connected digital projects created to help promote Sahaja Yoga.
      </p>

      {showSuccess && (
        <Alert className="mb-4 border-indigo-200 bg-indigo-50">
          <CheckCircleIcon className="h-4 w-4 text-sky-600" />
          <AlertTitle>Donation successful</AlertTitle>
          <AlertDescription>Thank you for your contribution!</AlertDescription>
        </Alert>
      )}

      {showCancel && (
        <Alert className="mb-4 border-red-200 bg-red-50">
          <XCircleIcon className="h-4 w-4 text-red-400" />
          <AlertTitle>Donation cancelled</AlertTitle>
          <AlertDescription>
            Your donation has been cancelled, no money will be charged.
          </AlertDescription>
        </Alert>
      )}

      <div className="border-t border-red-200 pt-6 mb-6">
        <div className="mb-6 flex items-start justify-between">
          <h2 className="text-2xl font-bold text-red-400">Fundraising</h2>
          <div className="text-right">
            <div className="text-xs text-gray-600">Target</div>
            <div className="text-3xl font-bold">${totalExpenses.toFixed(0)}</div>
            <div className="text-xs text-gray-600">Per Month</div>
          </div>
        </div>

        <p className="mb-4">
          A great deal of time is contributed voluntarily to make these projects a reality. However
          there are also costs to running these services (for images, videos, web addresses, etc).
          As more seekers and yogis use the site, the costs will also slowly grow.
        </p>

        <div className="float-right ml-4 mb-4 w-64 rounded border bg-gray-50 p-4">
          <h3 className="mb-2 text-sm font-semibold">Contribute Your Time</h3>
          <p className="mb-3 text-sm text-gray-600">
            We also need help making these projects a success. Help us with photography, writing,
            editing, social media, graphic design, coding, and more.
          </p>
          <a href="/jobs">
            <Button variant="outline" size="sm" className="w-full">
              <BriefcaseIcon className="h-4 w-4 mr-2" />
              View Jobs
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </div>

        <p className="mb-4">
          If you are able to contribute some money to the upkeep of these projects, it will be much
          appreciated. You can learn more about each project in the list below.
        </p>

        <p className="mb-6 text-sm italic text-gray-600">
          As always, Sahaja Yoga is completely free of charge. We are collecting donations for this
          project only to cover the costs of running it. All yogis involved in the project volunteer
          their time without renumeration.
        </p>

        <div className="clear-both my-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="text-center">
            <p className="mb-2 text-sm font-medium">Monthly Donation</p>
            <Button asChild>
              <a
                href="https://donate.stripe.com/14A14ogjdfoI6zjfut33W03"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate Monthly
              </a>
            </Button>
          </div>

          <div className="text-gray-600">or</div>

          <div className="text-center">
            <p className="mb-2 text-sm font-medium">One-Time Donation</p>
            <Button asChild>
              <a
                href="https://donate.stripe.com/eVqdRa9UP90kaPzeqp33W02"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate Once
              </a>
            </Button>
          </div>
        </div>

        <DonationStats totalExpenses={totalExpenses} />

        <div className="mt-6">
          <RecentDonations />
        </div>
      </div>

      <h2 className="border-t pt-6 mb-4 text-2xl font-bold text-red-400">Expenses by Project</h2>
      <div className="space-y-4">
        {projects.map((project) => {
          if (!project.identifier) return null
          const monthlyExpenses = project.expenses.reduce((sum, e) => sum + (e.monthly || 0), 0)

          return (
            <div key={project.id} className="flex gap-4 border-b pb-4 last:border-0">
              <img src={project.icon[0]?.url} alt={project.name} className="h-12 w-12 rounded" />
              <div className="flex-1">
                <h3 className="font-semibold">{project.name}</h3>
                {monthlyExpenses > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="expenses" className="border-none">
                      <AccordionTrigger className="py-2 hover:no-underline">
                        <span className="text-sm text-gray-600">
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
                                    <div className="text-xs text-gray-600">{expense.description}</div>
                                  </td>
                                  <td className="py-2 text-right">
                                    {expense.type === 'Monthly' ? (
                                      <div>
                                        <div>${expense.monthly.toFixed(2)}</div>
                                        <div className="text-xs text-gray-600">/ month</div>
                                      </div>
                                    ) : (
                                      <div>
                                        <div>${expense.yearly.toFixed(2)}</div>
                                        <div className="text-xs text-gray-600">/ year</div>
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
                  <p className="text-sm text-gray-600">Project Expenses: $0</p>
                )}

                <div className="mt-2">
                  <a href={`/projects/${project.identifier}`}>
                    <Button variant="outline" size="sm">
                      Learn More
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t mt-8 pt-6">
        <h3 className="mb-2 text-lg font-semibold">Other Sahaj Web Projects</h3>
        <p className="mb-4 text-sm text-gray-600">
          Above are the projects currently managed in connection with sydevelopers.com. You can find
          a complete list of high quality digital Sahaj projects on the resources website.
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
