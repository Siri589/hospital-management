// src/components/PatientList.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const patientRef = ref(db, 'patients');
        onValue(patientRef, (snapshot) => {
            const data = snapshot.val();
            const patientList = [];
            for (let id in data) {
                patientList.push({ id, ...data[id] });
            }
            setPatients(patientList);
        });
    }, []);

    return (
        <div>
            <h2>Admitted Patients</h2>
            <ul>
                {patients.map((patient) => (
                    <li key={patient.id}>
                        <strong>Name:</strong> {patient.name} <br />
                        <strong>Age:</strong> {patient.age} <br />
                        <strong>Gender:</strong> {patient.gender} <br />
                        <strong>Contact:</strong> {patient.contact} <br />
                        <strong>Medical History:</strong> {patient.medicalHistory}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientList;
