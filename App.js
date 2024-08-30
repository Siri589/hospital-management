import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Importing all components
import AdminDashboard from './components/AdminDashboard';
import BillingForm from './components/BillingForm';
import BloodInventory from './components/BloodInventory';
import DoctorDashboard from './components/DoctorDashboard';
import InventoryList from './components/InventoryList';
import Login from './components/Login';
import Navbar from './components/Navbar';
import OPDSchedule from './components/OPDSchedule';
import PatientAdmission from './components/PatientAdmission';
import PatientDashboard from './components/PatientDashboard';
import PatientList from './components/PatientList';
import RoleSelection from './components/RoleSelection';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false after checking authentication
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You might want to show a loading spinner here
  }

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Routes for unauthenticated users */}
          {!user ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/role-selection" element={<RoleSelection />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              {/* Redirect to appropriate dashboard if user is authenticated */}
              <Route
                path="/admin-dashboard"
                element={user.email === 'admin@example.com' ? <AdminDashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/doctor-dashboard"
                element={user.email === 'doctor@example.com' ? <DoctorDashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/patient-dashboard"
                element={user.email !== 'admin@example.com' && user.email !== 'doctor@example.com' ? <PatientDashboard /> : <Navigate to="/login" />}
              />
              <Route path="/billing-form" element={<BillingForm />} />
              <Route path="/blood-inventory" element={<BloodInventory />} />
              <Route path="/inventory-list" element={<InventoryList />} />
              <Route path="/opd-schedule" element={<OPDSchedule />} />
              <Route path="/patient-admission" element={<PatientAdmission />} />
              <Route path="/patient-list" element={<PatientList />} />
              {/* Redirect to role-specific dashboard */}
              <Route path="/" element={<Navigate to={getDefaultRedirectPath(user)} />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

// Function to get default redirect path based on user role
const getDefaultRedirectPath = (user) => {
  if (user.email === 'admin@example.com') {
    return '/admin-dashboard';
  } else if (user.email === 'doctor@example.com') {
    return '/doctor-dashboard';
  } else if (user.email && user.email !== 'admin@example.com' && user.email !== 'doctor@example.com') {
    return '/patient-dashboard';
  }
  return '/login'; // Default fallback
};

export default App;
