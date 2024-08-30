/*import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const DoctorDashboard = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            const patientsCollection = collection(db, 'patients');
            const patientsSnapshot = await getDocs(patientsCollection);
            const patientsList = patientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPatients(patientsList);
        };

        fetchPatients();
    }, []);

    return (
        <div>
            <h1>Doctor Dashboard</h1>
            <ul>
                {patients.map(patient => (
                    <li key={patient.id}>
                        {patient.name} - {patient.contact}
                        {/* Add more details or edit functionality as needed }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorDashboard;
*/

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const DoctorDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const patientsCollection = collection(db, 'patients');
                const patientsSnapshot = await getDocs(patientsCollection);
                const patientsList = patientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPatients(patientsList);
                console.log('Fetched patients:', patientsList); // Debugging line
            } catch (err) {
                console.error('Error fetching patients:', err);
                setError(err.message);
            }
        };

        fetchPatients();
    }, []);

    return (
        <div>
            <h1>Doctor Dashboard</h1>
            {error ? (
                <p>Error fetching data: {error}</p>
            ) : (
                <ul>
                    {patients.map(patient => (
                        <li key={patient.id}>
                            {patient.name} - {patient.contact}
                            {/* Add more details or edit functionality as needed */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DoctorDashboard;

