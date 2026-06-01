import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Database,
  Users,
  ListChecks,
  Link2,
  Code2,
  MessageSquareText,
  ArrowUpRight,
} from 'lucide-react';
import './ServicesSection.css';

const services = [
  {
    icon: Database,
    title: 'ERP Solutions',
    description:
      'End-to-end Enterprise Resource Planning systems that streamline procurement, inventory, production, and finance into a unified intelligent platform.',
    features: ['Real-time Analytics', 'Multi-location Support', 'Custom Workflows'],
    color: '#6366f1',
  },
  {
    icon: Users,
    title: 'HRMS',
    description:
      'Comprehensive Human Resource Management covering recruitment, attendance, payroll, performance reviews, and employee self-service portals.',
    features: ['Biometric Integration', 'Leave Management', 'Payroll Automation'],
    color: '#8b5cf6',
  },
  {
    icon: ListChecks,
    title: 'Task Management',
    description:
      'Intelligent task tracking and project management tools with real-time collaboration, milestones, and automated progress reporting.',
    features: ['Kanban Boards', 'Sprint Planning', 'Team Analytics'],
    color: '#22d3ee',
  },
  {
    icon: Link2,
    title: 'Tally Integration',
    description:
      'Seamless bidirectional integration between your ERP and Tally for automated accounting, GST compliance, and financial reconciliation.',
    features: ['Auto Voucher Sync', 'GST Compliance', 'Ledger Mapping'],
    color: '#34d399',
  },
  {
    icon: Code2,
    title: 'Custom Software',
    description:
      'Bespoke software solutions tailored to your unique business processes — from web and mobile apps to complex enterprise systems.',
    features: ['Full-stack Development', 'API Integration', 'Cloud Deployment'],
    color: '#f472b6',
  },
  {
    icon: MessageSquareText,
    title: 'IT Consulting',
    description:
      'Strategic technology consulting to help you architect the right solutions, optimize processes, and build a scalable technology roadmap.',
    features: ['Digital Strategy', 'System Architecture', 'Process Automation'],
    color: '#fbbf24',
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="section services" ref={ref}>
      <div className="services__glow" />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">
            Solutions That <span className="gradient-text">Drive Growth</span>
          </h2>
          <p className="section-subtitle">
            From enterprise-grade ERP systems to seamless Tally integrations,
            we deliver technology solutions that transform your operations.
          </p>
        </motion.div>

        <div className="services__grid">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="service-card glass-card"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={cardVariant}
              custom={i}
              style={{ '--card-color': service.color }}
            >
              <div className="service-card__header">
                <div className="service-card__icon">
                  <service.icon size={24} />
                </div>
                <ArrowUpRight size={18} className="service-card__arrow" />
              </div>

              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>

              <div className="service-card__features">
                {service.features.map((feature, j) => (
                  <span key={j} className="service-card__feature">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="service-card__glow" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
