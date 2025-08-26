import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/build-form')({
  component: BuildFormPage,
})

function BuildFormPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Build Your CV</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="New York, NY"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Brief professional summary..."
            />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Experience
            </button>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Education
            </button>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter skills separated by commas"
            />
          </section>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Preview CV
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}