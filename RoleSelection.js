import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    console.log('Navigating with role:', role); // Debugging log
    navigate('/login', { state: { role } });
  };

  // Inline CSS styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  };

  const headingStyle = {
    marginBottom: '20px',
    fontSize: '2rem',
    color: '#343a40',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const adminButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: 'white',
  };

  const doctorButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ffc107',
    color: '#343a40',
  };

  const patientButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Select Your Role</h2>
      <button
        style={adminButtonStyle}
        onClick={() => handleRoleSelection('admin')}
      >
        Admin
      </button>
      <button
        style={doctorButtonStyle}
        onClick={() => handleRoleSelection('doctor')}
      >
        Doctor
      </button>
      <button
        style={patientButtonStyle}
        onClick={() => handleRoleSelection('patient')}
      >
        Patient
      </button>
    </div>
  );
};

export default RoleSelection;
