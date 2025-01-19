const express = require('express');
const path = require('path');
const winston = require('winston');
const ZenkitIntegration = require('./Funcionalidades/Funcionalidades-Avançadas/zenkit_integration');
const EnergyManagement = require('./Funcionalidades/Funcionalidades-Avançadas/energy_management');

// Configuração do logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'organizacao-tdah' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Rotas básicas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'painel_controle.html'));
});

// API endpoints
app.get('/api/energy/current', (req, res) => {
    const energyManager = new EnergyManagement();
    const currentEnergy = energyManager.getRecentEnergyLevels(1);
    res.json(currentEnergy);
});

app.post('/api/energy/register', (req, res) => {
    const { level, notes } = req.body;
    const energyManager = new EnergyManagement();
    const result = energyManager.registerEnergyLevel(level, new Date(), notes);
    res.json(result);
});

app.get('/api/tasks/sync', async (req, res) => {
    try {
        const zenkit = new ZenkitIntegration(process.env.ZENKIT_API_KEY, process.env.ZENKIT_WORKSPACE_ID);
        const result = await zenkit.syncTasks('all');
        res.json(result);
    } catch (error) {
        logger.error('Erro na sincronização com Zenkit:', error);
        res.status(500).json({ error: 'Erro na sincronização' });
    }
});

// Tratamento de erros
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// Inicialização do servidor
app.listen(port, () => {
    logger.info(`Servidor rodando na porta ${port}`);
    console.log(`Servidor rodando na porta ${port}`);
}); 