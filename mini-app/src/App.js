import React from 'react';
import BalanceDisplay from './components/BalanceDisplay';
import WalletConnect from './components/WalletConnect';
import OrderHistory from './components/OrderHistory';

function App() {
  return (
    <div className="App">
      <h1>Solana Trading Mini App</h1>
      <WalletConnect />
      <BalanceDisplay />
      <OrderHistory />
    </div>
  );
}

export default App;