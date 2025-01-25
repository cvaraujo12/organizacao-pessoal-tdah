const config = {
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  
  database: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/organizador-tdah'
  },
  
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
    path: process.env.LOG_PATH || './logs'
  },
  
  security: {
    jwtSecret: process.env.JWT_SECRET,
    sessionSecret: process.env.SESSION_SECRET
  },
  
  api: {
    key: process.env.API_KEY
  },
  
  tdah: {
    visualFeedback: process.env.VISUAL_FEEDBACK === 'true',
    confirmationRequired: process.env.CONFIRMATION_REQUIRED === 'true',
    autoSave: process.env.AUTO_SAVE === 'true',
    
    // Configurações específicas TDAH
    interface: {
      colorScheme: 'high-contrast',
      fontSize: 'large',
      spacing: 'comfortable'
    },
    
    notifications: {
      style: 'visual',
      duration: 5000,
      position: 'top-right'
    },
    
    feedback: {
      sound: false,
      visual: true,
      haptic: false
    }
  }
};

module.exports = config; 