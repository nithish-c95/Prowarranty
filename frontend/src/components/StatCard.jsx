import React from 'react';

export const StatCard = ({ icon: Icon, title, value, color = '#2563eb', bg = '#eff6ff' }) => {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div 
        style={{ 
          width: 52, 
          height: 52, 
          borderRadius: 12, 
          backgroundColor: bg, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: color,
          flexShrink: 0
        }}
      >
        <Icon size={26} />
      </div>
      <div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{title}</span>
        <h3 style={{ fontSize: '1.6rem', marginTop: 2 }}>{value}</h3>
      </div>
    </div>
  );
};
