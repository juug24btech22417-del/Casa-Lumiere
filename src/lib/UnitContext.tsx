"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UnitType = 'Sq.Ft' | 'Sq.Yd' | 'Acres';

interface UnitContextType {
  unit: UnitType;
  setUnit: (unit: UnitType) => void;
  formatArea: (sqft: number) => string;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export const UnitProvider = ({ children }: { children: ReactNode }) => {
  const [unit, setUnit] = useState<UnitType>('Sq.Ft');

  const formatArea = (sqft: number) => {
    switch (unit) {
      case 'Sq.Yd':
        return `${(sqft / 9).toLocaleString(undefined, { maximumFractionDigits: 1 })} Sq.Yd`;
      case 'Acres':
        return `${(sqft / 43560).toLocaleString(undefined, { maximumFractionDigits: 2 })} Acres`;
      case 'Sq.Ft':
      default:
        return `${sqft.toLocaleString()} Sq.Ft`;
    }
  };

  return (
    <UnitContext.Provider value={{ unit, setUnit, formatArea }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = () => {
  const context = useContext(UnitContext);
  if (context === undefined) {
    throw new Error('useUnit must be used within a UnitProvider');
  }
  return context;
};
