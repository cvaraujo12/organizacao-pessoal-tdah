import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
  useTheme,
} from '@mui/material';
import {
  Home,
  Assignment,
  DateRange,
  Settings,
  Star,
  LocalHospital,
  AttachMoney,
  FitnessCenter,
  Restaurant,
  School,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant: 'permanent' | 'persistent' | 'temporary';
}

const menuItems = [
  { text: 'Início', icon: <Home />, path: '/' },
  { text: 'Tarefas', icon: <Assignment />, path: '/tarefas' },
  { text: 'Agenda', icon: <DateRange />, path: '/agenda' },
  { text: 'Metas', icon: <Star />, path: '/metas' },
  { text: 'Saúde', icon: <LocalHospital />, path: '/saude' },
  { text: 'Finanças', icon: <AttachMoney />, path: '/financas' },
  { text: 'Exercícios', icon: <FitnessCenter />, path: '/exercicios' },
  { text: 'Alimentação', icon: <Restaurant />, path: '/alimentacao' },
  { text: 'Estudos', icon: <School />, path: '/estudos' },
  { text: 'Configurações', icon: <Settings />, path: '/configuracoes' },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, variant }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const drawerWidth = 240;

  const handleNavigation = (path: string) => {
    navigate(path);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const content = (
    <>
      <Box
        sx={{
          height: 64, // Altura do Header
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      />
      <Divider />
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
                  '&:hover': {
                    backgroundColor: isActive 
                      ? theme.palette.action.selected 
                      : theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',
                    color: isActive 
                      ? theme.palette.primary.main 
                      : theme.palette.text.secondary,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? theme.palette.primary.main : 'inherit',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      {content}
    </Drawer>
  );
};

export default Sidebar; 