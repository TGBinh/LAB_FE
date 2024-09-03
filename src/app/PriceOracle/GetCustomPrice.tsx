import React, { useState } from 'react';
import { publicClient } from '../../client';
import { contract } from './PriceOracleAbi';
import { useAccount } from 'wagmi';
import { Address } from 'viem';
import './Function.css'; 

const GetCustomPrice = () => {
    const [asset, setAsset] = useState<string>('');
    const [price, setPrice] = useState<number | null>(null);
    const account = useAccount();

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!asset) {
            alert('Please provide the asset address.');
            return;
        }

        try {
            const result = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address,
                functionName: 'customPrices',
                args: [asset],
            });
            setPrice(Number(result));
        } catch (error) {
            console.error('Error calling customPrices:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Get Custom Price</h2>
            <form onSubmit={submit}>
                <label htmlFor='asset'>Asset Address</label>
                <input 
                    type='text' 
                    name='asset' 
                    value={asset} 
                    onChange={(e) => setAsset(e.target.value)} 
                />
                <button type='submit'>Get Custom Price</button>
            </form>
            {price !== null && <h6 className="price">Custom Price: {price}</h6>}
        </div>
    );
}

export default GetCustomPrice;