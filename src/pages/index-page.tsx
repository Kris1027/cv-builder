import { Link } from '@tanstack/react-router'

export function IndexPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Professional CV Builder
          </h1>
          <p className="text-xl text-secondary mb-8">
            Create a stunning resume in minutes with our easy-to-use builder
          </p>
          <Link
            to="/build-form"
            className="inline-block px-8 py-3 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary-hover transition-colors"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
            Start Building Your CV
          </Link>
        </header>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-surface rounded-lg p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" style={{ color: 'var(--color-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-primary">Easy to Use</h3>
            <p className="text-secondary">
              Simple form-based interface makes creating your CV quick and intuitive
            </p>
          </div>

          <div className="bg-surface rounded-lg p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
            <div className="w-12 h-12 bg-success-light rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" style={{ color: 'var(--color-success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-primary">Professional Templates</h3>
            <p className="text-secondary">
              Choose from professionally designed templates that get you noticed
            </p>
          </div>

          <div className="bg-surface rounded-lg p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
            <div className="w-12 h-12 bg-purple-light rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" style={{ color: 'var(--color-purple)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-primary">Download & Print</h3>
            <p className="text-secondary">
              Export your CV as PDF or print directly from the preview page
            </p>
          </div>
        </div>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
            <div className="flex-1">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2 text-primary">Fill Out Your Information</h3>
              <p className="text-secondary">Enter your details in our easy-to-use form</p>
            </div>
            <div className="hidden md:block">
              <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2 text-primary">Preview Your CV</h3>
              <p className="text-secondary">See how your CV looks in real-time</p>
            </div>
            <div className="hidden md:block">
              <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2 text-primary">Download & Apply</h3>
              <p className="text-secondary">Download your CV and start applying for jobs</p>
            </div>
          </div>
        </section>

        <div className="mt-16 text-center">
          <p className="text-secondary mb-4">Ready to create your professional CV?</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/build-form"
              className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors"
              style={{ boxShadow: 'var(--shadow-md)' }}
            >
              Get Started Now
            </Link>
            <Link
              to="/preview"
              className="px-6 py-3 bg-surface font-semibold rounded-lg transition-colors border"
              style={{ 
                color: 'var(--color-primary)', 
                borderColor: 'var(--color-primary)',
                boxShadow: 'var(--shadow-md)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-background-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'}
            >
              View Sample CV
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}