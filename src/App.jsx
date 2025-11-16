
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import DevenirChauffeur from './pages/DevenirChauffeur'
import Services from './pages/Services'
import Contact from './pages/Contact'
import ScrollControls from './components/ScrollControls'
import Download from './pages/Download'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
  <main className="pt-[44px] md:pt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/devenir-chauffeur" element={<DevenirChauffeur />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/download" element={<Download />} />
        </Routes>
      </main>
      <ScrollControls />
      <Footer />
    </div>
  )
}

