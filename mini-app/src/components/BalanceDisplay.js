import React, { useState, useEffect } from 'react';

function BalanceDisplay({ walletAddress }) {
  const [balances, setBalances] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalances = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/balances/${walletAddress}`);
        if (!response.ok) {
          throw new Error('Failed to fetch balances');
        }
        const data = await response.json();
        setBalances(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (walletAddress) {
      fetchBalances();
    }
  }, [walletAddress]);

  if (loading) {
    return <p>Loading balances...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!balances) {
    return <p>Connect your wallet to see your balances.</p>;
  }

  return (
    <div>
      <h3>Account Balances</h3>
      <p><b>SOL:</b> {balances.solBalance}</p>
      <h4>SPL Tokens:</h4>
      <ul>
        {balances.splTokenBalances.map((token, index) => (
          <li key={index}>
            <b>Mint:</b> {token.mintAddress}, <b>Balance:</b> {token.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BalanceDisplay;