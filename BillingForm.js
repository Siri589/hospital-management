import React, { useState } from 'react';
import { realtimeDb } from '../firebaseConfig'; // Update import
import { ref, set } from 'firebase/database';

const BillingForm = () => {
    const [patientName, setPatientName] = useState('');
    const [amount, setAmount] = useState('');

    const handleBilling = async (e) => {
        e.preventDefault();
        try {
            const billingRef = ref(realtimeDb, 'billing'); // Update to use realtimeDb
            await set(billingRef, { patientName, amount });
            alert('Billing information saved successfully!');
            setPatientName('');
            setAmount('');
        } catch (error) {
            console.error('Error saving billing info: ', error);
            alert('Failed to save billing information');
        }
    };

    return (
        <form onSubmit={handleBilling}>
            <label>Patient Name:</label>
            <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
            />
            <label>Amount:</label>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <button type="submit">Save Billing</button>
        </form>
    );
};

export default BillingForm;
