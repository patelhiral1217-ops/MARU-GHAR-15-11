import fs from 'node:fs';
import { initializeTestEnvironment } from '@firebase/rules-unit-testing';

const projectId = 'maru-ghar-gandhinagar-8dbe4';
const rules = fs.readFileSync('firestore.rules', 'utf8');
let testEnv;
try {
  testEnv = await initializeTestEnvironment({
    projectId,
    firestore: {
      host: '127.0.0.1',
      port: 8080,
      rules
    }
  });
  console.log('FIRESTORE RULES COMPILE PASS — emulator accepted the complete rules source.');
} finally {
  if (testEnv) await testEnv.cleanup();
}
