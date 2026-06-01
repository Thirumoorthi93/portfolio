import { Globe, Link2, Share2, Camera, ArrowUpRight, Heart } from 'lucide-react';
import './Footer.css';

const footerLinks = {
  Solutions: [
    { name: 'ERP Solutions', href: '#services' },
    { name: 'HRMS', href: '#services' },
    { name: 'Task Management', href: '#services' },
    { name: 'Tally Integration', href: '#services' },
    { name: 'Custom Software', href: '#services' },
  ],
  Company: [
    { name: 'About Us', href: '#about' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Careers', href: '#contact' },
  ],
  Support: [
    { name: 'Contact Us', href: '#contact' },
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'System Status', href: '#' },
  ],
};

const socialLinks = [
  { icon: Share2, href: '#', label: 'Twitter' },
  { icon: Link2, href: '#', label: 'LinkedIn' },
  { icon: Globe, href: '#', label: 'Website' },
  { icon: Camera, href: '#', label: 'Instagram' },
];

export default function Footer() {
  const scrollTo = (href) => {
    if (href === '#') return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <a href="#home" className="footer__logo" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}>
              <img src="/logo.png" alt="6zen" className="footer__logo-img" />
            </a>
            <p className="footer__tagline">
              Transforming businesses with cutting-edge enterprise software
              solutions. Built with precision, designed for growth.
            </p>
            <div className="footer__social">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="footer__social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer__column">
              <h4 className="footer__column-title">{title}</h4>
              <ul className="footer__links">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="footer__link"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }}
                    >
                      {link.name}
                      <ArrowUpRight size={12} className="footer__link-arrow" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} 6zen. All rights reserved.
          </p>
          <p className="footer__made-with">
            Made with <Heart size={14} className="footer__heart" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
