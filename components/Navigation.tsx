import { Home, Heart, Briefcase } from 'lucide-react'
import { usePageContext } from 'vike-react/usePageContext'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const pageContext = usePageContext()
  const pathname = pageContext.urlPathname

  // Hide navigation on the root page
  if (pathname === '/') {
    return null
  }

  const getSelectedKey = () => {
    if (pathname === '/') return 'projects'
    if (pathname.startsWith('/funds')) return 'donations'
    if (pathname.startsWith('/jobs')) return 'jobs'
    return 'projects'
  }

  const handleNavigation = (key: string) => {
    const routes = {
      projects: '/',
      donations: '/funds',
      jobs: '/jobs',
    }
    const route = routes[key as keyof typeof routes]
    if (route) {
      window.location.href = route
    }
  }

  const selected = getSelectedKey()

  return (
    <nav className="fixed bottom-0 w-full sm:bottom-auto sm:top-0 z-10 bg-background border-t sm:border-none shadow-md p-4">
      <div className="max-w-md mx-auto flex gap-2 justify-center">
        <Button
          variant={selected === 'projects' ? 'default' : 'ghost'}
          onClick={() => handleNavigation('projects')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Home className="h-4 w-4" />
          <span>Projects</span>
        </Button>
        <Button
          variant={selected === 'donations' ? 'default' : 'ghost'}
          onClick={() => handleNavigation('donations')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Heart className="h-4 w-4" />
          <span>Donate</span>
        </Button>
        <Button
          variant={selected === 'jobs' ? 'default' : 'ghost'}
          onClick={() => handleNavigation('jobs')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Briefcase className="h-4 w-4" />
          <span>Volunteer</span>
        </Button>
      </div>
    </nav>
  )
}
