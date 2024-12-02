import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  createTheme,
  ThemeProvider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import api from '../api';
import ConfirmDialog from '../components/ConfirmDialog';
import SnackbarNotification from '../components/SnackbarNotification';
import SiteOverviewStyles from '../styles/SiteOverviewStyles';
import PastelColors from '../utils/ColorUtils';
import RESPONSE_MESSAGE from '../constants/ResponseMessage';

const theme = createTheme();
const styles = SiteOverviewStyles(theme);

function SiteOverview() {
  const [sites, setSites] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSite, setCurrentSite] = useState(null);
  const [siteName, setSiteName] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [siteToDelete, setSiteToDelete] = useState(null);
  const [nurseToDelete, setNurseToDelete] = useState(null);
  const [confirmNurseDialogOpen, setConfirmNurseDialogOpen] = useState(false);

  const pastelColors = PastelColors;

  const fetchSites = async () => {
    try {
      const response = await api.get('/sites');
      if (response.data.status === 'ok') {
        setSites(response.data.data);
      } else {
        const message = response?.data?.message ?? RESPONSE_MESSAGE['System error'];
        setSnackbar({ open: true, message, severity: 'error' });
      }
    } catch (error) {
      const message = error.response?.data?.message ?? RESPONSE_MESSAGE['System error'];
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const fetchNurses = async (siteId) => {
    if (!siteId) return;
    try {
      const response = await api.get(`/assignments/site/${siteId}`);
      if (response.data.status === 'ok') {
        setNurses(response.data.data || []);
      } else {
        const message = response?.data?.message ?? 'Failed to fetch nurses';
        setSnackbar({ open: true, message, severity: 'error' });
      }
    } catch (error) {
      const message = error.response?.data?.message ?? 'Failed to fetch nurses';
      setSnackbar({ open: true, message, severity: 'error' });
      setNurses([]);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const handleDialogOpen = (site = null) => {
    setCurrentSite(site);
    setSiteName(site ? site.name : '');
    if (site) {
      fetchNurses(site.id);
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNurses([]);
  };

  const handleSaveSite = async () => {
    try {
      if (currentSite) {
        const response = await api.put(`/sites/${currentSite.id}`, { name: siteName });
        if (response.data.status === 'ok') {
          setSnackbar({ open: true, message: '修改站點成功', severity: 'success' });
        }
      } else {
        if (siteName.trim() === '') {
          setSnackbar({ open: true, message: '站點名稱不可為空', severity: 'error' });
          return;
        }
        const response = await api.post('/sites', { name: siteName });
        if (response.data.status === 'ok') {
          setSnackbar({ open: true, message: '新增站點成功', severity: 'success' });
        }
      }
      fetchSites();
      handleDialogClose();
    } catch (error) {
      const message = error.response?.data?.message ?? 'Failed to save site';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const handleDeleteSite = async (id) => {
    try {
      const response = await api.delete(`/sites/${id}`);
      if (response.data.status === 'ok') {
        fetchSites();
        setSnackbar({ open: true, message: '站點刪除成功', severity: 'success' });
      }
    } catch (error) {
      const message = error.response?.data?.message ?? RESPONSE_MESSAGE['System error'];
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const handleDeleteSiteClick = (site) => {
    setSiteToDelete(site);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
    setSiteToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (siteToDelete) {
      await handleDeleteSite(siteToDelete.id);
      handleConfirmDialogClose();
    }
  };

  const handleRemoveNurseClick = (nurse) => {
    setNurseToDelete(nurse);
    setConfirmNurseDialogOpen(true);
  };

  const handleConfirmNurseDialogClose = () => {
    setConfirmNurseDialogOpen(false);
    setNurseToDelete(null);
  };

  const handleConfirmRemoveNurse = async () => {
    if (nurseToDelete) {
      await handleRemoveNurse(nurseToDelete.id);
      handleConfirmNurseDialogClose();
    }
  };

  const handleRemoveNurse = async (nurseId) => {
    try {
      const response = await api.delete(`/assignments/remove`, {
        data: { siteId: currentSite.id, nurseId: nurseId }
      });
      if (response.data.status === 'ok') {
        fetchNurses(currentSite.id);
        setSnackbar({ open: true, message: '移除成功', severity: 'success' });
      }
    } catch (error) {
      const message = error.response?.data?.message ?? '移除失敗';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={styles.container}>
          <Box sx={styles.header}>
            <Typography variant="h4" sx={styles.title}>
              站點列表
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDialogOpen()}
              sx={styles.addButton}
            >
              新增站點
            </Button>
          </Box>

          <TableContainer component={Paper} sx={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow sx={styles.tableHeader}>
                  <TableCell align="center" sx={styles.tableHeaderCell}>站點</TableCell>
                  <TableCell align="center" sx={styles.tableHeaderCell}>修改時間</TableCell>
                  <TableCell align="center" sx={styles.tableHeaderCell}>動作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sites.map((site) => (
                  <TableRow key={site.id} sx={styles.tableRow}>
                    <TableCell align="center" sx={styles.tableCell}>
                      {site.name}
                    </TableCell>
                    <TableCell align="center" sx={styles.tableCell}>
                      {new Date(site.updatedAt).toLocaleString('zh-TW', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                      }).replace(/\//g, '/')}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={styles.actionButtonsContainer}>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={styles.actionButton}
                          onClick={() => handleDialogOpen(site)}
                        >
                          view
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={styles.actionButton}
                          onClick={() => handleDeleteSiteClick(site)}
                        >
                          delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          PaperProps={{ sx: styles.dialog }}
        >
          <DialogTitle sx={styles.dialogTitle}>
            {currentSite ? '編輯站點' : '新增站點'}
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDialogClose}
              aria-label="close"
              sx={styles.closeButton}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleSaveSite}
              aria-label="save"
              sx={styles.saveButton}
            >
              <SaveIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={styles.dialogContent}>
            <TextField
              autoFocus
              margin="dense"
              label="站點名稱"
              fullWidth
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              sx={styles.textField}
            />
            {currentSite && (
              <Box sx={styles.nursesSection}>
                <Typography variant="h6" sx={styles.nursesSectionTitle}>
                  站點護士列表
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Paper sx={styles.nursesHeader}>
                    <Box sx={styles.nursesHeaderContent}>
                      <Typography variant="body1" sx={styles.headerText}>
                        員工編號
                      </Typography>
                      <Typography variant="body1" sx={styles.headerText}>
                        修改時間
                      </Typography>
                      <Typography variant="body1" sx={styles.headerText}>
                        操作
                      </Typography>
                    </Box>
                  </Paper>

                  {nurses.map((nurse, index) => (
                    <Paper key={nurse.id} sx={styles.nurseItem(index, pastelColors)}>
                      <Box sx={styles.nurseItemContent}>
                        <Typography variant="body1" sx={styles.nurseText}>
                          {nurse.employeeId}
                        </Typography>
                        <Typography variant="body1" sx={styles.nurseText}>
                          {new Date(nurse.createdAt).toLocaleString('zh-TW', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: false
                          }).replace(/\//g, '/')}
                        </Typography>
                        <Box sx={styles.nurseActionContainer}>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={styles.removeButton}
                            onClick={() => handleRemoveNurseClick(nurse)}
                          >
                            移除
                          </Button>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          open={confirmDialogOpen}
          onClose={handleConfirmDialogClose}
          onConfirm={handleConfirmDelete}
          title="確認刪除"
          content="你確定要刪除這個站點嗎？此操作無法撤銷。"
        />

        <ConfirmDialog
          open={confirmNurseDialogOpen}
          onClose={handleConfirmNurseDialogClose}
          onConfirm={handleConfirmRemoveNurse}
          title="確認移除"
          content="你確定要移除這個護士嗎？此操作無法撤銷。"
        />

        <SnackbarNotification
          snackbar={snackbar}
          onClose={handleSnackbarClose}
        />
      </Container>
    </ThemeProvider>
  );
}

export default SiteOverview;