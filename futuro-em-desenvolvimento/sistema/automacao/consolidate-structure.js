const fs = require('fs');
const path = require('path');

// Configurações
const CONFIG = {
  rootDir: process.cwd(),
  targetDir: path.join(process.cwd(), 'futuro-em-desenvolvimento', 'sistema', 'painel-v2'),
  srcDirs: [
    path.join(process.cwd(), 'futuro-em-desenvolvimento', 'sistema', 'painel-v2', 'src')
  ],
  configFiles: {
    typescript: 'tsconfig.json',
    next: 'next.config.js',
    package: 'package.json',
    postcss: 'postcss.config.js'
  }
};

// Funções auxiliares
function createDirIfNotExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function mergePackageJson() {
  const rootPackage = require(path.join(CONFIG.rootDir, 'package.json'));
  const panelPackage = require(path.join(CONFIG.targetDir, 'package.json'));

  // Mesclar dependências
  const mergedDependencies = {
    ...rootPackage.dependencies,
    ...panelPackage.dependencies
  };

  const mergedDevDependencies = {
    ...rootPackage.devDependencies,
    ...panelPackage.devDependencies
  };

  // Criar novo package.json
  const mergedPackage = {
    name: "organizador-pessoal-tdah",
    version: "1.0.0",
    private: true,
    scripts: {
      ...rootPackage.scripts,
      ...panelPackage.scripts
    },
    dependencies: mergedDependencies,
    devDependencies: mergedDevDependencies
  };

  return mergedPackage;
}

function consolidateTypescript() {
  const baseConfig = {
    compilerOptions: {
      target: "es5",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "node",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [
        {
          name: "next"
        }
      ],
      paths: {
        "@/*": ["./src/*"]
      }
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"]
  };

  return baseConfig;
}

function consolidateNextConfig() {
  return `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

module.exports = nextConfig;`;
}

function consolidatePostcssConfig() {
  return `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;
}

// Função principal
async function consolidateStructure() {
  try {
    // 1. Criar diretório consolidado
    const consolidatedDir = path.join(CONFIG.rootDir, 'consolidated');
    createDirIfNotExists(consolidatedDir);

    // 2. Mesclar package.json
    const mergedPackage = mergePackageJson();
    fs.writeFileSync(
      path.join(consolidatedDir, 'package.json'),
      JSON.stringify(mergedPackage, null, 2)
    );

    // 3. Criar tsconfig.json consolidado
    const tsConfig = consolidateTypescript();
    fs.writeFileSync(
      path.join(consolidatedDir, 'tsconfig.json'),
      JSON.stringify(tsConfig, null, 2)
    );

    // 4. Criar next.config.js consolidado
    fs.writeFileSync(
      path.join(consolidatedDir, 'next.config.js'),
      consolidateNextConfig()
    );

    // 5. Criar postcss.config.js consolidado
    fs.writeFileSync(
      path.join(consolidatedDir, 'postcss.config.js'),
      consolidatePostcssConfig()
    );

    // 6. Consolidar src
    const consolidatedSrc = path.join(consolidatedDir, 'src');
    createDirIfNotExists(consolidatedSrc);

    // 7. Copiar arquivos de src
    CONFIG.srcDirs.forEach(srcDir => {
      if (fs.existsSync(srcDir)) {
        fs.cpSync(srcDir, consolidatedSrc, { recursive: true });
      }
    });

    console.log('Estrutura consolidada com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao consolidar estrutura:', error);
    return false;
  }
}

// Executar consolidação
consolidateStructure(); 