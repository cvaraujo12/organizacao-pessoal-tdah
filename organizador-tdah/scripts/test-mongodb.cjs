require('dotenv').config();
const { testConnection } = require('../src/lib/mongodb.cjs');

async function main() {
  console.log('🔄 Testando conexão com MongoDB...');
  console.log('URI:', process.env.MONGODB_URI);
  
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