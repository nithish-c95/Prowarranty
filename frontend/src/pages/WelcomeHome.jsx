import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const WelcomeHome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 72px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '60px 20px'
    }}>
      <div className="card" style={{ 
        maxWidth: '520px', 
        width: '100%', 
        padding: '48px 40px', 
        textAlign: 'center' 
      }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: 72, 
          height: 72, 
          borderRadius: '50%', 
          backgroundColor: '#ecfdf5', 
          color: '#10b981',
          marginBottom: 20
        }}>
          <CheckCircle2 size={40} />
        </div>

        <h1 style={{ fontSize: '1.8rem', color: 'var(--color-secondary)', marginBottom: 8 }}>
          Welcome, {user?.name || 'Customer'}!
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: 24 }}>
          You have successfully logged in to ProWarranty.
        </p>

        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 8,
          padding: '10px 20px',
          borderRadius: '8px',
          backgroundColor: '#f8fafc',
          border: '1px solid var(--border-color)',
          marginBottom: 28,
          fontSize: '0.95rem',
          color: 'var(--text-main)'
        }}>
          <ShieldCheck size={18} style={{ color: 'var(--color-primary)' }} />
          <span>{user?.email || 'user@prowarranty.com'}</span>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button 
            onClick={() => navigate('/')}
            className="btn btn-secondary"
            style={{ padding: '10px 24px' }}
          >
            Back to Login
          </button>
          <button 
            onClick={handleLogout}
            className="btn btn-primary"
            style={{ padding: '10px 24px' }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
