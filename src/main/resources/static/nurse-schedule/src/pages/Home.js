import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          護士站點管理系統
        </Typography>
        <Typography variant="body1" gutterBottom>
          醫院院內有數個站點，而每位護士皆可分配到數個站點執行勤務，以下為站點及護士的管理功能
        </Typography>
        <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="error" component={Link} to="/sites-list" sx={{ mr: 2 }}>
                站點管理
            </Button>
            <Button variant="contained" color="success" component={Link} to="/nurses-list" sx={{ mr: 2 }}>
                護士管理
            </Button>
            <Button variant="contained" color="info" component={Link} to="/assignments">
                站點分配管理
            </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
