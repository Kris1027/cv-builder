import * as React from 'react'
import { Outlet, createRootRoute, Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <nav className="bg-surface sticky top-0 z-50" style={{ boxShadow: 'var(--shadow-md)' }}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <Link 
              to="/" 
              className="text-2xl font-bold transition-colors"
              style={{ color: 'var(--color-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
            >
              CV Builder
            </Link>
            <div className="flex gap-6">
              <Link
                to="/"
                className="text-secondary hover:text-primary font-medium transition-colors"
                activeProps={{ 
                  style: { color: 'var(--color-primary)' } 
                }}
              >
                Home
              </Link>
              <Link
                to="/build-form"
                className="text-secondary hover:text-primary font-medium transition-colors"
                activeProps={{ 
                  style: { color: 'var(--color-primary)' } 
                }}
              >
                Build CV
              </Link>
              <Link
                to="/preview"
                className="text-secondary hover:text-primary font-medium transition-colors"
                activeProps={{ 
                  style: { color: 'var(--color-primary)' } 
                }}
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
