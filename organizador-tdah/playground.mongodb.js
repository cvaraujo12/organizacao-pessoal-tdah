/* global use, db */
// MongoDB Playground para Organizador TDAH

// 🔍 GUIA RÁPIDO:
// 1. Para executar todo o arquivo: Clique no ▶️ no canto superior direito
// 2. Para executar uma parte: Selecione o código e clique com botão direito -> "Run Selected Text"
// 3. Para ver os resultados: Observe o painel "MongoDB Playground" que abrirá
// 4. Para explorar os dados: Use o explorador do MongoDB na barra lateral esquerda

// 🔌 Teste de Conexão
use('organizador-tdah');
db.runCommand({ ping: 1 });

// 🗑️ Limpa as coleções existentes para teste
db.getCollection('User').drop();
db.getCollection('Task').drop();
db.getCollection('Note').drop();
db.getCollection('Goal').drop();

// 👤 Cria um usuário de teste
const userId = new ObjectId();
db.getCollection('User').insertOne({
  _id: userId,
  email: 'teste@exemplo.com',
  name: 'Usuário Teste',
  createdAt: new Date(),
  updatedAt: new Date()
});

// ✅ Insere tarefas de exemplo
db.getCollection('Task').insertMany([
  {
    title: 'Organizar área de trabalho',
    description: 'Limpar e organizar a mesa de trabalho',
    status: 'pending',
    priority: 'high',
    dueDate: new Date('2024-01-30'),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: userId
  },
  {
    title: 'Preparar material de estudo',
    description: 'Separar materiais para próxima sessão de estudos',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date('2024-01-25'),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: userId
  }
]);

// 📝 Insere notas
db.getCollection('Note').insertMany([
  {
    title: 'Rotina diária',
    content: 'Estabelecer horários fixos para tarefas importantes',
    category: 'organização',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: userId
  },
  {
    title: 'Técnicas de estudo',
    content: 'Usar pomodoro e mapas mentais',
    category: 'estudos',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: userId
  }
]);

// 🎯 Insere metas
db.getCollection('Goal').insertMany([
  {
    title: 'Melhorar organização pessoal',
    description: 'Implementar sistema de organização diária',
    status: 'in_progress',
    deadline: new Date('2024-03-01'),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: userId
  },
  {
    title: 'Estabelecer rotina de estudos',
    description: 'Criar e manter horários fixos para estudo',
    status: 'in_progress',
    deadline: new Date('2024-02-15'),
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: userId
  }
]);

// 🔍 CONSULTAS ÚTEIS (você pode executar cada uma separadamente)

// 1. Todas as tarefas pendentes
console.log('\n📋 Tarefas Pendentes:');
db.getCollection('Task').find({
  status: 'pending',
  userId: userId
}).pretty();

// 2. Notas agrupadas por categoria
console.log('\n📚 Notas por Categoria:');
db.getCollection('Note').aggregate([
  { $match: { userId: userId } },
  { $group: { _id: '$category', notes: { $push: '$$ROOT' } } }
]).pretty();

// 3. Metas com prazo próximo
console.log('\n🎯 Metas Próximas:');
db.getCollection('Goal').find({
  userId: userId,
  deadline: { $gte: new Date(), $lte: new Date('2024-02-15') }
}).pretty();

// 4. Contagem de itens por coleção
console.log('\n📊 Estatísticas:');
console.log('Usuários:', db.getCollection('User').countDocuments());
console.log('Tarefas:', db.getCollection('Task').countDocuments());
console.log('Notas:', db.getCollection('Note').countDocuments());
console.log('Metas:', db.getCollection('Goal').countDocuments()); 