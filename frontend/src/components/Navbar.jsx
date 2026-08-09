import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, PlusCircle, LayoutDashboard, LogIn, UserPlus, LogOut, User, Server } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [backendConnected, setBackendConnected] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      const isConnected = await apiService.checkHealth();
      setBackendConnected(isConnected);
    };
    checkBackend();
    const interval = setInterval(checkBackend, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to={user ? "/welcome" : "/"} className="brand-logo">
          <Shield className="shield-icon" size={28} />
          <span>ProWarranty</span>
        </Link>

        <nav>
          <ul className="nav-menu">
            {user ? (
              <>
                <li>
                  <Link to="/welcome" className={`nav-link ${isActive('/welcome') ? 'active' : ''}`}>
                    <LayoutDashboard size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                    Home Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/register-product" className={`nav-link ${isActive('/register-product') ? 'active' : ''}`}>
                    <PlusCircle size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                    Register Product
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            title={backendConnected ? 'Connected to Node Express API Backend' : 'Running with Local Dev Fallback'}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 6, 
              padding: '4px 10px', 
              borderRadius: '20px', 
              fontSize: '0.78rem', 
              fontWeight: 600,
              backgroundColor: backendConnected ? '#ecfdf5' : '#fffbe6',
              color: backendConnected ? '#059669' : '#d97706',
              border: `1px solid ${backendConnected ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`
            }}
          >
            <Server size={12} />
            <span>{backendConnected ? 'API Connected' : 'Offline / Standalone'}</span>
          </div>

          {user ? (
            <div className="user-badge-nav">
              <User size={16} className="text-muted" />
              <span>{user.name}</span>
              <button 
                onClick={handleLogout} 
                className="btn btn-sm btn-secondary"
                title="Log out"
                style={{ padding: '4px 10px', marginLeft: '6px' }}
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/" className="btn btn-secondary btn-sm">
                <LogIn size={16} />
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                <UserPlus size={16} />
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
