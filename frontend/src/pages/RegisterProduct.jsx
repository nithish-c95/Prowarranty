import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, PlusCircle, ArrowLeft, Upload, CheckCircle2 } from 'lucide-react';
import { useWarranty } from '../context/WarrantyContext';

export const RegisterProduct = () => {
  const { addWarranty } = useWarranty();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: '',
    brand: '',
    category: 'Electronics',
    serialNumber: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    warrantyPeriodMonths: '12',
    storeName: '',
    invoiceNumber: '',
  });

  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    await addWarranty(formData);

    setSubmitting(false);
    setSuccessMessage(true);

    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="container" style={{ padding: '40px 24px', maxWidth: '720px' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}
      >
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="card" style={{ padding: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 28 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.6rem' }}>Register New Product Warranty</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Fill in your product details to activate coverage and store proof of purchase.
            </p>
          </div>
        </div>

        {successMessage ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <CheckCircle2 size={56} style={{ color: 'var(--color-success)', marginBottom: 12 }} />
            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-secondary)' }}>Product Registered Successfully!</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: 6 }}>
              Redirecting you to your warranty dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label>Product Name *</label>
                <input 
                  type="text" 
                  name="productName"
                  className="form-control"
                  placeholder="e.g. Dell XPS 15 Laptop"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Brand / Manufacturer *</label>
                <input 
                  type="text" 
                  name="brand"
                  className="form-control"
                  placeholder="e.g. Dell, Apple, Sony"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label>Category</label>
                <select 
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Electronics">Electronics & Computing</option>
                  <option value="Audio">Audio & Headphones</option>
                  <option value="Home Appliances">Home Appliances</option>
                  <option value="Mobile">Smartphones & Mobile</option>
                  <option value="Monitors">Monitors & Displays</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Serial Number (S/N) *</label>
                <input 
                  type="text" 
                  name="serialNumber"
                  className="form-control"
                  placeholder="e.g. SN-993821-X"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label>Purchase Date *</label>
                <input 
                  type="date" 
                  name="purchaseDate"
                  className="form-control"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Warranty Duration (Months) *</label>
                <select 
                  name="warrantyPeriodMonths"
                  className="form-control"
                  value={formData.warrantyPeriodMonths}
                  onChange={handleChange}
                >
                  <option value="6">6 Months</option>
                  <option value="12">12 Months (1 Year)</option>
                  <option value="24">24 Months (2 Years)</option>
                  <option value="36">36 Months (3 Years)</option>
                  <option value="60">60 Months (5 Years)</option>
                </select>
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label>Store / Retailer Name</label>
                <input 
                  type="text" 
                  name="storeName"
                  className="form-control"
                  placeholder="e.g. Best Buy, Amazon, Store #12"
                  value={formData.storeName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Invoice / Receipt Number</label>
                <input 
                  type="text" 
                  name="invoiceNumber"
                  className="form-control"
                  placeholder="e.g. INV-2026-9812"
                  value={formData.invoiceNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Receipt Upload Mock */}
            <div className="form-group">
              <label>Upload Receipt / Proof of Purchase (Optional)</label>
              <div 
                style={{ 
                  border: '2px dashed var(--border-color)', 
                  borderRadius: 'var(--radius-sm)', 
                  padding: '20px', 
                  textAlign: 'center',
                  backgroundColor: '#f8fafc',
                  cursor: 'pointer'
                }}
                onClick={() => document.getElementById('receipt-upload').click()}
              >
                <Upload size={24} style={{ color: 'var(--color-primary)', marginBottom: 6 }} />
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  {fileName ? `Uploaded: ${fileName}` : 'Click to select or drag & drop invoice PDF or image'}
                </p>
                <input 
                  id="receipt-upload" 
                  type="file" 
                  accept="image/*,application/pdf" 
                  style={{ display: 'none' }} 
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: 30 }}>
              <button type="button" onClick={() => navigate('/dashboard')} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="btn btn-primary" style={{ minWidth: 160 }}>
                <PlusCircle size={18} />
                {submitting ? 'Registering...' : 'Register Product'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
