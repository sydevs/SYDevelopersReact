import { HomeIcon, HeartIcon, BriefcaseIcon } from '@heroicons/react/24/outline'

export function Navigation() {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2 font-semibold hover:text-blue-600">
            <HomeIcon className="h-5 w-5" />
            <span>SY Developers</span>
          </a>
          <a href="/funds" className="flex items-center gap-2 hover:text-red-600">
            <HeartIcon className="h-5 w-5" />
            <span>Donations</span>
          </a>
          <a href="/jobs" className="flex items-center gap-2 hover:text-teal-600">
            <BriefcaseIcon className="h-5 w-5" />
            <span>Jobs</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
