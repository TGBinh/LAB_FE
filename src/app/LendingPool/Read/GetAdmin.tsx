"use client";

import React, { useState } from 'react';
import { publicClient } from '../../../client'; // Thay thế với đường dẫn của bạn
import { contract } from '../LendingPoolAbi'; // Thay đổi thành ABI phù hợp
import { Address } from 'viem';
import '../../CollateralManager/Function.css'; 

const GetAdmin = () => {
    const [admin, setAdmin] = useState<string | null>(null);

    const getAdmin = async () => {
        try {
            const adminResult = await publicClient.readContract({
                abi: contract.abi,
                address: contract.address as Address,
                functionName: 'admin',
                args: [],
            });

            setAdmin(adminResult as string);
        } catch (error) {
            console.error('Error fetching admin:', error);
        }
    }

    return (
        <div className="form-container">
            <h2>Get Admin</h2>
            <button type='button' onClick={getAdmin} className="fetch-button">Get Admin</button>
            <div className="admin-info">
                <h6>Admin: {admin ? admin : 'N/A'}</h6>
            </div>
        </div>
    );
};

export default GetAdmin;
