const fs = require('fs');
const path = require('path');

class SessionManager {
  constructor() {
    this.statusFile = path.join(__dirname, '..', 'painel_status.json');
    this.memoryFile = path.join(__dirname, '..', 'CURSOR_MEMORY.md');
    this.ensureFiles();
  }

  ensureFiles() {
    if (!fs.existsSync(this.statusFile)) {
      this.initializeStatus();
    }
    if (!fs.existsSync(this.memoryFile)) {
      this.initializeMemory();
    }
  }

  initializeStatus() {
    const initialStatus = {
      ultima_verificacao: new Date().toISOString().split('T')[0],
      fase_atual: "configuração_inicial",
      progresso: 0,
      checklist_pre_sessao: {
        cursor_memory_revisado: false,
        objetivo_definido: false,
        decisoes_anteriores_verificadas: false
      },
      sessao_atual: {
        objetivo: "",
        passos_planejados: [],
        passos_executados: [],
        decisoes_tomadas: [],
        pendencias: []
      },
      historico: [],
      metricas: {
        tempo_medio_tarefa: 0,
        taxa_conclusao: 0,
        taxa_retrabalho: 0
      },
      controle_cognitivo: {
        complexidade_atual: 0,
        pontos_decisao: 0,
        pausas_necessarias: 0
      }
    };

    fs.writeFileSync(this.statusFile, JSON.stringify(initialStatus, null, 2));
  }

  initializeMemory() {
    const initialMemory = `# Memória do Projeto: Organizador Pessoal TDAH\n\n## Sessões\n\n### [${new Date().toISOString().split('T')[0]}] Início do Projeto\n- Configuração inicial do ambiente\n- Definição de estrutura base\n\n## Aprendizados\n\n## Decisões Importantes\n`;
    
    fs.writeFileSync(this.memoryFile, initialMemory);
  }

  async checkSessionPrerequisites() {
    const status = JSON.parse(fs.readFileSync(this.statusFile, 'utf8'));
    
    if (!status.checklist_pre_sessao.cursor_memory_revisado) {
      console.log('⚠️ CURSOR_MEMORY.md não foi revisado');
      return false;
    }

    if (!status.checklist_pre_sessao.objetivo_definido) {
      console.log('⚠️ Objetivo da sessão não definido');
      return false;
    }

    return true;
  }

  async updateStatus(updates) {
    const currentStatus = JSON.parse(fs.readFileSync(this.statusFile, 'utf8'));
    const newStatus = { ...currentStatus, ...updates };
    fs.writeFileSync(this.statusFile, JSON.stringify(newStatus, null, 2));
  }

  async logMemory(entry) {
    const memory = fs.readFileSync(this.memoryFile, 'utf8');
    const newEntry = `\n### [${new Date().toISOString().split('T')[0]}] ${entry.title}\n${entry.content}\n`;
    fs.writeFileSync(this.memoryFile, memory + newEntry);
  }

  async getCurrentStatus() {
    return JSON.parse(fs.readFileSync(this.statusFile, 'utf8'));
  }
}

module.exports = new SessionManager(); 