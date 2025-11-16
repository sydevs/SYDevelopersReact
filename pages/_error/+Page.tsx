import { usePageContext } from 'vike-react/usePageContext'

export default function Page() {
  const { is404 } = usePageContext()
  if (is404) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1>Page Not Found</h1>
        <p>This page could not be found.</p>
      </div>
    )
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1>Internal Error</h1>
      <p>Something went wrong.</p>
    </div>
  )
}
