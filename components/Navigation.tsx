import { HomeIcon, HeartIcon, BriefcaseIcon } from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  HeartIcon as HeartIconSolid,
  BriefcaseIcon as BriefcaseIconSolid,
} from '@heroicons/react/24/solid'
import { usePageContext } from 'vike-react/usePageContext'

export function Navigation() {
  const pageContext = usePageContext()
  const pathname = pageContext.urlPathname

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-8">
          <a
            href="/"
            className={`flex items-center gap-2 ${
              isActive('/')
                ? 'font-bold text-indigo-600'
                : 'font-normal text-gray-700 hover:text-indigo-600'
            }`}
          >
            {isActive('/') ? (
              <HomeIconSolid className="h-5 w-5" />
            ) : (
              <HomeIcon className="h-5 w-5" />
            )}
            <span>Projects</span>
          </a>
          <a
            href="/funds"
            className={`flex items-center gap-2 ${
              isActive('/funds')
                ? 'font-bold text-red-600'
                : 'font-normal text-gray-700 hover:text-red-600'
            }`}
          >
            {isActive('/funds') ? (
              <HeartIconSolid className="h-5 w-5" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
            <span>Donations</span>
          </a>
          <a
            href="/jobs"
            className={`flex items-center gap-2 ${
              isActive('/jobs')
                ? 'font-bold text-teal-600'
                : 'font-normal text-gray-700 hover:text-teal-600'
            }`}
          >
            {isActive('/jobs') ? (
              <BriefcaseIconSolid className="h-5 w-5" />
            ) : (
              <BriefcaseIcon className="h-5 w-5" />
            )}
            <span>Jobs</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
