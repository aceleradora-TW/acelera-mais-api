export const gerarPassword = () => {
  return Math.random().toString(36).slice(-10);
} 