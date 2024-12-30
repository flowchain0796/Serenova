import React, { useState } from 'react';
import { Brain, Moon, Sun, Wallet } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Link from 'next/link';
import { BrowserProvider, ethers } from 'ethers';
import contractAddress from "../contractInfo/contractAddress.json"
import contractAbi from "../contractInfo/contractAbi.json"
import { ConnectWallet } from '@thirdweb-dev/react'; // Import ConnectWallet from thirdweb

// Add type declaration for window.okxwallet
declare global {
  interface Window {
    okxwallet?: any;
  }
}

const Navbar = () => {
  const {
    isDark,
    setIsDark,
    isConnected,
    account,
    balance,
    setBalance,
    connectWallet
  } = useApp();

  const [showBalanceMenu, setShowBalanceMenu] = useState(false);

  const handleConnect = async () => {
    await connectWallet();
    setBalance('10 HEAL');
  };

  const withdraw = async () => {
    const { abi } = contractAbi;
    const charge = 10;
    const provider = window.ethereum || window.okxwallet;
    if (!provider) return;

    const browserProvider = new BrowserProvider(provider);
    const signer = await browserProvider.getSigner();
    const address = await signer.getAddress();
    const bounceContract = new ethers.Contract(contractAddress.address, abi, signer);

    await (await bounceContract.mint(address, ethers.parseUnits(charge.toString(), 18))).wait();
  }

  return (
    <nav className={`flex justify-between items-center p-4 ${isDark ? 'bg-gray-800/50' : 'bg-white/50'
      } backdrop-blur-sm relative`}>
      <Link href="/" className={`text-2xl font-bold flex items-center gap-2 ${isDark ? 'text-purple-300' : 'text-purple-600'
        }`}>
        <Brain className="w-8 h-8" />
        SereNova
      </Link>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2 rounded-full transition-colors ${isDark ? 'bg-gray-700 text-purple-300' : 'bg-purple-200 text-purple-700'
            }`}
        >
          {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowBalanceMenu(!showBalanceMenu)}
            className={`bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors flex items-center gap-2`}
          >
            <Wallet className="w-4 h-4" />
            Balance: {balance}
          </button>

          {showBalanceMenu && (
            <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-[1000] ${isDark ? 'bg-gray-800' : 'bg-white'
              } ring-1 ring-black ring-opacity-5 p-2`}>
              <div className={`px-4 py-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Available Balance
                <div className="font-bold text-lg">{balance}</div>
              </div>
              <button
                className="w-full text-left px-4 py-2 text-sm rounded-md hover:bg-purple-100 text-purple-900 transition-colors"
                onClick={() => {
                  withdraw();
                  setShowBalanceMenu(false);
                }}
              >
                Withdraw Funds
              </button>
            </div>
          )}

        </div>
        <div
          onClick={isConnected ? undefined : handleConnect}
        >
          <ConnectWallet />
        </div>
        <Link
          href="/sessions"
          className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
        >
          Book Session
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;