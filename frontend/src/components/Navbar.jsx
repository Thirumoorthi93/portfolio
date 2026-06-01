import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Products', href: '#products' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="navbar__container container">
          <a href="#home" className="navbar__logo" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>
            <img src="/logo.png" alt="6zen" className="navbar__logo-img" />
          </a>

          <div className="navbar__links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`navbar__link ${activeSection === link.href.slice(1) ? 'navbar__link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              >
                {link.name}
                <span className="navbar__link-indicator" />
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="navbar__cta btn-primary"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
          >
            Get Started
            <ChevronRight size={16} />
          </a>

          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="mobile-menu__inner">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`mobile-menu__link ${activeSection === link.href.slice(1) ? 'mobile-menu__link--active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="btn-primary mobile-menu__cta"
                onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Get Started
                <ChevronRight size={16} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
