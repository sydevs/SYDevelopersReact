import './tailwind.css'
import { Navigation } from '../components/Navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 my-6">{children}</main>
    </>
  )
}
