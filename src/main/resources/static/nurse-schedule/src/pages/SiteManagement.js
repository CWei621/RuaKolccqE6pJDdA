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

function SiteManagement() {
  const [sites, setSites] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSite, setCurrentSite] = useState(null);
  const [siteName, setSiteName] = useState('');
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchSites = async () => {
    try {
      const response = await api.get('/sites');
      setSites(response.data.data);
    } catch (error) {
      const message = error.response?.data?.message ?? 'System error';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const handleDialogOpen = (site = null) => {
    setCurrentSite(site);
    setSiteName(site ? site.name : '');
    setError('');
    setOpenDialog(true);
  };

  const handleDialogClose = () => setOpenDialog(false);

  const handleSaveSite = async () => {
    if (!siteName.trim()) {
      setError('Site name is required');
      return;
    }
    try {
      if (currentSite) {
        await api.put(`/sites/${currentSite.id}`, { name: siteName });
      } else {
        await api.post('/sites', { name: siteName });
      }
      fetchSites();
      handleDialogClose();
      setSnackbar({ open: true, message: 'Operation successful', severity: 'success' });
    } catch (error) {
      const message = error.response?.data?.message ?? 'System error';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const handleDeleteSite = async (id) => {
    try {
      await api.delete(`/sites/${id}`);
      fetchSites();
      setSnackbar({ open: true, message: 'Site deleted successfully', severity: 'success' });
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
            站點列表
          </Typography>
          <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => handleDialogOpen()}>
            新增站點
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell>站點名稱</TableCell>
                  <TableCell>動作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sites.map((site) => (
                    <TableRow key={site.id}>
                      {/* <TableCell>{site.id}</TableCell> */}
                      <TableCell>{site.name}</TableCell>
                      <TableCell>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ mr: 1 }}
                            onClick={() => handleDialogOpen(site)}
                        >
                          編輯
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDeleteSite(site.id)}
                        >
                          刪除
                        </Button>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>{currentSite ? 'Edit Site' : 'Add New Site'}</DialogTitle>
          <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="Site Name"
                fullWidth
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                error={!!error}
                helperText={error}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              取消
            </Button>
            <Button onClick={handleSaveSite} color="primary">
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

export default SiteManagement;