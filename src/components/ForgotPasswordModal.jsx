import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Assuming you're using Bootstrap for the modal

const ForgotPasswordModal = ({ show, handleClose }) => {
  const [step, setStep] = useState(1); // State to manage the current step of the process
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    // Send API request to backend to generate and send OTP to the user's email
    // You can use fetch or any other library to make the API request
    // Display a message to inform the user that the OTP has been sent
    setStep(2); // Move to the next step
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    // Send API request to backend to verify OTP
    // If OTP is verified successfully, move to the next step
    setStep(3);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    // Send API request to backend to update user's password
    // Close the modal and inform the user about the password reset
    handleClose();
    // Display a message to inform the user that the password has been changed
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Button type="submit">Send OTP</Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOTPSubmit}>
            <label>OTP:</label>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            <Button type="submit">Submit OTP</Button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordReset}>
            <label>New Password:</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <Button type="submit">Reset Password</Button>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
