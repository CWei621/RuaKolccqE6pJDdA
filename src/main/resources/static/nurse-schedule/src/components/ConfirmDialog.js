import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ConfirmDialog = ({ open, onClose, onConfirm, title, content }) => (
  <Dialog open={open} onClose={onClose} closeAfterTransition={false}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography>{content}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">取消</Button>
      <Button onClick={onConfirm} color="primary">確認</Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;