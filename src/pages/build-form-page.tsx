export function BuildFormPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Build Your CV</h1>
      <div className="bg-surface rounded-lg p-6" style={{ boxShadow: 'var(--shadow-md)' }}>
        <form className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-default rounded-md focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'var(--color-border)',
                    '--tw-ring-color': 'var(--color-border-focus)'
                  } as React.CSSProperties}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-default rounded-md focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'var(--color-border)',
                    '--tw-ring-color': 'var(--color-border-focus)'
                  } as React.CSSProperties}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-default rounded-md focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'var(--color-border)',
                    '--tw-ring-color': 'var(--color-border-focus)'
                  } as React.CSSProperties}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-default rounded-md focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'var(--color-border)',
                    '--tw-ring-color': 'var(--color-border-focus)'
                  } as React.CSSProperties}
                  placeholder="New York, NY"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">Professional Summary</h2>
            <textarea
              className="w-full px-3 py-2 border border-default rounded-md focus:outline-none focus:ring-2"
              style={{ 
                borderColor: 'var(--color-border)',
                '--tw-ring-color': 'var(--color-border-focus)'
              } as React.CSSProperties}
              rows={4}
              placeholder="Brief professional summary..."
            />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">Work Experience</h2>
            <button
              type="button"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
            >
              Add Experience
            </button>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">Education</h2>
            <button
              type="button"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
            >
              Add Education
            </button>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-primary">Skills</h2>
            <input
              type="text"
              className="w-full px-3 py-2 border border-default rounded-md focus:outline-none focus:ring-2"
              style={{ 
                borderColor: 'var(--color-border)',
                '--tw-ring-color': 'var(--color-border-focus)'
              } as React.CSSProperties}
              placeholder="Enter skills separated by commas"
            />
          </section>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              className="px-6 py-2 border rounded-md transition-colors"
              style={{ 
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-secondary)',
                backgroundColor: 'var(--color-surface)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-background-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'}
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-success text-white rounded-md hover:bg-success-hover transition-colors"
            >
              Preview CV
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}