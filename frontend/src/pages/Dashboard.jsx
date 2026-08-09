import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PlusCircle, AlertTriangle, Wrench, Search, Filter, Shield } from 'lucide-react';
import { useWarranty } from '../context/WarrantyContext';
import { useAuth } from '../context/AuthContext';
import { WarrantyCard } from '../components/WarrantyCard';
import { StatCard } from '../components/StatCard';
import { ClaimModal } from '../components/ClaimModal';

export const Dashboard = () => {
  const { warranties, loading } = useWarranty();
  const { user } = useAuth();
  
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarrantyForClaim, setSelectedWarrantyForClaim] = useState(null);

  // Compute metrics
  const totalWarranties = warranties.length;
  const activeCount = warranties.filter(w => w.status === 'Active').length;
  const expiringCount = warranties.filter(w => w.status === 'Expiring Soon').length;
  const expiredCount = warranties.filter(w => w.status === 'Expired').length;
  
  let totalClaims = 0;
  warranties.forEach(w => {
    if (w.claims) totalClaims += w.claims.length;
  });

  // Filtered warranties
  const filteredWarranties = warranties.filter(w => {
    const matchesFilter = filter === 'All' || w.status === filter;
    const matchesSearch = w.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Warranty Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Welcome back, <strong>{user?.name || 'Customer'}</strong>! Track active warranties and file claims.
          </p>
        </div>

        <Link to="/register-product" className="btn btn-primary">
          <PlusCircle size={18} /> Register New Product
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid-4" style={{ marginBottom: 36 }}>
        <StatCard 
          icon={ShieldCheck} 
          title="Total Registered Products" 
          value={totalWarranties} 
          color="#2563eb" 
          bg="#eff6ff" 
        />
        <StatCard 
          icon={Shield} 
          title="Active Coverage" 
          value={activeCount} 
          color="#10b981" 
          bg="#ecfdf5" 
        />
        <StatCard 
          icon={AlertTriangle} 
          title="Expiring Soon (30 days)" 
          value={expiringCount} 
          color="#f59e0b" 
          bg="#fffbe6" 
        />
        <StatCard 
          icon={Wrench} 
          title="Active Repair Claims" 
          value={totalClaims} 
          color="#8b5cf6" 
          bg="#f3e8ff" 
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: 28, padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['All', 'Active', 'Expiring Soon', 'Expired'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: filter === status ? 'var(--color-primary)' : '#f1f5f9',
                  color: filter === status ? '#ffffff' : 'var(--text-muted)',
                  transition: 'all 0.2s ease'
                }}
              >
                {status} {status === 'All' ? `(${totalWarranties})` : ''}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            <input 
              type="text"
              className="form-control"
              style={{ paddingLeft: '36px', paddingRight: '12px', fontSize: '0.88rem' }}
              placeholder="Search product, brand, serial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Warranties List / Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          Loading registered warranties...
        </div>
      ) : filteredWarranties.length > 0 ? (
        <div className="grid-3">
          {filteredWarranties.map(warranty => (
            <WarrantyCard 
              key={warranty.id} 
              warranty={warranty} 
              onFileClaim={(w) => setSelectedWarrantyForClaim(w)} 
            />
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#f1f5f9', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Filter size={28} />
          </div>
          <h3>No warranty records found</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: 4, marginBottom: 20 }}>
            {searchTerm ? `No results match your search "${searchTerm}".` : `No products found under status "${filter}".`}
          </p>
          <Link to="/register-product" className="btn btn-primary btn-sm">
            <PlusCircle size={16} /> Register New Product
          </Link>
        </div>
      )}

      {/* Claim Submission Modal */}
      {selectedWarrantyForClaim && (
        <ClaimModal 
          warranty={selectedWarrantyForClaim} 
          onClose={() => setSelectedWarrantyForClaim(null)} 
        />
      )}
    </div>
  );
};
