import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const WarrantyContext = createContext(null);

const initialWarranties = [
  {
    id: "war_1",
    userId: "usr_1",
    productName: "MacBook Pro 16-inch M3",
    brand: "Apple",
    category: "Electronics",
    serialNumber: "C02G1234MD6R",
    purchaseDate: "2025-11-10",
    warrantyPeriodMonths: 24,
    expiryDate: "2027-11-10",
    storeName: "Official Apple Store",
    invoiceNumber: "INV-892341",
    status: "Active",
    claims: [
      {
        claimId: "clm_101",
        title: "Screen flicker issue",
        description: "Flickering lines on top right corner after prolonged use.",
        status: "In Progress",
        dateSubmitted: "2026-02-01"
      }
    ]
  },
  {
    id: "war_2",
    userId: "usr_1",
    productName: "Sony WH-1000XM5 Headphones",
    brand: "Sony",
    category: "Audio",
    serialNumber: "SN-8823901-X",
    purchaseDate: "2025-08-15",
    warrantyPeriodMonths: 12,
    expiryDate: "2026-08-15",
    storeName: "Tech MegaStore",
    invoiceNumber: "INV-441029",
    status: "Expiring Soon",
    claims: []
  },
  {
    id: "war_3",
    userId: "usr_1",
    productName: "Samsung 4K Smart Monitor 32\"",
    brand: "Samsung",
    category: "Monitors",
    serialNumber: "SAM-MON-7712",
    purchaseDate: "2024-03-01",
    warrantyPeriodMonths: 12,
    expiryDate: "2025-03-01",
    storeName: "Online Electronics",
    invoiceNumber: "INV-109283",
    status: "Expired",
    claims: []
  }
];

export const WarrantyProvider = ({ children }) => {
  const [warranties, setWarranties] = useState(initialWarranties);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWarranties = async () => {
      setLoading(true);
      const data = await apiService.getWarranties();
      if (data && data.length > 0) {
        setWarranties(data);
      }
      setLoading(false);
    };
    fetchWarranties();
  }, []);

  const addWarranty = async (warrantyData) => {
    const newWarranty = await apiService.registerProduct(warrantyData);
    setWarranties(prev => [newWarranty, ...prev]);
    return newWarranty;
  };

  const fileClaim = async (claimData) => {
    const createdClaim = await apiService.submitClaim(claimData);
    setWarranties(prev =>
      prev.map(w => {
        if (w.id === claimData.warrantyId) {
          const updatedClaims = w.claims ? [createdClaim, ...w.claims] : [createdClaim];
          return { ...w, claims: updatedClaims };
        }
        return w;
      })
    );
    return createdClaim;
  };

  return (
    <WarrantyContext.Provider value={{ warranties, loading, addWarranty, fileClaim }}>
      {children}
    </WarrantyContext.Provider>
  );
};

export const useWarranty = () => {
  const context = useContext(WarrantyContext);
  if (!context) throw new Error('useWarranty must be used within a WarrantyProvider');
  return context;
};
