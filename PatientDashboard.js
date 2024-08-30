import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const PatientDashboard = () => {
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatientData = async () => {
            const auth = getAuth();
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        const patientQuery = query(collection(db, 'patients'), where('contact', '==', user.email));
                        const patientSnapshot = await getDocs(patientQuery);
                        if (!patientSnapshot.empty) {
                            setPatient(patientSnapshot.docs[0].data());
                        } else {
                            console.log('No patient data found.');
                        }
                    } catch (error) {
                        console.error('Error fetching patient data:', error);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    console.log('No user is signed in.');
                    setLoading(false);
                }
            });

            // Cleanup the subscription on unmount
            return () => unsubscribe();
        };

        fetchPatientData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Patient Dashboard</h1>
            {patient ? (
                <div>
                    <p>Name: {patient.name}</p>
                    <p>Age: {patient.age}</p>
                    <p>Gender: {patient.gender}</p>
                    <p>Contact: {patient.contact}</p>
                    <p>Medical History: {patient.medicalHistory}</p>
                </div>
            ) : (
                <p>No patient data available.</p>
            )}
        </div>
    );
};

export default PatientDashboard;
