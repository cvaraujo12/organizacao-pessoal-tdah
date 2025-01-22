const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/organizador-tdah';

if (!MONGODB_URI) {
  throw new Error('Por favor, defina a variável de ambiente MONGODB_URI');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ Conexão com MongoDB estabelecida com sucesso!');
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.error('❌ Erro ao conectar com MongoDB:', e);
    throw e;
  }
}

async function testConnection() {
  try {
    await connectDB();
    return { success: true, message: 'Conexão com MongoDB testada com sucesso!' };
  } catch (error) {
    return { 
      success: false, 
      message: 'Erro ao testar conexão com MongoDB',
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

module.exports = {
  connectDB,
  testConnection
}; 