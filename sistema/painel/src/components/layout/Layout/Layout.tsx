import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { ToastConfig } from '../../common/Toast/Toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Aqui você implementará a lógica de mudança de tema
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header
        onSidebarToggle={handleSidebarToggle}
        onThemeToggle={handleThemeToggle}
        isDarkMode={isDarkMode}
      />
      
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        variant={isMobile ? 'temporary' : 'permanent'}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${240}px)` },
          mt: 8, // Altura do Header + padding
          backgroundColor: theme.palette.background.default,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(sidebarOpen && {
            marginLeft: '240px',
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        {children}
      </Box>

      <ToastConfig />
    </Box>
  );
};

export default Layout; 