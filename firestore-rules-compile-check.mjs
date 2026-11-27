import fs from 'node:fs';

const projectId = 'maru-ghar-gandhinagar-8dbe4';
const rules = fs.readFileSync('firestore.rules', 'utf8');
const endpoint = `http://127.0.0.1:8080/emulator/v1/projects/${projectId}:securityRules`;
const response = await fetch(endpoint, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    rules: {
      files: [{ name: 'firestore.rules', content: rules }]
    }
  })
});
const details = await response.text();
if (!response.ok) {
  throw new Error(`Firestore emulator rejected firestore.rules (${response.status}): ${details}`);
}
console.log('FIRESTORE RULES COMPILE PASS — emulator accepted and loaded the complete rules source.');
