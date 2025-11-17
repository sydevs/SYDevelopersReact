import './tailwind.css'
import { Navigation } from '../components/Navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="container space-y-12 py-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-24 sm:mb-6 sm:mt-24">
        {children}
      </main>
    </>
  )
}
