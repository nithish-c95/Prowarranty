import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, PlusCircle, LogIn, CheckCircle2, Zap, Clock, FileCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Banner Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e40af 100%)', 
        color: '#ffffff', 
        padding: '100px 0 120px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div 
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '850px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            padding: '6px 16px', 
            borderRadius: '30px', 
            fontSize: '0.88rem', 
            fontWeight: 600,
            marginBottom: '24px',
            backdropFilter: 'blur(8px)'
          }}>
            <Shield size={16} style={{ color: '#60a5fa' }} /> Next-Generation Warranty Management
          </div>

          <h1 style={{ fontSize: '3.4rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: '20px' }}>
            ProWarranty
          </h1>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#93c5fd', marginBottom: '20px' }}>
            Product Warranty Registration Portal
          </h2>

          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '40px', lineHeight: 1.6 }}>
            Register your products and manage your warranties easily in one centralized digital dashboard. Never lose a receipt or miss an expiration date again.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {user ? (
              <Link to="/dashboard" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1.05rem' }}>
                Go to Dashboard <ArrowRight size={18} />
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1.05rem' }}>
                  <PlusCircle size={20} /> Register Product
                </Link>

                <Link to="/login" className="btn btn-secondary" style={{ padding: '14px 32px', fontSize: '1.05rem', backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>
                  <LogIn size={20} /> Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
              Why Choose ProWarranty
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '8px' }}>Smart Warranty Solutions for Modern Products</h2>
          </div>

          <div className="grid-3">
            <div className="card" style={{ textAlign: 'center', padding: '36px 24px' }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, backgroundColor: '#eff6ff', color: '#2563eb', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Zap size={30} />
              </div>
              <h3 style={{ marginBottom: 12 }}>Instant Registration</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Register your products in under 60 seconds. Store serial numbers, purchase invoices, and store details securely.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '36px 24px' }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, backgroundColor: '#ecfdf5', color: '#10b981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <Clock size={30} />
              </div>
              <h3 style={{ marginBottom: 12 }}>Automated Expiry Alerts</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Get timely reminders before your coverage expires so you can schedule repairs or extend protection hassle-free.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', padding: '36px 24px' }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, backgroundColor: '#fffbe6', color: '#f59e0b', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <FileCheck size={30} />
              </div>
              <h3 style={{ marginBottom: 12 }}>One-Click Claims</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                File repair and replacement claims directly through our portal with live status updates on your service tickets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section style={{ padding: '70px 0', background: '#f8fafc', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center' }}>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}>10,000+</h3>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Products Registered</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}>99.4%</h3>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Claims Approved</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}>24/7</h3>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Customer Support</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--color-primary)' }}>100%</h3>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Digital & Secure</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
