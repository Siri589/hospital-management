import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const OPDSchedule = () => {
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSchedule = async () => {
    try {
      await addDoc(collection(db, 'opd'), { patientName, date, time });
      // Success message or redirect
    } catch (error) {
      console.error("Scheduling error", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Schedule OPD</Typography>
      <TextField
        label="Patient Name"
        fullWidth
        margin="normal"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />
      <TextField
        label="Date"
        type="date"
        fullWidth
        margin="normal"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        label="Time"
        type="time"
        fullWidth
        margin="normal"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSchedule}
      >
        Schedule
      </Button>
    </Container>
  );
};

export default OPDSchedule;
