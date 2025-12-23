import HobbyComparison from './components/HobbyComparison'

function App() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 nb-dots">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 relative">
          <div className="inline-block bg-white border-4 border-black nb-shadow-lg px-5 py-3 nb-sticker">
            <h1 className="text-5xl font-black tracking-tighter">
              Hobby Comparison
            </h1>
          </div>
        </header>
        <HobbyComparison />
      </div>
    </div>
  )
}

export default App
