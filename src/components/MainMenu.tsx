export function MainMenu({ onStartBuilding, onViewExample }: { 
  onStartBuilding: () => void; 
  onViewExample: () => void; 
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">CV Builder</h1>
          <p className="text-xl text-gray-600">Create your professional CV in minutes</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Start Building New CV */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Start Building New CV</h2>
              <p className="text-gray-600 mb-6">Create your personalized CV from scratch with our easy-to-use form</p>
              <button
                onClick={onStartBuilding}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Start Building
              </button>
            </div>
          </div>

          {/* View Example CV */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">View Example CV</h2>
              <p className="text-gray-600 mb-6">See how your CV will look with our professional template</p>
              <button
                onClick={onViewExample}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                View Example
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500">Professional • Modern • Print-Ready</p>
        </div>
      </div>
    </div>
  );
}