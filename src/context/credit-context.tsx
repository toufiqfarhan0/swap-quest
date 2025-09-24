'use client';

import { userStats } from '@/lib/data';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type CreditContextType = {
  credits: number;
  addCredits: (amount: number) => void;
};

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider = ({ children }: { children: ReactNode }) => {
  const [credits, setCredits] = useState(userStats.totalCredits);

  const addCredits = (amount: number) => {
    setCredits((prevCredits) => prevCredits + amount);
  };

  return (
    <CreditContext.Provider value={{ credits, addCredits }}>
      {children}
    </CreditContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
};
