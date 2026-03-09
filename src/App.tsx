import Navigation from './components/Navigation';
import Hero from './components/Hero';
import LogoCarousel from './components/LogoCarousel';
import About from './components/About';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Companies from './components/Companies';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <Hero />
        <LogoCarousel />
        <About />
        <Experience />
        <Portfolio />
        <Companies />
        <Contact />
      </main>
    </div>
  );
}

export default App;
