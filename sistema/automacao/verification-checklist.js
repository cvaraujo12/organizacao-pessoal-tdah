const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configurações
const CONFIG = {
  rootDir: process.cwd(),
  requiredFiles: [
    'package.json',
    'tsconfig.json',
    'next.config.js',
    'postcss.config.js'
  ],
  requiredDirs: [
    'src',
    'public',
    'config',
    'docs'
  ]
};

// Funções de verificação
async function checkStructure() {
  const results = {
    files: {},
    directories: {}
  };

  // Verificar arquivos
  CONFIG.requiredFiles.forEach(file => {
    const filePath = path.join(CONFIG.rootDir, file);
    results.files[file] = fs.existsSync(filePath);
  });

  // Verificar diretórios
  CONFIG.requiredDirs.forEach(dir => {
    const dirPath = path.join(CONFIG.rootDir, dir);
    results.directories[dir] = fs.existsSync(dirPath);
  });

  return results;
}

async function checkDependencies() {
  try {
    execSync('npm ls --json', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

async function checkTypeScript() {
  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

async function checkLint() {
  try {
    execSync('npm run lint', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

async function checkTests() {
  try {
    execSync('npm test', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

async function checkBuild() {
  try {
    execSync('npm run build', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

// Função principal de verificação
async function runVerification() {
  console.log('Iniciando verificação do projeto...\n');

  try {
    // 1. Verificar estrutura
    console.log('1. Verificando estrutura...');
    const structureResults = await checkStructure();
    console.log('Arquivos:', structureResults.files);
    console.log('Diretórios:', structureResults.directories);

    // 2. Verificar dependências
    console.log('\n2. Verificando dependências...');
    const depsOk = await checkDependencies();
    console.log('Dependências OK:', depsOk);

    // 3. Verificar TypeScript
    console.log('\n3. Verificando TypeScript...');
    const tsOk = await checkTypeScript();
    console.log('TypeScript OK:', tsOk);

    // 4. Verificar Lint
    console.log('\n4. Verificando Lint...');
    const lintOk = await checkLint();
    console.log('Lint OK:', lintOk);

    // 5. Verificar Testes
    console.log('\n5. Verificando Testes...');
    const testsOk = await checkTests();
    console.log('Testes OK:', testsOk);

    // 6. Verificar Build
    console.log('\n6. Verificando Build...');
    const buildOk = await checkBuild();
    console.log('Build OK:', buildOk);

    // Resultado final
    const allChecks = [
      depsOk,
      tsOk,
      lintOk,
      testsOk,
      buildOk
    ];

    const allFilesOk = Object.values(structureResults.files).every(v => v);
    const allDirsOk = Object.values(structureResults.directories).every(v => v);
    const allTestsOk = allChecks.every(v => v);

    console.log('\nResultado Final:');
    console.log('----------------');
    console.log('Estrutura OK:', allFilesOk && allDirsOk);
    console.log('Todos os testes OK:', allTestsOk);
    console.log('Status Geral:', (allFilesOk && allDirsOk && allTestsOk) ? 'PASSOU' : 'FALHOU');

    return {
      structure: structureResults,
      dependencies: depsOk,
      typescript: tsOk,
      lint: lintOk,
      tests: testsOk,
      build: buildOk,
      passed: allFilesOk && allDirsOk && allTestsOk
    };
  } catch (error) {
    console.error('Erro durante a verificação:', error);
    return {
      error: error.message,
      passed: false
    };
  }
}

// Executar verificação
runVerification(); 