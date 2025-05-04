import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import BalanceDisplay from './components/BalanceDisplay';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);

  const handleWalletConnect = (address) => {
    setWalletAddress(address);
  };

  return (
    <div className="App">
      <h1>Solana Trading Mini App</h1>
      <WalletConnect onConnect={handleWalletConnect} />
      {walletAddress && <BalanceDisplay walletAddress={walletAddress} />}
    </div>
  );
}

export default App;