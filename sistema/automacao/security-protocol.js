const fs = require('fs');
const path = require('path');

class SecurityProtocol {
  constructor() {
    this.logFile = path.join(__dirname, '..', 'logs', 'security-protocol.json');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  async checkRiskLevel(task) {
    const highRiskKeywords = ['delete', 'remove', 'drop', 'truncate'];
    const mediumRiskKeywords = ['modify', 'update', 'alter', 'change'];
    
    if (highRiskKeywords.some(keyword => task.toLowerCase().includes(keyword))) {
      return 'high';
    }
    if (mediumRiskKeywords.some(keyword => task.toLowerCase().includes(keyword))) {
      return 'medium';
    }
    return 'low';
  }

  async logInteraction(data) {
    const log = {
      data: new Date().toISOString().split('T')[0],
      hora: new Date().toTimeString().split(' ')[0],
      ...data
    };

    let logs = [];
    if (fs.existsSync(this.logFile)) {
      logs = JSON.parse(fs.readFileSync(this.logFile, 'utf8'));
    }
    
    logs.push(log);
    fs.writeFileSync(this.logFile, JSON.stringify(logs, null, 2));
  }

  async verifyBackup(files) {
    const backupDir = path.join(__dirname, '..', '.backup');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    for (const file of files) {
      if (fs.existsSync(file)) {
        const backupPath = path.join(backupDir, path.basename(file));
        fs.copyFileSync(file, backupPath);
      }
    }
  }

  async requireConfirmations(riskLevel) {
    const confirmations = {
      low: 1,
      medium: 2,
      high: 3
    };
    return confirmations[riskLevel] || 3;
  }

  async validateTask(task) {
    const riskLevel = await this.checkRiskLevel(task.description);
    const requiredConfirmations = await this.requireConfirmations(riskLevel);

    return {
      riskLevel,
      requiredConfirmations,
      canProceed: task.confirmations >= requiredConfirmations
    };
  }
}

module.exports = new SecurityProtocol(); 