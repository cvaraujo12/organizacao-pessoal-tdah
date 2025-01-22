const { testConnection } = require('../src/lib/mongodb.js');

async function main() {
  console.log('🔄 Testando conexão com MongoDB...');
  
  const result = await testConnection();
  
  if (result.success) {
    console.log('✅', result.message);
    process.exit(0);
  } else {
    console.error('❌', result.message);
    if (result.error) {
      console.error('Detalhes do erro:', result.error);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Erro inesperado:', error);
  process.exit(1);
}); 