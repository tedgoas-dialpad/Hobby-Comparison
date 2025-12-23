import HobbyComparison from './components/HobbyComparison'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 pt-12 pb-24 px-4 sm:px-6 lg:px-8 nb-dots">
        <div className="max-w-7xl mx-auto">
          <HobbyComparison />
        </div>
      </div>
      <footer className="bg-[var(--nb-yellow)] text-black text-center text-md py-16 font-bold w-full border-t-12 border-black">
        Built with cto.new, Windsurf, Claude Code, and hand-coding.
      </footer>
    </div>
  )
}

export default App
