import React from 'react';
import WalletConnect from './components/WalletConnect';
import OrderHistory from './components/OrderHistory';
import OrderForm from './components/OrderForm';

function App() {
  return (
    <div className="App">
      <h1>Solana Trading Mini App</h1>
      <WalletConnect />
      <OrderForm />
      <OrderHistory />
    </div>
  );
}

export default App;