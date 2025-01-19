// Gerenciamento de Energia Mental para TDAH
const fs = require('fs');
const path = require('path');

class EnergyManagement {
    constructor() {
        this.dataFile = path.join(process.cwd(), 'Saúde', 'energy_data.json');
        this.energyLevels = [];
        this.loadData();
    }

    // Carrega dados existentes
    loadData() {
        try {
            if (fs.existsSync(this.dataFile)) {
                this.energyLevels = JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            this.energyLevels = [];
        }
    }

    // Salva dados atualizados
    saveData() {
        try {
            fs.writeFileSync(this.dataFile, JSON.stringify(this.energyLevels, null, 2));
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
        }
    }

    // Registra nível de energia
    registerEnergyLevel(level, timestamp = new Date(), notes = '') {
        const entry = {
            level,
            timestamp,
            notes,
            activities: this.getCurrentActivities()
        };
        this.energyLevels.push(entry);
        this.saveData();
        return this.suggestAction(level);
    }

    // Sugere pausa baseada no tipo de atividade e nível de energia
    suggestBreak(activityType) {
        const recentLevels = this.getRecentEnergyLevels();
        const averageEnergy = this.calculateAverageEnergy(recentLevels);
        
        if (averageEnergy < 5) {
            return this.generateBreakSuggestion('long');
        } else if (averageEnergy < 7) {
            return this.generateBreakSuggestion('medium');
        } else {
            return this.generateBreakSuggestion('short');
        }
    }

    // Otimiza rotina baseada em padrões de energia
    optimizeRoutine(objective) {
        const patterns = this.analyzeEnergyPatterns();
        const recommendations = {
            highEnergyTasks: this.getOptimalTasksForEnergy('high'),
            moderateEnergyTasks: this.getOptimalTasksForEnergy('moderate'),
            lowEnergyTasks: this.getOptimalTasksForEnergy('low'),
            breakPatterns: this.suggestBreakPatterns(),
            timeBlocks: this.suggestTimeBlocks()
        };

        return this.generateRoutineRecommendations(patterns, recommendations, objective);
    }

    // Métodos auxiliares
    getCurrentActivities() {
        // Implementar integração com sistema de tarefas
        return [];
    }

    getRecentEnergyLevels(hours = 4) {
        const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
        return this.energyLevels.filter(entry => new Date(entry.timestamp) > cutoff);
    }

    calculateAverageEnergy(levels) {
        if (levels.length === 0) return 7; // valor padrão otimista
        return levels.reduce((sum, entry) => sum + entry.level, 0) / levels.length;
    }

    generateBreakSuggestion(type) {
        const suggestions = {
            long: {
                duration: '30 minutos',
                activities: [
                    'Fazer uma caminhada leve',
                    'Praticar exercícios de respiração',
                    'Meditar',
                    'Fazer um lanche saudável'
                ]
            },
            medium: {
                duration: '15 minutos',
                activities: [
                    'Alongamento',
                    'Exercícios de respiração rápidos',
                    'Beber água e fazer um lanche',
                    'Ouvir uma música relaxante'
                ]
            },
            short: {
                duration: '5 minutos',
                activities: [
                    'Alongar-se na cadeira',
                    'Beber água',
                    'Fazer exercícios para os olhos',
                    'Respiração profunda'
                ]
            }
        };

        return suggestions[type];
    }

    analyzeEnergyPatterns() {
        const patterns = {
            highEnergyPeriods: this.findHighEnergyPeriods(),
            lowEnergyPeriods: this.findLowEnergyPeriods(),
            consistentPatterns: this.findConsistentPatterns()
        };

        return patterns;
    }

    findHighEnergyPeriods() {
        return this.energyLevels
            .filter(entry => entry.level >= 7)
            .map(entry => ({
                time: new Date(entry.timestamp).getHours(),
                level: entry.level
            }));
    }

    findLowEnergyPeriods() {
        return this.energyLevels
            .filter(entry => entry.level <= 4)
            .map(entry => ({
                time: new Date(entry.timestamp).getHours(),
                level: entry.level
            }));
    }

    findConsistentPatterns() {
        // Implementar análise de padrões consistentes
        return [];
    }

    getOptimalTasksForEnergy(energyLevel) {
        const taskSuggestions = {
            high: [
                'Estudar conteúdos novos',
                'Resolver exercícios complexos',
                'Fazer simulados',
                'Participar de discussões'
            ],
            moderate: [
                'Revisar conteúdo',
                'Organizar materiais',
                'Fazer resumos',
                'Praticar exercícios já conhecidos'
            ],
            low: [
                'Organizar ambiente',
                'Atualizar listas',
                'Revisar anotações simples',
                'Assistir vídeos de revisão'
            ]
        };

        return taskSuggestions[energyLevel];
    }

    suggestBreakPatterns() {
        return {
            morning: this.generateBreakSuggestion('short'),
            afternoon: this.generateBreakSuggestion('medium'),
            evening: this.generateBreakSuggestion('long')
        };
    }

    suggestTimeBlocks() {
        return {
            focusBlocks: this.generateFocusBlocks(),
            breakBlocks: this.generateBreakBlocks(),
            flexibleBlocks: this.generateFlexibleBlocks()
        };
    }

    generateFocusBlocks() {
        return [
            { start: '09:00', end: '10:30', type: 'deep_focus' },
            { start: '11:00', end: '12:00', type: 'moderate_focus' },
            { start: '14:00', end: '15:30', type: 'deep_focus' },
            { start: '16:00', end: '17:00', type: 'moderate_focus' }
        ];
    }

    generateBreakBlocks() {
        return [
            { start: '10:30', end: '11:00', type: 'active_break' },
            { start: '12:00', end: '14:00', type: 'lunch_break' },
            { start: '15:30', end: '16:00', type: 'relaxation_break' },
            { start: '17:00', end: '17:15', type: 'quick_break' }
        ];
    }

    generateFlexibleBlocks() {
        return [
            { start: '08:00', end: '09:00', type: 'preparation' },
            { start: '17:15', end: '18:00', type: 'wrap_up' }
        ];
    }

    generateRoutineRecommendations(patterns, recommendations, objective) {
        return {
            dailySchedule: this.createDailySchedule(patterns, recommendations),
            energyManagement: this.createEnergyManagementPlan(patterns),
            breakSchedule: this.createBreakSchedule(recommendations.breakPatterns),
            objectives: this.alignWithObjectives(objective, recommendations)
        };
    }

    createDailySchedule(patterns, recommendations) {
        // Implementar geração de cronograma diário
        return {};
    }

    createEnergyManagementPlan(patterns) {
        // Implementar plano de gestão de energia
        return {};
    }

    createBreakSchedule(breakPatterns) {
        // Implementar cronograma de pausas
        return {};
    }

    alignWithObjectives(objective, recommendations) {
        // Implementar alinhamento com objetivos
        return {};
    }

    suggestAction(energyLevel) {
        if (energyLevel <= 3) {
            return {
                suggestion: 'Pausa necessária',
                actions: this.generateBreakSuggestion('long').activities
            };
        } else if (energyLevel <= 6) {
            return {
                suggestion: 'Atividades moderadas',
                actions: this.getOptimalTasksForEnergy('moderate')
            };
        } else {
            return {
                suggestion: 'Momento ideal para foco',
                actions: this.getOptimalTasksForEnergy('high')
            };
        }
    }
}

module.exports = EnergyManagement; 