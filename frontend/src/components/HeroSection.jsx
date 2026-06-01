import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import './HeroSection.css';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" ref={ref}>
      {/* Ambient Background */}
      <div className="hero__ambient">
        <motion.div
          className="hero__orb hero__orb--1"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="hero__orb hero__orb--2"
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="hero__orb hero__orb--3"
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -20, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        <div className="hero__grid-pattern" />
      </div>

      <motion.div className="hero__content container" style={{ y: y1, opacity }}>
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Sparkles size={14} />
          <span>Transforming Businesses with Technology</span>
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Build Smarter.
          <br />
          <span className="gradient-text">Scale Faster.</span>
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Enterprise-grade ERP, HRMS, and custom software solutions that empower
          your organization to achieve operational excellence and drive growth.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <button className="btn-primary hero__cta" onClick={() => scrollTo('#contact')}>
            Start Your Project
            <ArrowRight size={18} />
          </button>
          <button className="btn-secondary hero__cta-secondary" onClick={() => scrollTo('#services')}>
            <Play size={16} />
            Explore Services
          </button>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          className="hero__stats"
          style={{ y: y2 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { value: '150+', label: 'Projects Delivered' },
            { value: '50+', label: 'Happy Clients' },
            { value: '8+', label: 'Years Experience' },
            { value: '99.9%', label: 'Uptime SLA' },
          ].map((stat, i) => (
            <div key={i} className="hero__stat glass-card">
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="hero__scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
}
