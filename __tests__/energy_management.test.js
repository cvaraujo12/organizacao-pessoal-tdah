const EnergyManagement = require('../Funcionalidades/Funcionalidades-Avançadas/energy_management');

describe('EnergyManagement', () => {
    let energyManager;

    beforeEach(() => {
        energyManager = new EnergyManagement();
    });

    test('deve sugerir pausa longa quando energia está baixa', () => {
        const suggestion = energyManager.suggestBreak('study');
        expect(suggestion).toHaveProperty('duration');
        expect(suggestion).toHaveProperty('activities');
        expect(Array.isArray(suggestion.activities)).toBe(true);
    });

    test('deve calcular média de energia corretamente', () => {
        const levels = [
            { level: 5, timestamp: new Date() },
            { level: 7, timestamp: new Date() }
        ];
        const average = energyManager.calculateAverageEnergy(levels);
        expect(average).toBe(6);
    });

    test('deve retornar valor padrão quando não há níveis de energia', () => {
        const average = energyManager.calculateAverageEnergy([]);
        expect(average).toBe(7);
    });

    test('deve gerar sugestões de atividades baseadas no nível de energia', () => {
        const highEnergySuggestion = energyManager.suggestAction(8);
        expect(highEnergySuggestion.suggestion).toBe('Momento ideal para foco');
        
        const lowEnergySuggestion = energyManager.suggestAction(3);
        expect(lowEnergySuggestion.suggestion).toBe('Pausa necessária');
    });
}); 