"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface AppContextType {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
  account: string | null;
  setAccount: (value: string | null) => void;
  balance: string;
  setBalance: (value: string) => void;
  connectWallet: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0 HEAL');

  

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      console.log('MetaMask is installed!');
    } else {
      console.error('MetaMask is not detected');
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        setAccount(accounts[0]);
        console.log('Connected account:', accounts[0]);
        setBalance('10 HEAL'); // Replace with actual balance fetching logic
      } catch (error) {
        console.error("User denied wallet connection or another error occurred:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask and try again.");
    }
  };

  return (
    <AppContext.Provider 
      value={{ 
        isDark, 
        setIsDark, 
        isConnected, 
        setIsConnected,
        account,
        setAccount,
        balance,
        setBalance,
        connectWallet
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}