import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Send,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import axios from 'axios';
import Select from 'react-select';
import './ContactSection.css';

const API_URL = 'http://localhost:8001/api';

const serviceOptions = [
  'ERP Solutions',
  'HRMS',
  'Task Management',
  'Tally Integration',
  'Custom Software',
  'Consulting',
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_interest: [],
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setForm((prev) => ({
      ...prev,
      service_interest: selectedOptions ? selectedOptions.map(opt => opt.value) : [],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Please enter a valid email';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setServerError('');

    try {
      await axios.post(`${API_URL}/contact`, form);
      setStatus('success');
      setForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        service_interest: [],
        message: '',
      });
    } catch (err) {
      setStatus('error');
      if (err.response?.data?.errors) {
        setErrors(
          Object.fromEntries(
            Object.entries(err.response.data.errors).map(([k, v]) => [k, v[0]])
          )
        );
      } else {
        setServerError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="contact__bg-glow" />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">
            Let's Build Something <span className="gradient-text">Extraordinary</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let's discuss how we can help transform
            your business with the right technology solutions.
          </p>
        </motion.div>

        <div className="contact__grid">
          {/* Left — Info */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="contact__info-card glass-card">
              <MapPin size={22} className="contact__info-icon" />
              <div>
                <h4>Our Office</h4>
                <p>No. 53/25, Periyar Street,<br />Muthipalayam, Thondamuthur,<br />Coimbatore - 641 109</p>
              </div>
            </div>

            <div className="contact__info-card glass-card">
              <Mail size={22} className="contact__info-icon" />
              <div>
                <h4>Email Us</h4>
                <p>info@sixthzen.com</p>
              </div>
            </div>

            <div className="contact__info-card glass-card">
              <Phone size={22} className="contact__info-icon" />
              <div>
                <h4>Call Us</h4>
                <p>+91 94877 23577<br />Mon - Sat, 9AM - 7PM</p>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="contact__form-wrapper glass-card"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {status === 'success' ? (
              <div className="contact__success">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle2 size={64} className="contact__success-icon" />
                </motion.div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button
                  className="btn-secondary"
                  onClick={() => setStatus('idle')}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="contact__error">{errors.name}</span>}
                  </div>

                  <div className="contact__field">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="contact__error">{errors.email}</span>}
                  </div>
                </div>

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact__field">
                    <label htmlFor="contact-company">Company Name</label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-service">Service Interest</label>
                  <Select
                    isMulti
                    isSearchable
                    options={serviceOptions.map(opt => ({ value: opt, label: opt }))}
                    value={form.service_interest.map(opt => ({ value: opt, label: opt }))}
                    onChange={handleSelectChange}
                    placeholder="Search and select services..."
                    className="contact__select-container"
                    classNamePrefix="contact__select"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        background: 'rgba(255, 255, 255, 0.04)',
                        borderColor: state.isFocused ? '#6366f1' : 'rgba(255, 255, 255, 0.06)',
                        boxShadow: state.isFocused ? '0 0 0 3px rgba(99, 102, 241, 0.12)' : 'none',
                        color: '#f1f5f9',
                        padding: '2px',
                        '&:hover': {
                          borderColor: state.isFocused ? '#6366f1' : 'rgba(255, 255, 255, 0.12)',
                        }
                      }),
                      menu: (base) => ({
                        ...base,
                        background: '#12121e',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                        color: '#f1f5f9',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        }
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor: 'rgba(99, 102, 241, 0.15)',
                        borderRadius: '4px',
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: '#a5b4fc',
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        color: '#a5b4fc',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(239, 68, 68, 0.2)',
                          color: '#ef4444',
                        }
                      }),
                      input: (base) => ({
                        ...base,
                        color: '#f1f5f9',
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: '#64748b',
                      })
                    }}
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-message">Your Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className={errors.message ? 'error' : ''}
                  />
                  {errors.message && <span className="contact__error">{errors.message}</span>}
                </div>

                {serverError && (
                  <div className="contact__server-error">
                    <AlertCircle size={16} />
                    {serverError}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary contact__submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={18} className="contact__spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
