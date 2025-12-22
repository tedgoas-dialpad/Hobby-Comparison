import HobbyComparison from './components/HobbyComparison'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Hobby Comparison Tool
          </h1>
          <p className="text-lg text-gray-600">
            Compare up to 3 hobbies across 8 criteria and visualize results in real-time
          </p>
        </header>
        <HobbyComparison />
      </div>
    </div>
  )
}

export default App
