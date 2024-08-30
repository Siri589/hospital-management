import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Ensure this exports the configured Firestore instance
import { collection, onSnapshot } from 'firebase/firestore';
import { Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Typography } from '@mui/material';

const BloodInventory = () => {
  const [bloodUnits, setBloodUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const bloodCol = collection(db, 'bloodBank');
    
    // Real-time listener
    const unsubscribe = onSnapshot(
      bloodCol,
      (snapshot) => {
        const bloodList = snapshot.docs.map(doc => doc.data());
        setBloodUnits(bloodList);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching blood units:', error);
        setError('Failed to load blood units.');
        setLoading(false);
      }
    );

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Blood Type</TableCell>
          <TableCell>Quantity</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bloodUnits.map((unit, index) => (
          <TableRow key={index}>
            <TableCell>{unit.bloodType}</TableCell>
            <TableCell>{unit.quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BloodInventory;
