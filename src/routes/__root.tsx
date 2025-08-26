import * as React from 'react'
import { Outlet, createRootRoute, Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              CV Builder
            </Link>
            <div className="flex gap-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                activeProps={{ className: 'text-blue-600' }}
              >
                Home
              </Link>
              <Link
                to="/build-form"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                activeProps={{ className: 'text-blue-600' }}
              >
                Build CV
              </Link>
              <Link
                to="/preview"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                activeProps={{ className: 'text-blue-600' }}
              >
                Preview
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  )
}
