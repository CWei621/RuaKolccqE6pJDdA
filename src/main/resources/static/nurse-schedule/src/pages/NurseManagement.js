import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import api from '../api';

function NurseManagement() {
  const [nurses, setNurses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentNurse, setCurrentNurse] = useState(null);
  const [nurseName, setNurseName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchNurses = async () => {
    try {
      const response = await api.get('/nurses');
      setNurses(response.data.data);
    } catch (error) {
      const message = error.response?.data?.message ?? 'System error';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  useEffect(() => {
    fetchNurses();
  }, []);

  const handleDialogOpen = (nurse = null) => {
    setCurrentNurse(nurse);
    setNurseName(nurse ? nurse.name : '');
    setEmployeeId(nurse ? nurse.employeeId : '');
    setError('');
    setOpenDialog(true);
  };

  const handleDialogClose = () => setOpenDialog(false);

  const handleSaveNurse = async () => {
    if (!nurseName.trim() || !employeeId.trim()) {
      setError('Nurse name and employee ID are required');
      return;
    }
    try {
      if (currentNurse) {
        await api.put(`/nurses/${currentNurse.id}`, { name: nurseName, employeeId });
      } else {
        await api.post('/nurses', { name: nurseName, employeeId });
      }
      fetchNurses();
      handleDialogClose();
      setSnackbar({ open: true, message: 'Operation successful', severity: 'success' });
    } catch (error) {
      const message = error.response?.data?.message ?? 'System error';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const handleDeleteNurse = async (id) => {
    try {
      await api.delete(`/nurses/${id}`);
      fetchNurses();
      setSnackbar({ open: true, message: 'Nurse deleted successfully', severity: 'success' });
    } catch (error) {
      const message = error.response?.data?.message ?? 'System error';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            護士列表
          </Typography>
          <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => handleDialogOpen()}>
            新增護士
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell>護士姓名</TableCell>
                  <TableCell>員工編號</TableCell>
                  <TableCell>動作</TableCell>
                  <TableCell>加入日期</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nurses.map((nurse) => (
                    <TableRow key={nurse.id}>
                      {/* <TableCell>{nurse.id}</TableCell> */}
                      <TableCell>{nurse.name}</TableCell>
                      <TableCell>{nurse.employeeId}</TableCell>
                      <TableCell>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ mr: 1 }}
                            onClick={() => handleDialogOpen(nurse)}
                        >
                          編輯
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDeleteNurse(nurse.id)}
                        >
                          刪除
                        </Button>
                      </TableCell>
                      <TableCell>{nurse.createdAt}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>{currentNurse ? '編輯護士' : '新增護士'}</DialogTitle>
          <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="護士姓名"
                fullWidth
                value={nurseName}
                onChange={(e) => setNurseName(e.target.value)}
                error={!!error}
                helperText={error}
            />
            <TextField
                margin="dense"
                label="員工編號"
                fullWidth
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                error={!!error}
                helperText={error}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              取消
            </Button>
            <Button onClick={handleSaveNurse} color="primary">
              儲存
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
  );
}

export default NurseManagement;