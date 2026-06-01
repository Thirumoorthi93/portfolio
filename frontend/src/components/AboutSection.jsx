import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Users, Award, Globe } from 'lucide-react';
import './AboutSection.css';

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const numericTarget = parseFloat(target);
    const increment = numericTarget / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {Number.isInteger(parseFloat(target)) ? Math.floor(count) : count.toFixed(1)}
      {suffix}
    </span>
  );
}

const stats = [
  { icon: Target, value: '150', suffix: '+', label: 'Projects Completed', color: '#6366f1' },
  { icon: Users, value: '50', suffix: '+', label: 'Happy Clients', color: '#8b5cf6' },
  { icon: Award, value: '8', suffix: '+', label: 'Years of Excellence', color: '#22d3ee' },
  { icon: Globe, value: '15', suffix: '+', label: 'Industries Served', color: '#34d399' },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="about__glow" />
      <div className="container">
        <div className="about__grid">
          {/* Left — Text */}
          <motion.div
            className="about__text"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUpVariant}
            custom={0}
          >
            <span className="section-label">About 6zen</span>
            <h2 className="section-title">
              Engineering the Future of
              <br />
              <span className="gradient-text">Enterprise Software</span>
            </h2>
            <p className="section-subtitle">
              At 6zen, we don't just build software — we architect digital
              ecosystems that transform how businesses operate. From ERP
              systems to custom integrations, our solutions are built with
              precision, scalability, and your success in mind.
            </p>
            <p className="about__detail">
              Our team of seasoned engineers and consultants brings deep
              domain expertise across manufacturing, retail, finance, and
              logistics — delivering solutions that drive real ROI from
              day one.
            </p>
          </motion.div>

          {/* Right — Stats */}
          <div className="about__stats">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="about__stat-card glass-card"
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={fadeUpVariant}
                custom={i + 1}
              >
                <div
                  className="about__stat-icon"
                  style={{ '--stat-color': stat.color }}
                >
                  <stat.icon size={24} />
                </div>
                <div className="about__stat-content">
                  <span className="about__stat-value">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="about__stat-label">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
