import React, { useState } from 'react';
import { X, Wrench, Send } from 'lucide-react';
import { useWarranty } from '../context/WarrantyContext';

export const ClaimModal = ({ warranty, onClose }) => {
  const { fileClaim } = useWarranty();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!warranty) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    setSubmitting(true);
    await fileClaim({
      warrantyId: warranty.id,
      title,
      description
    });
    setSubmitting(false);
    setSuccess(true);

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(15, 23, 42, 0.6)', 
        backdropFilter: 'blur(4px)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div 
        className="card" 
        style={{ 
          maxWidth: '520px', 
          width: '100%', 
          position: 'relative', 
          animation: 'fadeIn 0.2s ease-out' 
        }}
      >
        <button 
          onClick={onClose}
          style={{ 
            position: 'absolute', 
            top: 20, 
            right: 20, 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 16 }}>
          <div style={{ padding: 10, backgroundColor: 'var(--color-primary-light)', borderRadius: 10, color: 'var(--color-primary)' }}>
            <Wrench size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem' }}>Submit Warranty Claim</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Product: <strong>{warranty.productName}</strong> ({warranty.serialNumber})
            </p>
          </div>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 10 }}>🎉</div>
            <h4 style={{ color: 'var(--color-success)', marginBottom: 6 }}>Claim Submitted Successfully!</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Your service ticket has been created and assigned to our repair team.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Issue Headline / Summary</label>
              <input 
                type="text"
                className="form-control"
                placeholder="e.g. Display backlight flickers intermittently"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Detailed Problem Description</label>
              <textarea 
                className="form-control"
                rows={4}
                placeholder="Please describe what happens, error messages, or physical damage observed..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: 24 }}>
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="btn btn-primary">
                <Send size={16} />
                {submitting ? 'Submitting...' : 'Submit Claim Ticket'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
