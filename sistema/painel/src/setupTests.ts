import '@testing-library/jest-dom';
import type { Crypto } from '@peculiar/webcrypto';

declare global {
  namespace NodeJS {
    interface Global {
      crypto: Crypto;
    }
  }
}

let uuidCounter = 0;

// Mock para crypto.randomUUID()
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => `test-uuid-${++uuidCounter}`,
    subtle: {},
    getRandomValues: () => new Uint8Array(16),
  },
});

// Limpar todos os mocks após cada teste
beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
  uuidCounter = 0;
}); 