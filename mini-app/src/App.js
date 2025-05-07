import React, { useState, useEffect } from 'react';
import BalanceDisplay from './components/BalanceDisplay';
import OrderHistory from './components/OrderHistory';
import WalletConnect from './components/WalletConnect';

const App = () => {
  const [requestCount, setRequestCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(null);

  useEffect(() => {
    const storedCount = localStorage.getItem('requestCount');
    const storedTime = localStorage.getItem('lastRequestTime');
    if (storedCount && storedTime) {
      setRequestCount(parseInt(storedCount, 10));
      setLastRequestTime(new Date(storedTime));
    }
  }, []);

  const handleApiRequest = async (apiEndpoint) => {
    const now = new Date();
    const timeDiff = lastRequestTime ? now.getTime() - lastRequestTime.getTime() : Infinity;
    const resetInterval = 60000; // 1 minute
    const maxRequestsPerMinute = 10;

    if (timeDiff > resetInterval) {
      setRequestCount(0);
      localStorage.setItem('requestCount', '0');
    }

    if (requestCount >= maxRequestsPerMinute) {
      alert('Rate limit exceeded. Please wait before making more requests.');
      return;
    }

    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRequestCount(requestCount + 1);
      setLastRequestTime(now);

      localStorage.setItem('requestCount', (requestCount + 1).toString());
      localStorage.setItem('lastRequestTime', now.toISOString());

      console.log('API Response:', data);
      return data;
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // Example usage in WalletConnect.js
  const handleWalletConnect = async () => {
    // Simulate wallet connection process
    console.log('Connecting to wallet...');
    // Then simulate fetching some data from a backend endpoint
    await handleApiRequest('/api/data');
  };

  return (
    <div>
      <h1>Solana Trading Mini App</h1>
      <BalanceDisplay onApiRequest={handleApiRequest} />
      <OrderHistory onApiRequest={handleApiRequest} />
      <WalletConnect onConnect={handleWalletConnect} />
    </div>
  );
};

export default App;