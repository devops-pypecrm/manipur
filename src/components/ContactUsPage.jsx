"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "@/styles/ContactUsPage.css";

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [pc, setPc] = useState({});

  useEffect(() => {
    fetch("/api/settings/page-contact")
      .then((r) => r.json())
      .then((d) => {
        if (d?.content) setPc(d.content);
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          qualification: "Other",
        }),
      });
      setDone(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setSending(false);
  };

  const contactMethods = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#007AFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      title: "Enquiry Desk",
      primary: "Submit Message",
      secondary: "Direct assistance via our support form",
      link: "#contact-form",
      color: "#007AFF",
      bgColor: "#E3F2FD",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFB800"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      ),
      title: "Admissions Portal",
      primary: "Apply Online",
      secondary: "Online admissions & program details",
      link: "https://admission.miu.edu.in",
      color: "#FFB800",
      bgColor: "#FFF8E1",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#25D366"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      title: "Office Hours",
      primary: "9:30 AM - 4:00 PM",
      secondary: "Monday to Saturday",
      color: "#25D366",
      bgColor: "#E8F5E9",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#EA4335"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      title: "Campus Location",
      primary: "Imphal East, Manipur",
      secondary: pc.address || "MIU Palace, Luwangsangbam Makha Leikai, Imphal East, Manipur-795002",
      color: "#EA4335",
      bgColor: "#FFEBEE",
    },
  ];

  const departments = [
    { icon: "🎓", name: "Admissions", desc: "Admissions & Enrollment Cell" },
    { icon: "📝", name: "Grievance", desc: "Grievance Redressal Committee" },
    { icon: "📋", name: "Verification", desc: "Document Verification Cell" },
  ];

  return (
    <div className="contact-page-new">
      {/* Hero Section */}
      <div
        className="contact-hero-new"
        style={
          pc.heroImage
            ? {
                backgroundImage: `url(${pc.heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <div
          className="contact-hero-bg"
          style={pc.heroImage ? { background: "rgba(0,0,0,0.55)" } : {}}
        ></div>
        <div className="container">
          <nav className="contact-breadcrumb-new">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Contact Us</span>
          </nav>

          <div className="contact-hero-content">
            <span className="contact-badge-new">GET IN TOUCH</span>
            <h1 className="contact-hero-title">Let's Connect</h1>
            <p className="contact-hero-subtitle">
              Have questions? We're here to help you every step of the way.
              Reach out and let's start a conversation.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods Grid */}
      <div className="contact-methods-section">
        <div className="container">
          <div className="contact-methods-grid">
            {contactMethods.map((method, idx) => (
              <div
                key={idx}
                className="contact-method-card"
                style={{ borderTopColor: method.color }}
              >
                <div
                  className="method-icon-wrapper"
                  style={{ background: method.bgColor }}
                >
                  <div className="method-icon">{method.icon}</div>
                </div>
                <h3 className="method-title">{method.title}</h3>
                {method.link ? (
                  <a
                    href={method.link}
                    className="method-primary"
                    style={{ color: method.color }}
                    target={
                      method.link.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      method.link.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {method.primary}
                  </a>
                ) : (
                  <p className="method-primary" style={{ color: method.color }}>
                    {method.primary}
                  </p>
                )}
                <p className="method-secondary">{method.secondary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="contact-main-section">
        <div className="container">
          <div className="contact-main-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <div className="form-header-new">
                <div className="form-icon-badge">✍️</div>
                <h2>Send Us a Message</h2>
                <p>
                  Fill out the form and our team will get back to you shortly
                </p>
              </div>

              {done ? (
                <div className="contact-success-new">
                  <div className="success-animation">
                    <div className="success-checkmark">✓</div>
                  </div>
                  <h3>Message Sent Successfully!</h3>
                  <p>
                    Thank you for contacting us. We've received your message and
                    will respond shortly.
                  </p>
                  <button onClick={() => setDone(false)} className="btn-reset">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-new">
                  <div className="form-grid-2">
                    <div className="form-group-new">
                      <label>
                        <span className="label-icon">👤</span>
                        Full Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="form-group-new">
                      <label>
                        <span className="label-icon">📧</span>
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group-new">
                      <label>
                        <span className="label-icon">📱</span>
                        Phone Number *
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div className="form-group-new">
                      <label>
                        <span className="label-icon">📝</span>
                        Subject
                      </label>
                      <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <div className="form-group-new">
                    <label>
                      <span className="label-icon">💬</span>
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {error && <div className="form-error-new">{error}</div>}

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-submit-new"
                  >
                    {sending ? (
                      <>
                        <span className="btn-spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="btn-arrow">→</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="contact-sidebar">
              {/* Map Card */}
              <div className="sidebar-card map-card-new">
                <div className="sidebar-card-header">
                  <span className="sidebar-icon">📍</span>
                  <h3>Our Location</h3>
                </div>
                <div className="map-wrapper-new">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.496306177151!2d93.90589182670674!3d24.778453448531593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3749261e475627a5%3A0x4387a785b093521a!2sManipur%20International%20University!5e0!3m2!1sen!2sin!4v1780304912783!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MIU Location"
                  />
                </div>
                <div className="map-address">
                  <p>
                    {pc.address ||
                      "MIU Palace, Luwangsangbam Makha Leikai, Imphal East, Manipur-795002"}
                  </p>
                </div>
              </div>

              {/* Office Hours Card */}
              <div className="sidebar-card hours-card-new">
                <div className="sidebar-card-header">
                  <span className="sidebar-icon">🕐</span>
                  <h3>Office Hours</h3>
                </div>
                <div className="hours-list">
                  <div className="hours-item">
                    <span className="hours-day">Monday - Saturday</span>
                    <span className="hours-time">9:30 AM - 4:00 PM</span>
                  </div>
                  <div className="hours-item hours-closed">
                    <span className="hours-day">Sunday</span>
                    <span className="hours-time">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Departments Section */}
      <div className="departments-section">
        <div className="container">
          <div className="section-header-new">
            <h2>Contact by Department</h2>
            <p>Reach out to the specific department for faster assistance</p>
          </div>

          <div className="departments-grid">
            {departments.map((dept, idx) => (
              <div key={idx} className="department-card">
                <div className="dept-icon">{dept.icon}</div>
                <h3>{dept.name}</h3>
                <div className="dept-contacts">
                  <span className="dept-contact-item">
                    <span className="dept-contact-icon">🏢</span>
                    {dept.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ CTA Section */}
      <div className="faq-cta-section">
        <div className="container">
          <div className="faq-cta-card">
            <div className="faq-cta-icon">❓</div>
            <h2>Have Questions?</h2>
            <p>
              Check out our frequently asked questions for quick answers to
              common inquiries
            </p>
            <Link href="/about/faqs" className="btn-faq">
              View FAQs
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
