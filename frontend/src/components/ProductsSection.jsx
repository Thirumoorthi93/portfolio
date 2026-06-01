import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Layers,
  BarChart3,
  Shield,
  Workflow,
  Monitor,
  Smartphone,
  ArrowRight,
} from 'lucide-react';
import './ProductsSection.css';

const products = [
  {
    name: '6zen ERP Suite',
    tagline: 'Complete Enterprise Resource Planning',
    description:
      'A comprehensive ERP solution covering procurement, inventory, production planning, quality control, sales, and financial management — all in one powerful platform.',
    features: [
      { icon: Layers, text: 'Multi-module Architecture' },
      { icon: BarChart3, text: 'Real-time Dashboards' },
      { icon: Shield, text: 'Role-based Access Control' },
      { icon: Workflow, text: 'Custom Workflow Engine' },
    ],
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    accentColor: '#6366f1',
  },
  {
    name: '6zen HRMS',
    tagline: 'People Management Reimagined',
    description:
      'End-to-end human resource management with biometric attendance, payroll processing, leave tracking, performance reviews, and employee self-service.',
    features: [
      { icon: Monitor, text: 'Employee Self-Service Portal' },
      { icon: BarChart3, text: 'Payroll & Compliance' },
      { icon: Smartphone, text: 'Mobile Attendance' },
      { icon: Shield, text: 'Data Privacy Compliant' },
    ],
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    accentColor: '#8b5cf6',
  },
  {
    name: '6zen TaskFlow',
    tagline: 'Intelligent Project Management',
    description:
      'Streamline team collaboration with smart task tracking, sprint planning, workload distribution, and automated progress reporting across all projects.',
    features: [
      { icon: Workflow, text: 'Kanban & Gantt Views' },
      { icon: Layers, text: 'Multi-project Support' },
      { icon: BarChart3, text: 'Team Analytics' },
      { icon: Monitor, text: 'Client Collaboration' },
    ],
    gradient: 'linear-gradient(135deg, #22d3ee, #6366f1)',
    accentColor: '#22d3ee',
  },
];

const fadeVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.2, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="products" className="section products" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Products</span>
          <h2 className="section-title">
            Built for <span className="gradient-text">Scale & Speed</span>
          </h2>
          <p className="section-subtitle">
            Our flagship products are engineered for performance, designed
            for simplicity, and built to grow with your business.
          </p>
        </motion.div>

        <div className="products__list">
          {products.map((product, i) => (
            <motion.div
              key={i}
              className="product-card"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeVariant}
              custom={i}
            >
              <div className="product-card__content">
                <div className="product-card__badge" style={{ background: product.gradient }}>
                  {product.tagline}
                </div>
                <h3 className="product-card__name">{product.name}</h3>
                <p className="product-card__description">{product.description}</p>

                <div className="product-card__features">
                  {product.features.map((feat, j) => (
                    <div key={j} className="product-card__feature">
                      <feat.icon size={18} style={{ color: product.accentColor }} />
                      <span>{feat.text}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="btn-primary product-card__cta"
                  onClick={() => scrollTo('#contact')}
                >
                  Learn More
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="product-card__visual">
                <div
                  className="product-card__mockup"
                  style={{ '--product-gradient': product.gradient }}
                >
                  <div className="product-card__mockup-header">
                    <div className="product-card__mockup-dots">
                      <span /><span /><span />
                    </div>
                    <span className="product-card__mockup-title">{product.name}</span>
                  </div>
                  <div className="product-card__mockup-body">
                    <div className="product-card__mockup-sidebar">
                      {[...Array(5)].map((_, k) => (
                        <div key={k} className="product-card__mockup-menu-item" />
                      ))}
                    </div>
                    <div className="product-card__mockup-content">
                      <div className="product-card__mockup-card" />
                      <div className="product-card__mockup-card" />
                      <div className="product-card__mockup-chart" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
