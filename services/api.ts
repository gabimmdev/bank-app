const BASE_URL = 'https://mock-bank-mock-back.yexuz7.easypanel.host/api';

export async function loginUser(nickname: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apelido: nickname, senha: password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao fazer login');
  }

  return response.json();
}
