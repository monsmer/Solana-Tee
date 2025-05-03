import React from 'react';
import { WalletConnect, WalletConnectionProvider } from './components/WalletConnect';
import BalanceDisplay from './components/BalanceDisplay';
import OrderHistory from './components/OrderHistory';
const App = () => {
  return (
    <WalletConnectionProvider>
      <div>
        <h1>Solana Trading Mini App</h1>
        <WalletConnect />
        <BalanceDisplay />
        <OrderHistory />
      </div>
    </WalletConnectionProvider>
  );
};

export default App;