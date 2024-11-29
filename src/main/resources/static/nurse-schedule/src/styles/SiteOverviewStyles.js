const SiteOverviewStyles = (theme) => ({
  // Main container
  container: {
    backgroundColor: '#fafafa',
    borderRadius: 2,
    p: 3,
    boxShadow: theme.shadows[1]
  },

  // Header section
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

  // Table styles
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
    fontSize: '1.1rem',
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tableCell: {
    fontSize: '1rem',
    py: 2,
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tableRow: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    height: '64px',
    borderBottom: `1px solid ${theme.palette.divider}`
  },

  // Action buttons
  actionButtonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 2
  },
  actionButton: {
    borderRadius: 2,
    minWidth: '80px'
  },

  // Dialog styles
  dialog: {
    borderRadius: 2,
    minWidth: '500px'
  },
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    pb: 2
  },
  dialogContent: {
    mt: 2
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
  textField: {
    mb: 3
  },

  // Nurse list section
  nursesSection: {
    mt: 2
  },
  nursesSectionTitle: {
    mb: 2,
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  },
  nursesHeader: {
    p: 2,
    backgroundColor: theme.palette.background.default,
    borderRadius: 2,
    border: `1px solid ${theme.palette.divider}`
  },
  nursesHeaderContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center'
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold'
  },

  // Nurse item styles
  nurseItem: (index, pastelColors) => ({
    p: 2,
    backgroundColor: pastelColors[index % pastelColors.length],
    transition: 'all 0.3s ease',
    borderRadius: 2,
    border: `1px solid ${theme.palette.divider}`,
    '&:hover': {
      boxShadow: theme.shadows[3],
      transform: 'translateY(-2px)'
    }
  }),
  nurseItemContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center'
  },
  nurseText: {
    flex: 1,
    fontWeight: 500
  },
  nurseActionContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  removeButton: {
    borderRadius: 2,
    padding: '2px 8px',
    minWidth: '60px'
  }
});

export default SiteOverviewStyles;