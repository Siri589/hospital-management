// src/components/PatientAdmission.js
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { ref, set, push } from 'firebase/database';

const PatientAdmission = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male');
    const [contact, setContact] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const patientRef = ref(db, 'patients'); // Reference to 'patients' in the Realtime Database
            const newPatientRef = push(patientRef); // Create a new unique key
            await set(newPatientRef, {               // Save the patient data under the new key
                name,
                age,
                gender,
                contact,
                medicalHistory
            });
            alert('Patient admitted successfully!');
            setName('');
            setAge('');
            setGender('Male');
            setContact('');
            setMedicalHistory('');
        } catch (error) {
            console.error('Error admitting patient: ', error);
            alert('Failed to admit patient');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <label>Age:</label>
            <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
            />
            <label>Gender:</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <label>Contact:</label>
            <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
            />
            <label>Medical History:</label>
            <textarea
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
            />
            <button type="submit">Admit Patient</button>
        </form>
    );
};

export default PatientAdmission;
