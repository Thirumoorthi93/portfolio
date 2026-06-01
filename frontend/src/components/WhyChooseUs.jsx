import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Zap,
  HeartHandshake,
  Puzzle,
  Clock,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import './WhyChooseUs.css';

const reasons = [
  {
    icon: Zap,
    title: 'Rapid Deployment',
    description: 'Go live in weeks, not months. Our modular architecture enables fast rollouts with minimal disruption.',
  },
  {
    icon: HeartHandshake,
    title: 'Dedicated Support',
    description: 'Your success is our priority. Get 24/7 expert support with dedicated account managers.',
  },
  {
    icon: Puzzle,
    title: 'Seamless Integration',
    description: 'Connect with Tally, SAP, QuickBooks, and 100+ tools through our robust API framework.',
  },
  {
    icon: Clock,
    title: 'Future-Proof Tech',
    description: 'Built on modern, scalable architecture using React, Laravel, and cloud-native technologies.',
  },
  {
    icon: TrendingUp,
    title: 'Proven ROI',
    description: 'Our clients see an average 40% improvement in operational efficiency within the first year.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    description: 'Bank-grade security with encryption, RBAC, audit trails, and compliance-ready infrastructure.',
  },
];

const itemVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="why-us" className="section why-us" ref={ref}>
      <div className="why-us__bg-glow" />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Why 6zen</span>
          <h2 className="section-title">
            Why Industry Leaders <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="section-subtitle">
            We combine deep technical expertise with business acumen to deliver
            solutions that truly move the needle.
          </p>
        </motion.div>

        <div className="why-us__grid">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              className="why-us__item"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={itemVariant}
              custom={i}
            >
              <div className="why-us__icon-wrap">
                <reason.icon size={24} />
                <div className="why-us__icon-glow" />
              </div>
              <h3 className="why-us__item-title">{reason.title}</h3>
              <p className="why-us__item-desc">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
