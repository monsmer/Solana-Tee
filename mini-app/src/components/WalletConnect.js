import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const walletSchema = yup.object().shape({
  walletAddress: yup.string().required('Wallet address is required').matches(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/, 'Invalid Solana wallet address'),
});

function WalletConnect() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(walletSchema)
  });
  const [isConnected, setIsConnected] = useState(false);

  const onSubmit = (data) => {
    console.log('Wallet Address:', data.walletAddress);
    // Simulate connection
    setIsConnected(true);
  };

  return (
    <div>
      {!isConnected ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Wallet Address:
            <input type="text" {...register('walletAddress')} />
          </label>
          <p>{errors.walletAddress?.message}</p>
          <button type="submit">Connect</button>
        </form>
      ) : (
        <p>Connected!</p>
      )}
    </div>
  );
}

export default WalletConnect;