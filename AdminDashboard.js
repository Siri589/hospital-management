import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure path is correct
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    totalInventory: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const patientsSnapshot = await getDocs(collection(db, 'patients'));
        const doctorsSnapshot = await getDocs(collection(db, 'doctors'));
        const appointmentsSnapshot = await getDocs(collection(db, 'appointments'));
        const inventorySnapshot = await getDocs(collection(db, 'inventory'));

        setStats({
          totalPatients: patientsSnapshot.size,
          totalDoctors: doctorsSnapshot.size,
          totalAppointments: appointmentsSnapshot.size,
          totalInventory: inventorySnapshot.size,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Hospital Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Patients</Typography>
              <Typography variant="h4">{stats.totalPatients}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Doctors</Typography>
              <Typography variant="h4">{stats.totalDoctors}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Appointments</Typography>
              <Typography variant="h4">{stats.totalAppointments}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Inventory Items</Typography>
              <Typography variant="h4">{stats.totalInventory}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div style={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary">
          View Detailed Reports
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
