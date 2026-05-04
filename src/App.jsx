import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StructuredData from './components/StructuredData'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import ScrollControls from './components/ScrollControls'

// Code-splitting des pages (lazy load)
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const DevenirChauffeur = lazy(() => import('./pages/DevenirChauffeur'))
const Services = lazy(() => import('./pages/Services'))
const Contact = lazy(() => import('./pages/Contact'))
const Download = lazy(() => import('./pages/Download'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))

export default function App() {
  return (
    <div className="bg-white text-gray-900">
      <StructuredData />
      <Navbar />
      <main id="main-content" className="pt-navbar">
        <Suspense fallback={<div className="py-20 text-center text-gray-600">Chargement…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/devenir-chauffeur" element={<DevenirChauffeur />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/download" element={<Download />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/confidentialite" element={<PrivacyPolicy />} />
            <Route path="/cgu" element={<TermsOfService />} />
          </Routes>
        </Suspense>
      </main>
      <ScrollControls />
      <Footer />
    </div>
  )
}

