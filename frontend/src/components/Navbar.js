import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Toolbar, Typography, Divider } from '@mui/material';
import {Menu as MenuIcon, Home, NaturePeople, AddBusiness, Group} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const menuItems = [
        { text: '主畫面', icon: <Home />, link: '/' },
        // { text: '站點列表', icon: <Room />, link: '/sites' },
        // { text: '護士列表', icon: <People />, link: '/nurses' },
        { text: '站點分配管理', icon: <NaturePeople />, link: '/assignments' },
        { text: '站點管理', icon: <AddBusiness />, link: '/sites-list' },
        { text: '護士管理', icon: <Group />, link: '/nurses-list' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            {/* 左側 Drawer */}
            <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': { width: 280, boxSizing: 'border-box', backgroundColor: '#f5f5f5' },
                }}
            >
                <Toolbar>
                    <Typography variant="h6" sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        Menu
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            component={Link}
                            to={item.link}
                            onClick={toggleDrawer(false)}
                            sx={{
                                backgroundColor: location.pathname === item.link ? '#e0e0e0' : 'transparent',
                                '&:hover': { backgroundColor: '#d0d0d0' },
                            }}
                        >
                            <ListItemIcon sx={{ color: location.pathname === item.link ? '#1976d2' : '#757575' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    color: location.pathname === item.link ? '#1976d2' : '#000',
                                    fontWeight: location.pathname === item.link ? 'bold' : 'normal',
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* 頂部 Toolbar */}
            <Box sx={{ flexGrow: 1 }}>
                <Toolbar
                    sx={{
                        backgroundColor: '#3f51b5',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">護士站點管理系統</Typography>
                </Toolbar>
            </Box>
        </Box>
    );
}

export default Navbar;
