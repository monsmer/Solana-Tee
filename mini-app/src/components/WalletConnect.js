import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SlopeWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletConnect = () => {
  const [publicKey, setPublicKey] = useState(null);
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.publicKey) {
      setPublicKey(wallet.publicKey.toBase58());
    }
  }, [wallet.publicKey]);

  const connectWallet = async () => {
    try {
      await wallet.connect();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await wallet.disconnect();
      setPublicKey(null);
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return (
    <div>
      {publicKey ? (
        <div>
          <p>Connected Wallet: {publicKey}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

const WalletConnectionProvider = ({ children }) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom endpoint instead
  const endpoint = useMemo(() => `https://api.devnet.solana.com`, []);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter()
  ], []);

  return (
    <WalletProvider wallets={wallets} autoConnect={true}>
      <WalletModalProvider>
        {children}
      </WalletModalProvider>
    </WalletProvider>
  );
};

export { WalletConnect, WalletConnectionProvider };