import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const orderSchema = yup.object().shape({
    tokenPair: yup.string().required('Token pair is required').matches(/^\w+\/\w+$/, 'Invalid token pair format (e.g., SOL/USDC)'),
    amount: yup.number().required('Amount is required').positive('Amount must be positive'),
    price: yup.number().positive('Price must be positive').notRequired(),
});

function OrderForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(orderSchema),
        defaultValues: { price: undefined },
    });

    const onSubmit = (data) => {
        console.log('Order Data:', data);
        // Handle order submission logic here
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="tokenPair">Token Pair (e.g., SOL/USDC):</label>
                <input type="text" id="tokenPair" {...register('tokenPair')} />
                <p>{errors.tokenPair?.message}</p>
            </div>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input type="number" id="amount" step="any" {...register('amount')} />
                <p>{errors.amount?.message}</p>
            </div>
            <div>
                <label htmlFor="price">Price (Limit Order):</label>
                <input type="number" id="price" step="any" {...register('price')} />
                <p>{errors.price?.message}</p>
            </div>
            <button type="submit">Submit Order</button>
        </form>
    );
}

export default OrderForm;