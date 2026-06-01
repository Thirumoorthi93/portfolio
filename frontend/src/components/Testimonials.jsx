import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'MD, Sterling Manufacturing',
    text: '6zen completely transformed our operations. Their ERP solution gave us real-time visibility across our 5 plants, reducing production delays by 35%. The team\'s technical expertise and commitment is truly world-class.',
    avatar: 'RK',
    color: '#6366f1',
  },
  {
    name: 'Priya Sharma',
    role: 'HR Director, NexGen Corp',
    text: 'The HRMS platform has been a game-changer for our 500+ employee organization. Payroll processing time dropped by 80%, and the self-service portal reduced HR queries dramatically. Brilliant solution!',
    avatar: 'PS',
    color: '#8b5cf6',
  },
  {
    name: 'Amit Patel',
    role: 'CFO, Meridian Industries',
    text: 'The Tally integration was seamless — our accounting team couldn\'t believe how smooth it was. Real-time sync, zero manual entries, and perfect GST compliance. 6zen delivered exactly what they promised.',
    avatar: 'AP',
    color: '#22d3ee',
  },
  {
    name: 'Sneha Reddy',
    role: 'CTO, Innovate Labs',
    text: 'We needed a custom task management system for our distributed team, and 6zen built something extraordinary. The Kanban boards, sprint analytics, and real-time collaboration features are incredibly well-designed.',
    avatar: 'SR',
    color: '#34d399',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section id="testimonials" className="section testimonials" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="section-subtitle">
            Hear from the businesses that have transformed their operations
            with 6zen solutions.
          </p>
        </motion.div>

        <motion.div
          className="testimonials__carousel"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="testimonials__card glass-card">
            <Quote size={40} className="testimonials__quote-icon" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="testimonials__content"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <p className="testimonials__text">{testimonials[current].text}</p>

              </motion.div>
            </AnimatePresence>

            <div className="testimonials__controls">
              <button className="testimonials__btn" onClick={prev} aria-label="Previous testimonial">
                <ChevronLeft size={20} />
              </button>

              <div className="testimonials__dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button className="testimonials__btn" onClick={next} aria-label="Next testimonial">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
