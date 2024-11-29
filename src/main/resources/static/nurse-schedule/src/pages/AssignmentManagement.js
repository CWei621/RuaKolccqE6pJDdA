import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import api from '../api';
import ConfirmDialog from '../components/ConfirmDialog';
import SnackbarNotification from '../components/SnackbarNotification';

function AssignmentManagement() {
  const [assignments, setAssignments] = useState([]);
  const [sites, setSites] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedSite, setSelectedSite] = useState('');
  const [selectedNurse, setSelectedNurse] = useState('');
  const [nurseToRemove, setNurseToRemove] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const pastelColors = [
    'rgba(255, 182, 193, 0.2)', // 淡粉紅
    'rgba(176, 224, 230, 0.2)', // 淡粉藍
    'rgba(221, 160, 221, 0.2)', // 淡紫色
    'rgba(144, 238, 144, 0.2)', // 淡綠色
    'rgba(255, 218, 185, 0.2)', // 淡桃色
    'rgba(230, 230, 250, 0.2)', // 淡薰衣草
    'rgba(255, 255, 224, 0.2)', // 淡黃色
    'rgba(230, 230, 230, 0.2)'  // 淡灰色
  ];

  const fetchAssignments = async () => {
    try {
      const response = await api.get('/assignments/site/all');
      if (response.data.status === 'ok') {
        const sitesWithNurses = response.data.data;
        const assignments = Object.entries(sitesWithNurses).map(([siteId, nurses]) => ({
          siteId,
          nurses
        }));
        setAssignments(assignments);
      } else {
        const message = response?.data?.message ?? 'System error';
        setSnackbar({ open: true, message, severity: 'error' });
      }
    } catch (error) {
      const message = error.response?.data?.message ?? 'System error';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const fetchSites = async () => {
    try {
      const response = await api.get('/sites');
      if (response.data.status === 'ok') {
        setSites(response.data.data);
      } else {
        const message = response?.data?.message ?? 'System errors';
        setSnackbar({ open: true, message, severity: 'error' });
      }
    } catch (error) {
      const message = error.response?.data?.message ?? 'System error';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const fetchNurses = async () => {
    try {
      const response = await api.get('/nurses');
      if (response.data.status === 'ok') {
        setNurses(response.data.data);
      } else {
        const message = response?.data?.message ?? 'System error';
        setSnackbar({ open: true, message, severity: 'error' });
      }
    } catch (error) {
      const message = error.response?.data?.message ?? 'System error';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  useEffect(() => {
    void fetchSites();
    void fetchNurses();
  }, []);

  useEffect(() => {
    void fetchAssignments();
  }, [sites, nurses]);

  useEffect(() => {
    if (nurseToRemove) {
      setOpenConfirmDialog(true);
    }
  }, [nurseToRemove]);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => {
    setOpenDialog(false);
    setNurseToRemove(null);
  }

  const handleRemoveDialogOpen = (siteId, nurseId) => {
    setNurseToRemove({
      siteId,
      nurseId,
      siteName: sites.filter((site) => site.id.toString() === siteId.toString())[0]?.name,
      nurseName: nurses.filter((nurse) => nurse.id.toString() === nurseId.toString())[0]?.name });
    setOpenConfirmDialog(true);
  };
  const handleConfirmDialogClose = () => setOpenConfirmDialog(false);

  const handleAssignNurse = async () => {
    const siteId = selectedSite || null;
    const nurseId = selectedNurse || null;

    if (!siteId || !nurseId) {
      setSnackbar({ open: true, message: '請檢查站點及護士皆需選擇', severity: 'error' });
      return;
    }

    try {
      const response = await api.post(`/assignments/assign`, { siteId, nurseId });
      if (response.data.status === 'ok') {
        fetchAssignments();
        handleDialogClose();
        setSnackbar({ open: true, message: '護士分配站點成功', severity: 'success' });
      } else {
        const message = response?.data?.message ?? 'System error';
        setSnackbar({ open: true, message, severity: 'error' });
      }
    } catch (error) {
      const message = error.response?.data?.message ?? 'System error';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const handleRemoveAssignment = async () => {
    try {
      const response = await api.delete(`/assignments/remove`, { data: { siteId: nurseToRemove.siteId, nurseId: nurseToRemove.nurseId } });
      if (response.data.status === 'ok') {
        fetchAssignments();
        handleConfirmDialogClose();
        setSnackbar({ open: true, message: '移除成功', severity: 'success' });
      } else {
        const message = response?.data?.message ?? 'System error';
        setSnackbar({ open: true, message, severity: 'error' });
      }
    } catch (error) {
      const message = error.response?.data?.message ?? 'System error';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          站點分配管理
        </Typography>
        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleDialogOpen}>
          分配護士到站點
        </Button>
        <Grid container spacing={2}>
          {assignments.map((assignment, index) => {
            const siteName = sites.find((site) => site.id.toString() === assignment.siteId.toString())?.name || '不存在的站點';

            return (
              <Grid item xs={12} sm={6} key={index}>
                <Paper sx={{ 
                  p: 4, 
                  backgroundColor: pastelColors[index % pastelColors.length],
                  transition: 'background-color 0.3s ease'
                }}>
                  <Typography 
                    variant="h5" 
                    color="textPrimary" 
                    sx={{ 
                      padding: '8px', 
                      textAlign: 'center'
                    }}
                    fontWeight={'fontWeightBold'}
                  >
                    {siteName}
                  </Typography>
                  {assignment.nurses.map((nurse) => (
                    <Box key={nurse.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ marginRight: '4px' }}>
                        {nurse.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ marginRight: '4px' }}>
                        編號: {nurse.employeeId}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        日期: {new Date(nurse.createdAt).toLocaleString('zh-TW', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour12: false
                      }).replace(/\//g, '-')}
                      </Typography>
                    </Box>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ ml: 2 }}
                        onClick={() => handleRemoveDialogOpen(assignment.siteId, nurse.id)}
                      >
                        移除
                      </Button>
                    </Box>
                  ))}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Assign Nurse Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>分配護士到站點</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>站點</InputLabel>
            <Select
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              label="Site"
            >
              {sites.map((site) => (
                <MenuItem key={site.id} value={site.id}>
                  {site.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>護士</InputLabel>
            <Select
              value={selectedNurse}
              onChange={(e) => setSelectedNurse(e.target.value)}
              label="Nurse"
            >
              {nurses.map((nurse) => (
                <MenuItem key={nurse.id} value={nurse.id}>
                  {nurse.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            取消
          </Button>
          <Button onClick={handleAssignNurse} color="primary">
            確認分配
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Remove Assignment Dialog */}
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleConfirmDialogClose}
        onConfirm={handleRemoveAssignment}
        title="確認移除"
        content={`確定要將 ${nurseToRemove?.nurseName} 從 ${nurseToRemove?.siteName} 移除嗎?`}
      />

      {/* Snackbar for notifications */}
      <SnackbarNotification
        snackbar={snackbar}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Container>
  );
}

export default AssignmentManagement;