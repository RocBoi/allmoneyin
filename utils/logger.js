export const logAction = (action, user = 'SYSTEM') => {
  console.log(`[${new Date().toISOString()}] ${user} – ${action}`);
};
