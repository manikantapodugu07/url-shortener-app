export function logAction(action, data) {
  
  fetch('http://localhost:3000/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, data, timestamp: new Date() }),
  });
}
