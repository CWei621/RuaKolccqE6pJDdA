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
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import api from '../api';
import StrictModeDroppable from '../components/StrictModeDroppable';
import PastelColors from '../utils/ColorUtils';
import NurseOverviewStyles from '../styles/NurseOverviewStyles';
import ConfirmDialog from '../components/ConfirmDialog';
import SnackbarNotification from '../components/SnackbarNotification';
import RESPONSE_MESSAGE from '../constants/ResponseMessage';


const theme = createTheme();
const styles = NurseOverviewStyles(theme);

function NurseOverview() {
  const [nurses, setNurses] = useState([]);
  const [unassignedSites, setUnassignedSites] = useState([]);
  const [assignedSites, setAssignedSites] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentNurse, setCurrentNurse] = useState(null);
  const [nurseName, setNurseName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [nurseToDelete, setNurseToDelete] = useState(null);

  const pastelColors = PastelColors;

  useEffect(() => {
    fetchNurses();
  }, []);

  const fetchNurses = async () => {
    try {
      const response = await api.get('/nurses');
      if (response.data.status === 'ok') {
        setNurses(response.data.data);
      } else {
        const message = response?.data?.message ?? RESPONSE_MESSAGE['System error'];
        setSnackbar({ open: true, message, severity: 'error' });
      }
    } catch (error) {
      const message = error.response?.data?.message ?? RESPONSE_MESSAGE['System error'];
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const fetchSites = async (nurseId) => {
    if (!nurseId) return;
    try {
      const [allSitesResponse, assignedSitesResponse] = await Promise.all([
        api.get('/sites'),
        api.get(`/assignments/nurse/${nurseId}`)
      ]);

      if (allSitesResponse.data.status === 'ok' && assignedSitesResponse.data.status === 'ok') {
        const allSites = allSitesResponse.data.data;
        const assignedSites = assignedSitesResponse.data.data;

        setAssignedSites(assignedSites);
        setUnassignedSites(
          allSites.filter(site =>
            !assignedSites.some(assignedSite => assignedSite.id === site.id)
          )
        );
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: RESPONSE_MESSAGE['System error'],
        severity: 'error'
      });
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const siteId = parseInt(draggableId);

    if (source.droppableId === 'unassigned' && destination.droppableId === 'assigned') {
      try {
        await api.post(`/assignments/assign`, { siteId, nurseId: currentNurse.id });
        fetchSites(currentNurse.id);
        setSnackbar({ open: true, message: '站點分配成功', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: '站點分配失敗', severity: 'error' });
      }
    } else if (source.droppableId === 'assigned' && destination.droppableId === 'unassigned') {
      try {
        await api.delete(`/assignments/remove`, { data: { siteId, nurseId: currentNurse.id } });
        fetchSites(currentNurse.id);
        setSnackbar({ open: true, message: '移除站點成功', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: '移除站點失敗', severity: 'error' });
      }
    }
  };

  const handleDialogOpen = (nurse = null) => {
    setCurrentNurse(nurse);
    setNurseName(nurse ? nurse.name : '');
    setEmployeeId(nurse ? nurse.employeeId : '');
    if (nurse) {
      fetchSites(nurse.id);
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setUnassignedSites([]);
    setAssignedSites([]);
  };

  const handleSaveNurse = async () => {
    if (!nurseName || !employeeId) {
      setSnackbar({ open: true, message: "員工姓名和員工編號不可為空", severity: 'error' });
      return;
    }

    try {
      if (currentNurse) {
        const response = await api.put(`/nurses/${currentNurse.id}`, {
          name: nurseName,
          employeeId: employeeId
        });
        if (response.data.status === 'ok') {
          setSnackbar({ open: true, message: '修改護士資料成功', severity: 'success' });
        }
      } else {
        const response = await api.post('/nurses', {
          name: nurseName,
          employeeId: employeeId
        });
        if (response.data.status === 'ok') {
          setSnackbar({ open: true, message: '新增護士成功', severity: 'success' });
        }
      }
      fetchNurses();
      handleDialogClose();
    } catch (error) {
      const message = error.response?.data?.message ?? RESPONSE_MESSAGE['System error'];
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const handleDeleteNurse = async (id) => {
    try {
      const response = await api.delete(`/nurses/${id}`);
      if (response.data.status === 'ok') {
        await fetchNurses();
        setSnackbar({
          open: true,
          message: '護士刪除成功',
          severity: 'success'
        });
      } else {
        const message = response?.data?.message ?? RESPONSE_MESSAGE['System error'];
        setSnackbar({
          open: true,
          message,
          severity: 'error'
        });
      }
    } catch (error) {
      const message = error.response?.data?.message ?? RESPONSE_MESSAGE['System error'];
      setSnackbar({
        open: true,
        message,
        severity: 'error'
      });
    }
  };

  const handleDeleteClick = (nurse) => {
    setNurseToDelete(nurse);
    setConfirmDialogOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    if (nurseToDelete) {
      await handleDeleteNurse(nurseToDelete.id);
      setConfirmDialogOpen(false);
      setNurseToDelete(null);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={styles.container}>
          <Box sx={styles.header}>
            <Typography variant="h4" sx={styles.title}>
              護士列表
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDialogOpen()}
              sx={styles.addButton}
            >
              新增護士
            </Button>
          </Box>

          <TableContainer component={Paper} sx={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow sx={styles.tableHeader}>
                  <TableCell align="center" sx={styles.tableHeaderCell}>護士姓名</TableCell>
                  <TableCell align="center" sx={styles.tableHeaderCell}>員工編號</TableCell>
                  <TableCell align="center" sx={styles.tableHeaderCell}>修改時間</TableCell>
                  <TableCell align="center" sx={styles.tableHeaderCell}>動作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nurses.map((nurse) => (
                  <TableRow key={nurse.id}>
                    <TableCell align="center">{nurse.name}</TableCell>
                    <TableCell align="center">{nurse.employeeId}</TableCell>
                    <TableCell align="center">
                      {new Date(nurse.updatedAt).toLocaleString('zh-TW', {
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
                      <Box sx={styles.actionButtons}>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={styles.actionButton}
                          onClick={() => handleDialogOpen(nurse)}
                        >
                          view
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={styles.actionButton}
                          onClick={() => handleDeleteClick(nurse)}
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
          maxWidth="md"
          fullWidth
          PaperProps={{ sx: styles.dialog }}
        >
          <DialogTitle sx={styles.dialogTitle}>
            {currentNurse ? '編輯護士資料' : '新增護士'}
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
              onClick={handleSaveNurse}
              aria-label="save"
              sx={styles.saveButton}
            >
              <SaveIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={styles.dialogContent}>
            <TextField
              margin="dense"
              label="員工編號"
              fullWidth
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              sx={styles.textField}
              required
            />
            <TextField
              autoFocus
              margin="dense"
              label="護士姓名"
              fullWidth
              value={nurseName}
              onChange={(e) => setNurseName(e.target.value)}
              sx={styles.textField}
              required
            />
            {currentNurse && (
              <Box sx={styles.sitesSection}>
                <Typography variant="h6" sx={styles.sitesSectionTitle}>
                  分配站點
                </Typography>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Paper sx={styles.sitesPaper}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                          已分配站點
                        </Typography>
                        <StrictModeDroppable droppableId="assigned">
                          {(provided, snapshot) => (
                            <Box
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              sx={{
                                ...styles.droppableArea,
                                ...(snapshot.isDraggingOver && styles.droppableAreaActive)
                              }}
                            >
                              {assignedSites.map((site, index) => (
                                <Draggable
                                  key={site.id.toString()}
                                  draggableId={site.id.toString()}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <Paper
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      sx={{
                                        ...styles.draggablePaper(index, pastelColors),
                                        ...(snapshot.isDragging && styles.dragging)
                                      }}
                                    >
                                      {site.name}
                                    </Paper>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </Box>
                          )}
                        </StrictModeDroppable>
                      </Paper>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Paper sx={styles.sitesPaper}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                          未分配站點
                        </Typography>
                        <StrictModeDroppable droppableId="unassigned">
                          {(provided, snapshot) => (
                            <Box
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              sx={{
                                ...styles.droppableArea,
                                ...(snapshot.isDraggingOver && styles.droppableAreaActive)
                              }}
                            >
                              {unassignedSites.map((site, index) => (
                                <Draggable
                                  key={site.id.toString()}
                                  draggableId={site.id.toString()}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <Paper
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      sx={{
                                        ...styles.draggablePaper(index, pastelColors),
                                        ...(snapshot.isDragging && styles.dragging)
                                      }}
                                    >
                                      {site.name}
                                    </Paper>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </Box>
                          )}
                        </StrictModeDroppable>
                      </Paper>
                    </Box>
                  </Box>
                </DragDropContext>
              </Box>
            )}
          </DialogContent>
        </Dialog>

        <SnackbarNotification
          snackbar={snackbar}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        />
        
        <ConfirmDialog
          open={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
          onConfirm={handleConfirmDelete}
          title="確認刪除"
          content="確定要刪除這位護士嗎？此操作無法撤銷。"
        />
      </Container>
    </ThemeProvider>
  );
}

export default NurseOverview;
