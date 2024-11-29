import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarNotification = ({ snackbar, onClose }) => (
  <Snackbar
    open={snackbar.open}
    autoHideDuration={6000}
    onClose={onClose}
  >
    <Alert onClose={onClose} severity={snackbar.severity}>
      {snackbar.message}
    </Alert>
  </Snackbar>
);

export default SnackbarNotification;