import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/preview')({
  component: PreviewPage,
})

function PreviewPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">CV Preview</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Edit CV
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            Download PDF
          </button>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors">
            Print
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
        <header className="border-b-2 border-gray-300 pb-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">John Doe</h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              john@example.com
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +1 234 567 8900
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              New York, NY
            </span>
          </div>
        </header>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">
            Experienced software developer with 5+ years of expertise in full-stack web development. 
            Passionate about creating efficient, scalable solutions and leading cross-functional teams 
            to deliver high-quality products on time.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Work Experience</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-semibold">Senior Software Developer</h3>
                <span className="text-gray-600">2021 - Present</span>
              </div>
              <p className="text-gray-700 font-medium mb-2">Tech Solutions Inc.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Led development of microservices architecture serving 1M+ users</li>
                <li>Mentored junior developers and conducted code reviews</li>
                <li>Improved application performance by 40% through optimization</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-semibold">Full Stack Developer</h3>
                <span className="text-gray-600">2019 - 2021</span>
              </div>
              <p className="text-gray-700 font-medium mb-2">Digital Innovations Ltd.</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Developed and maintained React-based web applications</li>
                <li>Implemented RESTful APIs using Node.js and Express</li>
                <li>Collaborated with UX team to improve user experience</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Education</h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-semibold">Bachelor of Science in Computer Science</h3>
                <span className="text-gray-600">2015 - 2019</span>
              </div>
              <p className="text-gray-700">University of Technology</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">JavaScript</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">TypeScript</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">React</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Node.js</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Python</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">PostgreSQL</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Docker</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">AWS</span>
          </div>
        </section>
      </div>
    </div>
  )
}