const securityProtocol = require('./security-protocol');

async function exampleTask() {
  // Exemplo de tarefa de alto risco
  const task = {
    description: 'Delete unused components',
    files: ['src/components/old/Button.tsx', 'src/components/old/Card.tsx'],
    confirmations: 0
  };

  // 1. Etapa de Análise
  console.log('\n[ANÁLISE]');
  console.log('- Tarefa:', task.description);
  console.log('- Arquivos:', task.files.join(', '));
  console.log('- Impacto: Remoção de componentes não utilizados');
  // Aguardar confirmação do usuário...

  // 2. Etapa de Planejamento
  const validation = await securityProtocol.validateTask(task);
  console.log('\n[PLANEJAMENTO]');
  console.log('- Nível de Risco:', validation.riskLevel);
  console.log('- Confirmações Necessárias:', validation.requiredConfirmations);
  console.log('- Backup será criado em: .backup/');
  // Aguardar confirmação do usuário...

  // 3. Etapa de Execução
  if (!validation.canProceed) {
    console.log('\n❌ Confirmações insuficientes para prosseguir');
    return;
  }

  // Criar backup antes de qualquer alteração
  await securityProtocol.verifyBackup(task.files);

  // 4. Etapa de Verificação
  await securityProtocol.logInteraction({
    tarefa: task.description,
    arquivos_afetados: task.files,
    confirmacoes: [
      {
        etapa: 'análise',
        status: 'aprovado',
        timestamp: new Date().toISOString()
      }
    ],
    resultado: 'sucesso',
    observacoes: 'Exemplo de uso do protocolo de segurança'
  });

  console.log('\n✅ Tarefa registrada com sucesso');
}

exampleTask().catch(console.error); 