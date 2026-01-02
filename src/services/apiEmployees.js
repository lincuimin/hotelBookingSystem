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

export async function getEmployees() {
  const response = await fetch(`${API_BASE}/staff`);
  return handleResponse(response, '获取员工列表失败');
}

export async function createEmployee(newEmployee) {
  const response = await fetch(`${API_BASE}/staff`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newEmployee),
  });
  return handleResponse(response, '创建员工失败');
}

export async function updateEmployee(id, updatedEmployee) {
  const response = await fetch(`${API_BASE}/staff/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedEmployee),
  });
  return handleResponse(response, '更新员工失败');
}

export async function deleteEmployee(id) {
  const response = await fetch(`${API_BASE}/staff/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(error.error || error.message || '删除员工失败');
    } catch (e) {
      if (e.message) throw e;
      throw new Error('删除员工失败');
    }
  }
  return id;
}
