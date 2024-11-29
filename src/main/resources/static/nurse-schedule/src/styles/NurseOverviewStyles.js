const NurseOverviewStyles = (theme) => ({
  container: {
    backgroundColor: '#fafafa',
    borderRadius: 2,
    p: 3,
    boxShadow: theme.shadows[1]
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3
  },

  title: {
    fontWeight: 'bold',
    color: theme.palette.primary.main
  },

  addButton: {
    borderRadius: 2,
    px: 3
  },

  tableContainer: {
    borderRadius: 2,
    boxShadow: theme.shadows[2],
    overflow: 'hidden'
  },

  tableHeader: {
    backgroundColor: theme.palette.primary.light
  },

  tableHeaderCell: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },

  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 2
  },

  actionButton: {
    borderRadius: 2,
    minWidth: '80px'
  },

  dialog: {
    borderRadius: 2,
    minHeight: '80vh'
  },

  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    pb: 2
  },

  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8
  },

  saveButton: {
    position: 'absolute',
    right: 48,
    top: 8
  },

  dialogContent: {
    mt: 2,
    minHeight: '600px'
  },

  textField: {
    mb: 3
  },

  sitesSection: {
    mt: 2
  },

  sitesSectionTitle: {
    mb: 2,
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  },

  sitesPaper: {
    p: 2,
    backgroundColor: '#f5f5f5',
    minHeight: 400
  },

  droppableArea: {
    minHeight: 350,
    transition: 'background-color 0.2s ease',
    p: 1
  },

  draggablePaper: (index, pastelColors) => ({
    p: 2,
    mb: 1,
    backgroundColor: pastelColors[index % pastelColors.length],
    '&:hover': {
      boxShadow: theme.shadows[3],
    }
  }),

  dragging: {
    transform: 'rotate(3deg)'
  },

  droppableAreaActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  }
});

export default NurseOverviewStyles;