const API_BASE = '/api';

async function handleResponse(response, errorMessage) {
  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(error.error || error.message || errorMessage);
    } catch (e) {
      if (e.message) throw e;
      throw new Error(errorMessage);
    }
  }
  return response.json();
}

export async function getCustomers() {
  const response = await fetch(`${API_BASE}/customers`);
  return handleResponse(response, '获取客户列表失败');
}

export async function createCustomer(newCustomer) {
  const response = await fetch(`${API_BASE}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCustomer),
  });
  return handleResponse(response, '创建客户失败');
}

export async function updateCustomer(id, updatedCustomer) {
  const response = await fetch(`${API_BASE}/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedCustomer),
  });
  return handleResponse(response, '更新客户失败');
}
