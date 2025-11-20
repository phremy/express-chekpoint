import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { IconMenu, IconX } from './Icons';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu automatically on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const getLinkProps = (path: string, isMobile: boolean = false) => {
    const isActive = location.pathname === path;
    
    // Base styles
    let classes = isMobile 
      ? "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200" 
      : "px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md";

    // Active/Inactive styles
    if (isActive) {
      classes += isMobile 
        ? " bg-indigo-50 text-indigo-700" 
        : " text-indigo-600 bg-indigo-50 md:bg-transparent font-bold";
    } else {
      classes += isMobile 
        ? " text-gray-700 hover:bg-gray-50" 
        : " text-gray-600 hover:text-indigo-600 hover:bg-gray-50 md:hover:bg-transparent";
    }

    return {
      to: path,
      className: classes,
      'aria-current': isActive ? 'page' as const : undefined,
    };
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip Navigation Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-indigo-600 focus:font-bold focus:shadow-lg"
      >
        Aller au contenu principal
      </a>

      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50" aria-label="Navigation principale">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex-shrink-0 flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 p-1" 
                aria-label="Nova Corp - Retour à l'accueil"
              >
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg" aria-hidden="true">
                  N
                </div>
                <span className="font-bold text-xl text-slate-900 tracking-tight">Nova Corp</span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center">
              <ul className="flex space-x-8">
                <li>
                  <Link {...getLinkProps('/')}>Accueil</Link>
                </li>
                <li>
                  <Link {...getLinkProps('/services')}>Nos services</Link>
                </li>
                <li>
                  <Link {...getLinkProps('/contact')}>Nous contacter</Link>
                </li>
              </ul>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isMenuOpen ? <IconX className="block h-6 w-6" aria-hidden="true" /> : <IconMenu className="block h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200" id="mobile-menu">
            <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <li>
                <Link {...getLinkProps('/', true)} onClick={() => setIsMenuOpen(false)}>Accueil</Link>
              </li>
              <li>
                <Link {...getLinkProps('/services', true)} onClick={() => setIsMenuOpen(false)}>Nos services</Link>
              </li>
              <li>
                <Link {...getLinkProps('/contact', true)} onClick={() => setIsMenuOpen(false)}>Nous contacter</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-bold text-lg">Nova Corp Solutions</span>
              <p className="text-slate-400 text-sm mt-1">L'excellence digitale au service de votre entreprise.</p>
            </div>
            <div className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} Nova Corp. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;