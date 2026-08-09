import React from 'react';
import { Calendar, Tag, FileText, AlertCircle, CheckCircle, Clock, Wrench } from 'lucide-react';

export const WarrantyCard = ({ warranty, onFileClaim }) => {
  const getBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="badge badge-active"><CheckCircle size={14} /> Active</span>;
      case 'Expiring Soon':
        return <span className="badge badge-expiring"><Clock size={14} /> Expiring Soon</span>;
      case 'Expired':
        return <span className="badge badge-expired"><AlertCircle size={14} /> Expired</span>;
      default:
        return <span className="badge badge-active">{status}</span>;
    }
  };

  // Calculate percentage of warranty remaining
  const calculateProgress = () => {
    const start = new Date(warranty.purchaseDate).getTime();
    const end = new Date(warranty.expiryDate).getTime();
    const now = new Date().getTime();

    if (now >= end) return 0;
    if (now <= start) return 100;

    const total = end - start;
    const remaining = end - now;
    return Math.min(100, Math.max(0, Math.round((remaining / total) * 100)));
  };

  const progress = calculateProgress();

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--color-primary)', fontWeight: 700 }}>
              {warranty.brand}
            </span>
            <h3 style={{ fontSize: '1.2rem', marginTop: 2 }}>{warranty.productName}</h3>
          </div>
          {getBadge(warranty.status)}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Tag size={14} /> Serial: <strong style={{ color: 'var(--text-main)' }}>{warranty.serialNumber}</strong>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <FileText size={14} /> Invoice: <strong style={{ color: 'var(--text-main)' }}>{warranty.invoiceNumber}</strong>
          </span>
        </div>

        <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 6 }}>
            <span style={{ color: 'var(--text-muted)' }}>Purchase Date: <strong>{warranty.purchaseDate}</strong></span>
            <span style={{ color: 'var(--text-muted)' }}>Expires: <strong>{warranty.expiryDate}</strong></span>
          </div>

          <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
            <div 
              style={{ 
                width: `${progress}%`, 
                height: '100%', 
                backgroundColor: progress > 30 ? 'var(--color-success)' : progress > 0 ? 'var(--color-warning)' : 'var(--color-danger)',
                transition: 'width 0.5s ease'
              }} 
            />
          </div>
          <div style={{ fontSize: '0.75rem', textAlign: 'right', marginTop: 4, color: 'var(--text-muted)' }}>
            {progress > 0 ? `${progress}% period remaining` : 'Warranty expired'}
          </div>
        </div>

        {warranty.claims && warranty.claims.length > 0 && (
          <div style={{ marginBottom: 16, padding: '10px 12px', background: '#f1f5f9', borderRadius: '8px', fontSize: '0.85rem' }}>
            <strong style={{ display: 'block', color: 'var(--color-secondary)', marginBottom: 4 }}>Active Claims ({warranty.claims.length}):</strong>
            {warranty.claims.map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>• {c.title}</span>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{c.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={() => onFileClaim(warranty)} 
          className="btn btn-outline btn-sm"
          disabled={warranty.status === 'Expired'}
          style={{ opacity: warranty.status === 'Expired' ? 0.5 : 1 }}
        >
          <Wrench size={14} />
          {warranty.status === 'Expired' ? 'Expired (No Claims)' : 'File Repair Claim'}
        </button>
      </div>
    </div>
  );
};
