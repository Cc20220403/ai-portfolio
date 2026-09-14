import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import ProjectSection from './components/ProjectSection'
import FooterSection from './components/FooterSection'

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <NavBar />
      <main>
        <HeroSection />
        <ProjectSection />
      </main>
      <FooterSection />
    </div>
  )
}

export default App
