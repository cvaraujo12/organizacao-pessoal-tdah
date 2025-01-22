import React from 'react';
import { Card as MuiCard, CardContent, CardHeader, CardActions, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  variant?: 'default' | 'priority' | 'task';
  priority?: 'high' | 'medium' | 'low';
  onClick?: () => void;
  className?: string;
}

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'high':
      return 'rgba(244, 67, 54, 0.1)';
    case 'medium':
      return 'rgba(255, 193, 7, 0.1)';
    case 'low':
      return 'rgba(76, 175, 80, 0.1)';
    default:
      return 'transparent';
  }
};

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  actions,
  variant = 'default',
  priority,
  onClick,
  className,
}) => {
  const MotionCard = motion(MuiCard);

  return (
    <MotionCard
      whileHover={{ scale: onClick ? 1.02 : 1 }}
      whileTap={{ scale: onClick ? 0.98 : 1 }}
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: getPriorityColor(priority),
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: onClick ? '0 4px 8px rgba(0,0,0,0.1)' : undefined,
        },
      }}
      className={className}
    >
      {title && (
        <CardHeader
          title={
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          }
          subheader={subtitle && <Typography color="textSecondary">{subtitle}</Typography>}
        />
      )}
      <CardContent>{children}</CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </MotionCard>
  );
};

export default Card; 