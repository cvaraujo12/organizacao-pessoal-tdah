const sessionManager = require('./session-manager');
const securityProtocol = require('./security-protocol');

async function checkSession() {
  try {
    // Verificar pré-requisitos da sessão
    const canProceed = await sessionManager.checkSessionPrerequisites();
    if (!canProceed) {
      console.log('\n❌ Sessão não pode prosseguir - verifique os pré-requisitos');
      process.exit(1);
    }

    // Obter status atual
    const status = await sessionManager.getCurrentStatus();
    
    // Verificar complexidade cognitiva
    if (status.controle_cognitivo.complexidade_atual > 7) {
      console.log('\n⚠️ Alerta: Alta complexidade cognitiva detectada');
      console.log('Considere dividir as tarefas ou fazer uma pausa');
    }

    // Verificar necessidade de pausas
    if (status.controle_cognitivo.pausas_necessarias > 0) {
      console.log(`\n⚠️ Alerta: ${status.controle_cognitivo.pausas_necessarias} pausa(s) recomendada(s)`);
    }

    // Exibir status da sessão
    console.log('\n📊 Status da Sessão:');
    console.log(`- Progresso: ${status.progresso}%`);
    console.log(`- Fase Atual: ${status.fase_atual}`);
    console.log(`- Complexidade: ${status.controle_cognitivo.complexidade_atual}/10`);

    // Registrar verificação
    await securityProtocol.logInteraction({
      tarefa: 'Verificação de sessão',
      resultado: 'sucesso',
      observacoes: 'Sessão verificada e aprovada para continuar'
    });

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erro ao verificar sessão:', error.message);
    process.exit(1);
  }
}

checkSession(); 