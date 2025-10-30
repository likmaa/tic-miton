import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import PLACEHOLDER_LINKS from "../config/links"
import logoUrl from "../assets/logo-tic.png"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Fermer le menu mobile lors du défilement
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuOpen])

  return (
    <nav className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 fixed top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex justify-between items-center h-12 md:h-24 py-1 md:py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={PLACEHOLDER_LINKS.home} className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt="TIC Miton Logo"
                className="h-8 md:h-12 w-auto object-contain"
              />
              <div className="flex flex-col">
                <div className="font-display font-bold text-2xl text-gray-900">
                </div>
                
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">

            <Link to={PLACEHOLDER_LINKS.about} className="font-sans text-gray-900 hover:text-brand-blue transition-colors">
              À Propos
            </Link>
            <Link to={PLACEHOLDER_LINKS.features.all} className="font-sans text-gray-900 hover:text-brand-blue transition-colors">
              Services
            </Link>
            <Link to={PLACEHOLDER_LINKS.driver} className="font-sans text-gray-900 hover:text-brand-blue transition-colors">
              Devenir chauffeur
            </Link>
            <Link to={PLACEHOLDER_LINKS.contact} className="font-sans text-gray-900 hover:text-brand-blue transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile menu button and CTA */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-brand-blue hover:text-brand-blue hover:bg-gray-100/80 transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Menu principal"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>

            {/* Contact CTA (bleu), rapproché du bouton Télécharger */}
            <a
              href={PLACEHOLDER_LINKS.whatsappUrl}
              className="hidden sm:inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-sans font-medium rounded-md text-white bg-[#3650D0] hover:bg-[#2b42b5] active:bg-[#263a9f] transition-all shadow-sm"
            >
              <span className="mr-2">
                <MessageCircle className="h-5 w-5" />
              </span>
              WhatsApp
            </a>

            <a
              href={PLACEHOLDER_LINKS.downloadUrl}
              className="hidden sm:inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-sans font-medium rounded-md text-white bg-brand-orange hover:bg-[#e56a00] active:bg-[#cc5f00] transition-all shadow-sm"
            >
              <span className="mr-2">
                <svg 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                  />
                </svg>
              </span>
              Télécharger l'app
            </a>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div
          id="mobile-menu"
          className={`md:hidden transition-all duration-200 ease-in-out ${
            isMobileMenuOpen 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm shadow-lg rounded-b-md">
            <Link
              to={PLACEHOLDER_LINKS.features.all}
              className="block px-3 py-2 rounded text-base font-sans text-gray-600 hover:text-brand-blue hover:bg-gray-50/80 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to={PLACEHOLDER_LINKS.about}
              className="block px-3 py-2 rounded text-base font-sans text-gray-600 hover:text-brand-blue hover:bg-gray-50/80 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              À Propos
            </Link>
            <Link
              to={PLACEHOLDER_LINKS.driver}
              className="block px-3 py-2 rounded text-base font-sans text-gray-600 hover:text-brand-blue hover:bg-gray-50/80 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Devenir chauffeur
            </Link>
            <Link
              to={PLACEHOLDER_LINKS.contact}
              className="block px-3 py-2 rounded text-base font-sans text-gray-600 hover:text-brand-blue hover:bg-gray-50/80 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
