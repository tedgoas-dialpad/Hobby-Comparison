import HobbyComparison from './components/HobbyComparison'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 pt-12 pb-24 px-4 sm:px-6 lg:px-8 nb-dots">
        <div className="max-w-7xl mx-auto">
          <HobbyComparison />
        </div>
      </div>
      <footer className="bg-[var(--nb-yellow)] text-black text-center text-md py-16 font-bold w-full border-t-4 border-black relative">
        <div className="max-w-7xl mx-auto relative">
          {/* Circle inside footer on left */}
          <div
            className="absolute -top-8 left-48 w-16 h-16 rounded-full border-4 border-black"
            style={{ backgroundColor: 'var(--nb-red)' }}
          ></div>

          {/* Square hanging off top right */}
          <div
            className="absolute -top-22 right-24 w-12 h-12 border-4 border-black rotate-12"
            style={{ backgroundColor: 'var(--nb-blue)' }}
          ></div>

          {/* Star near the square */}
          <div className="absolute -top-4 right-60 rotate-[-15deg]">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <polygon
                points="40,8 46,28 66,28 50,40 56,60 40,48 24,60 30,40 14,28 34,28"
                fill="var(--nb-green)"
                stroke="black"
                strokeWidth="4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>

          Built with cto.new, Windsurf, Claude Code, and hand-coding.
        </div>
      </footer>
    </div>
  )
}

export default App
