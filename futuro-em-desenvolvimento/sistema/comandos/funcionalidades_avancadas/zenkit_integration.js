// Integração com Zenkit
const axios = require('axios');
const fs = require('fs');
const path = require('path');

class ZenkitIntegration {
    constructor(apiKey, workspaceId) {
        this.apiKey = apiKey;
        this.workspaceId = workspaceId;
        this.baseUrl = 'https://api.zenkit.com/v1';
        this.headers = {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        };
    }

    // Sincroniza tarefas com o Zenkit
    async syncTasks(area) {
        try {
            const localTasks = await this.getLocalTasks(area);
            const zenkitTasks = await this.getZenkitTasks(area);
            
            // Sincroniza em ambas as direções
            await this.syncToZenkit(localTasks, zenkitTasks);
            await this.syncFromZenkit(zenkitTasks, localTasks);
            
            return { success: true, message: 'Sincronização completa' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Importa dados do Zenkit
    async importData(fileName) {
        try {
            const data = await this.fetchZenkitData();
            await this.saveLocalData(fileName, data);
            return { success: true, message: 'Dados importados com sucesso' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Exporta dados para o Zenkit
    async exportData(area) {
        try {
            const localData = await this.getLocalData(area);
            await this.sendToZenkit(localData);
            return { success: true, message: 'Dados exportados com sucesso' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Métodos auxiliares
    async getLocalTasks(area) {
        const filePath = path.join(process.cwd(), area, 'tasks.json');
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    async getZenkitTasks(area) {
        const response = await axios.get(
            `${this.baseUrl}/lists/${this.workspaceId}/tasks`,
            { headers: this.headers }
        );
        return response.data;
    }

    async syncToZenkit(localTasks, zenkitTasks) {
        const newTasks = this.findNewTasks(localTasks, zenkitTasks);
        for (const task of newTasks) {
            await this.createZenkitTask(task);
        }
    }

    async syncFromZenkit(zenkitTasks, localTasks) {
        const newTasks = this.findNewTasks(zenkitTasks, localTasks);
        for (const task of newTasks) {
            await this.createLocalTask(task);
        }
    }

    async createZenkitTask(task) {
        await axios.post(
            `${this.baseUrl}/lists/${this.workspaceId}/tasks`,
            task,
            { headers: this.headers }
        );
    }

    async createLocalTask(task) {
        const filePath = path.join(process.cwd(), task.area, 'tasks.json');
        const tasks = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        tasks.push(task);
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    }

    findNewTasks(sourceTasks, targetTasks) {
        return sourceTasks.filter(sourceTask => 
            !targetTasks.some(targetTask => targetTask.id === sourceTask.id)
        );
    }

    // Adaptadores para diferentes formatos de dados
    adaptTaskToZenkit(task) {
        return {
            title: task.description,
            status: this.mapStatusToZenkit(task.status),
            priority: this.mapPriorityToZenkit(task.priority),
            dueDate: task.dueDate,
            tags: task.categories
        };
    }

    adaptTaskFromZenkit(zenkitTask) {
        return {
            description: zenkitTask.title,
            status: this.mapStatusFromZenkit(zenkitTask.status),
            priority: this.mapPriorityFromZenkit(zenkitTask.priority),
            dueDate: zenkitTask.dueDate,
            categories: zenkitTask.tags
        };
    }

    // Mapeamento de status e prioridades
    mapStatusToZenkit(status) {
        const statusMap = {
            'pending': 'todo',
            'in_progress': 'doing',
            'completed': 'done'
        };
        return statusMap[status] || 'todo';
    }

    mapStatusFromZenkit(status) {
        const statusMap = {
            'todo': 'pending',
            'doing': 'in_progress',
            'done': 'completed'
        };
        return statusMap[status] || 'pending';
    }

    mapPriorityToZenkit(priority) {
        const priorityMap = {
            'low': 1,
            'medium': 2,
            'high': 3
        };
        return priorityMap[priority] || 2;
    }

    mapPriorityFromZenkit(priority) {
        const priorityMap = {
            1: 'low',
            2: 'medium',
            3: 'high'
        };
        return priorityMap[priority] || 'medium';
    }
}

module.exports = ZenkitIntegration; 