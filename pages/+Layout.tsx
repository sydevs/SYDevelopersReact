import './Layout.css'
import './tailwind.css'
import { Navigation } from '../components/Navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>{children}</main>
    </div>
  )
}
