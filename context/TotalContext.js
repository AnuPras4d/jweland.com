'use client';
import { createContext, useContext, useState } from 'react';

const TotalContext = createContext();

export const TotalProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [giftNote, setGiftNote] = useState(''); 

  return (
    <TotalContext.Provider value={{ total, setTotal ,giftNote, setGiftNote }}>
      {children}
    </TotalContext.Provider>
  );
};

export const useTotal = () => useContext(TotalContext);
