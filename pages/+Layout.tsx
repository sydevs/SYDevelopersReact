import './Layout.css'
import './tailwind.css'
import { Navigation } from '../components/Navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pb-12">{children}</main>
      <footer className="border-t bg-white py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SY Developers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
